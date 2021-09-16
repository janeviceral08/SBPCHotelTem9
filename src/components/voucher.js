import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import cogoToast from 'cogo-toast';
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';



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



export default class Voucher extends Component {
  constructor(props) {
    super(props);

    this.state = {exercises: [], title: "", 
    subtitles: "",
    background_image: "",   online: [],
    code: "",
    date: "",
    expiration_date: "",
  min_stay:0,
  max_stay:0,
  description: "",
vouchvalue: 0,
mode: "",
open: false,
openAdd: false,
vou:{},
codeEdit: "",
    dateEdit: "",
    expiration_dateEdit: "",
  min_stayEdit:0,
  max_stayEdit:0,
  descriptionEdit: "",
vouchvalueEdit: 0,
mode: "",
projects:[],
members: [],
};
    
  }

  componentDidMount() {
    const hotel = {  val: localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'), }
	axios.post('http://localhost:5000/voucher/View_Voucher/', hotel)
	.then(response => {
	  this.setState({ exercises: response.data })
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


  onSubmit = () => {
   
    const {  code,
      expiration_date,
      min_stay,
      max_stay,
      vouchvalue,
      description,
      mode,  } = this.state;

      console.log('moment(expiration_date).unix() :', moment(expiration_date).unix() )
console.log('moment().unix(): ', moment().unix())


      if (moment().unix() > moment(expiration_date).unix() ) {
        cogoToast.error('Expiration Date should be atleast 1 hour from now');
        return;
      }

      if (min_stay<0) {
        cogoToast.error('Please Enter Minimum Stay Should Not Be Less Than 0');
        return;
      }
     
      if (max_stay<0) {
        cogoToast.error('Please Enter Minimum Stay Should Not Be Less Than 0');
        return;
      }
      
      if (!code.trim()) {
        cogoToast.error('Please Enter Code');
        return;
      }
      if (!expiration_date.trim()) {
        cogoToast.error('Please Enter Expiration Date');
        return;
      }
      if (!mode.trim()) {
        cogoToast.error('Please Enter Voucher Mode');
        return;
      }
      
    
      cogoToast.success('Please wait');
      const exercise = { 
        _partition:localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'),
        code,
        date:moment().unix(),
        expiration_date: moment(expiration_date).unix(),
        min_stay,
        max_stay,
        vouchvalue,
        mode,
        description
          }



          const hotel = {  code }
          axios.post('http://localhost:5000/voucher/check_voucher/', hotel)
          .then(response => {
            if(response.data.lenght > 0){

              cogoToast.error('Please Change the CODE');
            }
            else{

              axios.post('http://localhost:5000/voucher/add_Voucher', exercise)
              .then(res =>{
             
                  if(res.data == 'Voucher added!'){
                    window.location.reload()
                  }
                  else{
                      cogoToast.error('Please Try Again');
                  }
                  
              })
            }
          })

    
};




onSubmitEdit = () => {
   
  const {  codeEdit,
    expiration_dateEdit,
    min_stayEdit,
    max_stayEdit,
    vouchvalueEdit,
    descriptionEdit,
    modeEdit,  } = this.state;


    if (min_stayEdit<0) {
      cogoToast.error('Please Enter Minimum Stay Should Not Be Less Than 0');
      return;
    }
   
    if (max_stayEdit<0) {
      cogoToast.error('Please Enter Minimum Stay Should Not Be Less Than 0');
      return;
    }
    
    if (!codeEdit.trim()) {
      cogoToast.error('Please Enter Code');
      return;
    }
 
    if (!modeEdit.trim()) {
      cogoToast.error('Please Enter Voucher Mode');
      return;
    }
   

    cogoToast.success('Please wait');
    const exercise = { 
      _partition:localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'),
      code:codeEdit,
      date:moment().unix(),
      expiration_date: moment(expiration_dateEdit).unix(),
      min_stay:min_stayEdit,
      max_stay:max_stayEdit,
      vouchvalue:vouchvalueEdit,
      mode:modeEdit,
      description:descriptionEdit,
      id: this.state.vou._id,
        }

      axios.post('http://localhost:5000/voucher/edit_Voucher', exercise)
      .then(res => window.location.reload())

  
  
};

onDelete = (id,title,status) => {
    const exercise = {
        id: id,
        status: status
      }
    confirmAlert({
        title: 'Confirm to Change Status of '+title,
        message: 'Are you sure to do this?',
        buttons: [
          {
            label: 'Yes',
            onClick: () =>  {cogoToast.success('Please wait'); axios.post('http://localhost:5000/voucher/voucher_inactive', exercise)
            .then(res => window.location.reload())}
          },
          {
            label: 'No',
            onClick: () => console.log('no')
          }
        ]
      });
    
};
onChangetitle = event => {
    this.setState({ title: event.target.value });

};
onChangedescription = event => {
    this.setState({ [event.target.name]: event.target.value });


};
generate = () => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 12; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
   charactersLength));
     }

console.log('result Code: ', result)
    this.setState({ code: result });


};
onChangebackgroundimage = event => {
  this.setState({ background_image: event.target.value });

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

handleOpen = (vou) => {

  this.setState({open:true, vou: vou, codeEdit:vou.code,
    expiration_dateEdit:vou.expiration_date,
    min_stayEdit:vou.min_stay,
    max_stayEdit:vou.max_stay,
    vouchvalueEdit:vou.vouchvalue,
    descriptionEdit:vou.description,
    modeEdit:vou.mode,});
};

 handleClose = () => {
  this.setState({open: false});
};

handleOpenAdd = () => {

  this.setState({openAdd:true});
};

 handleCloseAdd = () => {
  this.setState({openAdd: false});
};

  render() {
      
    return (
      <body class="hold-transition skin-blue sidebar-mini">
      <div class="wrapper">
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
marginLeft: '20%'
    
    }} class="col-xl-12 row">
      <div class="col-xl-6">
					<label for="title">Code:</label> <br />
          <div style={{flexDirection: 'row'}}>
                    <TextField id="outlined-basic" style={{width: '50%'}} label="Code" variant="outlined" value={this.state.codeEdit}/>
                 </div>
<br />
          <label for="file">Minimum Stay:</label><br />
          <TextField id="outlined-basic" label="Minimum Stay" style={{width: '100%'}} variant="outlined" name="min_stayEdit" onChange={this.onChangedescription}  error={isNaN(this.state.min_stayEdit) === true ? true: false} helperText="Incorrect entry. Must be a number" value={Math.round(this.state.min_stayEdit)}/>
          <br />
          <label for="file">Maximum Stay:</label><br />
          <TextField id="outlined-basic" label="Maximum Stay" style={{width: '100%'}} variant="outlined" name="max_stayEdit" onChange={this.onChangedescription} error={isNaN(this.state.max_stayEdit) === true ? true: false} helperText="Incorrect entry. Must be a number" value={Math.round(this.state.max_stayEdit)}/>
          <br />
          <label for="file">Voucher Mode:</label><br />

          <FormControl variant="outlined" style={{width: '100%'}}>
        <InputLabel id="demo-simple-select-outlined-label">Voucher Mode</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.modeEdit}
          onChange={this.onChangedescription}
          name="modeEdit"
          label="Voucher Mode"
        >
          
          <MenuItem value={'Percentage'}>Percentage</MenuItem>
          <MenuItem value={'Amount'}>Amount</MenuItem>
        </Select>
      </FormControl>
         <br />
         </div>
         <div class="col-xl-6">
          <label for="file">Voucher Value:</label><br />
          <TextField id="outlined-basic" label="Voucher Value" style={{width: '100%'}} variant="outlined" name="vouchvalueEdit" onChange={this.onChangedescription} error={isNaN(this.state.vouchvalueEdit) === true ? true: false} helperText="Incorrect entry. Must be a number" value={this.state.vouchvalueEdit}/>
          <br />
          <label for="file">Description:</label><br />
          <TextField id="outlined-basic" label="Description" style={{width: '100%'}}  multiline
          rows={4} variant="outlined" name="descriptionEdit" onChange={this.onChangedescription} value={this.state.descriptionEdit}/>
          <br />
          <label for="file">Expiration Date: {moment(this.state.expiration_dateEdit * 1000).format('MMM D, YYYY hh:mm a')}</label><br />
          <TextField id="datetime-local" label="Expiration Date" type="datetime-local"   InputLabelProps={{
          shrink: true,
        }} style={{width: '100%'}} variant="outlined" name="expiration_dateEdit" onChange={this.onChangedescription} value={this.state.expiration_dateEdit}/>
          <br />
          <br /> <br />
          <div style={{'float': 'right'}}>
        <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={this.onSubmitEdit}
        startIcon={<SaveIcon />}
      >
        Save
      </Button></div>
			</div>
			
   
		</div>
		
        </Fade>
      </Modal>















      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.openAdd}
        onClose={this.handleCloseAdd}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.openAdd}>
          <div style={{ backgroundColor: 'white',
    border: '2px solid #000',
    padding:40,
    width: '70%',
marginLeft: '20%'
    
    }} class="col-xl-12 row">
      <div class="col-xl-6">
      <label for="title">Code:</label> <br />
          <div style={{flexDirection: 'row'}}>
                    <TextField id="outlined-basic" style={{width: '50%'}} label="Code" variant="outlined" name="code" onChange={this.onChangedescription} value={this.state.code}/>
                    <Button
        variant="contained"
        color="primary"
        size="large"
        style={{width: '50%', marginTop: '2%'}}
        endIcon={<i class="fa fa-qrcode" aria-hidden="true"></i>}
        onClick={this.generate}
      >
        Generate Code
      </Button></div>
<br />
          <label for="file">Minimum Stay:</label><br />
          <TextField id="outlined-basic" label="Minimum Stay" style={{width: '100%'}} variant="outlined" name="min_stay" onChange={this.onChangedescription}  error={isNaN(this.state.min_stay) === true ? true: false} helperText="Incorrect entry. Must be a number" value={Math.round(this.state.min_stay)}/>
          <br />
          <label for="file">Maximum Stay:</label><br />
          <TextField id="outlined-basic" label="Maximum Stay" style={{width: '100%'}} variant="outlined" name="max_stay" onChange={this.onChangedescription} error={isNaN(this.state.max_stay) === true ? true: false} helperText="Incorrect entry. Must be a number" value={Math.round(this.state.max_stay)}/>
          <br />
          <label for="file">Voucher Mode:</label><br />

          <FormControl variant="outlined" style={{width: '100%'}}>
        <InputLabel id="demo-simple-select-outlined-label">Voucher Mode</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.mode}
          onChange={this.onChangedescription}
          name="mode"
          label="Voucher Mode"
        >
          
          <MenuItem value={'Percentage'}>Percentage</MenuItem>
          <MenuItem value={'Amount'}>Amount</MenuItem>
        </Select>
      </FormControl>
         <br />
         </div>
         <div class="col-xl-6">
        
         <label for="file">Voucher Value:</label><br />
          <TextField id="outlined-basic" label="Voucher Value" style={{width: '100%'}} variant="outlined" name="vouchvalue" onChange={this.onChangedescription} error={isNaN(this.state.vouchvalue) === true ? true: false} helperText="Incorrect entry. Must be a number" value={this.state.vouchvalue}/>
          <br />
          <label for="file">Description:</label><br />
          <TextField id="outlined-basic" label="Description" style={{width: '100%'}}  multiline
          rows={4} variant="outlined" name="description" onChange={this.onChangedescription} value={this.state.description}/>
          <br />
          <label for="file">Expiration Date:</label><br />
          <TextField id="datetime-local" label="Expiration Date" type="datetime-local"   InputLabelProps={{
          shrink: true,
        }} style={{width: '100%'}} variant="outlined" name="expiration_date" onChange={this.onChangedescription} value={this.state.expiration_date}/>
          <br />
          <br /> <br />
          <div style={{'float': 'right'}}>
        <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={this.onSubmit}
        startIcon={<SaveIcon />}
      >
        Save
      </Button></div>
			</div>
			
   
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
              <li class="treeview active">
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
          <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={this.handleOpenAdd}
        startIcon={<SaveIcon />}
      >
        Add Voucher
      </Button>
            <ol class="breadcrumb">
              <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
              <li class="active">  Popular Destination</li>
             
            </ol>
          </section>
      
          <section class="content">
            <div class="row">
      
              <div class="col-md-12">
                <div class="box" >
                  <div class="box-body">
                  <table class="table table-hover">
  <thead>
    <tr>
    
                        <th scope="col">#</th>
                        <th scope="col">Code</th>
                        <th scope="col">Minimum Stay</th>
                        <th scope="col">Maximum Stay</th>
                        <th scope="col">Voucher Mode</th>
                        <th scope="col">Voucher Value</th>
                        <th scope="col">Description</th>
                        <th scope="col">Expiration Date</th>
                        <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  { this.state.exercises.map((room,index) =>
    <tr>
                                    <td scope="row"><p>{index+1}</p></td>
                                    <td>{room.code}</td> 
                                    <td>{room.min_stay}</td>
                                    <td>{room.max_stay}</td>
                                    <td>{room.mode}</td>
                                    <td>{room.vouchvalue}</td>
                                    <td>{room.description}</td>
                                    <td>{moment(room.expiration_date * 1000).format('MMM D, YYYY hh:mm a')}</td>
                                    <td>
                                    <FormControlLabel
        control={<IOSSwitch checked={room.status === 'active'?true:false} onChange={this.onChangedescription} name="checkedB" />}
        label="Status"
        onClick={() => this.onDelete(room._id, room.code, room.status)}
      />
                                                            <Link to="#" onClick={() => this.handleOpen(room)}>
                                                            <i class='fa fa fa-pencil-square-o' style={{fontSize: 30}}></i>
															</Link>
                               
                                    </td>
                                 
                                </tr>



)

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