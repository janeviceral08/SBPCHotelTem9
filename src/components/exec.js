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
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  WeekView,
  ViewSwitcher,
  DayView,
  AppointmentTooltip,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import Grid from '@material-ui/core/Grid';
import Room from '@material-ui/icons/Room';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import Popover from "@material-ui/core/Popover"
import { makeStyles } from "@material-ui/core";



const style = ({ palette }) => ({
 
  textCenter: {
    textAlign: 'left',
  },
  commandButton: {
    backgroundColor: 'white',
  },
});












export default class ExercisesList extends Component {
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
      currentViewName: 'Monthly',
    };
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };
  }

  componentDidMount() {
   const hotel = {  val: 'project='+localStorage.getItem('hotel_id').slice(5), }
    console.log('hotel: ', hotel)
   axios.post('https://gloreto.herokuapp.com/room_type/', hotel)
	.then(response => {
	  this.setState({ exercises: response.data })
      console.log('response.data: ', response.data)
	})
	.catch((error) => {
	  console.log(error);
	})
   
    axios.post('http://localhost:5000/reservation/reserve/', hotel)
	.then(response => {

    console.log('online.data: ', response.data)

    //, M, D, hh, mm
    const NewReserve = response.data.map( ({_id,status,name,email,phone_no,address,nationality,mode, reservation_code,in_check,out_check,room,guest,createdAt }) => ({ _id,status,name,email,phone_no,address,nationality,mode, reservation_code,startDate: moment(in_check * 1000).format('MMM D YYYY h:mm a') , endDate: moment(out_check * 1000).format('MMM D YYYY h:mm a'),room,guest,createdAt }) )
   
    
    console.log('NewReserve: ', NewReserve)
    this.setState({ online: response.data, data:NewReserve })
 
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
    const { data,currentViewName } = this.state;


    const CommandButton = withStyles(style, { name: 'CommandButton' })(({
      classes, ...restProps
    }) => (
      <AppointmentTooltip.CommandButton {...restProps} className={classes.commandButton} />
    ));
    
const Content = withStyles(style, { name: 'Content' })(({
  children, appointmentData, classes, ...restProps
}) => (

    <Grid container style={{padding: 20}}>
      <Grid item xs={3} className={classes.textCenter}>
      <i class="fa fa-user"></i> <span style={{fontWeight: 'bold'}}>Name: </span>
      </Grid>
      
      <Grid item xs={7}>
        <span>{appointmentData.name}</span>
      </Grid>
      <Grid item xs={3} className={classes.textCenter}>
      <i class="fa fa-user"></i> <span style={{fontWeight: 'bold'}}>Check in: </span>
      </Grid>
      
      <Grid item xs={7}>
        <span>{moment(appointmentData.startDate).format('MMM D, YYYY h:mm a')}</span>
      </Grid>
      <Grid item xs={4} className={classes.textCenter}>
      <i class="fa fa-user"></i> <span style={{fontWeight: 'bold'}}>Check out: </span>
      </Grid>
      
      <Grid item xs={7}>
        <span>{moment(appointmentData.endDate).format('MMM D, YYYY h:mm a')}</span>
      </Grid>
      <Grid item xs={3} className={classes.textCenter}>
      <i class="fa fa-user"></i> <span style={{fontWeight: 'bold'}}>Room: </span>
      </Grid>
      
      <Grid item xs={7}>
        <span>{appointmentData.room}</span>
      </Grid>
      <Grid item xs={4} className={classes.textCenter}>
      <i class="fa fa-user"></i> <span style={{fontWeight: 'bold'}}>Resv. Code: </span>
      </Grid>
      
      <Grid item xs={8}>
        <span>{appointmentData.reservation_code}</span>
      </Grid>
      <Grid item xs={3} className={classes.textCenter}>
      <i class="fa fa-user"></i> <span style={{fontWeight: 'bold'}}>Guest No.: </span>
      </Grid>
      
      <Grid item xs={7}>
        <span>{appointmentData.guest}</span>
      </Grid>
      <Grid item xs={3} className={classes.textCenter}>
      <i class="fa fa-user"></i> <span style={{fontWeight: 'bold'}}>Email: </span>
      </Grid>
      
      <Grid item xs={7}>
        <span>{appointmentData.email}</span>
      </Grid>
      <Grid item xs={3} className={classes.textCenter}>
      <i class="fa fa-user"></i> <span style={{fontWeight: 'bold'}}>Phone No.: </span>
      </Grid>
      
      <Grid item xs={7}>
        <span>{appointmentData.phone_no}</span>
      </Grid>
      <Grid item xs={3} className={classes.textCenter}>
      <i class="fa fa-user"></i> <span style={{fontWeight: 'bold'}}>Address: </span>
      </Grid>
      
      <Grid item xs={9}>
        <span>{appointmentData.address}</span>
      </Grid>
      <Grid item xs={4} className={classes.textCenter}>
      <i class="fa fa-user"></i> <span style={{fontWeight: 'bold'}}>Nationality: </span>
      </Grid>
      
      <Grid item xs={7}>
        <span>{appointmentData.nationality}</span>
      </Grid>
      <Grid item xs={7} className={classes.textCenter}>
      <i class="fa fa-user"></i> <span style={{fontWeight: 'bold'}}>Pref. Mode of Payment: </span>
      </Grid>
      
      <Grid item xs={4}>
        <span>{appointmentData.mode}</span>
      </Grid>
      <Grid item xs={4} className={classes.textCenter}>
      <i class="fa fa-user"></i> <span style={{fontWeight: 'bold'}}>Reserve on: </span>
      </Grid>
      
      <Grid item xs={6}>
        <span>{moment(appointmentData.createdAt * 1000).format('MMM D, YYYY h:mm a')}</span>
      </Grid>
<br/>{ appointmentData.status === 'Confirmed'? <div style={{flexDirection: 'row'}}>
      
      <Button
      onClick={()=>this.handleOpen(appointmentData._id,appointmentData.reservation_code)}
      style={{marginLeft: '150px'}}
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
      >
        Cancel
      </Button>
      </div>:
<div style={{flexDirection: 'row'}}>
      <Button
        variant="contained"
        color="primary"
        onClick={()=>this.approved(appointmentData._id,appointmentData.reservation_code)}
        startIcon={<SaveIcon  />}
      >
        Accept
      </Button>
      <Button
      onClick={()=>this.handleOpen(appointmentData._id,appointmentData.reservation_code)}
      style={{marginLeft: '150px'}}
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
      >
        Decline
      </Button>
      </div>}
    </Grid>
));





const Appointment = withStyles(style)(({
  children, appointmentData, classes, ...restProps
}) => (
  <Appointments.Appointment
  {...restProps}
  style={{
    ...style,
    backgroundColor: children[1].props.data.status === 'Confirmed'? '#58b973' :null,
    paddingLeft: 10, paddingTop: 5
  }}
>
  <p style={{color: 'white', fontSize: 12, lineHeight: 1}}>{children[1].props.data.name}<br/> { moment(children[1].props.data.startDate).format('MMMM D, YYYY hh:mm a')}<br/> { moment(children[1].props.data.endDate).format('MMMM D, YYYY hh:mm a')}</p>

</Appointments.Appointment>
));


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





        <Scheduler
          data={data}
        >
          <ViewState
            defaultCurrentDate={moment().format('YYYY-M-D')}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
         
          />
            <MonthView    name="Monthly"    displayName="Monthly"/>
        
          <Toolbar />
          <Appointments  appointmentComponent={Appointment} />
          <AppointmentTooltip
            contentComponent={Content}
            commandButtonComponent={CommandButton}
            showCloseButton
          />
          <AppointmentForm readOnly />
          <ViewSwitcher />
          <DateNavigator />
 
       
        </Scheduler>
      


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
<i class='fa fa-check text-green' title='Cancel' style={{fontSize: 25}}></i>
</Link>

 &nbsp;&nbsp;
<Link onClick={()=>this.handleOpen(reserv._id,reserv.reservation_code)}>
<i class='fa fa-trash text-red' title='Cancel' style={{fontSize: 25}}></i>
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