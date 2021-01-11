import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Pdf from "react-to-pdf";
const ref = React.createRef();

class FuelConsumptionReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            airports: [],
            aircrafts: [],
            transactions: []
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
                transactions: data
            }));
    }

    async getAirports() {
        await fetch('http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/airports').
            then(response => response.json())
            .then(data => this.setState({
                airports: data
            }));
    }

    async getAircrafts() {
        await fetch('http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/aircrafts').
            then(response => response.json())
            .then(data => this.setState({
                aircrafts: data
            }));
    }

    render() {
        let consumptionReport = [];
        let noOfAirports = [];
        let data = [];
        this.state.transactions.map((item, index) => {
            if (!noOfAirports.includes(item.airport_id)) {
                noOfAirports.push(item.airport_id)
            }
        }
        )
        if (this.state.transactions.length && this.state.airports.length && this.state.aircrafts.length) {
            for (let i = 0; i < noOfAirports.length; i++) {
                let fuelAvailable = this.state.airports && typeof this.state.airports.filter(airport => airport.id == noOfAirports[i])[0] != undefined && parseInt(this.state.airports.filter(airport => airport.id == noOfAirports[i])[0].available);
                consumptionReport.push(
                    <div className="reportDiv">
                        <br />
                        <tr className="airportRow">
                            <th scope="col-md-6" class="thead-dark reportHeading">Airport</th>
                            <th scope="col-md-6 " class="thead-dark reportHeading">{this.state.airports && typeof this.state.airports.filter(airport => airport.id == noOfAirports[i])[0] != undefined && this.state.airports.filter(airport => airport.id == noOfAirports[i])[0].name}</th>
                        </tr>
                        <tr>
                            <td class="reportColumn col-md-2 reportHeading">Transaction Date Time</td>
                            <td class="reportColumn col-md-2 reportHeading">Transaction Type</td>
                            <td class="reportColumn col-md-2 reportHeading">Fuel Quantity</td>
                            <td class="reportColumn col-md-2 reportHeading">Aircraft</td>
                        </tr>
                    </div>)
                this.state.transactions.map((item, index) => (
                    item.airport_id == noOfAirports[i] ?
                        consumptionReport.push(
                            <div>
                                <tr>
                                    <td class="reportColumn col-md-2">{(item.transaction_date_time.replace('T', ' ')).replace('Z', '')}</td>
                                    <td class="reportColumn col-md-2">{item.transaction_type}</td>
                                    <td class="reportColumn col-md-2">{item.quantity}</td>
                                    <td class="reportColumn col-md-2">{this.state.aircrafts && item.transaction_type == "OUT" && this.state.aircrafts.filter(aircrafts => aircrafts.id == item.aircraft_id)[0] != undefined && this.state.aircrafts.filter(aircrafts => aircrafts.id == item.aircraft_id)[0].aircraft_no}</td>
                                    <td class="reportColumn col-md-2">{}</td>
                                </tr>
                            </div>
                        )
                        : null
                ))
                consumptionReport.push(
                    <tr>
                        <th scope="col-sm-6" class="thead-dark reportBottom">Fuel Available</th>
                        <th scope="col-sm-6" class="thead-dark reportBottom">{fuelAvailable}</th>
                    </tr>
                )
            }
        }

        const { t } = this.props;
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
