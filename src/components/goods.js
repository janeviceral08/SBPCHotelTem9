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



export default class Goods extends Component {
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
category: [],
Category:'',
Quantity:0,
Price:0,
setProduct:'',
EditCategory:'',
EditQuantity:0,
EditPrice:0,
EditsetProduct:'',
Edit_id: '',
};
    
  }

  componentDidMount() {
    const hotel = {  val: localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID'), }
	axios.post('http://localhost:5000/Goods/get_Goods/', hotel)
	.then(response => {
    console.log('exercises: ', response.data)
	  this.setState({ exercises: response.data })
	})
	.catch((error) => {
	  console.log(error);
	})
    axios.post('http://localhost:5000/Goods/get_Category/', hotel)
	.then(response => {
    console.log('category: ', response.data)
	  this.setState({ category: response.data })
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
      console.log('User_info: ', response.data)
	})
	.catch((error) => {
	  console.log(error);
	})
   



  }


  onSubmit = () => {
   
    const {  Category,
        Quantity,
        Price,
        setProduct,
    } = this.state;


console.log('moment().unix(): ', moment().unix())


if (this.state.exercises.length>=this.state.projects.max_Goods) {
  cogoToast.error('You Aleady Exceed on you Goods Plan');
  return;
}
      if (Quantity<1) {
        cogoToast.error('Please Enter Minimum Stay Should Not Be Less Than 0');
        return;
      }
     
      if (Price<0) {
        cogoToast.error('Please Enter Minimum Stay Should Not Be Less Than 0');
        return;
      }
      
      if (!setProduct.trim()) {
        cogoToast.error('Please Enter Product Name');
        return;
      }

      
    
      cogoToast.success('Please wait');
      const part = localStorage.getItem('getInfoID')===null?'project='+localStorage.getItem('hotel_id').slice(5):localStorage.getItem('getInfoID');
      const exercise = { 
        _partition:part,
       name : setProduct,
       price : parseFloat(Price),
         quantity : parseFloat(Quantity),
       itemid : moment().unix().toString()+ part,
        cat : Category,
        length: this.state.exercises.length,
        max_Goods:this.state.projects.max_Goods
          }

          axios.post('http://localhost:5000/Goods/add_goods/', exercise)
          .then(res =>{
             
            if(res.data == 'added!'){
              window.location.reload()
            }
            else{
                cogoToast.error('Please Try Again');
            }
            
        })

    
};




onSubmitEdit = () => {
   
  const {  EditCategory,
    EditQuantity,
    EditPrice,
    EditsetProduct,
    Edit_id,
     } = this.state;
 

     if (EditQuantity<1) {
        cogoToast.error('Please Enter Minimum Stay Should Not Be Less Than 0');
        return;
      }
     
      if (EditPrice<0) {
        cogoToast.error('Please Enter Minimum Stay Should Not Be Less Than 0');
        return;
      }
      
      if (!EditsetProduct.trim()) {
        cogoToast.error('Please Enter Product Name');
        return;
      }

      

    cogoToast.success('Please wait');
 
    const exercise = { 
    
        name:EditsetProduct,
   
        price:parseFloat(EditPrice),
        quantity:parseFloat(EditQuantity),
        cat:EditCategory,
    
      id: Edit_id,
        }
       
      axios.post('http://localhost:5000/Goods/update_goods', exercise)
      .then(res => window.location.reload())

  
  
};

onDelete = (id,title) => {
    const exercise = {
        id: id,
      }
    confirmAlert({
        title: 'Confirm to Delete '+title,
        message: 'Are you sure to do this?',
        buttons: [
          {
            label: 'Yes',
            onClick: () =>  {cogoToast.success('Please wait'); axios.post('http://localhost:5000/Goods/delete_goods', exercise)
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

handleOpen = (vou) => {

  this.setState({open:true,
    EditCategory:vou.cat,
    EditQuantity:vou.quantity,
    EditPrice:vou.price,
    EditsetProduct:vou.product,
    Edit_id: vou._id,

});
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

showCat (cat){
if(cat === undefined){

    return 'All';
}else{
const category = this.state.category.filter(item =>item.catid === cat);
const newCat = category[0];
const nameCat = newCat===undefined? "All":newCat.name;
return (nameCat);}



}

handleCategory = () => {
    this.props.history.push('GoodsCategory')
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
				
          <label for="file">Product Name:</label><br />
          <TextField id="outlined-basic" label="Product Name" style={{width: '100%'}} variant="outlined" name="EditsetProduct" onChange={this.onChangedescription}   value={this.state.EditsetProduct}/>
          <br />
          <label for="file">Price:</label><br />
          <TextField id="outlined-basic" label="Price" style={{width: '100%'}} variant="outlined" name="EditPrice" onChange={this.onChangedescription} error={isNaN(this.state.EditPrice) === true ? true: false} helperText="Incorrect entry. Must be a number" value={Math.round(this.state.EditPrice)}/>
          <br />
         
         </div>
         <div class="col-xl-6">
         <label for="file">Quantity:</label><br />
          <TextField id="outlined-basic" label="Quantity" style={{width: '100%'}} variant="outlined" name="EditQuantity" onChange={this.onChangedescription} error={isNaN(this.state.EditQuantity) === true ? true: false} helperText="Incorrect entry. Must be a number" value={Math.round(this.state.EditQuantity)}/>
          <br />
          <label for="file">Category:</label><br />

          <FormControl variant="outlined" style={{width: '100%'}}>
        <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.EditCategory}
          onChange={this.onChangedescription}
          name="EditCategory"
          label="Category"
        >
              {this.state.category.map((info)=>
           <MenuItem value={info.catid}>{info.name}</MenuItem>
          
          )
              
          }
         
     
        </Select>
      </FormControl>
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
      <label for="file">Product Name:</label><br />
          <TextField id="outlined-basic" label="Product Name" style={{width: '100%'}} variant="outlined" name="setProduct" onChange={this.onChangedescription}   value={this.state.setProduct}/>
          <br />
          <label for="file">Price:</label><br />
          <TextField id="outlined-basic" label="Price" style={{width: '100%'}} variant="outlined" name="Price" onChange={this.onChangedescription} error={isNaN(this.state.Price) === true ? true: false} helperText="Incorrect entry. Must be a number" value={Math.round(this.state.Price)}/>
          <br />
         </div>
         <div class="col-xl-6">
         <label for="file">Quantity:</label><br />
          <TextField id="outlined-basic" label="Quantity" style={{width: '100%'}} variant="outlined" name="Quantity" onChange={this.onChangedescription} error={isNaN(this.state.Quantity) === true ? true: false} helperText="Incorrect entry. Must be a number" value={Math.round(this.state.Quantity)}/>
          <br />
          <label for="file">Category:</label><br />

          <FormControl variant="outlined" style={{width: '100%'}}>
        <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={this.state.Category}
          onChange={this.onChangedescription}
          name="Category"
          label="Category"
        >
          {this.state.category.map((info)=>
           <MenuItem value={info.catid}>{info.name}</MenuItem>
          
          )
              
          }
         
     
        </Select>
      </FormControl>   <br />
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
              <li class="treeview active">
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
     {this.state.exercises.length>=this.state.projects.max_Goods?null:   
     <Button
     variant="contained"
        color="primary"
        size="large"
        onClick={this.handleOpenAdd}
        startIcon={<SaveIcon />}
      >
        Add Goods
      </Button>}
<span>&nbsp;</span>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={this.handleCategory}
        startIcon={<SaveIcon />}
      >
        Goods Categories
      </Button>
            <ol class="breadcrumb">
              <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
              <li class="active">  Goods</li>
             
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
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Category</th>
                        <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  { this.state.exercises.length > 0 ?this.state.exercises.map((room,index) =>
    <tr>
                                    <td scope="row"><p>{index+1}</p></td>
                                    <td>{room.product}</td> 
                                    <td>{room.price}</td>
                                    <td>{room.quantity}</td>
                                    <td>{room.cat ===''? null:this.showCat(room.cat)}</td>
                                    <td>
                                                            <Link to="#" onClick={() => this.handleOpen(room)}>
                                                            <i class='fa fa fa-pencil-square-o' style={{fontSize: 30}}></i>
															</Link>
                                                            <Link to="#" onClick={() => this.onDelete(room._id, room.name)} style={{fontSize: 30}}>
                                                            <i class='fa fa-trash text-red' title='Delete'></i>
															</Link>   
                                    </td>
                                 
                                </tr>



)
:null
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