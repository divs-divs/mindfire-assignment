import React, { Component } from "react";
import '../../../../views/modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from 'reactstrap';
import PropTypes from "prop-types";
import AircraftAddModal from "./addAircraftModal";
import AirportAddModal from "./addAirportModal";


class AircraftList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      aircrafts:[],
      showPopup: false,
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  componentDidMount() {
    this.getAircrafts()
  }

  async getAircrafts() {
    await fetch('http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/aircrafts').
    then(response => response.json())
  .then(data => this.setState({
    aircrafts:data
  }));
  }

  render(){
    let aircraftDetails = ''
    if (this.state.aircrafts.length) {
      aircraftDetails = this.state.aircrafts.map((item,index) => (
        <tr>
            <td>{index+1}</td> 
            <td>{item.aircraft_no}</td>
            <td>{item.airline}</td>
            <td>{item.source}</td>
            <td>{item.destination}</td>
        </tr>
      ))
    }
    return (
          <div>
            <ToastContainer />
            <div className="col-sm-12">
            <button onClick={this.togglePopup.bind(this)} className="btn btn-info pull-right mb-3">
            <FontAwesomeIcon icon={faPlus} size="sm" className="mr-1" />Add AirCraft</button>
              {this.state.showPopup ? 
                  <AircraftAddModal
                  refresh = {()=>this.getAircrafts()}
                  showPopup={this.state.showPopup}
                  togglePopup={this.togglePopup.bind(this)}
                  entityType={this.props.entityType}
                />
                : null}
              <table className="table table-responsive-sm table-striped">
                <thead>
                  <tr>
                    <th>Aircraft Id</th>
                    <th>Aircraft No</th>
                    <th>Aircraft Name</th>
                    <th>Source</th>
                    <th>Destination</th>
                  </tr>
                </thead>
                <tbody>
                  {aircraftDetails}
                </tbody>
              </table>
            </div>
          </div>  
    );
  }
};



export default (AircraftList);