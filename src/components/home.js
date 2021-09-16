import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ScriptTag from 'react-script-tag';
import {Helmet} from "react-helmet";
import Navbar from "./navbar.component"

import moment from "moment";
import cogoToast from 'cogo-toast';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import firebase from './firebase'
import "firebase/messaging";

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

export default class Home extends Component {
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
         open: false,
      notif_tokens: '',

    };
  }

  componentDidMount() {
    const messaging = firebase.messaging()
    messaging.requestPermission().then(()=>{
      return messaging.getToken()
    }).then(token=>{
      this.setState({notif_tokens:token})
    }).catch((err)=>{
      console.log(err);
      
    })
    const hotel = {  val: "project=6127126cae94bc64a5e4b23a", }
    axios.post('http://localhost:5000/room_type/', hotel)
	.then(response => {
	  this.setState({ exercises: response.data })
	})
	.catch((error) => {
	  console.log(error);
	})
      axios.post('http://localhost:5000/about_hotel/View_About_hotel/', hotel)
      .then(response => {
        this.setState({ about_hotel: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

      axios.post('http://localhost:5000/hotel_offer/View_Hotel_Offer/', hotel)
      .then(response => {
        this.setState({ hotel_offer: response.data })
      })
      .catch((error) => {
        console.log(error);
      })



      axios.post('http://localhost:5000/additional_info/View_Additional_Info/', hotel)
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
            })
      }) 
      .catch((error) => {
        console.log(error);
      })

      axios.post('http://localhost:5000/carousel_header/View_Carousel_header/', hotel)
      .then(response => {
        this.setState({ carousel_header: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

      
    axios.post('http://localhost:5000/video_area/View_Video_Area/', hotel)
      .then(response => {
        this.setState({ 
            title: response.data.title,
            subtitles: response.data.subtitles,
        link:  response.data.link,
        background_image: response.data.background_image,
        
      })
    
    // console.log('View_Video_Area ', response.data)
      })
      .catch((error) => {
        console.log(error);
      })


      axios.post('http://localhost:5000/feedback/View_Feedback/', hotel)
      .then(response => {
        this.setState({ feedback: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

  }

  
  select= event => {

    this.setState({
		[event.target.name]: event.target.value
    })
  }

  onSubmit = event => {
    const { room, check_in, check_out, guest } = this.state;
	const found = this.state.exercises.find(element => element.temp_id === room);
if( guest === "" && check_out=== "" && check_in=== "" && room=== ""){
  cogoToast.error("Please Complete the fields");
return;
}
   else{
    return 'http://localhost:3000/Website_reserve?check_in='+check_in+'&&check_out='+check_out+'&&guest='+guest+'&&room='+room+'&&hotel='+"project=6127126cae94bc64a5e4b23a";
  
  }
};


onLogin = event => {
  const { username, password, notif_tokens } = this.state;

  const exercise = {
      username,
    password,
    notif_tokens
    }
  axios.post('http://localhost:5000/admin/logins', exercise)
  .then(response =>
{        localStorage.setItem('hotel_id', response.data._partition)
localStorage.setItem('getInfoID', 'project='+response.data._partition.slice(5))
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


  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
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

  render() {
    var myloop = [];
	for (let i = 1; i < 10; i++) {
		myloop.push(
		
		  <option value={i} key={i}>{i}</option>
		);
	  }
    const { room, check_in, check_out, guest } = this.state;

    const book = 'http://localhost:3000/Website_reserve?check_in='+check_in+'&&check_out='+check_out+'&&guest='+guest+'&&room='+room+'&&hotel='+"project=6127126cae94bc64a5e4b23a";
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
        <section class="banner-area relative" >
            <div class="overlay overlay-bg"></div>				
            <div class="container">
                <div class="row fullscreen align-items-center justify-content-between">
                    <div class="col-lg-6 col-md-6 banner-left">
                        <h1 class="text-white">{this.state.header_text}</h1>
                        <p class="text-white">
                          {this.state.header_subtext}
                        </p>
                        <a href="#" class="primary-btn text-uppercase">Get Started</a>
                    </div>
                    <div class="col-lg-4 col-md-6 banner-right" style={{marginTop: '100px'}}>
                     
                        <div class="tab-content" id="myTabContent">
                        
                          <div class="tab-pane fade show active" id="hotel" role="tabpanel" aria-labelledby="hotel-tab">
                            <form class="form-wrap" onSubmit={this.onSubmit}>
                            <label for="#">Room</label>
                            <select name="room" id="" className="form-control"  onChange={this.select} style={{height: '40px'}}>
									  {this.state.exercises.map((currentexercise) => 
										  <option value={currentexercise.temp_id}>{currentexercise.room_type}</option>
									  )

									  }
			                      	
			                      </select>
  								<label for="#">Check In</label>
                                  <input type="date" className="form-control checkin_date" placeholder="Check In" name="check_in" onChange={this.select}/>
                                  <label for="#">Check Out</label>
                                  <input type="date" className="form-control checkout_date" placeholder="From" name="check_out" onChange={this.select}/>
                                  <label for="#">Guest</label>
                                  <select name="guest" className="form-control" onChange={this.select} style={{height: '40px'}}>
								  {myloop}
			                      </select>
                            <a class="primary-btn text-uppercase" href={book}> Book A Reservation</a>   								
                            </form>							  	
                          </div>
                         
                        </div>
                    </div>
                </div>
            </div>					
        </section>
        <section class="popular-destination-area section-gap">
            <div class="container">
                <div class="row d-flex justify-content-center">
                    <div class="menu-content pb-70 col-lg-8">
                        <div class="title text-center">
                            <h1 class="mb-10">Popular Destinations</h1>
                            <p>We all live in an age that belongs to the young at heart. Life that is becoming extremely fast, day.</p>
                        </div>
                    </div>
                </div>						
                <div class="row">

                {this.state.carousel_header.map((info, index) =>
                 <div class="col-lg-4" key={index} style={{marginBottom: 20}}>
                 <div class="single-destination relative">
                     <div class="thumb relative">
                         <div class="overlay overlay-bg"></div>
                         <img class="img-fluid" src={info.background_image} alt={info.title} width="350" height="205"/>
                     </div>
                     <div class="desc">	
                         <a href="#" class="price-btn">Book Now</a>			
                         <h4>{info.title}</h4>
                         <p>{info.title}</p>			
                     </div>
                 </div>
             </div>
                )}

                   
                  								
                </div>
            </div>	
        </section>
        
      
        <section class="other-issue-area section-gap">
            <div class="container">
                <div class="row d-flex justify-content-center">
                    <div class="menu-content pb-70 col-lg-9">
                        <div class="title text-center">
                            <h1 class="mb-10">Suggested Recreational Activity Available</h1>
                            <p>We all live in an age that belongs to the young at heart. Life that is.</p>
                        </div>
                    </div>
                </div>					
                <div class="row">
                    {this.state.hotel_offer.map((info, index) =>
                     <div class="col-lg-3 col-md-6" key={index}>
                     <div class="single-other-issue">
                         <div class="thumb">
                             <img class="img-fluid" src={info.image} alt=""/>					
                         </div>
                         <a href="#">
                             <h4>{info.title}</h4>
                         </a>
                         
                         {info.description.map((item,index) => 
    <p key={index}>{item}</p>
)}
                       
                     </div>
                 </div>
                    )

                    }
                   
                  
                  
                   															
                </div>
            </div>	
        </section>
        <section class="testimonial-area section-gap">
            <div class="container">
                <div class="row d-flex justify-content-center">
                    <div class="menu-content pb-70 col-lg-8">
                        <div class="title text-center">
                            <h1 class="mb-10">Testimonial from our Guests</h1>
                            <p>Some Description HERE</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="active-testimonial">
                  
                        
                
                        {this.state.feedback.map((info, index) =>
                    <div class="single-testimonial item d-flex flex-row" key={index}>
                    <div class="thumb">
                        <img class="img-fluid" src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" alt="" width="80px" height="80px"/>
                    </div>
                    <div class="desc" style={{width: '90%'}}>
                        <p>
                          {info.feedback}
                        </p>
                        <h4>{info.name}</h4>
                        {info.rate === 1?
                         <div class="star">
                         <span class="fa fa-star checked"></span>
                         <span class="fa fa-star"></span>
                         <span class="fa fa-star"></span>
                         <span class="fa fa-star"></span>
                         <span class="fa fa-star"></span>			
                     </div>	:info.rate === 2?
                         <div class="star">
                         <span class="fa fa-star checked"></span>
                         <span class="fa fa-star checked"></span>
                         <span class="fa fa-star"></span>
                         <span class="fa fa-star"></span>
                         <span class="fa fa-star"></span></div>
                         :info.rate === 3?
                         <div class="star">
                         <span class="fa fa-star checked"></span>
                         <span class="fa fa-star checked"></span>
                         <span class="fa fa-star checked"></span>
                         <span class="fa fa-star"></span>
                         <span class="fa fa-star"></span></div>
                         :info.rate === 4?
                         <div class="star">
                         <span class="fa fa-star checked"></span>
                         <span class="fa fa-star checked"></span>
                         <span class="fa fa-star checked"></span>
                         <span class="fa fa-star checked"></span>
                         <span class="fa fa-star"></span></div>:
                      <div class="star">
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>			
                  </div>	
                        
                    
                    }
                          
                    </div>
                </div>
                    )}	                    		                    
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