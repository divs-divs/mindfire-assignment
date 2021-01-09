import React, { Component } from 'react';
import { Redirect } from 'react-router';
import {  NavLink,Route} from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import profile from '../../assets/img/profile-avatar.png'
import AuthenticationService from '../../../src/utils/authentication';
import constant from '../.././constants/constant';
import HttpTransferService from "../../../src/utils/httptransfer";
import utils from '../../../src/utils/date'
import firebase from '../../../src/firebase';
import InfiniteScroll from "react-infinite-scroll-component";
import {  withTranslation } from "react-i18next";
import moment from 'moment';

const  authentication = new AuthenticationService()
const httptransfer = new HttpTransferService();


const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    

    this.state = {
        name : '',
    }
}


  componentDidMount() {
    this.setState({
      name:localStorage.getItem("name"),
    })
  }


  render() {

    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
      <div>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <p className="navbar-brand font-weight-bold mb-0" style={{color:'#5bcae8'}}>Mindfire</p>
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        </div>
         <div>
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
        </Nav></div>
        <Nav className="ml-auto" navbar>             
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={profile} className="img-avatar mr-2" alt="profile" /><span className="mr-5"><b>{this.state.name}</b></span>
            </DropdownToggle>
            <DropdownMenu direction="down">
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i>Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

DefaultHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default (withTranslation("translations")(DefaultHeader));
