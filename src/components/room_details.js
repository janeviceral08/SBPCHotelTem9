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

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";




import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
const currencyFormat = (num) => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }
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

export default class Room_Details extends Component {
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
    };
  }

  componentDidMount() {
    const hotel = {  val: "project=6127126cae94bc64a5e4b23a", }
    axios.post('http://localhost:5000/room_type/', hotel)
	.then(response => {
	  this.setState({ exercises: response.data })
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

    
  }

  

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
  onLogin = event => {
    const { username, password } = this.state;
  
    const exercise = {
        username,
      password
      }
    axios.post('http://localhost:5000/admin/logins', exercise)
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
        <section class="about-banner relative">
            <div class="overlay overlay-bg"></div>
            <div class="container">				
                <div class="row d-flex align-items-center justify-content-center">
                    <div class="about-content col-lg-12">
                        <h1 class="text-white">
                           Our Rooms			
                        </h1>	
                        <p class="text-white link-nav"><a href="index.html">Home </a>  <span class="lnr lnr-arrow-right"></span>  <a href="packages.html"> Our Rooms</a></p>
                    </div>	
                </div>
            </div>
        </section>
        <section class="destinations-area section-gap">
            <div class="container">
                <div class="row d-flex justify-content-center">
                    <div class="menu-content pb-40 col-lg-8">
                        <div class="title text-center">
                            <h1 class="mb-10">Our Available Rooms</h1>
                            <p>{this.state.header_subtext}</p>
                        </div>
                    </div>
                </div>						
                <div class="row">
                    {this.state.exercises.map((info, index) => 
                     <div class="col-lg-4" key={index}>
                     <div class="single-destinations">
                         <div class="thumb">
                           
                        
                          
                          <ImageGallery items={info.img.map(({original, thumbnail}) => ({original, thumbnail }))}  defaultImage="http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg" 
                                    infinite={true}
                                    showBullets={true}
                                    showFullscreenButton={true}
                                    showPlayButton={true}
                                    showThumbnails={true}
                                    showIndex={true}
                                    showNav={true}
                                    thumbnailPosition={'right'}
                                    slideDuration={450}
                                    slideInterval={2000}
                                    slideOnThumbnailOver={true}
                                    additionalClass="app-image-gallery"
                                    useWindowKeyDown={true}/>
                         </div>
                         <div class="details">
                             <h4>{info.name}</h4>
                          
                             <ul class="package-list">
  
                                 <li class="d-flex justify-content-between align-items-center">
                                     <span>Duration</span>
                                     <span>{info.rate_mode == "Daily"? 'Per Night': info.rate_mode == "Promo" && info.duration_mode == 'Daily'?info.promo_duration+" Nights":info.rate_mode == "Promo" && info.duration_mode == 'Hour'?info.hour_duration+" Hours": info.hour_duration+" Hours"}</span>
                                 </li>
                               
                                 <li class="d-flex justify-content-between align-items-center">
                                     <span>Max Person</span>
                                     <span>{info.max_person}</span>
                                 </li>
                                 <li class="d-flex justify-content-between align-items-center">
                                     <span>Amenities</span>
                                     <span style={{width: '60%'}}>{info.specialAmeneties != undefined && info.specialAmeneties.length > 0? info.specialAmeneties.map((info, index)=>
                                           <span>{info}, </span>
                                          ): null}</span>
                                 </li>
                                 <li class="d-flex justify-content-between align-items-center">
                                     <span>Price </span>
                                     <a href="#" class="price-btn">₱ {info.rate_mode == "Daily"? currencyFormat(parseFloat(info.roomprice)): info.rate_mode == "Promo" && info.duration_mode == 'Daily'?currencyFormat(parseFloat(info.roomprice)):info.rate_mode == "Promo" && info.duration_mode == 'Hour'?currencyFormat(parseFloat(info.roomprice)):currencyFormat(parseFloat(info.roomprice_hour))}</a>
                                 </li>													
                             </ul>
                         </div>
                     </div>
                 </div>
                    
                    )}
                  																												
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