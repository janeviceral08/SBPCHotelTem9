import React from 'react';
//import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import Home from "./components/home";
import CreateUser from "./components/create-user.component";

import Admin from "./components/admin";
import Guest_FeedBack from "./components/Guest_FeedBack";
import Highlight_Activities from "./components/Highlight_Activities";
import Rooms from "./components/Rooms";
import Vacation_Ideas from "./components/Vacation_Ideas";
import Additional_Info from "./components/additional_Info";
import Hotel_Offers from "./components/Hotel_Offers";

import Print_info from "./components/print_info"
import Additional_info_user from "./components/additional_info_user";
import Add_inf from "./components/add_inf";

import Room_Details from "./components/room_details";
import Contact from "./components/contact";
import Voucher from "./components/voucher";
import Goods from "./components/goods";
import GoodsCategory from "./components/GoodsCategory";
import Reports from "./components/Reports";


import './files/css/linearicons.css';
import './files/css/font-awesome.min.css';
import './files/css/bootstrap.css';
import './files/css/magnific-popup.css';
import './files/css/jquery-ui.css';
import './files/css/nice-select.css';
import './files/css/animate.min.css';
import './files/css/owl.carousel.css';
import './files/css/main.css';

function App() {

  
  return (
    <Router>

  
      <Route path="/" exact component={ExercisesList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/user" component={CreateUser} />
      <Route path="/Home" component={Home} />
      <Route path="/Room_Details" component={Room_Details} />
      <Route path="/Contact" component={Contact} />

      <Route path="/Admin" component={Admin} />
      <Route path="/Guest_FeedBack" component={Guest_FeedBack} />
      <Route path="/Highlight_Activities" component={Highlight_Activities} />
      <Route path="/Rooms" component={Rooms} />
      <Route path="/Vacation_Ideas" component={Vacation_Ideas} />
      <Route path="/Additional_Info" component={Additional_Info} />
      <Route path="/Hotel_Offers" component={Hotel_Offers} />
      <Route path="/Voucher" component={Voucher} />
      <Route path="/Goods" component={Goods} />
      <Route path="/GoodsCategory" component={GoodsCategory} />
      <Route path="/Reports" component={Reports} />
      <Route path="/Print_info/:name/:email/:phone_no/:address/:nationality/:mode/:reservation_code/:in_check/:out_check/:room/:guest" component={Print_info} />
      <Route path="/Additional_info_user/:room/:check_in/:check_out/:guest" component={Additional_info_user} />
      <Route path="/Add_inf/:room/:check_in/:check_out/:guest" component={Add_inf} />
      
    </Router>
  );
}

export default App;
