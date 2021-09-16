import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ScriptTag from 'react-script-tag';
import {Helmet} from "react-helmet";
import Navbar from "./navbar.component"

import cogoToast from 'cogo-toast';
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const ERROR_CODE_ACCOUNT_EXISTS =
	'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
	An account with an E-Mail address to
	this social account already exists. Try to login from
	this account instead and associate your social accounts on
	your personal account page.
`;



export default class Print_info extends Component {
    constructor(props) {
		super(props);
		this.state = { Loading: false,exercises: [], date_diff: '' };
	}

  componentDidMount() {

const hotel = {  val: "project=6127126cae94bc64a5e4b23a", }
axios.post('https://gloreto.herokuapp.com/room_type/', hotel)
.then(response => {
    let room = this.props.match.params.room
    let res = response.data.find(element => element.temp_id === room)
  this.setState({ exercises:  res})
  window.print()
  console.log('response.data',res)
})
.catch((error) => {
  console.log(error);
})

let in_check = moment(this.props.match.params.check_in).unix()
let out_check = moment(this.props.match.params.check_out).unix()

let in_check_diff =  moment(in_check* 1000).format('MMMM D, YYYY')
            let out_check_diff = moment(out_check* 1000).format('MMMM D, YYYY')
            let sub = new Date(out_check_diff)- new Date(in_check_diff);
            this.setState({date_diff: sub})


       //     window.onpopstate = function(event) {
      //          this.back();
       //     };

  }

  back (){
    this.props.history.push('/Home')
  }

  printform = () =>{
    window.print()
  }


// Makes the back button work

  render() {
console.log('out', this.props.match.params.out_check)
    return (
        <body>

        <section class="ftco-section">
            <div class="container">
                <div class="row justify-content-center">
                
                    <div class="col-md-6 col-lg-5" style={{marginTop: -50}}>
               
                        <div class="login-wrap p-4 p-md-5">
                      <div class="icon d-flex align-items-center justify-content-center"  >
                       
                      </div>
                      <p>*Please Save or print this as proof</p>
                      <h3 class="text-center mb-4">Reservation Information</h3>
                      <p>{this.state.room_info}</p>
                            <div class="login-form">
                            <div class="form-group"><p>Reservation Code:</p>
                              <input type="text" class="form-control rounded-left" placeholder="Room Type" value={this.props.match.params.reservation_code}
						disabled/>
                          </div>
                            <div class="form-group"><p>Room Type:</p>
                              <input type="text" class="form-control rounded-left" placeholder="Room Type" value={this.state.exercises.room_type}
						disabled/>
                          </div>
                    <div class="form-group"><p>Room Price:</p>
                      <input type="text" class="form-control rounded-left" placeholder="Room Price" value={this.state.exercises.rate_mode == "Daily"?this.state.exercises.roomprice+ '/night': this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?this.state.exercises.roomprice+"("+this.state.exercises.promo_duration+"nights)"/**/ :this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?this.state.exercises.roomprice+"/"+this.state.exercises.hour_duration+"hours":this.state.exercises.roomprice_hour+ "/"+this.state.exercises.hour_duration+"hours" }
						 disabled/>
                    </div>
                    <div class="form-group"><p>Guest:</p>
                      <input type="text" class="form-control rounded-left" placeholder="Guest" value={this.props.match.params.guest}
						disabled/>
                    </div>
                    <div class="form-group"><p>Check In:</p>
                      <input type="text" class="form-control rounded-left" placeholder="Check In" value={moment(this.props.match.params.in_check).format('MMMM D, YYYY')}
						 disabled/>
                    </div>
                    <div class="form-group"><p>Check out:</p>
                      <input type="text" class="form-control rounded-left" placeholder="Check out" value={moment(this.props.match.params.out_check).format('MMMM D, YYYY')}
					 disabled/>
                    </div>
                    <div class="form-group"><p>Amount to Pay:</p>
                      <input type="text" class="form-control rounded-left" placeholder="Amount to Pay" value={this.state.exercises.rate_mode == "Daily"? Math.floor(this.state.date_diff/(1000*60 * 60 * 24))*parseFloat(this.state.exercises.roomprice)/**/: this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?parseFloat(this.state.exercises.roomprice)/**/:this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?parseFloat(this.state.exercises.roomprice)/**/: parseFloat(this.state.exercises.roomprice_hour)}
					disabled/>
                    </div>
                    
                   
                          <div class="form-group"><p>FullName:</p>
                              <input type="text" class="form-control rounded-left" placeholder="Full Name" name="name" value={this.props.match.params.name} disabled/>
                          </div>
                    <div class="form-group"><p>Email:</p>
                      <input type="text" class="form-control rounded-left" placeholder="Email" name="email" value={this.props.match.params.email} disabled/>
                    </div>
                    <div class="form-group"><p>Phone Number:</p>
                      <input type="text" class="form-control rounded-left" placeholder="Phone Number" name="phone_no"  value={this.props.match.params.phone_no} disabled/>
                    </div>
                    <div class="form-group"><p>Address:</p>
                      <textarea type="text" class="form-control rounded-left" placeholder="Address" name="address" value={this.props.match.params.address} disabled>
                      {this.props.match.params.address}
                    </textarea>
                    </div>
                    <div class="form-group"><p>Nationality:</p>
                    <input type="text" class="form-control rounded-left" placeholder="Address" name="address" value={this.props.match.params.nationality} disabled/>
                    </div>
                    <div class="form-group"><p>Mode of payment:</p>
                    <input type="text" class="form-control rounded-left" placeholder="Address" name="address" value={this.props.match.params.mode} disabled/>
                   
                    </div>
                    <div class="form-group">
                     <button type="submit" class="btn btn-primary rounded submit p-3 px-5" onClick={this.printform}>Print/Save</button>
                    </div>
                  </div>
              
                </div>
                    </div>
                </div>
            </div>
        </section>
    
        </body>
    )
  }
}