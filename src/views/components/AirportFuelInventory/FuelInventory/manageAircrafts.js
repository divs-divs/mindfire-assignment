import React, { Component } from "react";
import '../../../../views/modal.css';
import '../../../../scss/_custom.scss';
import AircraftList from './airCraftList';
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ManageAircrafts extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="mt-4">
                <ToastContainer />
                <div className="col-sm-12 col-12">
                    <div className="card">
                        <div className="card-header font-weight-bold">
                            AirCrafts
            </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-8 mb-1">
                                </div>
                                <div className="col-12">
                                    <AircraftList key="userList"
                                        entityId={''}
                                        hideDelete={true}
                                        entityType={this.state.queryEntity}
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

export default ((ManageAircrafts));