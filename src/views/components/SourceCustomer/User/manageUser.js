import React, { Component } from "react";
import '../../../../views/modal.css';
import '../../../../scss/_custom.scss';
import UserList from './UsersList';
import constant from "../../../../constants/constant";
import {  withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ManageUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      queryEntity: 'CONTROL_TOWER',
      userData: {},
      titles: {
        cardTitle: '',
        addCustomerTitle: '',
        editCustomerTitle: '',
        addCustomerUserTitle: '',
        addCustomerAddressTitle: '',
      }
    };

  }


  componentDidMount() {
    this.setEntityType()
  }

  setEntityType(){
    const { t, i18n } = this.props;
    return new Promise((resolve, reject) => {
        this.setState({
          queryEntity: 'CONTROL_TOWER',
          titles: {
            cardTitle: t("MANAGE_USER"),
            addCustomerTitle:  t('ADD_USER'),
            editCustomerTitle: t('EDIT_USER'),
            addCustomerUserTitle: t('ADD_USER_USERS'),
          }
        })
        resolve()
    })
  }

  render() {
    return (
      <div className="mt-4">
        <ToastContainer/>
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
                    <UserList key="userList"
                        entityId={constant.ENTITY_ID}
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

ManageUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default (withTranslation("translations")(ManageUser));