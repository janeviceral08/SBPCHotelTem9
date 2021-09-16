import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import cogoToast from 'cogo-toast';
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

export default class Hotel_Offers extends Component {
  constructor(props) {
    super(props);

    this.state = {
        online: [], 
        exercises: [],
        open: false,
        open2:false,
        files: [],
        imageUrl: null,
    imageAlt: null,
    title: "",
    subtitle:"",
    description: "",
    image1: "",
    image2: "",
    roomid:"",
    tags: [] ,
    projects:[],
    members: [],
    };
  }

  componentDidMount() {
    const hotel = {  val: localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'), }
      axios.post('https://gloreto.herokuapp.com/hotel_offer/View_Hotel_Offer/', hotel)
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
      axios.post('https://gloreto.herokuapp.com/reservation/reserve/', hotel)
      .then(response => {
        this.setState({ online: response.data })
        console.log('online.data: ', response.data)
      })
      .catch((error) => {
        console.log(error);
      })

      const myhotel = {  val: localStorage.getItem('hotel_id'), }
      axios.post('http://localhost:5000/user/User_info', myhotel)
      .then(response => {
     
          this.setState({projects: response.data, members: response.data.memberOf})
      })
      .catch((error) => {
        console.log(error);
      })
       
  }


handleSave(files) {
    //Saving files to state for further use and closing Modal.
    console.log('files: ', files.target.files)
    this.setState({
        files: files,
        open: false
    });
}

handleOpen(id) {
    this.setState({
        open: true,
        roomid:id,
    });
}

handleClose = () =>{
  this.setState({
      open: false
  });
}
handleOpen2(id) {
  this.setState({
      open2: true,
      roomid:id,
  });
}

handleClose2 = () =>{
this.setState({
    open2: false
});
}


handleImageUpload  = () =>{
    cogoToast.success('Please wait');
    const {  title,   tags } = this.state;
console.log('tags: ', this.state.tags)
  const { files } = document.querySelector("#uploaded")
  const formData = new FormData();
  formData.append('file', files[0]);        
  formData.append('upload_preset', 'bgzuxcoc');
  const options = {
    method: 'POST',
    body: formData,
  };
 
  
if(files[0] != undefined){


  return fetch('https://api.cloudinary.com/v1_1/kusinahanglan/image/upload', options)
  .then(res => res.json())
  .then(res => {
    
    const exercise = {
        title: title , 
      description: tags,
          image:  res.secure_url, 
        createdAt: moment().unix(),
        _partition: 'project=6127126cae94bc64a5e4b23a'
      }
 
      axios.post('https://gloreto.herokuapp.com/hotel_offer/Add_Hotel_Offer', exercise)
      .then(res =>{
        window.location.reload()
          
      });
    
  
    }

  )
  .catch(err => console.log(err))

  }

cogoToast.error('Please Select Image')


  }

  
 

  onChangetitle = event => {
    this.setState({ title: event.target.value });

};
onChangedescription= event => {
  this.setState({ description: event.target.value });

};
onChangesubtitle = event => {
  this.setState({ subtitle: event.target.value });

};
handleChange = tags => {
    console.log(tags);
    const values_tags = tags;
    console.log('values_tags: ', values_tags);
    this.setState({ tags: values_tags});
  };

onDelete = (id,title) => {
    const exercise = {
        id: id
      }
    confirmAlert({
        title: 'Confirm to Delete '+title,
        message: 'Are you sure to do this?',
        buttons: [
          {
            label: 'Yes',
            onClick: () =>(cogoToast.success('Please wait a moment...'),  axios.post('https://gloreto.herokuapp.com/hotel_offer/Hotel_Offer_Delete', exercise)
            .then(res =>{
             
              window.location.reload()
            }))
          },
          {
            label: 'No',
            onClick: () => console.log('no')
          }
        ]
      });
    
};
logout = () => {
  confirmAlert({
    title: 'Logout ',
    message: 'Are you sure to do this?',
    buttons: [
      {
        label: 'Yes',
        onClick: () =>
        {
  localStorage.removeItem("hotel_id")
  localStorage.removeItem('getInfoID')
  this.props.history.push('Home')

        }

      },
      {
        label: 'No',
        onClick: () => console.log('no')
      }
    ]
  });

}
  render() {
      console.log('tags: ', this.state.tags)
    return (
      <body class="hold-transition skin-blue sidebar-mini">




      <div class="wrapper">
      
      <header class="main-header">
          <a  data-toggle="offcanvas" class="logo">
            <span class="logo-mini"><b>G</b></span>
            <span class="logo-lg"><b>Gloreto</b></span>
          </a>
          <nav class="navbar navbar-static-top">
           
          </nav>
        </header>
        <aside class="main-sidebar">
          <section class="sidebar">
 
            <ul class="sidebar-menu">
            <li class="header">Hotels</li>
            {this.state.members.length >0 ? this.state.members.map((info,i)=>
     
     localStorage.getItem('getInfoID')===info.partition?
     <li onClick={()=> this.getInfoID(info.partition, info.expiration)} key={i} className="treeview active">
              <Link >  
                  <i class="fa fa-building"></i> <span style={{fontSize: 15}}>{info.name}</span>
                  </Link>
              </li>
              :
              localStorage.getItem('getInfoID') === null && info.name === 'My Hotel'?
              <li onClick={()=> this.getInfoID(info.partition, info.expiration)} key={i} className="treeview active">
              <Link >  
                  <i class="fa fa-building"></i> <span style={{fontSize: 15}}>{info.name}</span>
                  </Link>
              </li>
              :
              <li onClick={()=> this.getInfoID(info.partition, info.expiration)} key={i} className="treeview">
              <Link >  
                  <i class="fa fa-building"></i> <span style={{fontSize: 15}}>{info.name}</span>
                  </Link>
              </li>
            
            
            
            ):null}
              <li class="header">MAIN NAVIGATION</li>
              <li class="treeview">
              <Link to="/">  
                  <i class="fa fa-user"></i> <span>Reservations</span>
                      <span class="pull-right-container">
                        <small class="label pull-right bg-green" style={{padding: 5, borderRadius: 50, marginTop: -10}}>{this.state.online.length}</small>
                      </span>
                      </Link>
            
              </li>
              <li class="treeview">
              <Link to="/Rooms" >  
                  <i class="fa fa-building"></i> <span>Rooms</span>
                  </Link>
              </li>
              <li class="treeview">
              <Link to="/Goods">  
                  <i class="fa fa-shopping-cart"></i> <span>Goods</span>
                  </Link>
              </li>
              <li class="treeview">
              <Link to="/Highlight_Activities" >  
                  <i class="fa fa-clipboard"></i> <span>Popular Destination</span>
                  </Link>
              </li>
              <li class="treeview">
              <Link to="/Vacation_Ideas" >  
                  <i class="fa fa-list-alt"></i> <span>Vacation Ideas</span>
                  </Link>
              </li>
              <li class="treeview">
              <Link to="/Guest_FeedBack" >  
                  <i class="fa fa-users"></i> <span>Guest FeedBack</span></Link>
               
              </li>
              <li class="treeview active">
              <Link to="/Hotel_Offers" >  
                  <i class="fa fa-users"></i> <span>Activities</span></Link>
              </li>
              <li class="treeview">
              <Link to="/Voucher" >  
              <i class="fa fa-ticket"></i> <span>Voucher</span></Link>
              </li>
              <li class="treeview">
                  <Link to="/Additional_Info" >  
                  <i class="fa fa-cogs"></i> <span>Additional Hotel Info</span></Link>
              </li>
              <li class="treeview">
                  <Link to="/Reports" >  
                  <i class="fa fa-bar-chart"></i> <span>Reports</span></Link>
              </li>
              <li class="treeview">
              <a onClick={this.logout} style={{color: 'white'}}>  
              <i class="fa fa-sign-out"></i> <span>Logout</span></a>
              </li>
            </ul>
          </section>
        </aside>
      
        <div class="content-wrapper">
          <section class="content-header">
            <h1>
              Activities
            </h1>
            <ol class="breadcrumb">
              <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
              <li class="active">Activities</li>
         
            </ol>
          </section>
      
          <section class="content">
            <div class="row">
            <div class = "col-md-3" >
  
      <div class="form-group">
          <label for="file">Title:</label> <br />
          <TextField id="outlined-basic" style={{width: '100%'}} label="Title" variant="outlined" onChange={this.onChangetitle} />
<br />
<label for="file">Image:</label> <br />
<input type="file" id="uploaded"/><br />
<br />
<label for="file">Description:</label> <br />
         <Formik
        initialValues={this.state}
        style={{width: '100%'}}
        onSubmit={this.onSubmit}
        render={({
          values,
          errors,
          touched,
          status,
          dirty,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
          handleReset,
          setTouched,
          setFieldValue
        }) => (
          <Form onSubmit={handleSubmit} style={{width: '100%'}} noValidate name="simpleForm">
            <TagsInput
              name="tags"
              value={values.tags}
              onChange={tags => {
                console.log(tags);
                setFieldValue("tags", tags);
                this.setState({ tags});
              }}
            />
          </Form>
        )}
      />
<br />

      </div>
      <button type="submit" name="import" class="btn btn-primary btn-sm" onClick={this.handleImageUpload}>&nbsp;&nbsp;Save&nbsp;&nbsp;</button>


</div>
              <div class="col-lg-9 col-xs-12">
                <div class="box">
                  <div class="box-body">
                  <table class="table table-hover">
  <thead>
    <tr>
    
    <th>#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Image</th>
                       
                        <th scope="col">Actions</th>
                      
    </tr>
  </thead>
  <tbody>
  { this.state.exercises.map((room,index) =>
    <tr>
                                    <td scope="row"><p>{index+1}</p></td>
                                    <td>{room.title}</td>
                                    
                                    <td>
                                        
                                    <ul>
{room.description.map((item,index) => 
    <li key={index}>&#10687; {item}</li>
)}
</ul>
                                    
                                    </td> 
                                    <td><img src={room.image===""?'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png':room.image} className="displayed-image" width={100} height={100} /></td>
                                    
                                    <td>
                                  
                                                            <Link to="#" onClick={() => this.onDelete(room._id, room.title)}>
                                                            <i class='fa fa-trash text-red' title='Delete'></i>
															</Link>
                               
                                    </td>
                                 
                                </tr>



)

}

    
  </tbody>
</table>
                   
                  </div>
                 
                </div>
              
              </div>
            
            </div>
         
          </section>
        
        </div>
        
    
      
      
      </div>
   
      </body>
    )
  }
}