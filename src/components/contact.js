import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ScriptTag from 'react-script-tag';
import {Helmet} from "react-helmet";
import Navbar from "./navbar.component"

//import hero1 from "../files/img/hero/hero-1.jpg"
import cogoToast from 'cogo-toast';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import GoogleMapReact from 'google-map-react';

import styled from 'styled-components';

import AutoComplete from './Autocomplete';
import Marker from './Marker';

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;
export default class Contact extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    
    this.state = {
        
        exercises: [],
        about_hotel: [],
        hotel_offer:[],
        carousel_header: [], 
        feedback: [], 
        Hotel_Information: '',
        Name_of_Hotel: '',
        map_address: '',
        email: '',
        mobile: '',
        tel_no: '',
        website: '',
        address: '',
        hotel_city: '',
        title: '',
        subtitles: '',
        link: '',
        background_image: '',
        selectedDate :null,
        dates_value: [null, null],
        guest: "", 
		 check_out: "", 
		 check_in: "", 
		 room: "",
         header_image: "",
         header_text: "",
         header_subtext: "",
         hotel_image: "",
         lat: "",
         lng:"",
         mapApiLoaded: false,
         mapInstance: null,
         mapApi: null,
         geoCoder: null,
         places: [],
         center: [],
         zoom: 12,
    };
  }

  componentDidMount() {
    const hotel = {  val: "project=6127126cae94bc64a5e4b23a", }

      axios.post('https://gloreto.herokuapp.com/additional_info/View_Additional_Info/', hotel)
      .then(response => {
        this.setState({ 
            Hotel_Information: response.data.hotel_info,
             Name_of_Hotel: response.data.hotel_name,
             map_address:response.data.map_address,
            email: response.data.email,
            mobile:response.data.mobile,
            tel_no:response.data.tel_no,
            website:response.data.website,
            address:response.data.address,
            hotel_city: response.data.hotel_city,
            header_image: response.data.header_image,
            header_text: response.data.header_text,
            header_subtext: response.data.header_subtext,
            hotel_image: response.data.hotel_image,
            lat: response.data.lat,
            lng: response.data.lng,
            })
      }) 
      .catch((error) => {
        console.log(error);
      })

  }

  

  deleteExercise(id) {
    axios.delete('https://gloreto.herokuapp.com/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }
  onLogin = event => {
    const { username, password } = this.state;
  
    const exercise = {
        username,
      password
      }
    axios.post('https://gloreto.herokuapp.com/admin/logins', exercise)
    .then(response =>
  {        localStorage.setItem('hotel_id', response.data._partition)
        this.props.history.push('/')}
        ).catch(function (error) {
            cogoToast.error('Invalid Email or Password')
        console.log('error',error);
      })
    
    //this.props.history.push('/Admin')
  console.log('pressed: ', username, password )
  };
  
  
  handleOpen = () => {
  
    this.setState({open:true});
  };
  
   handleClose = () => {
    this.setState({open: false});
  };
  
  onMarkerInteraction = (childKey, childProps, mouse) => {
    this.setState({
        draggable: false,
        lat: mouse.lat,
        lng: mouse.lng
    });
}
onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
    this.setState({ draggable: true });

}

_onChange = ({ center, zoom }) => {
    this.setState({
        center: center,
        zoom: zoom,
    });

}


  render() {

    return (
        <body>	
             <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
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
    width: '70%',
  marginTop: '10%',
marginLeft: '20%'
    
    }} class="col-xl-12">
        <p>User Name</p>
        <TextField id="outlined-basic" label="User Name" variant="outlined" style={{width: '100%'}} name="username" onChange={this.select} />
        <p>Password</p>
        <TextField id="outlined-basic" label="Password" variant="outlined" style={{width: '100%'}} name="password" onChange={this.select} />
        <br /><br />
     <div style={{alignSelf: 'center'}}>
                                        <button type="submit" class="primary-btn text-uppercase" onClick={this.onLogin} >Login</button>
           </div>                       
        </div>

        </Fade>
      </Modal>
        <header id="header">
            <div class="header-top">
                <div class="container">
                  <div class="row align-items-center">
                      <div class="col-lg-6 col-sm-6 col-6 header-top-left">
                          <ul>
                              <li><a href="#">Visit Us</a></li>
                              <li><a href="#">Buy Tickets</a></li>
                          </ul>			
                      </div>
                      <div class="col-lg-6 col-sm-6 col-6 header-top-right">
                        <div class="header-social">
                            <a href="#"><i class="fa fa-facebook"></i></a>
                            <a href="#"><i class="fa fa-twitter"></i></a>
                            <a href="#"><i class="fa fa-dribbble"></i></a>
                            <a href="#"><i class="fa fa-behance"></i></a>
                        </div>
                      </div>
                  </div>			  					
                </div>
            </div>
            <div class="container main-menu">
                <div class="row align-items-center justify-content-between d-flex">
                  <div id="logo">
                    <a href="index.html"><img src={this.state.hotel_image} alt="" title="" /></a>
                  </div>
                  <nav id="nav-menu-container">
                    <ul class="nav-menu">
                    <li> <Link  to="/Home">Home</Link></li>
                      <li><Link  to="/Home">About</Link></li>
                      <li><Link  to="/Room_Details">Rooms</Link></li>
                				          					          		          
                      <li><Link  to="/Contact">Contact</Link></li>
                    </ul>
                  </nav>
                  <button onClick={this.handleOpen}  class="primary-btn text-uppercase">Login</button>		 		  				      		  
                </div>
            </div>
        </header>
        <section class="relative about-banner">	
            <div class="overlay overlay-bg"></div>
            <div class="container">				
                <div class="row d-flex align-items-center justify-content-center">
                    <div class="about-content col-lg-12">
                        <h1 class="text-white">
                            Contact Us				
                        </h1>	
                        <p class="text-white link-nav"><a href="index.html">Home </a>  <span class="lnr lnr-arrow-right"></span>  <a href="contact.html"> Contact Us</a></p>
                    </div>	
                </div>
            </div>
        </section>
        <section class="contact-page-area section-gap">
            <div class="container">
                <div class="row">
            
                    <div class="col-lg-4 d-flex flex-column address-wrap">
                        <div class="single-contact-address d-flex flex-row">
                            <div class="icon">
                                <span class="lnr lnr-home"></span>
                            </div>
                            <div class="contact-details">
                                <h5>Address</h5>
                                <p>
                                {this.state.address}
                                </p>
                            </div>
                        </div>
                        <div class="single-contact-address d-flex flex-row">
                            <div class="icon">
                                <span class="lnr lnr-phone-handset"></span>
                            </div>
                            <div class="contact-details">
                                <h5>{this.state.mobile}</h5>
                                <p>{this.state.tel_no}</p>
                            </div>
                        </div>
                        <div class="single-contact-address d-flex flex-row">
                            <div class="icon">
                                <span class="lnr lnr-envelope"></span>
                            </div>
                            <div class="contact-details">
                                <h5>{this.state.email}</h5>
                                <p>{this.state.website}</p>
                            </div>
                        </div>														
                    </div>
                    <div class="col-lg-8">
                        <form class="form-area contact-form text-right" id="myForm" action="mail.php" method="post">
                            <div class="row">	
                                <div class="col-lg-6 form-group">
                                    <input name="name" placeholder="Enter your name" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter your name'" class="common-input mb-20 form-control" required="" type="text"/>
                                
                                    <input name="email" placeholder="Enter email address" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter email address'" class="common-input mb-20 form-control" required="" type="email"/>

                                    <input name="subject" placeholder="Enter subject" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter subject'" class="common-input mb-20 form-control" required="" type="text"/>
                                </div>
                                <div class="col-lg-6 form-group">
                                    <textarea class="common-textarea form-control" name="message" placeholder="Enter Messege" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Messege'" required=""></textarea>				
                                </div>
                                <div class="col-lg-12">
                                    <div class="alert-msg" style={{'text-align': 'left'}}></div>
                                    <button class="genric-btn primary" style={{'float': 'right'}}>Send Message</button>											
                                </div>
                            </div>
                        </form>	
                    </div>
                </div>
            </div>	
        </section>		
             
        <footer class="footer-area section-gap">
            <div class="container">

                <div class="row">
                    <div class="col-lg-6  col-md-12 col-sm-12">
                        <div class="single-footer-widget">
                            <h6>About {this.state.Name_of_Hotel}</h6>
                            <p>
                               {this.state.Hotel_Information}
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="single-footer-widget">
                            <h6>Navigation Links</h6>
                            <div class="row">
                                <div class="col">
                                    <ul>
                                    <li> <Link  to="/Home">Home</Link></li>
                      <li><Link  to="/Home">About</Link></li>
                 
                                    </ul>
                                </div>
                                <div class="col">
                                    <ul>
                                  
                      <li><Link  to="/Room_Details">Rooms</Link></li>
                				          					          		          
                      <li><Link  to="/Contact">Contact</Link></li>
                                    </ul>
                                </div>										
                            </div>							
                        </div>
                    </div>							
                  
                					
                </div>

                <div class="row footer-bottom d-flex justify-content-between align-items-center">
                    <p class="col-lg-8 col-sm-12 footer-text m-0">
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
</p>
                    <div class="col-lg-4 col-sm-12 footer-social">
                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-dribbble"></i></a>
                        <a href="#"><i class="fa fa-behance"></i></a>
                    </div>
                </div>
            </div>
        </footer>
  
    </body>
    )
  }
}