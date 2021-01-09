import React, { Component } from "react";
import { Input } from 'reactstrap';
import HttpTransferService from "../../../utils/httptransfer";
import '../../../views/modal.css';
import '../../../scss/_custom.scss';
import UserListModal from './User/UserListModal';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import AddSourceCoustomer from "./addSourceCustomer";
import EditSourceCoustomer from "./editSourceCustomer";
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import constant from "../../../constants/constant";
import {  withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const httptransfer = new HttpTransferService();

class AddSourceCoustomerModal extends React.Component {
  closePopup = () => {
    this.props.closePopup();
  }
  render() {
    const closebtn = <button className="close" onClick={this.closePopup}>&times;</button>;
    return (
      <div>
        <Modal
          size="lg"
          isOpen={this.props.showPopup}
          toggle={this.props.closePopup}
        >
          <ModalHeader toggle={this.props.closePopup} close={closebtn}>{this.props.titles.addCustomerTitle}</ModalHeader>
          <ModalBody>
          <ToastContainer/>
            <AddSourceCoustomer type={this.props.queryEntity} closeModal={this.closePopup} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

class EditSourceCoustomerModal extends React.Component {
  closePopup = () => {
    this.props.toggleSourceEditModal();
  }
  render() {
    const closebtn = <button className="close" onClick={this.closePopup}>&times;</button>;
    return (
      <div>
        <Modal
          size="lg"
          isOpen={this.props.showAddressEditModal}
          toggle={this.closePopup}
        >
          <ModalHeader toggle={this.props.toggleSourceEditModal} close={closebtn}>{this.props.titles.editCustomerTitle}</ModalHeader>
          <ModalBody>
            <EditSourceCoustomer type={this.props.queryEntity} sourceCustomerDetails={this.props.sourceCustomerDetails} closeModal={this.closePopup} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
class QueryCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryEntity: '',
      entities: [],
      userData: {},
      titles: {
        cardTitle: '',
        addCustomerTitle: '',
        editCustomerTitle: '',
        addCustomerUserTitle: '',
        addCustomerAddressTitle: '',
      },
      transporterDetails : {},
      sourceCustomerDetails: {},
      showAddressEditModal: false,
      showPopupAddress: false,
      showPopup: false,
      showUserListModal: false,
      showAddressListModal: false,
      sourceEntityId: '',
      fadeAddress: false,
      showTransporterRouteModal: false,
      showVehicleTypeModal:false,
      activeTransporter: '',
      fade: true,
      popoverOpen: false,
      typeFilter: false,
      transportersOption: [],
      columns: [],
      entitiesAdditionalList: [],
      defaultColumns: [
        {
          name: props.t("NAME"),
          selector: 'name',
          sortable: true
        },
        {
          name: props.t("CITY"),
          selector: 'city',
          sortable: false,
          cell: row => row.city_details.city_name+ ', ' + row.state_details.state_name
        },
        {
          name: props.t("STATUS"),
          selector: 'status',
          sortable: false,
        },
        {
          name: props.t("USER_ACTIONS"),
          cell: row => <div>             
                <i className="fa fa-users mr-2" aria-hidden="true" title="Users" onClick={this.toggleUserListModal.bind(this,row)}></i>
                <i className="fa fa-edit mr-2" aria-hidden="true"  onClick={this.toggleSourceEditModal.bind(this, row)} title="Edit"></i>            
            </div>
        }
      ]
    };
    this.getAdditionTransporterValues = this.getAdditionTransporterValues.bind(this)
    this.toggleUserListModal = this.toggleUserListModal.bind(this);
    this.toggleTransporterRouteModal = this.toggleTransporterRouteModal.bind(this)
    this.resetTypeFilter = this.resetTypeFilter.bind(this)
    this.setColumns = this.setColumns.bind(this)
    this.getAdditionalAttributesList = this.getAdditionalAttributesList.bind(this)
  }
 

  toggleVehicleTypeModal (row) {
    this.setState({
      showVehicleTypeModal: !this.state.showVehicleTypeModal,
      transporterDetails : row
      // activeTransporter: row
    })
  }

  toggleAddressModal(userData) {
    this.setState({
      showAddressListModal: !this.state.showAddressListModal,
      fadeAddress: !this.state.fadeAddress,
      userData: userData

    })
  }
  toggleTransporterRouteModal(row) {
    this.setState({
      showTransporterRouteModal: !this.state.showTransporterRouteModal,
      activeTransporter: row
    })
  }

  toggleSourceEditModal(sourceCustomer) {
    if (this.state.showAddressEditModal) {
      this.getSourceCustomerEntity()
    }
    this.setState({
      showAddressEditModal: !this.state.showAddressEditModal,
      fade: !this.state.fade,
      sourceCustomerDetails: sourceCustomer
    })

  }
  closePopUp() {
    this.setState({
      modal: this.state.modal,
      fade: !this.state.fade
    })

  }

  toggleUserListModal(userData) {
    this.setState(
      {
        showUserListModal: !this.state.showUserListModal,
        fade: !this.state.fade,
        userData: userData
      }
    );
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
      fade: !this.state.fade,
    });
    this.getSourceCustomerEntity()
  }

  componentDidMount() {
    this.setEntityType()
      .then(response => {
        this.getSourceCustomerEntity();
      })
      
  }
  setColumns () {
    this.setState({
      columns: this.state.defaultColumns
    })
  }

  setEntityType() {
    const { t, i18n } = this.props;
    return new Promise((resolve, reject) => {
      let entityType = this.props.match.params.type;
      if (entityType === constant.SOURCE_CUSTOMER_ENTITY_TYPE) {
        this.setState({
          queryEntity: 'SOURCE_CUSTOMER',
          titles: {
            cardTitle: t("SOURCE_CUSTOMER"),
            addCustomerTitle:t('ADD_SOURCE_CUSTOMER'),
            editCustomerTitle: t('EDIT_SOURCE_CUSTOMER'),
            addCustomerUserTitle:t('SOURCE_CUSTOMER_USERS'),
            addCustomerAddressTitle:t('SOURCE_CUSTOMER_ADDRESSES')
          }
        })
        this.setColumns()
        resolve()
      }
    else if (entityType === constant.MANAGE_USER_ENTITY_TYPE) {
        this.setState({
          queryEntity: 'CONTROL_TOWER',
          titles: {
            cardTitle: t("MANAGE_USER"),
            addCustomerTitle: t('ADD_USER'),
            editCustomerTitle: t('EDIT_USER'),
            addCustomerUserTitle: t('ADD_USER_USERS'),
          }
        })
        this.setColumns()
        resolve()
      }
    })
  }
  getAdditionTransporterValues (item, forValue) {
    if (this.state.entitiesAdditionalList.filter(a => a.entity_id === item.entity_id).length) {
      return this.state.entitiesAdditionalList.filter(a => a.entity_id === item.entity_id)[0].additional_attributes[forValue]
    }
    return ''
  }

  componentDidUpdate(props) {

    if (props.match.params['type'] !== this.props.match.params['type']) {
      this.setEntityType()
        .then(response => {
          this.getSourceCustomerEntity();
        })
    }
  }
 

  searchSourceCustomerEntity(event) {
    var searchParam = {
      "type": this.state.typeFilter ? [this.state.typeFilter] : this.state.queryEntity === constant.TRANSPORTER ? this.state.transportersOption : [this.state.queryEntity],
      "search_params": {
        "search_text": event.target.value,
        "fields": ["name"]
      }
    }

    httptransfer.getSourceCustomerEntity(searchParam)
      .then(response => {
        this.getAdditionalAttributesList(response)
      });
  }

  getSourceCustomerEntity(column, sortDirection) {

    var searchParam = {
      "type": this.state.typeFilter ? [this.state.typeFilter] : this.state.queryEntity === constant.TRANSPORTER ? this.state.transportersOption : [this.state.queryEntity],
      "sorting_details": [
        {
          "sort_by": 'name',
          "sort_order": 'ASC'
        }
      ]
    }

    if (column !== undefined) {
      searchParam["sorting_details"]["sort_by"] = column.name.toLowerCase()
      searchParam["sorting_details"]["sort_order"] = sortDirection.toUpperCase()

    }
    httptransfer.getSourceCustomerEntity(searchParam)
      .then(response => {
        this.getAdditionalAttributesList(response)
      });
  }

  getAdditionalAttributesList (entites) {
    if (entites.status === 200) {
      if (entites.data.hasOwnProperty('entity_details')) {
        let entityIds = entites.data.entity_details.map(element => {return element.entity_id})
        var params = {
          entity_id: entityIds
        }
        httptransfer.queryEntityAdditionalAttributes(params)
        .then(response => {
          if (response.status === 200) {
            if (response.data.entities.length) {
              this.setState({
                entitiesAdditionalList: response.data.entities
              })
            }
            this.setState({
              entities: entites['data']['entity_details']
            })
          }
        })
      } else {
        this.setState({
          entities: []
        })
      }
    }
  }

  togglePopover() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    })
  }
  setTypeFilter(event) {
    event.persist()
    this.setState({
      typeFilter: event.target.value
    })
  }
  resetTypeFilter() {
    this.setState({
      typeFilter: '',
      popoverOpen: false
    })
  }
  applyTransporterFilter() {
    this.getSourceCustomerEntity()
    this.resetTypeFilter()

  }
  resetTransporterFilter() {
    this.resetTypeFilter()
    this.getSourceCustomerEntity()
  }


  render() {
    const {t} = this.props;
    const customStyles = {
      rows: {
        style: {
          minHeight: '50px', //the row height
        }
      },
      headCells: {
        style: {
          fontWeight: 600,
          paddingLeft: '8px', //the cell padding for head cells
          paddingRight: '8px',
          fontSize: '14px',
        },
      },
      cells: {
        style: {
          paddingLeft: '8px', //the cell padding for data cells
          paddingRight: '8px',
          fontSize: '13px',
        },
      },
    };
    return (
      <div className="mt-4">
        <ToastContainer/>
        <div className="col-sm-12 col-12">
          <div className="card">
            <div className="card-header font-weight-bold">
              {this.state.titles.cardTitle}
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-8 mb-1">
                  <Input type="text" name="search" onInput={this.searchSourceCustomerEntity.bind(this)} className="search-bar" id="search" placeholder={t("SEARCH")} />
                </div>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-3">
                  <button className="btn btn-info pull-right" onClick={this.togglePopup.bind(this)} >
                    <FontAwesomeIcon icon={faPlus} size="xs" className="mr-1" /> {this.state.titles.addCustomerTitle} </button>
                  {
                    this.state.showPopup ?
                      <AddSourceCoustomerModal
                        titles={this.state.titles}
                        queryEntity={this.state.queryEntity}
                        showPopup={this.state.showPopup}
                        closePopup={this.togglePopup.bind(this)} />
                      : null
                  }
                </div>
              </div>
              {
                this.state.entities.length ?
                  <DataTable
                    onSort={this.getSourceCustomerEntity.bind(this)}
                    sortServer={true}
                    title=""
                    columns={this.state.columns}
                    keyField="entity_id"
                    data={this.state.entities}
                    customStyles={customStyles}
                  />
                  : ''
              }
            </div>
          </div>
        </div>
        <div>
          {this.state.showUserListModal ?
            <UserListModal key="userListModal"
              titles={this.state.titles}
              userData={this.state.userData}
              toggleUserListModal={this.toggleUserListModal.bind(this)}
              showUserListModal={this.state.showUserListModal}
              entityId={this.state.entityId}
              entityType={this.state.queryEntity}
            />
            : null
          }
          {
            this.state.showAddressEditModal ?
              <EditSourceCoustomerModal key="sourceCustomerEditModal"
                titles={this.state.titles}
                queryEntity={this.state.queryEntity}
                showAddressEditModal={this.state.showAddressEditModal}
                toggleSourceEditModal={this.toggleSourceEditModal.bind(this)}
                sourceCustomerDetails={this.state.sourceCustomerDetails}
              />
              : null
          }
        </div>

      </div>


    );
  }
};

QueryCustomer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default (withTranslation("translations")(QueryCustomer));