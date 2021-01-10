import React, { Component } from "react";
import { Col, Row, Container,Button, FormGroup, Input } from 'reactstrap';
import '../components/home.css';
import $ from 'jquery';
import toastService from "../../utils/toastnotification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const toastservice = new toastService();


class Home extends Component {

    constructor(props) {
    super(props);

    this.state = {
      transaction_id:'',
    };
  }

    async componentDidMount() {
    await this.getTransactions();
  }

  async getTransactions() {
    await fetch('http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/transactions').
    then(response => response.json())
  .then(data => {
      if(data[0]!=undefined){
       this.setState({
       transaction_id:data[0].id
      })
      }
  })
  }

 async handleSubmit(airportJson,airCraftJson) {
     for(var i=0; i<airCraftJson.length;i++){
    $.ajax({
      url: "http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/aircrafts",
      type: "POST",
      data: { aircraft:{aircraft_no:airCraftJson[i].aircraft_no,
             airline:airCraftJson[i].airline,
             source:airCraftJson[i].source,
             destination:airCraftJson[i].destination
    }},
    });
    $.ajax({
      url: "http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/airports",
      type: "POST",
      data: { airport:{name:airportJson[i].airport_name,
             capacity:parseInt(airportJson[i].fuel_capacity),
             available:parseInt(airportJson[i].fuel_available)
    }},
    });
    if(i==airCraftJson.length-1){
        if(this.state.transaction_id!=''){
       $.ajax({
        url: `http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/transactions/${this.state.transaction_id}`,
        type: "DELETE",
    });
        }
         toastservice.success("Data Initialise Successfully !! ");
     }}
    }
  
  render () {

    let airCraftJson=[];
    let airportJson=[];
    let transactionJson=[];

    airportJson.push({"airport_name":"Mysore Airport","fuel_capacity":"2500","fuel_available":"2000"});
    airportJson.push({"airport_name":"Dehradun Airport","fuel_capacity":"2000","fuel_available":"1000"});
    airportJson.push({"airport_name":"Gorakhpur Airport","fuel_capacity":"4000","fuel_available":"2000"});
    airportJson.push({"airport_name":"Indore Airport","fuel_capacity":"5000","fuel_available":"1000"});
    airportJson.push({"airport_name":"Ludhina Airport","fuel_capacity":"6000","fuel_available":"6000"});
    
    airCraftJson.push({"aircraft_no":"6E-292","airline":"Indigo","source":"Guwahti","destination":"Chennai"});
    airCraftJson.push({"aircraft_no":"6E-9438","airline":"Air India","source":"Kolkata","destination":"Mumbai"});
    airCraftJson.push({"aircraft_no":"6E-263","airline":"SpiceJet","source":"Shimla","destination":"Goa"});
    airCraftJson.push({"aircraft_no":"6E-241","airline":"GoAir","source":"Pune","destination":"Hyderabad"});
    airCraftJson.push({"aircraft_no":"6E-152","airline":"TruJet","source":"Mumbai","destination":"Patna"});

    return (
      <Container fluid={true}>
       <ToastContainer />
        <Row className="intialiseData">
        <button type="submit" className="btn btn-primary btn-md" onClick={(e) => this.handleSubmit(airportJson,airCraftJson)}>
            Initialise the  Data
        </button>
      </Row>
      </Container>
    );
  }
};

export default Home;