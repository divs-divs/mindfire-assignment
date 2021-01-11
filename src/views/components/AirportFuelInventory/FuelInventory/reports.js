import React, { Component } from "react";
import '../../../../views/modal.css';
import '../../../../scss/_custom.scss';
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FuelConsumptionReport from "./fuelConsumptionReport";
import AirportSummaryReport from "./airportSummaryReport";

class Reports extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAirportSummaryReport: false,
            showFuelConsumptionReport: false,
        };
    }

    togglePopup() {
        this.setState({
            showAirportSummaryReport: !this.state.showAirportSummaryReport
        });
    }

    toggleFuelConsumptionPopup() {
        this.setState({
            showFuelConsumptionReport: !this.state.showFuelConsumptionReport
        });
    }

    render() {
        return (
            <div className="mt-4">
                <ToastContainer />
                <div className="col-sm-12 col-12">
                    <div className="card">
                        <div className="card-header font-weight-bold">
                            Reports
            </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-8 mb-1">
                                    <a href="#" onClick={(e) => this.togglePopup(e)}>Airport Summary Report</a>
                                </div>
                                <div className="col-12">
                                    <a href="#" onClick={(e) => this.toggleFuelConsumptionPopup(e)}>Fuel Consumption Report</a>
                                </div>
                            </div>
                        </div>
                        {
                            this.state.showAirportSummaryReport ?
                                <AirportSummaryReport
                                    showPopup={this.state.showAirportSummaryReport}
                                    togglePopup={this.togglePopup.bind(this)}
                                />
                                : null
                        }
                        {
                            this.state.showFuelConsumptionReport ?
                                <FuelConsumptionReport
                                    showPopup={this.state.showFuelConsumptionReport}
                                    togglePopup={this.toggleFuelConsumptionPopup.bind(this)}
                                />
                                : null
                        }
                    </div>
                </div>
                <div>
                </div>
            </div>
        );
    }
};



export default (Reports);