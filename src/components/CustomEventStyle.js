import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import { Card } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon  from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import { ViewState } from '@devexpress/dx-react-scheduler';

import Grid from '@material-ui/core/Grid';
import Room from '@material-ui/icons/Room';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import Popover from "@material-ui/core/Popover"
import { makeStyles } from "@material-ui/core";
import { PropTypes, array } from "prop-types";

import "react-big-scheduler/lib/css/style.css";
import Scheduler, {
  SchedulerData,
  ViewTypes,
  DemoData,
  DATE_FORMAT
} from "react-big-scheduler";
import ReactDOM from "react-dom";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'


const style = ({ palette }) => ({
 
  textCenter: {
    textAlign: 'left',
  },
  commandButton: {
    backgroundColor: 'white',
  },
});









 class CustomEventStyle extends Component {
    constructor(props) {
        super(props);
    
        let schedulerData = new SchedulerData(
            new moment().format(DATE_FORMAT),
            ViewTypes.Month, false, false,
      
   
    
    {      schedulerWidth: '70%',

    resourceName: 'Rooms',
              views: [
                  {viewName: 'Monthly', viewType: ViewTypes.Month, showAgenda: false, isEventPerspective: false},
                  {viewName: 'Yearly', viewType: ViewTypes.Year, showAgenda: false, isEventPerspective: false},
              ]
          }
          );
        //let schedulerData = new SchedulerData("2017-12-18", ViewTypes.Month);
        schedulerData.localeMoment.locale("en");
        schedulerData.setResources(this.props.rooms);
        schedulerData.setEvents(this.props.scheds);
        
        this.state = {
          viewModel: schedulerData, 
          scheds: null,
          open: false,
          setShow: false,
          ID: "",
          name: "",
          email: "",
          phone_no: "",
          address: "",
          nationality: "",
          mode: "",
          reservation_code: "",
          incheck: "",
          outcheck: "",
          room: "",
          guest: "",
          part: "",
          reason: "",
          id: "",
          reservation_code: "",
         
        };
      }
    
      handleSaveLocation = () => {
        let schedulerData = new SchedulerData(
            new moment().format(DATE_FORMAT),
            ViewTypes.Month, false, false, {
                schedulerWidth: '70%',

                resourceName: 'Rooms',
              views: [
                  {viewName: 'Monthly', viewType: ViewTypes.Month, showAgenda: false, isEventPerspective: false},
                  {viewName: 'Yearly', viewType: ViewTypes.Year, showAgenda: false, isEventPerspective: false},
              ]
          }
          );
          //let schedulerData = new SchedulerData("2017-12-18", ViewTypes.Month);
          schedulerData.localeMoment.locale("en");
          schedulerData.setResources(this.props.rooms);
          schedulerData.setEvents(this.props.scheds);
          
          this.setState({viewModel: schedulerData, scheds: this.props.scheds})

      }




      eventItemTemplateResolver = (schedulerData, event, bgColor, isStart, isEnd, mustAddCssClass, mustBeHeight, agendaMaxEventWidth) => {
        let borderWidth = isStart ? '4' : '0';
        let borderColor =  'rgba(0,139,236,1)', backgroundColor = '#80C5F6';
        let titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, event);
        if(!!event.status){
            borderColor = event.status == 'Confirmed' ? 'rgba(0,139,236,1)' : (event.status == 'For Reservation' ? 'rgba(245,60,43,1)' : '#999');
            backgroundColor = event.status == 'Confirmed' ? '#80C5F6' : (event.status == 'For Reservation' ? '#FA9E95' : '#D9D9D9');
        }
        let divStyle = {borderLeft: borderWidth + 'px solid ' + borderColor, backgroundColor: backgroundColor, height: mustBeHeight };
        if(!!agendaMaxEventWidth)
            divStyle = {...divStyle, maxWidth: agendaMaxEventWidth};
    
        return <div key={event.id} className={mustAddCssClass} style={divStyle}>
            <span style={{marginLeft: '4px', lineHeight: `${mustBeHeight}px` }}>{titleText}</span>
        </div>;
    }
    
    
    
    
      eventItemPopoverTemplateResolver = (schedulerData, eventItem, title, start, end, id, _id, statusColor) => {
        return (
            // <React.Fragment>
            //     <h3>{title}</h3>
            //     <h5>{start.format("HH:mm")} - {end.format("HH:mm")}</h5>
            //     <img src="./icons8-ticket-96.png" />
            // </React.Fragment>
            <div style={{width: '300px'}}>
              {eventItem.status === 'For Reservation'? 
              <Row type="flex" align="middle">
              <Col span={2}>
              
              </Col>
              <Col span={22}>
              <Button
      variant="contained"
      color="primary"
      onClick={()=>this.approved(eventItem._id,eventItem.id)}
      startIcon={<SaveIcon  />}
    >
      Accept
    </Button>
              <Button
    onClick={()=>this.handleOpen(eventItem._id,eventItem.id)}
    style={{marginLeft: '50px'}}
      variant="contained"
      color="secondary"
      startIcon={<DeleteIcon />}
    >
      Decline
    </Button>
              </Col>
          </Row>
          :
          <Row type="flex" align="middle">
                    <Col span={2}>
                    
                    </Col>
                    <Col span={22}>
               
                    <Button
          onClick={()=>this.handleOpen(eventItem._id,eventItem.id)}
          style={{marginLeft: '50px'}}
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Cancel
          </Button>
                    </Col>
                </Row>
            
            
            }
               
                <Row type="flex" align="middle">
                    <Col span={2}>
                        <div className="status-dot" style={{backgroundColor: eventItem.bgColor}} />
                    </Col>
                    <Col span={22} className="overflow-text">
                        <span className="header2-text" title={title}>{title}</span> <br />
                        <span className="header2-text" title={eventItem.id}>Resv.:{eventItem.id}</span>
                    </Col>
                </Row>
             
                <Row type="flex" align="middle">
                    <Col span={2}>
                        <div />
                    </Col>
                    <Col span={22}>
                        <span className="header1-text" style={{fontSize: 13}}>{start.format("MMM D, YYYY HH:mm a")} - {end.format("MMM D, YYYY HH:mm a")}</span>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={2}>
                    <i class="fa fa-user"></i>
                    </Col>
                    <Col span={22} className="overflow-text">
                        <span className="header2-text" title={eventItem.id}>Guest No.:{eventItem.guest}</span>
                    </Col>
                </Row>
                
                <Row type="flex" align="middle">
                    <Col span={2}>
                    <i class="fa fa-user"></i>
                    </Col>
                    <Col span={22} className="overflow-text">
                        <span className="header2-text" title={eventItem.id}>Email:{eventItem.email}</span>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={2}>
                    <i class="fa fa-user"></i>
                    </Col>
                    <Col span={22} className="overflow-text">
                        <span className="header2-text" title={eventItem.id}>Phone No.:{eventItem.phone_no}</span>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={2}>
                    <i class="fa fa-user"></i>
                    </Col>
                    <Col span={22} className="overflow-text">
                        <span className="header2-text" title={eventItem.id}>Address:{eventItem.address}</span>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={2}>
                    <i class="fa fa-user"></i>
                    </Col>
                    <Col span={22} className="overflow-text">
                        <span className="header2-text" title={eventItem.id}>Nationality:{eventItem.nationality}</span>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={2}>
                    <i class="fa fa-user"></i>
                    </Col>
                    <Col span={22} className="overflow-text">
                        <span className="header2-text" title={eventItem.id}>Pref. Mode of Payment:{eventItem.mode}</span>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={2}>
                    <i class="fa fa-user"></i>
                    </Col>
                    <Col span={22} className="overflow-text">
                        <span className="header2-text" title={eventItem.id}>Reserve on:{moment(eventItem.createdAt* 1000).format('MMM D, YYYY h:mm a')}</span>
                    </Col>
                </Row>
               
            </div>
        );
    }
      prevClick = schedulerData => {
        schedulerData.prev();
        schedulerData.setEvents(this.state.scheds);
        this.setState({
          viewModel: schedulerData
        });
      };
    
      nextClick = schedulerData => {
        schedulerData.next();
        schedulerData.setEvents(this.state.scheds);
        this.setState({
          viewModel: schedulerData
        });
      };
    
      onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(
          view.viewType,
          view.showAgenda,
          view.isEventPerspective
        );
        schedulerData.setEvents(this.state.scheds);
        this.setState({
          viewModel: schedulerData
        });
      };
    
      onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(this.state.scheds);
        this.setState({
          viewModel: schedulerData
        });
      };
    
      eventClicked = (schedulerData, event) => {
        return (  
        <div style={{width: '300px'}}>
        <Row type="flex" align="middle">
            <Col span={2}>
                <div className="status-dot" style={{backgroundColor: event.bgColor}} />
            </Col>
            <Col span={22} className="overflow-text">
                <span className="header2-text" title={event.title}>{event.title}</span> <br />
                <span className="header2-text" title={event.id}>Resv.:{event.id}</span>
            </Col>
        </Row>
     
        <Row type="flex" align="middle">
            <Col span={2}>
                <div />
            </Col>
            <Col span={22}>
                <span className="header1-text" style={{fontSize: 13}}>{moment(event.start).format("MMM D, YYYY HH:mm a")} - {moment(event.end).format("MMM D, YYYY HH:mm a")}</span>
            </Col>
        </Row>
        <Row type="flex" align="middle">
            <Col span={2}>
            <i class="fa fa-user"></i>
            </Col>
            <Col span={22} className="overflow-text">
                <span className="header2-text" title={event.guest}>Guest No.:{event.guest}</span>
            </Col>
        </Row>
        
        <Row type="flex" align="middle">
            <Col span={2}>
            <i class="fa fa-user"></i>
            </Col>
            <Col span={22} className="overflow-text">
                <span className="header2-text" title={event.email}>Email:{event.email}</span>
            </Col>
        </Row>
        <Row type="flex" align="middle">
            <Col span={2}>
            <i class="fa fa-user"></i>
            </Col>
            <Col span={22} className="overflow-text">
                <span className="header2-text" title={event.phone_no}>Phone No.:{event.phone_no}</span>
            </Col>
        </Row>
        <Row type="flex" align="middle">
            <Col span={2}>
            <i class="fa fa-user"></i>
            </Col>
            <Col span={22} className="overflow-text">
                <span className="header2-text" title={event.address}>Address:{event.address}</span>
            </Col>
        </Row>
        <Row type="flex" align="middle">
            <Col span={2}>
            <i class="fa fa-user"></i>
            </Col>
            <Col span={22} className="overflow-text">
                <span className="header2-text" title={event.nationality}>Nationality:{event.nationality}</span>
            </Col>
        </Row>
        <Row type="flex" align="middle">
            <Col span={2}>
            <i class="fa fa-user"></i>
            </Col>
            <Col span={22} className="overflow-text">
                <span className="header2-text" title={event.mode}>Pref. Mode of Payment:{event.mode}</span>
            </Col>
        </Row>
        <Row type="flex" align="middle">
            <Col span={2}>
            <i class="fa fa-user"></i>
            </Col>
            <Col span={22} className="overflow-text">
                <span className="header2-text" title={event.createdAt}>Reserve on:{moment(event.createdAt* 1000).format('MMM D, YYYY h:mm a')}</span>
            </Col>
        </Row>
        <Row type="flex" align="middle">
            <Col span={2}>
            
            </Col>
            <Col span={22}>
            <Button
    variant="contained"
    color="primary"
    onClick={()=>this.approved(event._id,event.id)}
    startIcon={<SaveIcon  />}
    >
    Accept
    </Button>
            <Button
    onClick={()=>this.handleOpen(event._id,event.id)}
    style={{marginLeft: '50px'}}
    variant="contained"
    color="secondary"
    startIcon={<DeleteIcon />}
    >
    Decline
    </Button>
            </Col>
        </Row>
    </div>)
      };
    
    
     
    
     
    
    
      onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
        if (schedulerData.ViewTypes === ViewTypes.Day) {
          schedulerData.next();
          schedulerData.setEvents(this.state.scheds);
          this.setState({
            viewModel: schedulerData
          });
    
          schedulerContent.scrollLeft = maxScrollLeft - 10;
        }
      };
    
      onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
        if (schedulerData.ViewTypes === ViewTypes.Day) {
          schedulerData.prev();
          schedulerData.setEvents(this.state.scheds);
          this.setState({
            viewModel: schedulerData
          });
    
          schedulerContent.scrollLeft = 10;
        }
      };
    
      onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log("onScrollTop");
      };
    
      onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log("onScrollBottom");
      };
    
      toggleExpandFunc = (schedulerData, slotId) => {
        schedulerData.toggleExpandStatus(slotId);
        this.setState({
          viewModel: schedulerData
        });
      };
    
  approved = (id,title) => {
    const exercise = {
        id: id
      }
    confirmAlert({
        title: 'Confirm to Approved res. '+title,
        message: 'Are you sure to do this?',
        buttons: [
          {
            label: 'Yes',
            onClick: () =>
            
             axios.post('http://localhost:5000/reservation/approved', exercise)
            .then(res =>{
             
              window.location.reload()
            })
          },
          {
            label: 'No',
            onClick: () => console.log('no')
          }
        ]
      });
    
};



cancelled = () => {
  const exercise = {
      id: this.state.id,
      reason: this.state.reason
    }
    if(!this.state.reason){
      cogoToast.error('Please Enter Reason of Cancellation')
    }
    
   cogoToast.success('Please Wait...')
    axios.post('http://localhost:5000/reservation/cancel', exercise)
    .then(res =>{
     
      window.location.reload()
    })
  
};


 handleOpen = (id,reservation_code) => {

  this.setState({open:true, id: id, reservation_code: reservation_code});
};

 handleClose = () => {
  this.setState({open: false});
};
onChangeReason = event => {
  console.log('reason: ',event.target.value )
  this.setState({reason: event.target.value})

};

    

      render() {
        const { viewModel, scheds } = this.state;
        console.log('pass: ', this.props.scheds)
        console.log('rooms: ', this.props.rooms)
        console.log('viewModel: ', viewModel)
        console.log('scheds: ', scheds)
        return (<div>


<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
  width: '40%',
  marginTop: '10%',
marginLeft: '30%'
    
    }}>
            <h2 id="transition-modal-title">Reason Of Cancellation</h2>
            <label for="file">Reservation Code:</label><br />
<TextField id="outlined-basic" label="Reservation Code" variant="outlined" value={this.state.reservation_code} InputProps={{
            readOnly: true,
          }} /><br />
            <label for="file">Reason:</label><br />
<TextField id="outlined-basic" label="Reason" variant="outlined"  onChange={this.onChangeReason} /><br /><br />
<button type="submit" name="import" class="btn btn-primary btn-sm" onClick={this.cancelled} >&nbsp;&nbsp;Save&nbsp;&nbsp;</button> <br />
          </div>
        </Fade>
      </Modal>


      <button type="submit" class="btn btn-primary btn-sm" style={{fontSize: 18}}onClick={this.handleSaveLocation}>&nbsp;&nbsp;Refresh Table Data&nbsp;&nbsp;</button>

<div >

          <Scheduler
            schedulerData={viewModel}
            schedulerWidth={'50%'}
            prevClick={this.prevClick}
            nextClick={this.nextClick}
            onSelectDate={this.onSelectDate}
            onViewChange={this.onViewChange}
            eventItemClick={this.eventClicked}
            onScrollLeft={this.onScrollLeft}
            onScrollRight={this.onScrollRight}
            onScrollTop={this.onScrollTop}
            onScrollBottom={this.onScrollBottom}
            toggleExpandFunc={this.toggleExpandFunc}
            eventItemTemplateResolver={this.eventItemTemplateResolver}
            eventItemPopoverTemplateResolver={this.eventItemPopoverTemplateResolver}
          />
          
        </div>        

          </div>
        );
      }
 }

export default DragDropContext(HTML5Backend)(CustomEventStyle);