import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import cogoToast from 'cogo-toast';
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class Guest_FeedBack extends Component {
  constructor(props) {
    super(props);

    this.state = {
        online: [], 
        exercises: [],
        refre: false,
        guest: "",
        address :"",
        rate: "",
        feedback: "",
        projects:[],
        members: [],
    };
  }

  componentDidMount() {

    const hotel = {  val: localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'), }
    axios.post('https://gloreto.herokuapp.com/feedback/View_Feedback/', hotel)
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
            onClick: () =>  axios.post('https://gloreto.herokuapp.com/feedback/delete_Feedback', exercise)
            .then(res =>{
             
              window.location.reload()
            })
          },
          {
            label: 'No',
            onClick: () => console.log('no')
          }
        ]
      });
    
};


  valuetext(value) {
    return `${value}°C`;
  }
  onChangename = event => {
    console.log('onChangename: ',event.target.value )
    this.setState({guest: event.target.value})

};
onChangeaddress = event => {
    console.log('onChangeaddress: ',event.target.value )
    this.setState({address: event.target.value})

};
onChangerate= event => {
    console.log('onChangerate: ',event.target.value )
    this.setState({rate: event.target.value})

};
onChangefeedback = event => {
    console.log('onChangefeedback: ',event.target.value )
    this.setState({feedback: event.target.value})

};

onSubmit = () => {
    const {  guest,
        feedback,
        address,
        rate, } = this.state;
     const exercise = {
        name: guest,
    feedback,
    address,
    rate,
        createdAt: moment().unix(),
        _partition: 'project=6127126cae94bc64a5e4b23a'
      }
 
      axios.post('https://gloreto.herokuapp.com/feedback/add_Feedback', exercise)
      .then(res =>{
        cogoToast.success('Please wait');
          if(res.data == 'Feedback added!'){
            window.location.reload()
          }
          else{
              cogoToast.error('Please Try Again');
          }
          
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
              <Link to="/" >
                  <i class="fa fa-user"></i> <span>Reservations</span>
                      <span class="pull-right-container">
                        <small class="label pull-right bg-green" style={{padding: 5, borderRadius: 50, marginTop: -10}}>{this.state.online.length}</small>
                      </span>
                      </Link>
              </li>
              <li class="treeview">
              <Link to="/Rooms">  
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
                  <i class="fa fa-list-alt"></i> <span>About Hotel</span>
                  </Link>
              </li>
              <li class="treeview active">
              <Link to="/Guest_FeedBack" >  
                  <i class="fa fa-users"></i> <span>Guest FeedBack</span></Link>
               
              </li>
              <li class="treeview">
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
              Guest FeedBack
            </h1>
            <ol class="breadcrumb">
              <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
              <li class="active"> Guest FeedBack</li>
           
            </ol>
          </section>
      
          <section class="content">
            <div class="row">
            <div class = "col-md-3" >
  
      <div class="form-group">
          <label for="file">Name of Guest:</label> <br />
          <TextField id="outlined-basic" style={{width: '100%'}} label="Name of Guest" variant="outlined"  onChange={this.onChangename}/>
          <br />

<label for="file">Rate:</label><br />
<FormControl style={{width: '100%'}}>
        <Select
          value={this.state.rate}
          onChange={this.onChangerate}
          
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="" disabled>
            Rate
          </MenuItem>
          <MenuItem value={1}>1 Star</MenuItem>
          <MenuItem value={2}>2 Stars</MenuItem>
          <MenuItem value={3}>3 Stars</MenuItem>
          <MenuItem value={4}>4 Stars</MenuItem>
          <MenuItem value={5}>5 Stars</MenuItem>
        </Select>
        <FormHelperText>Rate</FormHelperText>
      </FormControl>
<br />
<label for="file">Feedback:</label><br />
<TextField
id="outlined-multiline-static"
label="Feedback"
style={{width: '100%'}}
multiline
rows={4}
variant="outlined"
onChange={this.onChangefeedback}
/>
      </div>
      <button type="submit" name="import" class="btn btn-primary btn-sm" onClick={this.onSubmit} >&nbsp;&nbsp;Save&nbsp;&nbsp;</button>


</div>
              <div class="col-lg-9 col-xs-12">
                <div class="box">
                  <div class="box-body">


                  <table class="table table-hover" style={{width: 900}}>
  <thead>
    <tr>
    
                        <th scope="col">#</th>
                        <th scope="col">Guest Name</th>
                   
                        <th scope="col">Rate</th>
                        <th scope="col">Feedback</th>
                        <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  { this.state.exercises.map((room,index) =>
    <tr>
                                    <td scope="row"><p>{index+1}</p></td>
                                    <td>{room.name}</td> 
                                    <td>{room.rate}</td>
                                    <td>{room.feedback}</td>
                                    <td>
                                  
                                                            <Link to="#" onClick={() => this.onDelete(room._id, room.name)} style={{fontSize: 20}}>
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