import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import axios from 'axios';
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
import GoogleMapReact from 'google-map-react';

import styled from 'styled-components';

import AutoComplete from './Autocomplete';
import Marker from './Marker';

import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import './style.css';

import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import TagsInput from "react-tagsinput";




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

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

  
export default class Additional_Info extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exercises: [], 
      title: "", 
      description: "",
       id: "", 
       hotel_url: "", 
       online: [], 
       Header_Text: "",
        Header_Subtext: "",
         Hotel_Information: "",
          Name_of_Hotel: "",
          map_address:"",
          email: "",
          mobile:"",
          tel_no:"",
          website:"",
          address:"",
          hotel_city: "",
          link: "",
          background_image: '',
          video_area_id: '',
          mapApiLoaded: false,
        mapInstance: null,
        mapApi: null,
        geoCoder: null,
        places: [],
        center: [],
        zoom: 12,
        address: '',
        draggable: true,
        lat: null,
        lng: null,
        projects:[],
        members: [],
        idvalidations:null,
        facilities: [],
        tagsLandmarks: [],
        tagsPolicies:[],

        };
        this.select = this.select.bind(this);

  }




  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  select= event => {

    this.setState({
		[event.target.name]: event.target.value
    })
  }

  componentDidMount() {
    this.setCurrentLocation();
  const hotel = {  val: localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'), }
	axios.post('http://localhost:5000/additional_info/View_Additional_Info/', hotel)
	.then(response => {
	  this.setState({ 
          id: response.data._id,
          Hotel_Information: response.data.hotel_info,
           Name_of_Hotel: response.data.hotel_name,
           map_address:response.data.map_address,
          email: response.data.email,
          mobile:response.data.mobile,
          tel_no:response.data.tel_no,
          website:response.data.website,
          address:response.data.address,
          hotel_city: response.data.hotel_city,
          lat: parseFloat(response.data.lat),
          lng: parseFloat(response.data.lng),
          idvalidations: response.data.idvalidations,
          tagsLandmarks: response.data.tagsLandmarks,
          tagsPolicies:response.data.tagsPolicies,
          facilities: response.data.tags,
          Header_Text:response.data.header_text,
          Header_Subtext: response.data.header_subtext ,
          })
	})
	.catch((error) => {
	  console.log(error);
	})
  axios.post('http://localhost:5000/video_area/View_Video_Area/', hotel)
	.then(response => {
	  this.setState({ 
      Header_Text: response.data.title,
      Header_Subtext: response.data.subtitles,
      link:  response.data.link,
      background_image: response.data.background_image,
      video_area_id: response.data._id,
    })
    
  // console.log('View_Video_Area ', response.data)
	})
	.catch((error) => {
	  console.log(error);
	})
    axios.post('http://localhost:5000/reservation/reserve/', hotel)
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



onChangeHeader_Text = event => {
    this.setState({ Header_Text: event.target.value });

};
onChangeHeader_Subtext = event => {
    this.setState({ Header_Subtext: event.target.value });

};
onChangelink = event => {
  this.setState({ link: event.target.value });

};
onChangeHotel_Information = event => {
    this.setState({ Hotel_Information: event.target.value });

};
onChangeName_of_Hotel = event => {
    this.setState({ Name_of_Hotel: event.target.value });
};
onChangemap_address = event => {
  this.setState({ map_address: event.target.value });
};
onChangewebsite = event => {
  this.setState({ website: event.target.value });
};
onChangetel_no = event => {
  this.setState({ tel_no: event.target.value });
};
onChangemobile = event => {
  this.setState({ mobile: event.target.value });
};
onChangeemail = event => {
  this.setState({ email: event.target.value });
};
onChangeaddress = event => {
  this.setState({ address: event.target.value });
};



handleImageUpload  = () =>{
    cogoToast.success('Please wait');
   // const {  title  } = this.state;
    const { files } = document.querySelector("#hotel_image")
    const formData = new FormData();
    formData.append('file', files[0]);        
    formData.append('upload_preset', 'bgzuxcoc');
    const options = {
      method: 'POST',
      body: formData,
    };
    console.log('files: ', files)
    console.log('files.lenght: ',  files[0])
    
 if(files[0] == undefined){
    const exercise = {
      facilities: this.state.facilities,
      tagsLandmarks: this.state.tagsLandmarks,
      tagsPolicies: this.state.tagsPolicies,
        hotel_name: this.state.Name_of_Hotel,
        hotel_info: this.state.Hotel_Information , 
        map_address:this.state.map_address,
        email: this.state.email,
        mobile:this.state.mobile,
        tel_no:this.state.tel_no,
        website:this.state.website,
        address:this.state.address,
        hotel_image: "",
        id: this.state.id
      }

      axios.post('http://localhost:5000/additional_info/update', exercise)
        .then(res =>{
         
          window.location.reload()
        })
    
 }else{
    return fetch('https://api.cloudinary.com/v1_1/kusinahanglan/image/upload', options)
    .then(res => res.json())
    .then(res => {
  
     const exercise = {
      facilities: this.state.facilities,
      tagsLandmarks: this.state.tagsLandmarks,
      tagsPolicies: this.state.tagsPolicies,
          hotel_name: this.state.Name_of_Hotel,
          hotel_info: this.state.Hotel_Information , 
          map_address:this.state.map_address,
        email: this.state.email,
        mobile:this.state.mobile,
        tel_no:this.state.tel_no,
        website:this.state.website,
        address:this.state.address,
          hotel_image: res.secure_url,
          id: this.state.id
        }

        axios.post('http://localhost:5000/additional_info/update', exercise)
          .then(res =>{
           
            window.location.reload()
          })
      }

    )
    .catch(err => console.log(err))


 }

   
    

  }


  handleImageUploadHeader  = () =>{
    cogoToast.success('Please wait');

    


        const exercise = {
          header_text:this.state.Header_Text,
          header_subtext:  this.state.Header_Subtext ,
            id: this.state.id
           }
   
           axios.post('http://localhost:5000/additional_info/updateTemplate9', exercise)
             .then(res =>
              window.location.reload()
             )
       


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




  onMarkerInteraction = (childKey, childProps, mouse) => {
    this.setState({
        draggable: false,
        lat: mouse.lat,
        lng: mouse.lng
    });
}
onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
    this.setState({ draggable: true });
    this._generateAddress();
}

_onChange = ({ center, zoom }) => {
    this.setState({
        center: center,
        zoom: zoom,
    });

}

_onClick = (value) => {
    this.setState({
        lat: value.lat,
        lng: value.lng
    });
}

apiHasLoaded = (map, maps) => {
    this.setState({
        mapApiLoaded: true,
        mapInstance: map,
        mapApi: maps,
    });

    this._generateAddress();
};

addPlace = (place) => {
    this.setState({
        places: [place],
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
    });
    this._generateAddress()
};

_generateAddress() {
    const {
        mapApi
    } = this.state;

    const geocoder = new mapApi.Geocoder;

    geocoder.geocode({ 'location': { lat: this.state.lat, lng: this.state.lng } }, (results, status) => {
        console.log(results);
        console.log(status);
        if (status === 'OK') {
            if (results[0]) {
                this.zoom = 14;
                this.setState({ address: results[0].formatted_address });
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }

    });
}

// Get Current Location Coordinates
setCurrentLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                center: [position.coords.latitude, position.coords.longitude],
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
    }
}



handleSaveLocation = () => {
  const exercise = { 
    
    lat: this.state.lat.toString(),
    lng: this.state.lng.toString(),
        id: 'project='+localStorage.getItem('hotel_id').slice(5)
      }
      confirmAlert({
        title: 'Confirm to Change ',
        message: 'Are you sure to change location?',
        buttons: [
          {
            label: 'Yes',
            onClick: () =>
            {
              cogoToast.success('Please wait');
              axios.post('http://localhost:5000/additional_info/update_coordinates', exercise)
              .then(res =>{
                console.log('res.data: ', res.data)
                if(res.data === 'updated!'){
                  cogoToast.success('Please wait updating by rooms');
                        axios.post('http://localhost:5000/room_type/update_coordinates', exercise)
                      .then(res =>{
                        if(res.data === 'updated!'){
                          window.location.reload()
                        }
                      })
                }
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

onChangedescription = event => {
    this.setState({ [event.target.name]: event.target.value });


};
onValidation = () => {
  
  confirmAlert({
    title: 'Change Validation? ',
    message: 'Are you sure to do this?',
    buttons: [
      {
        label: 'Yes',
        onClick: () =>
        {
          const exercise = {
   
            id: 'project='+localStorage.getItem('hotel_id').slice(5)
          }
        
          axios.post('http://localhost:5000/additional_info/idvalidations', exercise)
            .then(res =>{
             
              window.location.reload()
            })

        }

      },
      {
        label: 'No',
        onClick: () => console.log('no')
      }
    ]
  });
  

console.log('onvalidation')
};



  render() {
    const { selectedOption, places, mapApiLoaded, mapInstance, mapApi, tags, suggestions  } = this.state;

    console.log('tags: ', tags)
    console.log('suggestions: ', suggestions)
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
              <li class="treeview active">
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
            Header and Hotel Information
            </h1>
            <ol class="breadcrumb">
              <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
              <li class="active">Header and Hotel Information</li>
             
            </ol>
          </section>
      
          <section class="content">
            <div class="row">
            <div class = "col-md-3" >
  
            <h3> Header Information </h3>
				<div class="form-group">

            <label for="title">Main Text:</label> <br />
                                <TextField id="outlined-basic" style={{width: '100%'}} label="Header Text" variant="outlined" value={this.state.Header_Text} onChange={this.onChangeHeader_Text}/>
                                
            <br />
            <label for="title">Subtext:</label> <br />
                                <TextField id="outlined-basic" style={{width: '100%'}}  label="Header Subtext" variant="outlined" value={this.state.Header_Subtext}  onChange={this.onChangeHeader_Subtext}/>
                                
            <br /><br />
            <button type="submit" name="import" class="btn btn-primary btn-sm" onClick={this.handleImageUploadHeader}>&nbsp;&nbsp;Save Header Information&nbsp;&nbsp;</button>

				</div>
		
   
		</div>
		



              <div class="col-lg-9 col-md-9">
                <div class="box" >
                  <div class="box-body">
                  <h3>
          Hotel Information
            </h3>
                  <div class="col-lg-6 col-md-4">
                  <div className="main-wrapper-auto-map">
<Wrapper>
                {/*mapApiLoaded && (
                    <div>
                        <AutoComplete map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />
                    </div>
                )*/}
                <GoogleMapReact
                    center={this.state.center}
                    zoom={this.state.zoom}
                    draggable={this.state.draggable}
                    onChange={this._onChange}
                    onChildMouseDown={this.onMarkerInteraction}
                    onChildMouseUp={this.onMarkerInteractionMouseUp}
                    onChildMouseMove={this.onMarkerInteraction}
                    onChildClick={() => console.log('child click')}
                    onClick={this._onClick}
                    bootstrapURLKeys={{
                        key: 'AIzaSyAszvWsGAXB3FUjfn2WhhZwwhF26vLEkI4',
                        libraries: ['places', 'geometry'],
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
                >

                    <Marker
                        text={this.state.address}
                        lat={this.state.lat}
                        lng={this.state.lng}
                    />


                </GoogleMapReact>

               {/* <div className="info-wrapper-auto-map">
                    <div className="map-details-auto-map">Latitude: <span>{this.state.lat}</span>, Longitude: <span>{this.state.lng}</span></div>
                    <div className="map-details-auto-map">Address: <span>{this.state.address}</span></div>
                </div>*/}


            </Wrapper >
    </div> <br /> 

    
    
        
    <button type="submit" class="btn btn-primary btn-sm" onClick={this.handleSaveLocation}>&nbsp;&nbsp;Save Location&nbsp;&nbsp;</button>
    <br /> <br />
                  <label for="title">Hotel Image:</label> <br />
<input type="file" id="hotel_image"/>
                    
<br />
<label for="title">Name of Hotel:</label> <br />
                    <TextField id="outlined-basic" style={{width: '100%'}}  label="Name of Hotel" variant="outlined" value={this.state.Name_of_Hotel}  onChange={this.onChangeName_of_Hotel}/>
                    
<br />
<label for="title">Address of Hotel:</label> <br />
                    <TextField id="outlined-basic" style={{width: '100%'}}  label="Address of Hotel" variant="outlined" value={this.state.address}  onChange={this.onChangeaddress}/>
                    

<br />


<label for="title">Email of Hotel:</label> <br />
                    <TextField id="outlined-basic" style={{width: '100%'}}  label="Email of Hotel" variant="outlined" value={this.state.email}  onChange={this.onChangeemail}/>
                    
<br />
<label for="title">Mobile of Hotel:</label> <br />
                    <TextField id="outlined-basic" style={{width: '100%'}}  label="Mobile of Hotel" variant="outlined" value={this.state.mobile}  onChange={this.onChangemobile}/>
<br />



                  </div>
                  <div class="col-lg-6 col-md-4">
                  <label for="title">Telephone of Hotel:</label> <br />
                    <TextField id="outlined-basic" style={{width: '100%'}}  label="Telephone of Hotel" variant="outlined" value={this.state.tel_no}  onChange={this.onChangetel_no}/>
                    
<br />
                  <label for="title">Website of Hotel:</label> <br />
                    <TextField id="outlined-basic" style={{width: '100%'}}  label="Website of Hotel" variant="outlined" value={this.state.website}  onChange={this.onChangewebsite}/>
                    
<br />

          <label for="file">Hotel Information:</label><br />
          <TextField
          id="outlined-multiline-static"
          label="Hotel Information"
          multiline
          rows={4}
          style={{width: '100%'}} 
          value={this.state.Hotel_Information} 
          onChange={this.onChangeHotel_Information}
          variant="outlined"
        />
        
<br /> 


<label for="file">I.D Validation for Reservation:</label><br />
          <FormControlLabel
        control={<IOSSwitch checked={this.state.idvalidations === 'active'?true:false} onChange={this.onChangedescription} name="checkedB" />}
        label="I.D Validation for Reservation"
        onClick={() => this.onValidation()}
      />
<br /> 
<label for="title">Hotel Fees & Policies:</label> <br />
                  <Formik
        initialValues={this.state}
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
          <Form onSubmit={handleSubmit} noValidate name="simpleForm">
            <TagsInput
              name="tagsPolicies"
              value={this.state.tagsPolicies}
              onChange={tagsPolicies => {
                console.log(tagsPolicies);
                setFieldValue("tags", tagsPolicies);
                this.setState({ tagsPolicies});
              }}
            />
          </Form>
        )}
      /><br />
                  <label for="title">Hotel Landmarks:</label> <br />
                  <Formik
        initialValues={this.state}
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
          <Form onSubmit={handleSubmit} noValidate name="simpleForm">
            <TagsInput
              name="tagsLandmarks"
              value={this.state.tagsLandmarks}
              onChange={tagsLandmarks => {
                console.log(tagsLandmarks);
                setFieldValue("tags", tagsLandmarks);
                this.setState({ tagsLandmarks});
              }}
            />
          </Form>
        )}
      /><br />
<label for="title">Hotel Facilities:</label> <br />
<Formik
        initialValues={this.state}
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
          <Form onSubmit={handleSubmit} noValidate name="simpleForm">
            <TagsInput
              name="tagsLandmarks"
              placeholder="sampl"
              value={this.state.facilities}
              onChange={facilities => {
                console.log(facilities);
                setFieldValue("tags", facilities);
                this.setState({ facilities});
              }}
            />
          </Form>
        )}
      /><br /><br />
<button type="submit" name="import" class="btn btn-primary btn-sm" onClick={this.handleImageUpload}>&nbsp;&nbsp;Save Hotel Information&nbsp;&nbsp;</button>
			
                  </div>
                  <div class="col-md-7">
              
                  </div>
               
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