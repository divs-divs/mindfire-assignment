import React, { Component } from "react";
import '../../../../views/modal.css';
import '../../../../scss/_custom.scss';
import AirportList from './airportList';
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ManageAirports extends Component {


    render() {
        return (
            <div className="mt-4">
                <ToastContainer />
                <div className="col-sm-12 col-12">
                    <div className="card">
                        <div className="card-header font-weight-bold">
                            Airports
            </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-8 mb-1">
                                </div>
                                <div className="col-12">
                                    <AirportList key="airportList"
                                    />
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

export default (ManageAirports);

