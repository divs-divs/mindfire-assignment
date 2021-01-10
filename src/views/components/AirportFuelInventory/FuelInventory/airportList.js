import React, { Component } from "react";
import '../../../../views/modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from 'reactstrap';
import PropTypes from "prop-types";
import AirportAddModal from "./addAirportModal";


class AirportList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      airports:[],
      showPopup: false,
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
    this.getAirports();
  }

  componentDidMount() {
    this.getAirports()
  }

  async getAirports() {
    await fetch('http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/airports').
    then(response => response.json())
  .then(data => this.setState({
    airports:data
  }));
  
  }

  render(){
    let airportDetails = ''
    if (this.state.airports.length) {
      airportDetails = this.state.airports.map((item,index) => (
        <tr>
            <td>{index+1}</td> 
            <td>{item.name}</td>
            <td>{item.capacity}</td>
            <td>{item.available}</td>
        </tr>
      ))
    }
    return (
          <div>
            <ToastContainer />
            <div className="col-sm-12">
            <button onClick={this.togglePopup.bind(this)} className="btn btn-info pull-right mb-3">
            <FontAwesomeIcon icon={faPlus} size="sm" className="mr-1" />Add Airport</button>
              {this.state.showPopup ? 
                  <AirportAddModal
                  entityId = {this.props.entityId}
                  showPopup={this.state.showPopup}
                  togglePopup={this.togglePopup.bind(this)}
                  refresh={()=>this.getUsers()}
                />
                : null}
              <table className="table table-responsive-sm table-striped">
                <thead>
                  <tr>
                    <th>Airport Id</th>
                    <th>Airport Name</th>
                    <th>Fuel Capacity</th>
                    <th>Fuel Available</th>
                  </tr>
                </thead>
                <tbody>
                  {airportDetails}
                </tbody>
              </table>
            </div>
          </div>  
    );
  }
};

export default (AirportList);