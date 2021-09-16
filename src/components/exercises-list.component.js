import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import { Card } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon  from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import { ViewState } from '@devexpress/dx-react-scheduler';

import Grid from '@material-ui/core/Grid';
import Room from '@material-ui/icons/Room';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import Popover from "@material-ui/core/Popover"
import { makeStyles } from "@material-ui/core";
import { PropTypes, array } from "prop-types";

import "react-big-scheduler/lib/css/style.css";
import Scheduler, {
  SchedulerData,
  ViewTypes,
  DemoData,
  DATE_FORMAT
} from "react-big-scheduler";


import firebase from './firebase'
import "firebase/messaging";

import CustomEventStyle from './CustomEventStyle'




 class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exercises: [], 
      online: [], 
      setShow: false,
      ID: "",
      name: "",
      email: "",
      phone_no: "",
      address: "",
      nationality: "",
      mode: "",
      reservation_code: "",
      incheck: "",
      outcheck: "",
      room: "",
      guest: "",
      part: "",
      upload_files: null,
      reason: "",
      open: false,
      id: "",
      reservation_code: "",
      data: [],
      Newroom_type: [], 
      Newreserve: [], 
      projects:[],
      members: [],
    };
  
  }

  componentDidMount() {
    const messaging = firebase.messaging()
    messaging.requestPermission().then(()=>{
      return messaging.getToken()
    }).then(token=>{
      console.log('Token : ',token)
    }).catch((err)=>{
      console.log(err);
      
    })
   const hotel = {  val: localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'), }
    console.log('hotel: ', localStorage.getItem('getInfoID'))
   axios.post('http://localhost:5000/room_type/', hotel)
	.then(response => {
    const Newroom_type= response.data.map( ({temp_id,name}) => ({ id: temp_id,name }) )
    console.log('Newroom_type.data: ', Newroom_type)
    
	  this.setState({ exercises: response.data , Newroom_type: Newroom_type})
      console.log('response.data: ', response.data)
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
   
   
    axios.post('http://localhost:5000/reservation/reserve/', hotel)
	.then(response => {

  

    //, M, D, hh, mm

   
    const NewReserve = response.data.map( ({reservation_code,in_check,out_check,room,name,guest, createdAt,_id, status,email,phone_no,address,nationality,mode}) => ({  id: reservation_code,start: moment(in_check * 1000).format('MMM D YYYY h:mm a') , end: moment(out_check * 1000).format('MMM D YYYY h:mm a'),resourceId: room,title: name, _id, status,email,phone_no,address,nationality,mode,guest, createdAt, bgColor: '#D9D9D9',type: 1, }) )
	  
    
    console.log('NewReserve: ', NewReserve)
    this.setState({ online: response.data, Newreserve:NewReserve })
 
	})
	.catch((error) => {
	  console.log(error);
	})


  }

  approved = (id,title) => {
    const exercise = {
        id: id
      }
    confirmAlert({
        title: 'Confirm to Approved res. '+title,
        message: 'Are you sure to do this?',
        buttons: [
          {
            label: 'Yes',
            onClick: () =>
            
             axios.post('http://localhost:5000/reservation/approved', exercise)
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



cancelled = () => {
  const exercise = {
      id: this.state.id,
      reason: this.state.reason
    }
    if(!this.state.reason){
      cogoToast.error('Please Enter Reason of Cancellation')
    }
    
   cogoToast.success('Please Wait...')
    axios.post('http://localhost:5000/reservation/cancel', exercise)
    .then(res =>{
     
      window.location.reload()
    })
  
};


 handleOpen = (id,reservation_code) => {

  this.setState({open:true, id: id, reservation_code: reservation_code});
};

 handleClose = () => {
  this.setState({open: false});
};
onChangeReason = event => {
  console.log('reason: ',event.target.value )
  this.setState({reason: event.target.value})

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


getInfoID (partition, expiration){

  if(expiration === null){
    cogoToast.error('Account Already Expired')
    return;
  }

  else if(moment().unix() >= expiration ){
    cogoToast.error('Account Already Expired')
    return;
  }
else{
  localStorage.setItem('getInfoID', partition)

}
}
  render() {
console.log('projects memberOf: ', this.state.members)

console.log('members: ', this.state.members.length)
    return (
      <body class="hold-transition skin-blue sidebar-mini">
        <div style={{width: '50%'}}>
              
         
              
              </div>
      <div class="wrapper">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={this.state.open}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.open}>
          <div style={{ backgroundColor: 'white',
    border: '2px solid #000',
    padding:40,
  width: '40%',
  marginTop: '10%',
marginLeft: '30%'
    
    }}>
            <h2 id="transition-modal-title">Reason Of Cancellation</h2>
            <label for="file">Reservation Code:</label><br />
<TextField id="outlined-basic" label="Reservation Code" variant="outlined" value={this.state.reservation_code} InputProps={{
            readOnly: true,
          }} /><br />
            <label for="file">Reason:</label><br />
<TextField id="outlined-basic" label="Reason" variant="outlined"  onChange={this.onChangeReason} /><br /><br />
<button type="submit" name="import" class="btn btn-primary btn-sm" onClick={this.cancelled} >&nbsp;&nbsp;Save&nbsp;&nbsp;</button> <br />
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
              <li class="treeview active">
              <Link to="/">  
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
            Reservations
            </h1>
            <ol class="breadcrumb">
              <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
              <li class="active">Reservations</li>
          
            </ol>
          </section>
      
          <section class="content">
            
            <div class="row">
              <div class="col-xs-12">
                
                <div class="box">
                  <div class="box-body">


                  <CustomEventStyle rooms={this.state.Newroom_type} scheds={this.state.Newreserve}/>


<br />
<br />
<br />



                  <table class="table table-hover" style={{'height': '90%', 'overflow':'scroll', 'display': 'block', 'width': '100%'}}>
  <thead>
    <tr>
    <Card>
  <Card.Body style={{width: '100%', alignSelf: 'cenetr'}}>   
                        <th scope="col" style={{width: '9.09%'}}>Reservation Code</th>
                        <th scope="col" style={{width: '7%'}}>Name</th>
                        <th scope="col" style={{width: '7%'}}>Room</th>
                        <th scope="col" style={{width: '8%'}}>Check In</th>
                        <th scope="col" style={{width: '10%'}}>Check Out</th>
                        <th scope="col" style={{width: '11%'}}>Address</th>
                        <th scope="col" style={{width: '10%'}}>Contact</th>
                      
                        <th scope="col" style={{width: '12%'}}>Mode of Payment</th>
                        <th scope="col" style={{width: '7%'}}>Date</th>
                        <th scope="col" style={{width: '5%'}}>Actions</th></Card.Body>
</Card>
 
                      
    </tr>
  </thead>
  <tbody >
    { this.state.online && this.state.online.length > 0 ? this.state.online.map((reserv,index) => {


if (reserv.status === 'For Reservation') { 
 
  return (  <tr> <Card>
  <Card.Body style={{width: '100%'}}>
<td style={{width: '9.09%'}}><p>{reserv.reservation_code}</p></td>
<td style={{width: '9.09%'}}><p>{reserv.name} ({reserv.guest} Person)</p></td>
<td style={{width: '9.09%'}}><p>{reserv.room}</p></td>
<td style={{width: '11%'}}><p>{ moment(reserv.in_check  * 1000).format('MMMM D, YYYY')} </p></td>
<td style={{width: '11%'}}><p>{ moment(reserv.out_check  * 1000).format('MMMM D, YYYY')}</p></td>

<td style={{width: '9.09%'}}><p>{reserv.address}</p></td>
<td style={{width: '9.09%'}}><p>{reserv.phone_no + ', ' +reserv.email}</p></td>
<td style={{width: '9.09%'}}>{reserv.mode}</td>
<td style={{width: '9.09%'}}><p>{ moment(reserv.createdAt  * 1000).format('MMMM D, YYYY hh:mm a')}</p></td>
<td style={{width: '9.09%'}}>

<Link onClick={()=>this.approved(reserv._id,reserv.reservation_code)}>
<i class='fa fa-check text-green' title='Approve' style={{fontSize: 25}}></i>
</Link>

 &nbsp;&nbsp;
<Link onClick={()=>this.handleOpen(reserv._id,reserv.reservation_code)}>
<i class='fa fa-trash text-red' title='Disapprove' style={{fontSize: 25}}></i>
</Link>

</td>

</Card.Body>
</Card>
</tr>)}}
                        )

:  <tr>
<td colspan='13'>No Records Found</td>
</tr>

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
export default ExercisesList;