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


export default class Admin extends Component {
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
      projects:[],
      members: [],
    };
  }

  componentDidMount() {
    const hotel = {  val: localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'), }
    console.log('hotel: ', hotel)
   axios.post('https://gloreto.herokuapp.com/room_type/', hotel)
	.then(response => {
	  this.setState({ exercises: response.data })
      console.log('response.data: ', response.data)
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
            
             axios.post('https://gloreto.herokuapp.com/reservation/approved', exercise)
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
    axios.post('https://gloreto.herokuapp.com/reservation/cancel', exercise)
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
  render() {
    return (
      <body class="hold-transition skin-blue sidebar-mini">
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
          <a href="" class="logo">
            <span class="logo-mini"><b>G</b></span>
            <span class="logo-lg"><b>Gloreto</b></span>
          </a>
          <nav class="navbar navbar-static-top">
            <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button" style={{marginLeft: '50%'}}>
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </a>
      
            
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
                  <i class="fa fa-clipboard"></i> <span>Header Information</span>
                  </Link>
              </li>
              <li class="treeview">
              <Link to="/Vacation_Ideas" >  
                  <i class="fa fa-list-alt"></i> <span>Special Anemeties</span>
                  </Link>
              </li>
              <li class="treeview">
              <Link to="/Guest_FeedBack" >  
                  <i class="fa fa-users"></i> <span>Guest FeedBack</span></Link>
                  
               
              </li>
              <li class="treeview">
                  <Link to="/Additional_Info" >  
                  <i class="fa fa-cogs"></i> <span>Additional Hotel Info</span></Link>
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
                  <table class="table table-hover" style={{'height': '90%', 'overflow':'scroll', 'display': 'block', 'width': '95%'}}>
  <thead>
    <tr>
    <th scope="col">#</th>
                        <th scope="col">Reservation Code</th>
                        <th scope="col">Name</th>
                        <th scope="col">Room</th>
                        <th scope="col">Check In</th>
                        <th scope="col">Check Out</th>
                        <th scope="col">Guest</th>
                        <th scope="col">Address</th>
                        <th scope="col">Contact</th>
                      
                        <th scope="col">Mode of Payment</th>
                        <th scope="col">Date</th>
                        <th scope="col">Actions</th>
                      
    </tr>
  </thead>
  <tbody >
    { this.state.online && this.state.online.length > 0 ? this.state.online.map((reserv,index) => 

<tr>
<td scope="row">{index+1}</td>
<td>{reserv.reservation_code}</td>
<td>{reserv.name}</td>
<td>{reserv.room}</td>
<td>{ moment(reserv.in_check  * 1000).format('MMMM D, YYYY')}</td>
<td>{ moment(reserv.out_check  * 1000).format('MMMM D, YYYY')}</td>
<td>{reserv.guest}</td>
<td>{reserv.address}</td>
<td>{reserv.phone_no + ', ' +reserv.email}</td>
<td>{reserv.mode}</td>
<td>{ moment(reserv.createdAt  * 1000).format('MMMM D, YYYY hh:mm a')}</td>
<td>

<Link onClick={()=>this.approved(reserv._id,reserv.reservation_code)}>
<i class='fa fa-check text-green' title='Cancel' style={{fontSize: 18}}></i>
</Link>

 &nbsp;&nbsp;
<Link onClick={()=>this.handleOpen(reserv._id,reserv.reservation_code)}>
<i class='fa fa-trash text-red' title='Cancel' style={{fontSize: 18}}></i>
</Link>

</td>
</tr>

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