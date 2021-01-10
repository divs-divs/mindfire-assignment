import React, { Component } from "react";
import '../../../../views/modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from 'reactstrap';
import PropTypes from "prop-types";
import TransactionAddModal from "./transactionAddModal";
import AirportAddModal from "./addAirportModal";


class TransactionList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      transactions:[],
      listOfAirports:[],
      listOfAircrafts:[],
      transactionType:'',
      showPopup: false,
    };
  }

  togglePopup(transactionType) {
    this.setState({
      showPopup: !this.state.showPopup,
      transactionType:transactionType
    });
  }

  async componentDidMount() {
    await this.getTransactions();
   await this.getAirportList();
    await this.getAircraftList();
  }

  async getTransactions() {
    await fetch('http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/transactions').
    then(response => response.json())
  .then(data => this.setState({
    transactions:data
  }));
  }


     async getAirportList(){
    let airportList = [];  
    let airportListJson = []; 
    await fetch('http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/airports').
    then(response => response.json())
     .then(data => 
           data.map(element=>{
           airportListJson.push({
            label:element.name,
            value:element.id
        })})
     );
     this.setState({
        listOfAirports: airportListJson,
     })
  
   }

   async getAircraftList(){
    let aircraftList = [];  
    let aircraftListJson = []; 
    await fetch('http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/aircrafts').
    then(response => response.json())
     .then(data => 
        data.map(element=>{
        aircraftListJson.push({
            label:element.airline,
            value:element.id
        })
     })
     );
     this.setState({
        listOfAircrafts: aircraftListJson,
     })
  
   }

  render(){
    let transactionDetails = ''
    if (this.state.transactions.length &&this.state.listOfAirports.length && this.state.listOfAircrafts.length) {
      transactionDetails = this.state.transactions.map((item,index) => (
        <tr>
            <td>{index+1}</td> 
            <td>{(item.transaction_date_time.replace('T',' ')).replace('Z','')}</td>
            <td>{item.transaction_type}</td>
            <td>{typeof this.state.listOfAirports.filter(a=>a.value== item.airport_id)[0]!=undefined?this.state.listOfAirports.filter(a=>a.value == item.airport_id)[0].label:''}</td>
            <td>{item.transaction_type=="OUT" && item.aircraft_id}</td>
            <td>{item.quantity}</td>
            <td>{item.transaction_id_parent}</td>
        </tr>
      ))
    }
    return (
    <div className="mt-4">
        <ToastContainer/>
        <div className="col-sm-12 col-12">
          <div className="card">
            <div className="card-header font-weight-bold">
               Transactions
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-8 mb-1">
                </div>
                <div className="col-12">
          <div>
            <ToastContainer />
            <div className="col-sm-12">
            <button onClick={this.togglePopup.bind(this,"IN")} className="btn btn-info pull-right mb-3">
            <FontAwesomeIcon icon={faPlus} size="sm" className="mr-1" />Add Transaction</button>
            <button onClick={this.togglePopup.bind(this,"OUT")} className="btn btn-info pull-right mb-3 reverseTransaction">
            <FontAwesomeIcon icon={faPlus} size="sm" className="mr-1" />Add Reverse Transaction</button>
              {this.state.showPopup ? 
                  <TransactionAddModal
                  refresh = {()=>this.getTransactions()}
                  showPopup={this.state.showPopup}
                  togglePopup={this.togglePopup.bind(this)}
                  transactionType={this.state.transactionType}
                />
                : null}
              <table className="table table-responsive-sm table-striped">
                <thead>
                  <tr>
                    <th>Transaction Id</th>
                    <th>Transaction DateTime</th>
                    <th>Transaction Type</th>
                    <th>Airport</th>
                    <th>Aircraft Id</th>
                    <th>Quantity</th>
                    <th>Transaction Id Parent</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionDetails}
                </tbody>
              </table>
            </div>
          </div>  
                </div>   
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
    );
  }
};



export default (TransactionList);