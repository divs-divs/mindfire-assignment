import React, { Component } from 'react';
import { Label, Input, InputGroupAddon, InputGroup, Button } from 'reactstrap';
import "react-toastify/dist/ReactToastify.css";
import toastService from "../../../../utils/toastnotification";
import validate from "../../../../utils/validations";
import { ToastContainer } from "react-toastify";
import { Multiselect } from 'multiselect-react-dropdown';
import SimpleReactValidator from 'simple-react-validator';
import PropTypes from "prop-types";
import $ from 'jquery';
import Select from 'react-select';
import moment from "moment";

const toastservice = new toastService();

class AddTransaction extends Component {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
        this.handleInputChange = this.handleInputChange.bind(this);

        this.initialState = {
            transactionTypeList: [],
            transactionType: [],
            listOfAirports: [],
            listOfAircrafts: [],
            transactionType: '',
            selectedAirport: '',
            selectedAircraft: '',
            quantity: '',
            transaction_id_parent: ''
        }
        this.state = this.initialState;
    };

    async componentDidMount() {
        this.getTransactionTypeList();
        await this.getAirportList();
        await this.getAircraftList();
    }

    getTransactionTypeList() {
        let transactionType = [];
        transactionType.push({
            label: "In",
            value: "IN"
        })
        transactionType.push({
            label: "Out",
            value: "OUT"
        })
        this.setState({
            transactionTypeList: transactionType,
        })
    }

    async getAirportList() {
        let airportList = [];
        let airportListJson = [];
        await fetch('http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/airports').
            then(response => response.json())
            .then(data =>
                data.map(element => {
                    airportListJson.push({
                        label: element.name,
                        value: element.id,
                        available: parseInt(element.available),
                        capacity: parseInt(element.capacity)
                    })
                })
            );
        this.setState({
            listOfAirports: airportListJson,
        })

    }

    async getAircraftList() {
        let aircraftList = [];
        let aircraftListJson = [];
        await fetch('http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/aircrafts').
            then(response => response.json())
            .then(data =>
                data.map(element => {
                    aircraftListJson.push({
                        label: element.airline,
                        value: element.id
                    })
                })
            );
        this.setState({
            listOfAircrafts: aircraftListJson,
        })

    }

    selectedTransactionType(selectedTransactionType) {
        this.setState({
            transactionType: selectedTransactionType,
        })
    }

    async selectedAirport(selectedAirport) {
        await this.setState({
            selectedAirport: selectedAirport,
        })
    }

    async selectedAircraft(selectedAircraft) {
        await this.setState({
            selectedAircraft: selectedAircraft,
        })
    }

    handleInputChange(e) {
        let id = e.target.id
        switch (id) {
            case 'quantity':
                this.setState({ quantity: e.target.value });
                break;
            case 'transaction_id_parent':
                this.setState({ transaction_id_parent: e.target.value });
                break;
            default:
                break;
        }

    }

    async handleSubmit(event) {
        if (validate.validate(this.validator)) {
            if(this.state.transactionType.value=="IN" && this.state.selectedAirport.available+parseInt(this.state.quantity)>this.state.selectedAirport.capacity){
                toastservice.error(`Airport has the ${this.state.selectedAirport.capacity-this.state.selectedAirport.available} capacity to IN`);
            }
            else if(this.state.transactionType.value=="OUT" && this.state.selectedAirport.available<parseInt(this.state.quantity)){
                  toastservice.error(`Airport has the ${this.state.selectedAirport.available} capacity to OUT`);
            }
            else{
            $.ajax({
                url: "http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/transactions",
                type: "POST",
                data: {
                    transaction: {
                        transaction_date_time: moment().format("DD-MM-YYYY hh:mm:ss"),
                        transaction_type: this.state.transactionType.value,
                        airport_id: this.state.selectedAirport.value,
                        aircraft_id: this.state.selectedAircraft.value,
                        quantity: this.state.quantity,
                        transaction_id_parent: this.state.transaction_id_parent
                    }
                },
                success: response => {
                    if (this.state.transactionType.value == "OUT" && this.state.selectedAirport.available != null) {
                        $.ajax({
                            url: `http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/airports/${this.state.selectedAirport.value}`,
                            type: "PUT",
                            data: {
                                airport: {
                                    available: (this.state.selectedAirport.available - parseInt(this.state.quantity))

                                }
                            }
                        })
                    }
                    if (this.state.transactionType.value == "IN" && this.state.selectedAirport.available != null) {
                        $.ajax({
                            url: `http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/airports/${this.state.selectedAirport.value}`,
                            type: "PUT",
                            data: {
                                airport: {
                                    available: (this.state.selectedAirport.available + parseInt(this.state.quantity))

                                }
                            }
                        })
                    }
                    this.props.togglePopup();
                    this.props.refresh();
                }
            });
        }
        }
    }

    render() {
        return (
            <div>
                <ToastContainer />
                <div className="my-0 position-relative row form-group">
                    <div className="col-6">
                        <div className="position-relative form-group">
                            <Label for="transaction_type">Transaction type</Label>
                            <Select
                                className="basic-single text-capitalize"
                                classNamePrefix="select"
                                onChange={this.selectedTransactionType.bind(this)}
                                isClearable={true}
                                isSearchable={true}
                                name="transaction_type"
                                id="transaction_type"
                                options={this.state.transactionTypeList}
                                value={this.state.transactionType ? { label: this.state.transactionType.label } : null}
                            />
                            <div className="validationSpan">
                                {this.validator.message('Transaction Type', this.state.transactionType, validate.required)}
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="position-relative form-group">
                            <Label for="Airport">Airport</Label>
                            <Select
                                className="basic-single text-capitalize"
                                classNamePrefix="select"
                                onChange={this.selectedAirport.bind(this)}
                                isClearable={true}
                                isSearchable={true}
                                name="airport"
                                id="airport"
                                options={this.state.listOfAirports}
                                placeholder="Select Airport"
                                value={this.state.selectedAirport ? { label: this.state.selectedAirport.label } : null}
                            />
                            <div className="validationSpan">
                                {this.validator.message('Airport', this.state.selectedAirport, validate.required)}
                            </div>
                        </div>
                    </div>
                    {this.state.transactionType.value == "OUT" ?
                        <div className="col-6">
                            <div className="position-relative form-group">
                                <Label for="Aircraft">Aircraft</Label>
                                <Select
                                    className="basic-single text-capitalize"
                                    classNamePrefix="select"
                                    onChange={this.selectedAircraft.bind(this)}
                                    isClearable={true}
                                    isSearchable={true}
                                    name="aircraft"
                                    id="aircraft"
                                    placeholder="Select Aircraft"
                                    options={this.state.listOfAircrafts}
                                    value={this.state.selectedAircraft ? { label: this.state.selectedAircraft.label } : null}
                                />
                                <div className="validationSpan">
                                    {this.state.transactionType.value == "OUT" && this.validator.message('Aircraft', this.state.selectedAircraft, validate.required)}
                                </div>
                            </div>
                        </div> : null}
                    <div className="col-6">
                        <div className="position-relative form-group">
                            <Label for="quantity">Quantity</Label>
                            <Input type="number" className="text-capitalize" name="quantity" onChange={this.handleInputChange} id="quantity" placeholder="Enter Quantity" required />
                            <div className="validationSpan">
                                {this.validator.message('Quantity', this.state.quantity, validate.required)}
                            </div>
                        </div>
                    </div>
                    {this.props.transactionType == "OUT" ?
                        <div className="col-6">
                            <div className="position-relative form-group">
                                <Label for="transaction_id">Transaction Id Parent</Label>
                                <Input type="number" className="text-capitalize" name="transaction_id" onChange={this.handleInputChange} id="transaction_id_parent" placeholder="Enter Transaction Id" required />
                                <div className="validationSpan">
                                    {this.validator.message('Transaction Parent Id', this.state.transaction_id_parent, validate.required)}
                                </div>
                            </div>
                        </div>
                        : null}
                </div>
                <div>
                    <button type="submit" className="btn btn-primary btn-md" onClick={(e) => this.handleSubmit(e)}>
                        ADD
          </button>
                </div>
            </div>
        )
    }
}

export default AddTransaction;
