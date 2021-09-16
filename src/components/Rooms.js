import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import cogoToast from 'cogo-toast';
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import img1 from "./jpg/1.jpg";
import img2 from "./jpg/2.jpg";
import img3 from "./jpg/3.jpg";
import img4 from "./jpg/4.jpg";
import img5 from "./jpg/5.jpg";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';





const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});




export default class Rooms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exercises: [],   
      online: [], 
      rooms: [],
      setOpen:false, 
      room: '', 
      roomid: '',
      setOpenVideo:false, 
      openMoreInfo:false, 
      roomInfoValue: {}, 
      area: '', 
      bed: '', 
      specialAmeneties: [],
      projects:[],
      members: [],
      checkedB:false,
      max_reserve: 0,
    };
  }

  componentDidMount() {
    const hotel = {  val: localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'), }
	console.log('hotel:', localStorage.getItem('getInfoID'))
  
    axios.post('http://localhost:5000/room_type/', hotel)
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


    axios.post('https://gloreto.herokuapp.com/rooms/Room_List/', hotel)
	.then(response => {
        console.log('rooms: ', response.data )
	  this.setState({ rooms: response.data })
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

  vacnt (item) {

    const filter = item.temp_id;
    const filterRes = this.state.rooms.filter((item) => {return(item.room_type_id.indexOf(filter) >= 0 && item.status ==="Available")})
  
    return filterRes.length
  }

  total (item) {

    const filter = item.temp_id;
    const filterRes = this.state.rooms.filter((item) => {return(item.room_type_id.indexOf(filter) >= 0)})
  
    return filterRes.length
  }
   handleOpen = (room,id) => {
   this.setState({ setOpen:true, room: room, roomid: id })
  };

   handleClose = () => {
    this.setState({ setOpen:false, room: '', roomid: '' })
  };


  
  handleImageUpload  = () =>{
    cogoToast.success('Please wait a moment...');
   // const {  title  } = this.state;
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
    
      img: res.secure_url,
          id: this.state.roomid
        }

        axios.post('http://localhost:5000/room_type/update_one_img', exercise)
          .then(res =>{
            if(res.data === 'updated!'){
              window.location.reload()
            }
       
           // 
          })
      }

    )
    .catch(err => console.log(err))

    }
 
cogoToast.error('Please Select Image')
   
    

  }
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


  
  handleOpenVideo = () => {
    this.setState({ setOpenVideo:true, })
   };
   handleCloseVideo = () => {
    this.setState({ setOpenVideo:false, })
  };


  handleVideoUpload  = () =>{
    cogoToast.loading('Please wait a moment...', { hideAfter: 1000 });

    
   // const {  title  } = this.state;
    const { files } = document.querySelector("#uploadedhandleVideoUpload")
    const formData = new FormData();
    formData.append('file', files[0]);        
    formData.append('upload_preset', 'bgzuxcoc');
    const options = {
      method: 'POST',
      body: formData,
    };
   
    
if(files[0] != undefined){


    return fetch('https://api.cloudinary.com/v1_1/kusinahanglan/upload', options)
    .then(res => res.json())
    .then(res => {
  
     const exercise = { 
    
      video: res.secure_url,
          id: 'project='+localStorage.getItem('hotel_id').slice(5)
        }

        axios.post('https://gloreto.herokuapp.com/room_type/update_video', exercise)
          .then(res =>{
            if(res.data === 'updated!'){
              window.location.reload()
            }
       
           // 
          })
      }

    )
    .catch(err => console.log(err))

    }
 
cogoToast.error('Please Select Video')
   
    
  }

  handleOpenMoreInfo = (room) => {

    this.setState({openMoreInfo:true,  roomInfoValue: room,max_reserve:room.occupied, specialAmeneties: room.specialAmeneties === undefined? []: room.specialAmeneties, bed: room.bed === undefined ?'':room.bed, area: room.area  === undefined ?'':room.area});
  };
  handleCloseMoreInfo = () => {
    this.setState({openMoreInfo: false});
  };


  handleOpenMoreInfoUpdate = () => {

    const exercise = { 
      area: this.state.area,
      bed: this.state.bed,
      specialAmeneties: this.state.specialAmeneties,
          id: this.state.roomInfoValue.temp_id,
          max_reserve: this.state.max_reserve
        }

        axios.post('http://localhost:5000/room_type/update_more_info', exercise)
          .then(res =>{
            if(res.data === 'updated!'){
          window.location.reload()
            }})
  };

  onChangearea = event => {
  const name = event.target.name
    this.setState({ [event.target.name] : event.target.value} )
  
  };


  onDelete = (title, temp_id, show_website) => {
    const exercise = {
      temp_id: temp_id,
        show_website: show_website  
      }
    confirmAlert({
        title: 'Confirm to Change Status of '+title,
        message: 'Are you sure to do this?',
        buttons: [
          {
            label: 'Yes',
            onClick: () =>  {cogoToast.success('Please wait'); axios.post('http://localhost:5000/room_type/update_status', exercise)
            .then(res => window.location.reload())}
          },
          {
            label: 'No',
            onClick: () => console.log('no')
          }
        ]
      });
    
};



room_img_data= (room, name, temp_id) => {


  return ( 
  <img src={'https://www.pinclipart.com/picdir/big/126-1266771_post-page-to-add-pictures-comments-add-post.png'} onClick={()=> this.handleOpen(name, temp_id)} className="displayed-image" width={50} height={50}  />
  )
  

}

handleImageUploadDelete  = (res, temp_id) =>{

  confirmAlert({
    title: 'Delete Image ',
    message: 'Are you sure to do this?',
    buttons: [
      {
        label: 'Yes',
        onClick: () =>
        {    cogoToast.loading('Please wait a moment...', { hideAfter: 1000 });


        const exercise = { 
       
         img: res._id,
             id: temp_id
           }
   
           axios.post('http://localhost:5000/room_type/update_one_delete', exercise)
             .then(res =>{
               if(res.data === 'updated!'){
                 window.location.reload()
               }
          
              // 
             })
        

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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={this.state.openMoreInfo}
        onClose={this.handleCloseMoreInfo}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.openMoreInfo}>
          <div style={{ backgroundColor: 'white',
    border: '2px solid #000',
    padding:40,
  width: '60%',
  marginTop: '2.5%',
marginLeft: '30%'
    
    }}>
            <h2 id="transition-modal-title">Room Additional Information</h2>
            <label for="file">Room:</label><br />
<TextField id="outlined-basic" label="Reservation Code" variant="outlined" value={this.state.roomInfoValue.name} InputProps={{
            readOnly: true,
          }} /><br />
          <label for="file">Maximum Reservation:</label><br />
<TextField id="outlined-basic" label="Maximum Reservation" variant="outlined" name="max_reserve"  error={isNaN(this.state.max_reserve >= 0? this.state.max_reserve: 0) === true ? true: false} value={Math.round(this.state.max_reserve >= 0? this.state.max_reserve: 0)}  onChange={this.onChangearea} /><br />
<br />
            <label for="file">Room Area:</label><br />
<TextField id="outlined-basic" label="Room Area" variant="outlined" name="area" defaultValue={this.state.roomInfoValue.area}  onChange={this.onChangearea} /><br />
<label for="file">Bed:</label><br />
<TextField id="outlined-basic" label="Bed" variant="outlined" name="bed" defaultValue={this.state.roomInfoValue.bed} onChange={this.onChangearea} /><br />
<label for="file">Room Special Anemeties:</label> <br />
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
          <Form onSubmit={handleSubmit} style={{width: '100%'}} noValidate name="simpleForm" >
            <TagsInput
              name="specialAmeneties"
              value={values.specialAmeneties}
              onChange={specialAmeneties => {
                console.log(specialAmeneties);
                setFieldValue("specialAmeneties", specialAmeneties);
                this.setState({ specialAmeneties});
              }}
            />
          </Form>
        )}
      />
<br />
<button type="submit" name="import" class="btn btn-primary btn-sm" onClick={this.handleOpenMoreInfoUpdate} >&nbsp;&nbsp;Save&nbsp;&nbsp;</button> <br />
          </div>
        </Fade>
      </Modal>
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
              <li class="treeview active">
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
              <li class="treeview">
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
              Rooms
            </h1>
            <ol class="breadcrumb">
              <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
              <li class="active">Rooms</li>
           
            </ol>
          </section>
      
          <section class="content">
            <div class="row">
              <div class="col-xs-12">

                <div class="box">
                  <div class="box-body">
                  <table class="table table-hover" style={{  'display': 'block',
'overflow-x': 'auto',' white-space': 'nowrap' }}>
  <thead>
    <tr>
    
                        <th scope="col">#</th>
                        <th scope="col">Room</th>
                        <th scope="col">Vacant</th>
                        <th scope="col">Total Rooms</th>
                        <th scope="col">Price</th>
                        <th scope="col">Type</th>
                        <th scope="col">Extra Person Price</th>
                        <th scope="col">Max Person</th>
                        <th scope="col">Image</th>
                        <th scope="col"  onClick={()=> this.handleOpenVideo()}>Short Video</th>
                        <th scope="col">Reservation</th>
                        <th scope="col">More Info</th>
    </tr>
  </thead>
  <tbody>
  { this.state.exercises.map((room,index) =>
    <tr>
                                    <td scope="row"><p>{index+1}</p></td>
                                    <td><p>{room.name}</p></td>
                                    <td><p>{this.vacnt(room)}</p></td>
                                    <td><p>{this.total(room)}</p></td>
                                    <td><p>{room.rate_mode === "Daily"? parseFloat(room.roomprice).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'): room.rate_mode ==="Hour"? parseFloat(room.roomprice_hour).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'): room.duration_mode ==="Daily"?parseFloat(room.roomprice).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):parseFloat(room.roomprice).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }</p></td>
                                    <td><p>{room.rate_mode === "Daily"? room.rate_mode: room.rate_mode ==="Hour"? room.hour_duration+ ' '+ room.rate_mode: room.duration_mode ==="Daily"?room.promo_duration+ ' Days '+ room.rate_mode:room.promo_duration+ ' Hours '+ room.rate_mode }</p></td>
                                    <td><p>{parseFloat(room.extra_person_charge).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</p></td>
                                    <td><p>{room.max_person}</p></td>
                                    <td>  
                                      
                                    {room.img.length > 2? null :this.room_img_data(room.img, room.name, room.temp_id)}
                                   {room.img && room.img.length > 0?
                                   
                                  room.img.map((info, index)=>
    
     <img src={info.original} key={index} className="displayed-image" width={50} height={50} onClick={()=>this.handleImageUploadDelete(info, room.temp_id)} />
      )
    :null
    
    }
                                     </td>
                                    <td><video width="220" height="140" controls>
                                    <source src={room.video}  type="video/mp4"/>
                                    <source src={room.video}  type="video/webm"/>
                                    <source src={room.video}  type="video/ogg"/>
                                    Your browser does not support the video tag.
                                  </video>
                               
                                  </td>
                                  <td style={{width: '9.09%'}}>
                                  <FormControlLabel
        control={<IOSSwitch checked={room.show_website === 1 ?true:false} onChange={this.onChangedescription} name="checkedB" />}
        label="Reservation Availability"
        onClick={() => this.onDelete(room.name, room.temp_id, room.show_website)}
      />

</td>   
                                  <td style={{width: '9.09%'}}>
          
<Link onClick={()=>this.handleOpenMoreInfo(room)}>
<i class='fa fa-ellipsis-v' style={{fontSize: 25}}></i>
</Link>


</td>                      
                                </tr>



)

}

    
  </tbody>
</table>


<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={this.state.setOpenVideo}
        onClose={this.handleCloseVideo}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.setOpenVideo}>
          <div style={{ backgroundColor: 'white',
    border: '2px solid #000',
    padding:40,
  width: '40%',
  marginTop: '10%',
marginLeft: '30%'
    
    }}>
            <h2 id="transition-modal-title">Upload Video</h2>
           
            <input type="file" id="uploadedhandleVideoUpload"/>
          
<button type="submit" name="import" class="btn btn-primary btn-sm" onClick={this.handleVideoUpload} >&nbsp;&nbsp;Save&nbsp;&nbsp;</button> <br />
          </div>
        </Fade>
      </Modal>
<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={this.state.setOpen}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.setOpen}>
          <div style={{ backgroundColor: 'white',
    border: '2px solid #000',
    padding:40,
  width: '40%',
  marginTop: '10%',
marginLeft: '30%'
    
    }}>
            <h2 id="transition-modal-title">Upload Photo</h2>
           
            <input type="file" id="uploaded"/>
          
<button type="submit" name="import" class="btn btn-primary btn-sm" onClick={this.handleImageUpload} >&nbsp;&nbsp;Save&nbsp;&nbsp;</button> <br />
          </div>
        </Fade>
      </Modal>
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