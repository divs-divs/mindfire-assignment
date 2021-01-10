import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Pdf from "react-to-pdf";
const ref = React.createRef();

class FuelConsumptionReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      airports:[],
      aircrafts:[],
      transactions:[]
    };
  }

   async componentDidMount() {
    await this.getTransactions();
    await this.getAirports()
    await this.getAircrafts()
   }

   async getTransactions() {
    await fetch('http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/transactions').
    then(response => response.json())
    .then(data => this.setState({
    transactions:data
    }));
  }

    async getAirports() {
       await fetch('http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/airports').
      then(response => response.json())
     .then(data => this.setState({
      airports:data
     }));
  }

    async getAircrafts() {
       await fetch('http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/aircrafts').
      then(response => response.json())
     .then(data => this.setState({
      aircrafts:data
     }));
  }

    render () {
        let consumptionReport = [];
            if (this.state.transactions.length&&this.state.airports.length&&this.state.aircrafts.length) {
             consumptionReport = this.state.transactions.map((item,index) => (
               <tr>
                <td>{this.state.airports && typeof this.state.airports.filter(airport=>airport.id==item.airport_id)[0] != undefined &&this.state.airports.filter(airport=>airport.id==item.airport_id)[0].name}</td>
                <td>{(item.transaction_date_time.replace('T',' ')).replace('Z','')}</td>
                <td>{item.transaction_type}</td>
                <td>{this.state.airports && this.state.airports.filter(airport=>airport.id==item.airport_id)[0] !=undefined &&  this.state.airports.filter(airport=>airport.id==item.airport_id)[0]!=undefined && this.state.airports.filter(airport=>airport.id==item.airport_id)[0].capacity}</td>
                <td>{this.state.aircrafts && item.transaction_type=="OUT" && this.state.aircrafts.filter(aircrafts=>aircrafts.id==item.aircraft_id)[0] !=undefined && this.state.aircrafts.filter(aircrafts=>aircrafts.id==item.aircraft_id)[0].aircraft_no}</td>
                <td>{this.state.airports && this.state.airports.filter(airport=>airport.id==item.airport_id)[0]!=undefined && this.state.airports.filter(airport=>airport.id==item.airport_id)[0].available}</td>
              </tr>
      ))
    }

        const {t} = this.props;
        const closebtn = <button className="close" onClick={this.props.togglePopup}>&times;</button>;
        return (
            <Modal isOpen={this.props.showPopup}
                size="lg"
                toggle={this.props.togglePopup}
                className="modal-dialog modal-report"
            >
                <ModalHeader close={closebtn}> Fuel Consumption Report 
                  <Pdf targetRef={ref} filename="Fuel_Consumption_Report.pdf">
                    {({ toPdf }) => <a href="#" onClick={toPdf} className="exportToPdf"> Export To PDF</a>}
                  </Pdf>
                </ModalHeader>
                <ModalBody >     
                   <table class="table" ref={ref}>
                     <thead class="thead-dark">
                      <tr>
                       <th scope="col">Airport</th>
                       <th scope="col">Date Time</th>
                       <th scope="col">Type</th>
                       <th scope="col">Fuel</th>
                       <th scope="col">Aircraft</th>
                       <th scope="col">Fuel Available</th>
                      </tr>
                   </thead>
                   <tbody>
                      {consumptionReport}
                 </tbody>
              </table>
                </ModalBody>
            </Modal>
        )
    }
  }

  export default (FuelConsumptionReport);
  