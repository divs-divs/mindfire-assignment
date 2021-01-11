import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Pdf from "react-to-pdf";
const ref = React.createRef();

class AirportSummaryReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            airports: [],
        };
    }

    async componentDidMount() {
        await this.getAirports();
    }

    async getAirports() {
        await fetch('http://438-ruby-on-rails.code2rock.mindfire-solutions.in/api/v1/airports').
            then(response => response.json())
            .then(data => this.setState({
                airports: data
            }));
    }

    render() {
        let summaryReport = [];
        if (this.state.airports.length) {
            summaryReport = this.state.airports.map((item, index) => (
                <tr>
                    <td>{item.name}</td>
                    <td>{item.available}</td>
                </tr>
            ))
        }

        const { t } = this.props;
        const closebtn = <button className="close" onClick={this.props.togglePopup}>&times;</button>;
        return (
            <Modal isOpen={this.props.showPopup}
                size="lg"
                toggle={this.props.togglePopup}
                className="modal-dialog modal-report"
            >
                <ModalHeader close={closebtn}> Airport Summary Report
                  <Pdf targetRef={ref} filename="Airport_Summary_Report.pdf">
                        {({ toPdf }) => <a href="#" onClick={toPdf} className="exportToPdf"> Export To PDF</a>}
                    </Pdf>
                </ModalHeader>
                <ModalBody >
                    <div>
                        <div ref={ref}>
                            <table class="table">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Airport</th>
                                        <th scope="col">Fuel Available</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {summaryReport}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}

export default (AirportSummaryReport);
