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
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import { withStyles, makeStyles  } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import InputAdornment from '@material-ui/core/InputAdornment';



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


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));
export default class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {exercises: [], 
    online: [],
category: "",
projects:[],
members: [],
setExpanded: false,
mode: '',
search: '',
Date_From: null,
Date_To: null,
reports: [],
};
    
  }

  componentDidMount() {
    const hotel = {  val: localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'), }

    axios.post('https://gloreto.herokuapp.com/reservation/reserve/', hotel)
	.then(response => {
	  this.setState({ online: response.data })
   
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




AddCategory = () => {
   
  const {  mode, Date_From, Date_To  } = this.state;


    if (!mode.trim()) {
      cogoToast.error('Please Enter Category');
      return;
    }
    if (Date_From === null) {
        cogoToast.error('Please Enter Date From');
        return;
      }
      if (Date_To === null) {
        cogoToast.error('Please Enter Date To');
        return;
      }
   
if(mode==='2'){
    console.log('mode 2')
    cogoToast.success('Please wait');
    const exercise = { 
      _partition:localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'),
      to:moment(Date_To).unix(),
      from: moment(Date_From).unix(),
        }

      axios.post('http://localhost:5000/Checkout/get_CheckoutAll', exercise)
      .then(res => {
      
          this.setState({reports: res.data.sort((a, b) => Number(a.check_out) - Number(b.check_out))})
        } )
        return;
}
if(mode==='3'){
    console.log('mode 2')
    cogoToast.success('Please wait');
    const exercise = { 
      _partition:localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'),
      to:moment(Date_To).unix(),
      from: moment(Date_From).unix(),
        }

      axios.post('http://localhost:5000/Checkout/get_Reservation_Checkin_All', exercise)
      .then(res => {
      
          this.setState({reports: res.data.sort((a, b) => Number(a.check_in) - Number(b.check_in))})
        } )
        return;
}
if(mode==='4'){
    console.log('mode 2')
    cogoToast.success('Please wait');
    const exercise = { 
      _partition:localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'),
      to:moment(Date_To).unix(),
      from: moment(Date_From).unix(),
        }

      axios.post('http://localhost:5000/Checkout/get_Reservation_Checkout_All', exercise)
      .then(res => {
      
          this.setState({reports: res.data.sort((a, b) => Number(a.check_in) - Number(b.check_in))})
        } )
        return;
}
if(mode==='5'){
    console.log('mode 2')
    cogoToast.success('Please wait');
    const exercise = { 
      _partition:localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'),
      to:moment(Date_To).unix(),
      from: moment(Date_From).unix(),
        }

      axios.post('http://localhost:5000/Checkout/get_FD_Checkin_All', exercise)
      .then(res => {
      
          this.setState({reports: res.data.sort((a, b) => Number(a.check_in) - Number(b.check_in))})
        } )
        return;
}
if(mode==='6'){
    console.log('mode 2')
    cogoToast.success('Please wait');
    const exercise = { 
      _partition:localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'),
      to:moment(Date_To).unix(),
      from: moment(Date_From).unix(),
        }

      axios.post('http://localhost:5000/Checkout/get_FD_Checkout_All', exercise)
      .then(res => {
      
          this.setState({reports: res.data.sort((a, b) => Number(a.check_in) - Number(b.check_in))})
        } )
        return;
}
if(mode==='7'){
    console.log('mode cash')
    cogoToast.success('Please wait');
    const exercise = { 
      _partition:localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'),
      to:moment(Date_To).unix(),
      from: moment(Date_From).unix(),
        }

      axios.post('http://localhost:5000/Checkout/get_cash_All', exercise)
      .then(res => {
      
          this.setState({reports: res.data.sort((a, b) => Number(a.check_in) - Number(b.check_in))})
        } )
        return;
}
if(mode==='8'){
    console.log('mode 2')
    cogoToast.success('Please wait');
    const exercise = { 
      _partition:localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'),
      to:moment(Date_To).unix(),
      from: moment(Date_From).unix(),
        }

      axios.post('http://localhost:5000/Checkout/get_debit_All', exercise)
      .then(res => {
      
          this.setState({reports: res.data.sort((a, b) => Number(a.check_in) - Number(b.check_in))})
        } )
        return;
}
if(mode==='9'){
    console.log('mode 2')
    cogoToast.success('Please wait');
    const exercise = { 
      _partition:localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'),
      to:moment(Date_To).unix(),
      from: moment(Date_From).unix(),
        }

      axios.post('http://localhost:5000/Checkout/get_credit_All', exercise)
      .then(res => {
      
          this.setState({reports: res.data.sort((a, b) => Number(a.check_in) - Number(b.check_in))})
        } )
        return;
}
if(mode==='10'){
    console.log('mode 2')
    cogoToast.success('Please wait');
    const exercise = { 
      _partition:localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'),
      to:moment(Date_To).unix(),
      from: moment(Date_From).unix(),
        }

      axios.post('http://localhost:5000/Checkout/get_ewallet_All', exercise)
      .then(res => {
      
          this.setState({reports: res.data.sort((a, b) => Number(a.check_in) - Number(b.check_in))})
        } )
        return;
}

if(mode==='15'){
    console.log('mode All Refunded')
    cogoToast.success('Please wait');
    const exercise = { 
      _partition:localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'),
      to:moment(Date_To).unix(),
      from: moment(Date_From).unix(),
        }

      axios.post('http://localhost:5000/Checkout/get_refunded_All', exercise)
      .then(res => {
      
          this.setState({reports: res.data.sort((a, b) => Number(a.check_in) - Number(b.check_in))})
        } )
        return;
}
if(mode==='16'){
    console.log('mode 2')
    cogoToast.success('Please wait');
    const exercise = { 
      _partition:localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'),
      to:moment(Date_To).unix(),
      from: moment(Date_From).unix(),
        }

      axios.post('http://localhost:5000/Checkout/get_refunded_reservation', exercise)
      .then(res => {
      
          this.setState({reports: res.data.sort((a, b) => Number(a.check_in) - Number(b.check_in))})
        } )
        return;
}
if(mode==='17'){
    console.log('mode 2')
    cogoToast.success('Please wait');
    const exercise = { 
      _partition:localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'),
      to:moment(Date_To).unix(),
      from: moment(Date_From).unix(),
        }

      axios.post('http://localhost:5000/Checkout/get_refunded_fd', exercise)
      .then(res => {
      
          this.setState({reports: res.data.sort((a, b) => Number(a.check_in) - Number(b.check_in))})
        } )
        return;
}
if(mode==='12'){
    console.log('mode 2')
    cogoToast.success('Please wait');
    const exercise = { 
      val:localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'),
      to:moment(Date_To).unix(),
      from: moment(Date_From).unix(),
        }

      axios.post('http://localhost:5000/Goods/get_Goods_report', exercise)
      .then(res => {
      
          this.setState({reports: res.data.sort((a, b) => Number(a.check_in) - Number(b.check_in))})
        } )
        return;
}
if(mode==='18'){
  console.log('mode housekeeping')
  cogoToast.success('Please wait');
  const exercise = { 
    _partition:localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'),
    to:moment(Date_To).unix(),
    from: moment(Date_From).unix(),
      }

    axios.post('http://localhost:5000/Checkout/get_housekeeping_history', exercise)
    .then(res => {
    
        this.setState({reports: res.data.sort((a, b) => Number(a.date) - Number(b.date))})
      } )
      return;
}
if(mode==='19'){
  console.log('mode staff')
  cogoToast.success('Please wait');
  const exercise = { 
    _partition:localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'),
    to:moment(Date_To).unix(),
    from: moment(Date_From).unix(),
      }

    axios.post('http://localhost:5000/Checkout/get_staff_logs', exercise)
    .then(res => {
    
        this.setState({reports: res.data.sort((a, b) => Number(a.date) - Number(b.date))})
      } )
      return;
}
if(mode==='20'){
  console.log('mode cancelled')
  cogoToast.success('Please wait');
  const exercise = { 
    _partition:localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'),
    to:moment(Date_To).unix(),
    from: moment(Date_From).unix(),
      }

    axios.post('http://localhost:5000/Checkout/get_cancelled_reservation', exercise)
    .then(res => {
    
        this.setState({reports: res.data.sort((a, b) => Number(a.in_check) - Number(b.in_check))})
      } )
      return;
}
else{
    console.log('mode')
    cogoToast.success('Please wait');
    const exercise = { 
      _partition:localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'),
      to:moment(Date_To).unix(),
      from: moment(Date_From).unix(),
        }

      axios.post('http://localhost:5000/Checkout/get_CheckinAll', exercise)
      .then(res => {
      
          this.setState({reports: res.data.sort((a, b) => Number(a.check_in) - Number(b.check_in))})
        } )
        return;
}
  
  
};

onDelete = (id,catid,name) => {
    const exercise = {
        id: id,
      }
    confirmAlert({
        title: 'Confirm to Delete '+name,
        message: 'Are you sure to do this?',
        buttons: [
          {
            label: 'Yes',
            onClick: () =>  {cogoToast.success('Please wait'); axios.post('http://localhost:5000/Goods/delete_cat', exercise)
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
 handleChange = (panel) => (event, isExpanded) => {
     this.setState({setExpanded: isExpanded ? panel : false});
   
  };

handleCategory = () => {
    this.props.history.push('GoodsCategory')
  };

  currencyFormat = (num) => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  render() {
  

    console.log('this.state.reports: ', this.state.reports)
  
    const newData = this.state.reports.filter(item => {
      const itemData = this.state.mode ==="20"? item.name.toUpperCase() : this.state.mode === "19" || this.state.mode === "18" ? item.staff.toUpperCase(): item.customer.toUpperCase();
      const textData = this.state.search.toUpperCase();
     
      return itemData.indexOf(textData) > -1
    });
     

  


  var data = [];
    for(var issue of  newData){
        var entryFound = false;
        var tempObj = {
          name: this.state.mode ==="19"|| this.state.mode === "18"? issue.staff: issue.nationality,
          count: 1
        };
        
        for(var item of data){
          if(item.name === tempObj.name){
            item.count++;
            entryFound = true;
            break;
          }
        }
        
        if(!entryFound){
          data.push(tempObj);
        }
    }
  const key ="room_no_id"
  const newDataGoods =this.state.reports;
  console.log('newDataGoods: ',newDataGoods);
  console.log('data: ',data);
 /* const item_types = [...new Map(this.state.reports.map(item => [item[key], item])).values()]
  console.log('item_types: ',item_types)

  const newDataGoods = item_types.filter(items => {
    console.log('newDataGoods: ',items)
    const itemData = items.item.toUpperCase();
    const textData = this.state.search.toUpperCase();
   
    return itemData.indexOf(textData) > -1
  });
  console.log('item_types: ',item_types);
 console.log('newData: ',newData);
   console.log('search: ',this.state.search);*/



   const trial = (info) => {

    if(this.state.mode != "18")return;
    

    const newDataDuplicate = info.checkList.filter(function(val) {
      return info.checkListPros.indexOf(val) != -1;
    });

  const newDataUnique = info.checkList.filter(function(val) {
    return info.checkListPros.indexOf(val) == -1;
  });

  return(<div>
    <p style={{textAlign: 'center', fontWeight: 'bold'}}>Unchecked</p>
     <div style={{'float': 'left'}}>
     
      {newDataUnique && newDataUnique.length > 0 ? newDataUnique.map((item,index)=>

<p key={index}><i class="fa fa-times-circle-o" style={{color: 'red'}}></i>{item}</p>


) :null }</div>

    </div>)

    
  }


  const trials = (info) => {

    if(this.state.mode != "18")return;
    

    const newDataDuplicate = info.checkList.filter(function(val) {
      return info.checkListPros.indexOf(val) != -1;
    });

  const newDataUnique = info.checkList.filter(function(val) {
    return info.checkListPros.indexOf(val) == -1;
  });

  return(<div>
   <p style={{textAlign: 'center', fontWeight: 'bold'}}>Checked</p>
  <div style={{'float': 'right'}}>
{newDataDuplicate && newDataDuplicate.length > 0 ? newDataDuplicate.map((item,index)=>

<p key={index}> <i class="fa fa-check-circle-o" style={{color: 'green'}}></i>{item}</p>

) :null }
</div>
    </div>)

    
  }
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
              <li class="treeview">
                  <Link to="/Additional_Info" >  
                  <i class="fa fa-cogs"></i> <span>Additional Hotel Info</span></Link>
              </li>
              <li class="treeview active">
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
          <label for="file">Reports</label><br />
          <FormControl variant="outlined" style={{width: '40%', marginRight: '10px'}}>
        <InputLabel id="demo-simple-select-outlined-label">Report</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.mode}
          onChange={this.onChangedescription}
          name="mode"
          label="Report Category"
        >
          
          <MenuItem value={'1'}>All Check in</MenuItem>
          <MenuItem value={'2'}>All Check out</MenuItem>
          <MenuItem value={'20'}>Cancelled Reservation</MenuItem>
          <MenuItem value={'3'}>Reservation Check in</MenuItem>
          <MenuItem value={'4'}>Reservation Check out</MenuItem>
          <MenuItem value={'5'}>Front Desk Check in</MenuItem>
          <MenuItem value={'6'}>Front Desk Check out</MenuItem>
          <MenuItem value={'7'}>Payed Cash</MenuItem>
          <MenuItem value={'8'}>Payed Debit</MenuItem>
          <MenuItem value={'9'}>Payed Credit</MenuItem>
          <MenuItem value={'10'}>Payed E-Wallet</MenuItem>
          <MenuItem value={'11'}>Nationality</MenuItem>
          <MenuItem value={'12'}>Goods</MenuItem>
          <MenuItem value={'15'}>All Refunded</MenuItem>
          <MenuItem value={'16'}>Reservation Refunded</MenuItem>
          <MenuItem value={'17'}>Front Desk Refunded</MenuItem>
          <MenuItem value={'18'}>House Keeping History</MenuItem>
          <MenuItem value={'19'}>Staffs Activity Logs</MenuItem>
        </Select>
      </FormControl>

      <TextField
        id="datetime-local"
        label="Date From"
        type="datetime-local"
        defaultValue={moment()}
        name="Date_From"
        onChange={this.onChangedescription}
                style={{marginRight: '10px'}}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="datetime-local"
        label="Date To"
        type="datetime-local"
        onChange={this.onChangedescription}
        name="Date_To"
        defaultValue={moment()}
        style={{marginRight: '10px'}}
        InputLabelProps={{
          shrink: true,
        }}
      />
          <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={this.AddCategory}
        startIcon={<SearchIcon />}
      >
       Filter
      </Button>
    
            <ol class="breadcrumb">
              <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
              <li class="active">  Reports</li>
            </ol>
          </section>
      
          <section class="content">
            <div class="row">
      
              <div class="col-md-12">
                <div class="box" >
                <TextField
          id="outlined-multiline-static"
          label="Search"
          style={{width: '30%', marginTop: '20px', marginLeft: '10px'}}
          rows={4}
          onChange={this.onChangedescription}
          name="search"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />  
                {   this.state.mode ==="18"?
                
                <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button-style"
                table="table-to-xls-Housekeeping"
                filename="Report Housekeeping Logs"
                sheet="tablexls"
                buttonText="Download Report of Housekeeping Logs To Excel"/>
                :
                this.state.mode ==="19"?
                
                <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button-style"
                table="table-to-xls-Logs"
                filename="Report Activity Logs"
                sheet="tablexls"
                buttonText="Download Report of Activity Logs To Excel"/>
                :
                this.state.mode ==="20"?
                
                <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button-style"
                table="table-to-xls-Cancelled"
                filename="Report Cancelled Booking"
                sheet="tablexls"
                buttonText="Download Report By Cancelled Booking To Excel"/>
                :this.state.mode ==="15" || this.state.mode ==="16" ||this.state.mode ==="17" ?
                
                <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button-style"
                table="table-to-xls-Refund"
                filename="Report Refund"
                sheet="tablexls"
                buttonText="Download Report By Refund To Excel"/>
                :
                
                this.state.mode ==='11'?
                 <ReactHTMLTableToExcel
                 id="test-table-xls-button"
                 className="download-table-xls-button-style"
                 table="table-to-xls-nationality"
                 filename="Report Nationality"
                 sheet="tablexls"
                 buttonText="Download Report By Nationality To Excel"/>
                 :

                 this.state.mode ==='12'?
<ReactHTMLTableToExcel
                 id="test-table-xls-button"
                 className="download-table-xls-button-style"
                 table="table-to-xls-goods"
                 filename="Report Goods"
                 sheet="tablexls"
                 buttonText="Download Report of Goods To Excel"/>
                 :

                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button-style"
                    table="table-to-xls"
                    filename="Report"
                    sheet="tablexls"
                    buttonText="Download To Excel"/>

                    

                   }


                  <div class="box-body" >
{this.state.mode ==="18" ?


<table  class="table table-hover"  id="table-to-xls-Housekeeping"  style={{  'display': 'block',
    'overflow-x': 'auto',' white-space': 'nowrap' }}>

    <tr>
    <th scope="col">#</th>
                        <th scope="col">Staff</th>
                        <th scope="col">Note</th>
                        <th scope="col">Checklist</th>
                        <th scope="col">Date</th>
                    
                       
                          
    </tr>
 

    { newData.length > 0 ? newData.map((info,index) =>
  <tr>
                                    <td scope="row"><p>{index+1}</p></td>
                                    <td>  {info.staff}  </td> 
                                    <td>  {info.note}  </td> 
                                    <td> <td>  { trial(info)} </td>  <td>  { trials(info)} </td> </td> 
                                   
                                    <td>  {moment(info.date *1000).format('MMM D, YYYY h:mm a')}  </td> 
                                  
                                  
                               
                               
                               
                                </tr>
                         
  ): null}  
</table>
:
this.state.mode ==="19" ?


<table  class="table table-hover"  id="table-to-xls-Logs"  style={{  'display': 'block',
    'overflow-x': 'auto',' white-space': 'nowrap' }}>

    <tr>
    <th scope="col">#</th>
                        <th scope="col">Staff</th>
                        <th scope="col">Description</th>
                        <th scope="col">Date</th>
                    
                       
                          
    </tr>
 

    { newData.length > 0 ? newData.map((info,index) =>
  <tr>
                                    <td scope="row"><p>{index+1}</p></td>
                                    <td>  {info.staff}  </td> 
                                    <td>  {info.description}  </td> 
                                    <td>  {moment(info.date *1000).format('MMM D, YYYY h:mm a')}  </td> 
                                  
                                  
                               
                               
                               
                                </tr>
                         
  ): null}  
</table>
:this.state.mode ==="20" ?


<table  class="table table-hover"  id="table-to-xls-Cancelled"  style={{  'display': 'block',
    'overflow-x': 'auto',' white-space': 'nowrap' }}>

    <tr>
    <th scope="col">#</th>
                        <th scope="col">Guest</th>
                        <th scope="col">Res. Code</th>
                        <th scope="col">Check in</th>
                        <th scope="col">Check out</th>
                        <th scope="col">Room Type</th>
                        <th scope="col">Room Rate</th>
                        <th scope="col">Payment Method</th>
                        <th scope="col">Contact No.</th>
                        <th scope="col">Address</th>
                        <th scope="col">Nationality</th>
                        <th scope="col">Email</th>
                        <th scope="col">Guest #</th>
                        <th scope="col">Discount/Voucher Code I.D</th>
                        <th scope="col">Discount/Voucher Amount</th>
                       
                          
    </tr>
 

    { newData.length > 0 ? newData.map((info,index) =>
  <tr>
                                    <td scope="row"><p>{index+1}</p></td>
                                    <td>  {info.name}  </td> 
                                    <td>  {info.reservation_code}  </td> 
                                    <td>  {moment(info.in_check *1000).format('MMM D, YYYY h:mm a')}  </td> 
                                    <td>  {moment(info.out_check *1000).format('MMM D, YYYY h:mm a')}  </td> 
                                    <td>  {info.room_name}  </td> 
                                    <td>  ₱{info.rate_mode  == 'Daily'? info.roomprice +' / Night':info.rate_mode  == 'Hour'? info.roomprice+' /'+ info.hour_duration+ 'Hours':info.rate_mode  == 'Promo' && info.duration_mode ==="Hour"? info.roomprice+' /'+ info.hour_duration+ 'Hours':info.roomprice+' /'+ info.hour_duration+ 'Night'}  </td> 
                                    <td>  {info.payment_method == ""? 'Cash': info.payment_method}  </td>
                                    <td> {info.phone_no}  </td>
                                    <td>  {info.address} </td>
                                    <td>  {info.nationality} </td>
                                    <td>  {info.email}</td>
                                    <td> {info.guest}</td>
                                <td>    {info.voucher_value == 0?'N/A':info.voucher_code} </td>

                                   <td>  {info.voucher_value == 0?  'N/A':  info.voucher_mode ==="Percentage"?info.voucher_value+'%':this.currencyFormat(parseFloat(info.voucher_value))}  </td>
                                    
                                  
                               
                               
                               
                                </tr>
                         
  ): null}  
</table>
:
this.state.mode ==="15" || this.state.mode ==="16" ||this.state.mode ==="17" ?


<table  class="table table-hover"  id="table-to-xls-Refund"  style={{  'display': 'block',
    'overflow-x': 'auto',' white-space': 'nowrap' }}>

    <tr>
    <th scope="col">#</th>
                        <th scope="col">Guest</th>
                        <th scope="col">Check in</th>
                        <th scope="col">Check out</th>
                        <th scope="col">Room Type</th>
                        <th scope="col">Room No</th>
                        <th scope="col">Check In Mode</th>
                        <th scope="col">Room Rate</th>
                        <th scope="col">Payment Method</th>
                        <th scope="col">Contact No.</th>
                        <th scope="col">Address</th>
                        <th scope="col">Nationality</th>
                        <th scope="col">Email</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Note</th>
                        <th scope="col">Guest #</th>
                        <th scope="col">Extra Person/s</th>
                        <th scope="col">Discounted Person</th>
                        <th scope="col">Discount Code I.D</th>
                        <th scope="col">Discount Amount</th>
                        <th scope="col">Penalty</th>
                        <th scope="col">Other Charges</th>
                        <th scope="col">Refunded Amount</th>
                        <th scope="col">Refunded Reason</th>
                          
    </tr>
 

    { newData.length > 0 ? newData.map((info,index) =>
  <tr>
                                    <td scope="row"><p>{index+1}</p></td>
                                    <td>  {info.customer}  </td> 
                                    <td>  {moment(info.check_in *1000).format('MMM D, YYYY h:mm a')}  </td> 
                                    <td>  {moment(info.check_out *1000).format('MMM D, YYYY h:mm a')}  </td> 
                                    <td>  {info.room_type}  </td> 
                                    <td>  {info.room_no}  </td> 
                                    <td>  {info.checkin_stat}  </td> 
                                    <td>  ₱{info.hour_price  == '' || info.hour_price  == undefined? info.price +' / Night': info.hour_price+' /'+ info.hour_duration+ 'Hours'}  </td> 
                                    <td>  {info.payment_method == ""? 'Cash': info.payment_method}  </td>
                                    <td> {info.contact}  </td>
                                    <td>  {info.address} </td>
                                    <td>  {info.nationality} </td>
                                    <td>  {info.email}</td>
                                    <td>{info.company}  </td>
                                    <td>  {info.note}  </td>
                                    <td> {info.no_person}</td>
                                    <td> {info.extra_person} </td>
                                <td>    {info.no_person_discount == ''?'N/A':info.no_person_discount} </td>
                                  <td>     {info.discount_code == ''?  'N/A':  info.discount_code}   </td> 
                                   <td>  {this.currencyFormat(parseFloat(info.discount_less))}  </td>
                                    
                                    <td> {this.currencyFormat(parseFloat(info.penalty))}  </td>
                                    <td>  {this.currencyFormat(parseFloat(info.extra_person)*150*parseFloat(info.number_of_days))}  </td>
                                    <td> {this.currencyFormat(parseFloat(info.refund))}  </td>
                                    <td>  {info.RefReason}  </td>
                                 
                               
                               
                               
                                </tr>
                         
  ): null}  
</table>
:

this.state.mode ==='11'?


<table  class="table table-hover" id="table-to-xls-nationality" style={{  'display': 'block',
    'overflow-x': 'auto',' white-space': 'nowrap' }}>
{ data.length > 0 ? data.map((infoNat,index) =>
<tr>
<td>
<table  class="table table-hover"  style={{  'display': 'block',
    'overflow-x': 'auto',' white-space': 'nowrap' }}>
<h4 align="left">{infoNat.name} - {infoNat.count} Guest</h4>

    <tr>
    <th scope="col">#</th>
                        <th scope="col">Guest</th>
                        <th scope="col">Stay</th>
                        <th scope="col">Check in</th>
                        <th scope="col">Check out</th>
                        <th scope="col">Room Type</th>
                        <th scope="col">Room No</th>
                        <th scope="col">Check In Mode</th>
                        <th scope="col">Room Rate</th>
                        <th scope="col">Payment Method</th>
                        <th scope="col">Contact No.</th>
                        <th scope="col">Address</th>
                        <th scope="col">Nationality</th>
                        <th scope="col">Email</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Note</th>
                        <th scope="col">Extension Rate</th>
                        <th scope="col">Extension Amount</th>
                        <th scope="col">Extended Person</th>
                        <th scope="col">Guest #</th>
                        <th scope="col">Extra Person/s</th>
                        <th scope="col">Discounted Person</th>
                        <th scope="col">Discount Code I.D</th>
                        <th scope="col">Discount Amount</th>
                        <th scope="col">Penalty</th>
                        <th scope="col">Other Charges</th>
                        <th scope="col">Change Room</th>
                          
    </tr>
 

    { newData.length > 0 ? newData.map((info,index) =>

info.nationality === infoNat.name?
  <tr>
                                    <td scope="row"><p>{index+1}</p></td>
                                    <td>  {info.customer}  </td> 
                                    <td>  {info.number_of_days != ''? info.number_of_days + ' Nights': info.number_of_hours + 'hours'} </td> 
                                    <td>  {moment(info.check_in *1000).format('MMM D, YYYY h:mm a')}  </td> 
                                    <td>  {moment(info.check_out *1000).format('MMM D, YYYY h:mm a')}  </td> 
                                    <td>  {info.room_type}  </td> 
                                    <td>  {info.room_no}  </td> 
                                    <td>  {info.checkin_stat}  </td> 
                                    <td>  ₱{info.hour_price  == '' || info.hour_price  == undefined? info.price +' / Night': info.hour_price+' /'+ info.hour_duration+ 'Hours'}  </td> 
                                    <td>  {info.payment_method == ""? 'Cash': info.payment_method}  </td>
                                    <td> {info.contact}  </td>
                                    <td>  {info.address} </td>
                                    <td>  {info.nationality} </td>
                                    <td>  {info.email}</td>
                                    <td>{info.company}  </td>
                                    <td>  {info.note}  </td>
                                    <td>  {this.currencyFormat(parseFloat(info.extension_amount))}  </td>
                                    <td>  {this.currencyFormat(parseFloat(info.extension_total_amount))}  </td>
                                    <td>  {info.extension_person}  </td>
                                    <td> {info.no_person}</td>
                                    <td> {info.extra_person} </td>
                                <td>    {info.no_person_discount == ''?'N/A':info.no_person_discount} </td>
                                  <td>     {info.discount_code == ''?  'N/A':  info.discount_code}   </td> 
                                   <td>  {this.currencyFormat(parseFloat(info.discount_less))}  </td>
                                    
                                    <td> {this.currencyFormat(parseFloat(info.penalty))}  </td>
                                    <td>  {this.currencyFormat(parseFloat(info.extra_person)*150*parseFloat(info.number_of_days))}  </td>
                                    <td> {info.room_change} </td>
                               
                               
                               
                                </tr>
                                :null
  ): null}  
</table>
</td>
</tr>
):null }
</table>




:

this.state.mode === '12'?

<table class="table table-hover" id="table-to-xls-goods" style={{  'display': 'block',
'overflow-x': 'auto',' white-space': 'nowrap' }}>
<thead>
<tr>

                    <th scope="col">#</th>
                    <th scope="col">Products</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Subtotal</th>
                    
                    
                    
                    
</tr>
</thead>
<tbody>
{ newDataGoods.length > 0 ? newDataGoods.map((info,index) =>
<tr>
                                <td scope="row"><p>{index+1}</p></td>
                                <td>  {info.item}  </td> 
                        
                                <td>  {  this.state.reports && this.state.reports.length ? this.state.reports.reduce((sum, i) => (
              
              sum +=  i.itemid === info.itemid ? i.quantity : 0
            ), 0) : 0} </td> 
                                <td>  {  this.state.reports && this.state.reports.length ? this.state.reports.reduce((sum, i) => (
              
              sum +=   i.itemid === info.itemid ? i.quantity*i.price: 0
            ), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 0} </td> 
                               
                           
                           
                            </tr>
): null}  

<tr>
<td colspan="3" style={{fontWeight: 'bold', alignSelf: 'flex-end'}}>  Total:  </td> 

<td>  {newDataGoods && newDataGoods.length ? newDataGoods.reduce((sum, iinfo) => (

sum +=  this.state.reports.reduce((sum, i) => ( sum +=  i.itemid === iinfo.itemid ? parseFloat(i.quantity)*parseFloat(i.price) : 0), 0)
), 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'):null}  </td> 
                    
                    
                    
                    
</tr>
</tbody>

</table>



:

              <table class="table table-hover" id="table-to-xls" style={{  'display': 'block',
    'overflow-x': 'auto',' white-space': 'nowrap' }}>
 <thead>
    <tr>
    
                        <th scope="col">#</th>
                        <th scope="col">Guest</th>
                        <th scope="col">Stay</th>
                        <th scope="col">Check in</th>
                        <th scope="col">Check out</th>
                        <th scope="col">Room Type</th>
                        <th scope="col">Room No</th>
                        <th scope="col">Check In Mode</th>
                        <th scope="col">Room Rate</th>
                        <th scope="col">Payment Method</th>
                        <th scope="col">Contact No.</th>
                        <th scope="col">Address</th>
                        <th scope="col">Nationality</th>
                        <th scope="col">Email</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Note</th>
                        <th scope="col">Extension Rate</th>
                        <th scope="col">Extension Amount</th>
                        <th scope="col">Extended Person</th>
                        <th scope="col">Guest #</th>
                        <th scope="col">Extra Person/s</th>
                        <th scope="col">Discounted Person</th>
                        <th scope="col">Discount Code I.D</th>
                        <th scope="col">Discount Amount</th>
                        <th scope="col">Penalty</th>
                        <th scope="col">Other Charges</th>
                        <th scope="col">Change Room</th>
                        
                        
    </tr>
  </thead>
  <tbody>
  { newData.length > 0 ? newData.map((info,index) =>
  <tr>
                                    <td scope="row"><p>{index+1}</p></td>
                                    <td>  {info.customer}  </td> 
                                    <td>  {info.number_of_days != ''? info.number_of_days + ' Nights': info.number_of_hours + 'hours'} </td> 
                                    <td>  {moment(info.check_in *1000).format('MMM D, YYYY h:mm a')}  </td> 
                                    <td>  {moment(info.check_out *1000).format('MMM D, YYYY h:mm a')}  </td> 
                                    <td>  {info.room_type}  </td> 
                                    <td>  {info.room_no}  </td> 
                                    <td>  {info.checkin_stat}  </td> 
                                    <td>  ₱{info.hour_price  == '' || info.hour_price  == undefined? info.price +' / Night': info.hour_price+' /'+ info.hour_duration+ 'Hours'}  </td> 
                                    <td>  {info.payment_method == ""? 'Cash': info.payment_method}  </td>
                                    <td> {info.contact}  </td>
                                    <td>  {info.address} </td>
                                    <td>  {info.nationality} </td>
                                    <td>  {info.email}</td>
                                    <td>{info.company}  </td>
                                    <td>  {info.note}  </td>
                                    <td>  {this.currencyFormat(parseFloat(info.extension_amount))}  </td>
                                    <td>  {this.currencyFormat(parseFloat(info.extension_total_amount))}  </td>
                                    <td>  {info.extension_person}  </td>
                                    <td> {info.no_person}</td>
                                    <td> {info.extra_person} </td>
                                <td>    {info.no_person_discount == ''?'N/A':info.no_person_discount} </td>
                                  <td>     {info.discount_code == ''?  'N/A':  info.discount_code}   </td> 
                                   <td>  {this.currencyFormat(parseFloat(info.discount_less))}  </td>
                                    
                                    <td> {this.currencyFormat(parseFloat(info.penalty))}  </td>
                                    <td>  {this.currencyFormat(parseFloat(info.extra_person)*150*parseFloat(info.number_of_days))}  </td>
                                 
                                    <td> {info.room_change} </td>
                               
                               
                                </tr>
  ): null}        
  </tbody>

</table>

}


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