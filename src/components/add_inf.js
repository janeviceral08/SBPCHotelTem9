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

const INITIAL_STATE = {

    name: '',
    email: '',
    phone_no: '',
    address: '',
    nationality: '',
    mode: '',
	error: null,
    date_diff:''
    
};

export default class Add_inf extends Component {
    constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE, Loading: false,exercises: [] };
	}

  componentDidMount() {

const hotel = {  val: "project=6127126cae94bc64a5e4b23a", }
axios.post('https://gloreto.herokuapp.com/room_type/', hotel)
.then(response => {
    let room = this.props.match.params.room
    let res = response.data.find(element => element.temp_id === room)
  this.setState({ exercises:  res})
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


  }

  

  onSubmit = () => {
   
    const { name, email,phone_no,address,nationality,mode } = this.state;
   const reservation_code = Math.floor(Math.random() * 9999)+moment().unix();
    const exercise = {
        name, 
        email,
        phone_no,
        address,
        nationality,
        mode, 
        reservation_code,
        in_check: moment(this.props.match.params.check_in).unix(),
        out_check: moment(this.props.match.params.check_out).unix(),
        room: this.props.match.params.room,
        guest: this.props.match.params.guest,
        createdAt: moment().unix(),
        _partition: 'project=6127126cae94bc64a5e4b23a'
      }



     // console.log('nationality', nationality)
     if(parseFloat(this.props.match.params.guest) > parseFloat(this.state.exercises.max_person)){
      cogoToast.error('Sorry Maximum number of Guest is '+ this.state.exercises.max_person);
    } else{
 
      if (!name.trim()) {
        cogoToast.error('Please Enter Name');
        return;
      }
      //Check for the Email TextInput
      if (!phone_no.trim()) {
        cogoToast.error('Please Enter Phone Number');
        return;
      }
      if (!address.trim()) {
        cogoToast.error('Please Enter Address');
        return;
      }
   
      if (!nationality.trim()) {
        cogoToast.error('Please Enter Nationality');
        return;
      }
      if (!mode.trim()) {
        cogoToast.error('Please Enter Mode of Payment');
        return;
      }
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => { 
                axios.post('https://gloreto.herokuapp.com/reservation/book_reservation', exercise)
                .then(res =>{
                    console.log('datas', res.data)
                    if(res.data == 'Exercise added!'){
                        this.props.history.push('/Print_info/'+name+'/'+email+'/'+phone_no+'/'+address+'/'+nationality+'/'+mode+'/'+reservation_code+'/'+this.props.match.params.check_in+'/'+this.props.match.params.check_out+'/'+this.props.match.params.room+'/'+this.props.match.params.guest)
                    }
                    else{
                        cogoToast.error('Please Try Again');
                    }
                    
                });
          
          
                //this.props.history.push('/Admin')
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

onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
};

  render() {
	const { name, email,phone_no,address,nationality,mode,error } = this.state;

		const isInvalid = name === '' || phone_no === ''|| address === ''|| nationality === ''|| mode === '';
        //console.log('res',this.state.exercises.roomprice)
        console.log('date_diff: ', this.state.mode)
    return (
        <body>
  <div className="container" style={{ marginTop: '3%',  padding: '3%', background: `-webkit-linear-gradient(left, #3931af, #00c6ff)`}}>
    <div className="row">
        <div className="col-md-3 register_user-left" style={{'text-align': 'center', color: '#fff'}}>
            <img src={'https://image.ibb.co/n7oTvU/logo_white.png'} alt="" />
            <h3  style={{color: '#fff'}}>Hello!</h3>
            <p>You are one step away on your reservation! Fill in the Necessary Information.</p>
  
        </div>
        <div className="col-md-9" style={{ background: `#f8f9fa`, 'border-top-left-radius': `10% 50%`,  'border-bottom-left-radius' : `10% 50%`}}>
            <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist" style={{'margin-top':'3%',border: 'none',
    background:' #0062cc', 'border-radius': '1.5rem',width: '28%','float': 'right'}}>
                <li className="nav-item">
                    <a className="nav-link active" style={{width: '100px',
    color: '#0062cc',
    border: '2px solid #0062cc',
    'border-top-left-radius': '1.5rem',
    'border-bottom-left-radius':' 1.5rem'}} id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Additional</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" style={{padding: '2%',paddingTop:'8%', height: '34px', 'font-weight': 600,  color: '#fff',
    'border-top-right-radius': '1.5rem',
    'border-bottom-right-radius': '1.5rem'}} id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Information</a>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <h3 style={{  'text-align': `center`, 'margin-top': '5%',' margin-bottom': `-15%`, color: '#495057'}}>Fill In Reservation Information</h3>
                    <div className="row" style={{padding: '10%',  marginTop: '0%', paddingTop: '2%'}}>
                        <div className="col-md-6">
                            <div className="form-group">
                            <p>Room Type:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Full Name" value={this.state.exercises.room_type}
						disabled/>  </div>
                            <div className="form-group">
                            <p>Room Price:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Email" value={this.state.exercises.rate_mode == "Daily"?this.state.exercises.roomprice+ '/night': this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?this.state.exercises.roomprice+"("+this.state.exercises.promo_duration+"nights)"/**/ :this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?this.state.exercises.roomprice+"/"+this.state.exercises.hour_duration+"hours":this.state.exercises.roomprice_hour+ "/"+this.state.exercises.hour_duration+"hours" }
						onChange={this.onChange} disabled/>
                          </div>
                            <div className="form-group">
                            <p>Guest:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Phone Number" value={this.props.match.params.guest}
						onChange={this.onChange} disabled/>
                            </div>
                            <div className="form-group">
                            <p>Check In:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Phone Number" value={this.props.match.params.check_in}
						onChange={this.onChange} disabled/>
                            </div>
                            <div className="form-group">
                            <p>Check Out:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Phone Number" value={this.props.match.params.check_out}
						onChange={this.onChange} disabled/>
                            </div>
                            <div className="form-group">
                            <p>Amount to Pay:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Phone Number" value={this.state.exercises.rate_mode == "Daily"? Math.floor(this.state.date_diff/(1000*60 * 60 * 24))*parseFloat(this.state.exercises.roomprice)/**/: this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Daily'?parseFloat(this.state.exercises.roomprice)/**/:this.state.exercises.rate_mode == "Promo" && this.state.exercises.duration_mode == 'Hour'?parseFloat(this.state.exercises.roomprice)/**/: parseFloat(this.state.exercises.roomprice_hour)}
						onChange={this.onChange} disabled/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                            <p>FullName:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Full Name" name="name" value={name}
						onChange={this.onChange} required/>
                               
                            </div>
                            <div className="form-group">
                            <p>Email:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Email" name="email" value={email}
						onChange={this.onChange}/>
                          </div>
                            <div className="form-group">
                            <p>Phone Number:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Phone Number" name="phone_no" value={phone_no}
						onChange={this.onChange} required/>
                          </div>
                            <div className="form-group">
                            <p>Address:</p>
                            <input type="text" class="form-control rounded-left" placeholder="Address" name="address" value={address}
						onChange={this.onChange} required/>
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
                            <p>Mode of Payment:</p>
                            <select name="mode" className="form-control" onChange={this.onChange}>
                    <option value="">-- Select Mode of Payment --</option>
                    <option value="Cash">Cash</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="e-Wallet">e-Wallet</option>
			                      </select>
                            </div>
                           
                            <button type="submit" class="btn btn-primary rounded submit p-3 px-5" onClick={this.onSubmit}>Reserve</button>
                        </div>
                    </div>
                </div>
                



            </div>
        </div>
    </div>

</div>
        
        </body>
    )
  }
}