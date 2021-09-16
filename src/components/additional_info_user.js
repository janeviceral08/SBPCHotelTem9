import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ScriptTag from 'react-script-tag';
import {Helmet} from "react-helmet";
import Navbar from "./navbar.component"

import cogoToast from 'cogo-toast';
import ReactDOM from "react-dom"
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import GooglePayButton from '@google-pay/button-react';
import firebase from './firebase'



const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

const ERROR_CODE_ACCOUNT_EXISTS =
	'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
	An account with an E-Mail address to
	this social account already exists. Try to login from
	this account instead and associate your social accounts on
	your personal account page.
`;

const search = window.location.search;
const params = new URLSearchParams(search);
const foo = params.get('rate_mode');
const room = params.get('room');
const in_checks = params.get('in_check');
const out_checks = params.get('out_check');
const guest = params.get('guest');
const code = params.get('code');
const vexp = params.get('vexp');
const vmode = params.get('vmode');
const users = params.get('user');

export default class Additional_info_user extends Component {
    constructor(props) {
		super(props);
		this.state = { Loading: false,exercises: [], date_diff: '',  map: "",
    img:"",
    tagsLandmarks: [],
    tagsPolicies: [],
    tags: [], 
  reservation_code:'',
  in_check:'',
  out_check:'',
  guest:'',
  user:'',

  name: '',
  email: '',
  phone_no: '',
  address: '',
  nationality: '',
  mode: '',
error: null,
  hotel_info: "",
  userlocal: "",
  vamount: 0,
label: 'Apply Voucher',
hour_duration: '',
   duration_mode: '',
   rate_mode: '',
  
   name: '',
   email: '',
   phone_no: '',
   address: '',
   nationality: '',
   mode: '',
 error: null,
   date_diff:'',
   hotel_info: "",
  
   code: "empty",
   vamount: 0,
   vexp: 0,
   vmode: 'empty',
 label: 'Apply Voucher',
    res_count:0,
    max_res:0,
    Get_All_Tokens:[],
    admin_Token: [],
  };
	}

  componentDidMount() {
    this.setState({userlocal: users,  reservation_code:moment().unix(),
    in_check:this.props.match.params.check_in,
    out_check:this.props.match.params.check_out,
    guest:this.props.match.params.guest,
  
  })
const hotel = {  val: "project=6127126cae94bc64a5e4b23a", }
    console.log('hotel: ', hotel)

axios.post('http://localhost:5000/room_type/', hotel)
.then(response => {
    let room = this.props.match.params.room
    
    let res = response.data.find(element => element.temp_id === room)
  this.setState({ exercises:  res})

})
.catch((error) => {
  console.log(error);
})



let in_check = moment(this.props.match.params.check_in).unix()
let out_check = moment(this.props.match.params.check_out).unix()

let in_check_diff =  moment(in_check* 1000).format('MMMM D, YYYY')
            let out_check_diff = moment(out_check* 1000).format('MMMM D, YYYY')
            let sub = new Date(out_check_diff)- new Date(in_check_diff);
            console.log('sub: ', sub)
            this.setState({date_diff: sub})


            axios.post('http://localhost:5000/additional_info/View_Additional_Info/', hotel)
            .then(response => {
             
                  this.setState({ 
                    
                      hotel_info: response.data.hotel_info,
                  map: response.data.map_address,
                  img: response.data.hotel_image,
                  tagsLandmarks:response.data.tagsLandmarks,
                  tagsPolicies: response.data.tagsPolicies,
                  tags: response.data.tags,
                    })
            })
            .catch((error) => {
              console.log(error);
            })
            const user = {    val: users }


            console.log('user: ', user)
          axios.post('http://localhost:5000/guest_account/info_guest_account', user)
        .then(res => {
        console.log('response user: ', res.data)
        
        this.setState({     
        name: res.data.first_name+ ' '+ res.data.middle_name+ ' ' + res.data.last_name+ ' '+ res.data.suffix, 
        email: res.data.email,
        phone_no: res.data.phone_no,
        address: res.data.address,
        nationality: res.data.nationality,
      })
        })
        .catch((error) => {
        console.log(error);
        })






        const hotels = {  code: this.state.code, date_value: moment().unix(), val: "project=60d06709d66313f172f6c3ec", }
        axios.post('http://localhost:5000/voucher/check_voucher_user/', hotels)
        .then(response =>{
          this.setState({label: 'Apply Voucher'})
      
          if(response.data.length > 0)
          {
                if(Math.floor(this.state.date_diff/(1000*60 * 60 * 24)) >= response.data[0].min_stay){
                      
                this.setState({vmode: response.data[0].mode,vexp:response.data[0].expiration_date, vamount: response.data[0].vouchvalue})
                }
                
                else{
                  return;
                }
        }
        else{ return;
        }
        }
        )
  }

  back (){
    this.props.history.push("/Home")
  }

  printform() {
    window.print()
  }

  currencyFormat = (num) => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
// Makes the back button work
 createOrder = (data, actions) =>{
  return actions.order.create({
    purchase_units: [
      {
        amount: {
          "currency": "USD",
          value: "0.01",
        },
      },
    ],
    "id": moment().unix(),
  }).then(function(res) {
   console.log('res: ', res)
   console.log('res: ', res.id)
  }).then(function(data) {
    console.log('data: ', data.id)// Use the key sent by your server's response, ex. 'id' or 'token'
  });
};

 onApprove = (data, actions) => {
  return actions.order.capture().then(function(res) {
    console.log('resonApprove: ', res)
   }).then(function(data) { 
     console.log('dataonApprove: ', data)// Use the key sent by your server's response, ex. 'id' or 'token'
   });
};

onChange = event => {
  this.setState({ [event.target.name]: event.target.value });
};

onSubmitVoucher = () => {
  this.setState({label: 'Please Wait'})
  const hotel = {  code: this.state.code, date_value: moment().unix(),val: "project=6127126cae94bc64a5e4b23a", }
  axios.post('http://localhost:5000/voucher/check_voucher_user/', hotel)
  .then(response =>{
    this.setState({label: 'Apply Voucher'})

    if(response.data.length > 0)
    {
          if(Math.floor(this.state.date_diff/(1000*60 * 60 * 24)) >= response.data[0].min_stay){
                
          this.setState({vmode: response.data[0].mode,vexp:response.data[0].expiration_date, vamount: response.data[0].vouchvalue})
          }
          
          else{
            cogoToast.error(
              <div style={{marginTop: '30%'}}>
          <b>Sorry</b>
          <div>Number of minimum stay does not meet</div>
          </div>, { position: 'top-center'}
            );
            return;
          }
  }
  else{
    this.setState({code: 'empty'})
    cogoToast.error(
      <div style={{marginTop: '30%'}}>
  <b>Sorry</b>
  <div>Voucher Does not Exist</div>
  </div>, { position: 'top-center'}
    );
    return;
  }
  }
  )
};










onSubmit = (children) => {
   
  const { name, email,phone_no,address,nationality,mode, code,vexp,hour_duration,
    duration_mode,
    rate_mode, } = this.state;
 const reservation_code = Math.floor(Math.random() * 9999)+moment().unix();
 const tokens = children;
 const room_type = this.state.exercises.room_type;
 const check_in = this.props.match.params.check_in;
 const check_out = this.props.match.params.check_out;
 const room = this.props.match.params.room;
 const guest =this.props.match.params.guest;
 const hotel =this.props.match.params.hotel;
 const vmode =this.state.vmode;
 const vamount =this.state.vamount;
 const room_name =this.state.exercises.room_type;

  const exercise = {
    hour_duration,
    duration_mode,
    rate_mode: this.state.exercises.rate_mode,
      name, 
      email,
      phone_no,
      address,
      nationality,
      mode, 
      reservation_code,
      room_name,
      guest_id: localStorage.getItem('user_id'),
      in_check: moment(this.props.match.params.check_in).unix(),
      out_check: moment(this.props.match.params.check_out).unix(),
      room: this.props.match.params.room,
      guest: this.props.match.params.guest,
      createdAt: moment().unix(),
      _partition: "project=6127126cae94bc64a5e4b23a",
      code,
      date_value:vexp,
      price:this.state.exercises.rate_mode == "Daily"? parseFloat(this.state.exercises.roomprice)/**/: this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?parseFloat(this.state.exercises.roomprice)/**/:this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?parseFloat(this.state.exercises.roomprice)/**/: parseFloat(this.state.exercises.roomprice_hour),

    }
    console.log('exercise:' ,exercise)

const push_here = this.props.history;

   // console.log('nationality', nationality)
   if(parseFloat(this.props.match.params.guest) > parseFloat(this.state.exercises.max_person)){
    cogoToast.error('Sorry Maximum number of Guest is '+ this.state.exercises.max_person);
  } else{

    if (!name.trim()) {
      cogoToast.error(
        <div style={{marginTop: '25%'}}>
    <b>Please Enter Name</b>
    <div>Upadate Your Profile</div>
    </div>, { position: 'top-center'}
        );
      return;
    }
    if (!email.trim()) {
      cogoToast.error(
        <div style={{marginTop: '25%'}}>
    <b>Please Enter Email</b>
    <div>Upadate Your Profile</div>
    </div>, { position: 'top-center'}
      );
      return;
    }
 
    //Check for the Email TextInput
    if (!phone_no.trim()) {
      cogoToast.error(
        <div style={{marginTop: '25%'}}>
    <b>Please Enter Phone Number</b>
    <div>Upadate Your Profile</div>
    </div>, { position: 'top-center'}
      );
      return;
    }
    if (!address.trim()) {
      cogoToast.error(
        <div style={{marginTop: '25%'}}>
    <b>Please Enter Address</b>
    <div>Upadate Your Profile</div>
    </div>, { position: 'top-center'}
      );
      return;
    }
 
    if (!nationality.trim()) {
      cogoToast.error(
        <div style={{marginTop: '25%'}}>
    <b>Please Enter Nationality</b>
    <div>Upadate Your Profile</div>
    </div>, { position: 'top-center'}
     );
      return;
    }
    if (!mode.trim()) {
      cogoToast.error(
        <div style={{marginTop: '25%'}}>
    <b>Please Enter Mode of Payment</b>
    <div>Upadate Your Profile</div>
    </div>, { position: 'top-center'}
      );
      return;
    }
    confirmAlert({
      title: 'Confirm to submit',
      message: 'By Proceeding You Agree That You Already Read The Fees & Policy of the Stablishment.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {    cogoToast.success(
            <div style={{marginTop: '25%'}}>
        <b>Processing...</b>
        <div>Please Wait a Moment</div>
        </div>, { position: 'top-center'}
          );
          const code = this.state.code==""?'empty':this.state.code;

          var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
          var number = this.state.phone_no;
          firebase.auth().signInWithPhoneNumber(number, recaptcha).then( function(e) {
            var code_OTP = prompt('Enter the otp', '');
      
              console.log('code_OTP: ', code_OTP)
              if(code_OTP === null) return;
      
              
              e.confirm(code_OTP).then(function (result) {
                  console.log('redirect ',result.user);

                  axios.post('http://localhost:5000/reservation/book_reservation', exercise)
              .then(res =>{
                  console.log('datas', res.data)
                  if(res.data == 'Exercise added!'){
              
                    const notif_info={
                      tokens: tokens,
                      room: room_type,
                    }

                    axios.post('http://localhost:5000/notifications/sendToAll', notif_info)
                    .then(res =>{
                        console.log('datas', res.data)
                        if(res.data == 'sucess'){
                          console.log('DONE!')
                          push_here.push('/Print_info/'+name+'/'+email+'/'+phone_no+'/'+address+'/'+nationality+'/'+mode+'/'+reservation_code+'/'+check_in+'/'+check_out+'/'+room+'/'+guest+'/'+hotel+'/'+code+'/'+vmode+'/'+vamount)
                        }
                        else{
                            cogoToast.error('Please Try Again');
                        }
                        
                    });


                   
                  }
                  else{
                      cogoToast.error('Please Try Again');
                  }
                  
              })
                  
              }).catch(function (error) {
                cogoToast.error(
                  <div style={{marginTop: '35%'}}>
              <b>Sorry!</b>
              <div>Invalid OTP</div>
              </div>, { position: 'top-center'}
                  );
                  
              });
      
          })
          .catch(function (error) {
              console.error( error);
      
          });


          }
        },
        {
          label: 'No',
          onClick: () => console.log('No')
        }
      ]
    });
  }
   
 
};



  render() {
    console.log('this.state.mode: ', this.state.mode)
const amount = this.state.exercises.rate_mode == "Daily"? Math.floor(this.state.date_diff/(1000*60 * 60 * 24))*parseFloat(this.state.exercises.roomprice)/**/: this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?parseFloat(this.state.exercises.roomprice)/**/:this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?parseFloat(this.state.exercises.roomprice)/**/: parseFloat(this.state.exercises.roomprice_hour)
    return (
    
<body>
<div class="tm-main-content" id="top">
            <div>
                <div class="tm-section tm-section-pad tm-bg-img" id="tm-section-5">                                                        
                    <div class="container ie-h-align-center-fix">
                        <div class="row tm-flex-align-center">
                          
                        <div className="container" style={{ padding: '3%'}}>
    <div className="row">
        <div className="col-md-3 register_user-left" style={{'text-align': 'center', color: '#fff'}}>
        
            {this.state.tagsPolicies.length > 0?  <p style={{fontSize: '20px', color: 'black', fontWeight: 'bold'}}>Fees & policies</p>:null }
                                  <div class="grid-room-infos-room-in">
                                          {this.state.tagsPolicies.map((info, index)=>
                                            <div class="form-group tm-form-element tm-form-element-50" key={index} style={{'text-align': 'left'}}>
                                                    <i class="fa fa-circle" style={{color: '#e87b1c',position: 'absolute', top: '3px', fontSize: '15px'}}> </i>
                                                    <span style={{marginLeft: '20px', fontSize: '15px', color: 'black'}}>{info}</span>
                                            </div>
                                            )}
                                    </div>

                                    {this.state.tags.length > 0?  <p style={{fontSize: '20px', color: 'black', fontWeight: 'bold'}}>Anemeties</p>:null }
                        <div class="grid-room-infos-room-in">
                            {this.state.tags.map((info, index)=>
                                <div class="form-group tm-form-element tm-form-element-50" key={index} style={{'text-align': 'left'}}>
                                      <i class="fa fa-check-square-o" style={{color: '#e87b1c',position: 'absolute', top: '3px', fontSize: '15px'}}> </i>
                                      <span style={{marginLeft: '20px', fontSize: '15px', color: 'black'}}>{info.text}</span>
                                </div>
                            )}
                        </div>
        </div>
        <div className="col-md-9" style={{'border-top-left-radius': `10% 50%`,  'border-bottom-left-radius' : `10% 50%`}}>
          
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <h3 style={{  'text-align': `center`, 'margin-top': '5%',' margin-bottom': `-15%`, color: '#495057'}}>Reservation Information</h3>
                    <div className="row" style={{padding: '10%',  marginTop: '0%', paddingTop: '2%'}}>
                        <div className="col-md-6">
                        <div class="form-group"><p>Reservation Code:</p>
                              <input type="text" class="form-control rounded-left" placeholder="Room Type" value={this.state.reservation_code}
						disabled/>
                          </div>
                            <div className="form-group">
                            <p>Room Type:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Full Name" value={this.state.exercises.room_type}
						disabled/>  </div>
                            <div className="form-group">
                            <p>Room Price:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Email" value={this.state.exercises.rate_mode == "Daily"?this.state.exercises.roomprice+ '/night': this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?this.state.exercises.roomprice+"("+this.state.exercises.promo_duration+"nights)"/**/ :this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?this.state.exercises.roomprice+"/"+this.state.exercises.hour_duration+"hours":this.state.exercises.roomprice_hour+ "/"+this.state.exercises.hour_duration+"hours" }
		 disabled/>
                          </div>
                          <div className="form-group">
                            <p>Stay:</p>
                            <input type="text" class="form-control rounded-left"  value={Math.floor(this.state.date_diff/(1000*60 * 60 * 24))+'Night(s)'}
			 disabled/>
                            </div>
                            <div className="form-group">
                            <p>Guest:</p>
                            <input type="text" class="form-control rounded-left" value={this.state.guest}
				 disabled/>
                            </div>
                            <div className="form-group">
                            <p>Check In:</p>
                            <input type="text" class="form-control rounded-left" value={moment(this.state.in_check).format('MMMM D, YYYY hh:mm a')}
					 disabled/>
                            </div>
                            <div className="form-group">
                            <p>Check Out:</p>
                            <input type="text" class="form-control rounded-left"  value={this.state.exercises.rate_mode == "Daily"?moment(this.state.out_check).format('MMMM D, YYYY hh:mm a'): this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?moment(this.state.in_check).add(this.state.exercises.promo_duration, 'days').format('MMMM D, YYYY hh:mm a')/**/ :this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?moment(this.state.in_check).add(this.state.exercises.hour_duration, 'hours').format('MMMM D, YYYY hh:mm a'):moment(this.state.in_check).add(this.state.exercises.hour_duration, 'hours').format('MMMM D, YYYY hh:mm a')}
					 disabled/>
                            </div>
                            {this.state.vmode ==='empty'?null:
                            <div className="form-group">
                            <p>Voucher:</p>
                            <input type="text" class="form-control rounded-left"  value={this.state.code}
			disabled/>
                            </div>}
                            
                            <div className="form-group">
                            <p>{this.state.vmode ==='empty'?'Total':'Subtotal'}:</p>
                            <input type="text" class="form-control rounded-left" value={this.currencyFormat(amount)}
					disabled/>

{this.state.vmode ==='empty'?null:
            this.state.vmode === 'Percentage'?
            <div>
                      <p>Voucher Value:</p>
            <input type="text" class="form-control rounded-left" value={this.state.vamount+'% = '+ amount/this.state.vamount}
					 />
             <p>Total:</p>
               <input type="text" class="form-control rounded-left" value={amount-(amount/this.state.vamount)}
						/> </div>
            :
            <div>
               <p>Voucher Value:</p>
            <input type="text" class="form-control rounded-left" value={this.currencyFormat(parseFloat(this.state.vamount))}
						 />
             <p>Total:</p>
            <input type="text" class="form-control rounded-left" value={this.currencyFormat(amount-parseFloat(this.state.vamount).toFixed(2))}
						/>
             </div>
          
          }
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                            <p>Full Name:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Full Name" name="name" value={this.state.name}
						onChange={this.onChange} />
                               
                            </div>
                            <div className="form-group">
                            <p>Email:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Email" name="email" value={this.state.email}
						onChange={this.onChange} />
                          </div>
                            <div className="form-group">
                            <p>Phone Number:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Phone Number" name="phone_no" value={this.state.phone_no}
						onChange={this.onChange} />
                          </div>
                            <div className="form-group">
                            <p>Address:</p>
                            <textarea type="text" class="form-control rounded-left" placeholder="Address" name="address" value={this.state.address}
						onChange={this.onChange}/>
                        </div>
                            <div className="form-group">
                            <p>Nationality:</p>
                            <select name="nationality"  className="form-control" onChange={this.onChange}>
                        <option value="">-- Select Nationality --</option>
                        <option value="Afghan">Afghan</option>
                        <option value="Albanian">Albanian</option>
                        <option value="Algerian">Algerian</option>
                        <option value="American">American</option>
                        <option value="Andorran">Andorran</option>
                        <option value="Angolan">Angolan</option>
                        <option value="Antiguans">Antiguans</option>
                        <option value="Argentinean">Argentinean</option>
                        <option value="Armenian">Armenian</option>
                        <option value="Australian">Australian</option>
                        <option value="Austrian">Austrian</option>
                        <option value="Azerbaijani">Azerbaijani</option>
                        <option value="Bahamian">Bahamian</option>
                        <option value="Bahraini">Bahraini</option>
                        <option value="Bangladeshi">Bangladeshi</option>
                        <option value="Barbadian">Barbadian</option>
                        <option value="Barbudans">Barbudans</option>
                        <option value="Batswana">Batswana</option>
                        <option value="Belarusian">Belarusian</option>
                        <option value="Belgian">Belgian</option>
                        <option value="Belizean">Belizean</option>
                        <option value="Beninese">Beninese</option>
                        <option value="Bhutanese">Bhutanese</option>
                        <option value="Bolivian">Bolivian</option>
                        <option value="Bosnian">Bosnian</option>
                        <option value="Brazilian">Brazilian</option>
                        <option value="British">British</option>
                        <option value="Bruneian">Bruneian</option>
                        <option value="Bulgarian">Bulgarian</option>
                        <option value="burkinabe">Burkinabe</option>
                        <option value="burmese">Burmese</option>
                        <option value="burundian">Burundian</option>
                        <option value="cambodian">Cambodian</option>
                        <option value="cameroonian">Cameroonian</option>
                        <option value="canadian">Canadian</option>
                        <option value="cape verdean">Cape Verdean</option>
                        <option value="central african">Central African</option>
                        <option value="chadian">Chadian</option>
                        <option value="chilean">Chilean</option>
                        <option value="chinese">Chinese</option>
                        <option value="colombian">Colombian</option>
                        <option value="comoran">Comoran</option>
                        <option value="congolese">Congolese</option>
                        <option value="costa rican">Costa Rican</option>
                        <option value="croatian">Croatian</option>
                        <option value="cuban">Cuban</option>
                        <option value="cypriot">Cypriot</option>
                        <option value="czech">Czech</option>
                        <option value="danish">Danish</option>
                        <option value="djibouti">Djibouti</option>
                        <option value="dominican">Dominican</option>
                        <option value="dutch">Dutch</option>
                        <option value="east timorese">East Timorese</option>
                        <option value="ecuadorean">Ecuadorean</option>
                        <option value="egyptian">Egyptian</option>
                        <option value="emirian">Emirian</option>
                        <option value="equatorial guinean">Equatorial Guinean</option>
                        <option value="eritrean">Eritrean</option>
                        <option value="estonian">Estonian</option>
                        <option value="ethiopian">Ethiopian</option>
                        <option value="fijian">Fijian</option>
                        <option value="filipino">Filipino</option>
                        <option value="finnish">Finnish</option>
                        <option value="french">French</option>
                        <option value="gabonese">Gabonese</option>
                        <option value="gambian">Gambian</option>
                        <option value="georgian">Georgian</option>
                        <option value="german">German</option>
                        <option value="ghanaian">Ghanaian</option>
                        <option value="greek">Greek</option>
                        <option value="grenadian">Grenadian</option>
                        <option value="guatemalan">Guatemalan</option>
                        <option value="guinea-bissauan">Guinea-Bissauan</option>
                        <option value="guinean">Guinean</option>
                        <option value="guyanese">Guyanese</option>
                        <option value="haitian">Haitian</option>
                        <option value="herzegovinian">Herzegovinian</option>
                        <option value="honduran">Honduran</option>
                        <option value="hungarian">Hungarian</option>
                        <option value="icelander">Icelander</option>
                        <option value="indian">Indian</option>
                        <option value="indonesian">Indonesian</option>
                        <option value="iranian">Iranian</option>
                        <option value="iraqi">Iraqi</option>
                        <option value="irish">Irish</option>
                        <option value="israeli">Israeli</option>
                        <option value="italian">Italian</option>
                        <option value="ivorian">Ivorian</option>
                        <option value="jamaican">Jamaican</option>
                        <option value="japanese">Japanese</option>
                        <option value="jordanian">Jordanian</option>
                        <option value="kazakhstani">Kazakhstani</option>
                        <option value="kenyan">Kenyan</option>
                        <option value="kittian and nevisian">Kittian and Nevisian</option>
                        <option value="kuwaiti">Kuwaiti</option>
                        <option value="kyrgyz">Kyrgyz</option>
                        <option value="laotian">Laotian</option>
                        <option value="latvian">Latvian</option>
                        <option value="lebanese">Lebanese</option>
                        <option value="liberian">Liberian</option>
                        <option value="libyan">Libyan</option>
                        <option value="liechtensteiner">Liechtensteiner</option>
                        <option value="lithuanian">Lithuanian</option>
                        <option value="luxembourger">Luxembourger</option>
                        <option value="macedonian">Macedonian</option>
                        <option value="malagasy">Malagasy</option>
                        <option value="malawian">Malawian</option>
                        <option value="malaysian">Malaysian</option>
                        <option value="maldivan">Maldivan</option>
                        <option value="malian">Malian</option>
                        <option value="maltese">Maltese</option>
                        <option value="marshallese">Marshallese</option>
                        <option value="mauritanian">Mauritanian</option>
                        <option value="mauritian">Mauritian</option>
                        <option value="mexican">Mexican</option>
                        <option value="micronesian">Micronesian</option>
                        <option value="moldovan">Moldovan</option>
                        <option value="monacan">Monacan</option>
                        <option value="mongolian">Mongolian</option>
                        <option value="moroccan">Moroccan</option>
                        <option value="mosotho">Mosotho</option>
                        <option value="motswana">Motswana</option>
                        <option value="mozambican">Mozambican</option>
                        <option value="namibian">Namibian</option>
                        <option value="nauruan">Nauruan</option>
                        <option value="nepalese">Nepalese</option>
                        <option value="new zealander">New Zealander</option>
                        <option value="ni-vanuatu">Ni-Vanuatu</option>
                        <option value="nicaraguan">Nicaraguan</option>
                        <option value="nigerien">Nigerien</option>
                        <option value="north korean">North Korean</option>
                        <option value="northern irish">Northern Irish</option>
                        <option value="norwegian">Norwegian</option>
                        <option value="omani">Omani</option>
                        <option value="pakistani">Pakistani</option>
                        <option value="palauan">Palauan</option>
                        <option value="panamanian">Panamanian</option>
                        <option value="papua new guinean">Papua New Guinean</option>
                        <option value="paraguayan">Paraguayan</option>
                        <option value="peruvian">Peruvian</option>
                        <option value="polish">Polish</option>
                        <option value="portuguese">Portuguese</option>
                        <option value="qatari">Qatari</option>
                        <option value="romanian">Romanian</option>
                        <option value="russian">Russian</option>
                        <option value="rwandan">Rwandan</option>
                        <option value="saint lucian">Saint Lucian</option>
                        <option value="salvadoran">Salvadoran</option>
                        <option value="samoan">Samoan</option>
                        <option value="san marinese">San Marinese</option>
                        <option value="sao tomean">Sao Tomean</option>
                        <option value="saudi">Saudi</option>
                        <option value="scottish">Scottish</option>
                        <option value="senegalese">Senegalese</option>
                        <option value="serbian">Serbian</option>
                        <option value="seychellois">Seychellois</option>
                        <option value="sierra leonean">Sierra Leonean</option>
                        <option value="singaporean">Singaporean</option>
                        <option value="slovakian">Slovakian</option>
                        <option value="slovenian">Slovenian</option>
                        <option value="solomon islander">Solomon Islander</option>
                        <option value="somali">Somali</option>
                        <option value="south african">South African</option>
                        <option value="south korean">South Korean</option>
                        <option value="spanish">Spanish</option>
                        <option value="sri lankan">Sri Lankan</option>
                        <option value="sudanese">Sudanese</option>
                        <option value="surinamer">Surinamer</option>
                        <option value="swazi">Swazi</option>
                        <option value="swedish">Swedish</option>
                        <option value="swiss">Swiss</option>
                        <option value="syrian">Syrian</option>
                        <option value="taiwanese">Taiwanese</option>
                        <option value="tajik">Tajik</option>
                        <option value="tanzanian">Tanzanian</option>
                        <option value="thai">Thai</option>
                        <option value="togolese">Togolese</option>
                        <option value="tongan">Tongan</option>
                        <option value="trinidadian or tobagonian">Trinidadian or Tobagonian</option>
                        <option value="tunisian">Tunisian</option>
                        <option value="turkish">Turkish</option>
                        <option value="tuvaluan">Tuvaluan</option>
                        <option value="ugandan">Ugandan</option>
                        <option value="ukrainian">Ukrainian</option>
                        <option value="uruguayan">Uruguayan</option>
                        <option value="uzbekistani">Uzbekistani</option>
                        <option value="venezuelan">Venezuelan</option>
                        <option value="vietnamese">Vietnamese</option>
                        <option value="welsh">Welsh</option>
                        <option value="yemenite">Yemenite</option>
                        <option value="zambian">Zambian</option>
                        <option value="zimbabwean">Zimbabwean</option>
                        </select>
                            </div>

                            <div className="form-group">
                            <p>Preferred Mode of Payment:</p>
                            <select name="mode" className="form-control" onChange={this.onChange}>
                    <option value="">-- Select Mode of Payment --</option>
                    <option value="Cash">Cash (Over the Counter)</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="e-Wallet">e-Wallet</option>
                    <option value="Paypal">Paypal</option>
                    <option value="GooglePay">GooglePay</option>
			                      </select>
                            </div>

                            {this.state.mode === 'Paypal' || this.state.mode === 'Credit Card' || this.state.mode === 'Debit Card'?<PayPalButton
      createOrder={(data, actions) => this.createOrder(data, actions)}
      onApprove={(data, actions) => this.onApprove(data, actions)}
    />:null}

{this.state.mode === 'GooglePay'?<GooglePayButton
  environment="TEST"
  paymentRequest={{
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '100.00',
      currencyCode: 'USD',
      countryCode: 'US',
    },
  }}
  onLoadPaymentData={paymentRequest => {
    console.log('load payment data', paymentRequest);
  }}
/>:null}
<div id="recaptcha"></div>
       
                    <button class="btn btn-primary rounded submit p-3 px-5" onClick={()=> this.printform()} style={{marginRight: '10px'}}>Pay Later Reserve Now</button>
             
                    <button type="submit" class="btn btn-primary rounded submit p-3 px-5" onClick={this.onSubmit}>Reserve</button>
                        </div>
                        {this.state.exercises.rate_mode == "Promo"? null:   <div className="form-group">
                            <p>Voucher Code:</p>
                    
                            <input type="text" class="form-control rounded-left" placeholder="Voucher Code" name="code" value={code=='empty'?null:code}
						onChange={this.onChange} /> 

    
            <br />
              <button type="submit" class="btn btn-primary rounded submit p-3 px-5" onClick={this.onSubmitVoucher}>{this.state.label}</button>
              
                            </div>}
                    </div>
              
                </div>
                



            </div>
        </div>
    </div>

</div>




{window.innerWidth < 992?
    <div class="fixed-bottom-minimized">
 <div style={{textAlign: 'center', padding: '10px'}}>   <Link to={'/Home'}> <i class="fa fa-building-o" style={{color: '#e87b1c', fontSize: '25px'}}> </i><br /><span style={{color: '#e87b1c', }}>Home</span></Link></div>
 <div style={{textAlign: 'center', padding: '10px'}}><Link to={'/Booking'}>  <i class="fa fa-address-book-o" style={{color: '#e87b1c', fontSize: '25px'}}> </i><br /><span style={{color: '#e87b1c', }}>Bookings</span></Link></div>
 <div style={{textAlign: 'center', padding: '10px'}}><Link to={'/Voucher'}>  <i class="fa fa-ticket" style={{color: '#e87b1c', fontSize: '25px'}}> </i><br /><span style={{color: '#e87b1c', }}>Voucher</span></Link></div>
 <div style={{textAlign: 'center', padding: '10px'}}><Link to={'/More'}>  <i class="fa fa-cogs" style={{color: '#e87b1c', fontSize: '25px'}}> </i><br /><span style={{color: '#e87b1c', }}>More</span></Link></div>
 </div> :null


}
     



                        </div>
                    </div>
                </div>
            </div>           
            
          
            
            
        </div>

</body>
    )
  }
}