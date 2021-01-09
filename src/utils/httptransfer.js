import axios from "axios";
import constants from "../constants/constant";
import login from '../views/Pages/Login/Login';
import "react-toastify/dist/ReactToastify.css";
import toastService from "./toastnotification";
const toastservice = new toastService();
export default class HttpTransferService {
  baseUrl = constants.BASE_URL;
  tokenstring = constants.TOKEN_HEADER_STRING;
  apiEntity =constants.API_ENTITY;
  sourceCustomerEntity= constants.SOURCE_CUSTOMER_ENTITY;
  sourceCustomerAddressEntity=constants.SOURCE_CUSTOMER_ADDRESS;
  sourceCustomeEnquiry=constants.SOURCE_CUSTOMER_ENQUIRY;
  userQueryUrl=constants.USER_QUERY;
  createSourceCustomerEntity=constants.CREATE_SOURCE_COUSTOMER_ENTITY
  createSourceCustomerEntityAddress=constants.CREATE_SOURCE_CUSTOMER_ENTITY_ADDRESS
  createSourceCustomerEnquiryEntity = constants.CREATE_SOURCE_COUSTOMER_ENQUIRY
  createUser=constants.CREATE_USER_QUERY;
  createSourceCustomerEntity=constants.CREATE_SOURCE_COUSTOMER_ENTITY;
  createSourceCustomerEntityAddress=constants.CREATE_SOURCE_CUSTOMER_ENTITY_ADDRESS;
  saveSourceCustomerEntityAddress = constants.SAVE_SOURCE_CUSTOMER_ENTITY_ADDRESS;
  updateSourceCustomerEntityAddress = constants.UPDATE_SOURCE_CUSTOMER_ENTITY_ADDRESS;
  fetchStateList = constants.GET_STATE_LIST;
  fetchCityList = constants.GET_CITY_LIST;
  addcity=constants.ADD_CITY
  api = constants.API;
  action = constants.ACTION;
  userTitleQuery = constants.USER_TITLE_QUERY
  changePassword = constants.CHANGEPASSWORD;
  query = constants.QUERY;
  refreshToken = constants.REFRESH_TOKEN;
  userAdditional = constants.USERADDITIONAL;
  refreshErrorMessage = "Unauthorized: Token Expired";
  entityAdditional = constants.ENTITY_ADDITIONAL;
  userImage = constants.USER_IMAGE;
  sendmail = constants.SEND_MAIL;
  notificationHistoryQuery = constants.NOTIFICATIONHISTORYQUERY
  notificationHistory = constants.NOTIFICATIONHISTORY
  fcmToken = constants.FCMTOKEN
  apiUserSession = constants.SESSIONS_API_URL;
  logout = constants.LOGOUT;
 

  getRefreshToken (inputjson) {
    var url = this.baseUrl + this.api + this.refreshToken
    return this.postCall(inputjson, url)
  }

  passwordChange (inputjosn, entity_id, user_id) {
    var url = this.baseUrl + this.apiEntity + entity_id + this.createUser +'/' + user_id + this.changePassword
    return this.putCall(inputjosn, url)
  }

  updateInfo (inputjosn, entity_id, user_id) {
    var url = this.baseUrl + this.apiEntity + entity_id + this.createUser +'/' + user_id
    return this.putCall(inputjosn, url)
  }

  queryUserImage(inputjosn, entity_id) {
    var url = this.baseUrl + this.apiEntity + entity_id + this.userImage
    return this.postCall(inputjosn, url)
  }

  userQuery(inputjson,entity_id)
  {
    var url=this.baseUrl + this.apiEntity + entity_id + this.userQueryUrl;
    return this.postCall(inputjson,url)
  }

  sourceCustomerAddress(inputjson,entity_id)
  {
     var url = this.baseUrl + this.apiEntity + entity_id + this.sourceCustomerAddressEntity;
     return this.postCall(inputjson,url)
  }


  getSourceCustomerEntity(inputjson)
  {
     var url = this.baseUrl + this.sourceCustomerEntity;
     return this.postCall(inputjson,url)
  }

  getUserQuery (inputjson, entity_id) {
    var url = this.baseUrl + this.apiEntity + entity_id + '/user/query'
    return this.postCall(inputjson, url)
  }
  createUserQuery(inputjson,entity_id)
  {
    var url =this.baseUrl + this.apiEntity+ entity_id + this.createUser;
    return this.postCall(inputjson,url)
  }

  updateUserQuery(inputjson,entity_id)
  {
    var url =this.baseUrl + this.apiEntity+ entity_id + '/user/' + inputjson.user_id;
    return this.putCall(inputjson, url)
  }

  deleteUser(entity_id,user_id)
  {
    var url =this.baseUrl + this.apiEntity+ entity_id + '/user/' + user_id;
    return this.deleteCall({}, url)
  }

  addSourceCustomerEntity(inputjson)
  {
     var url = this.baseUrl + this.createSourceCustomerEntity;
     return this.postCall(inputjson,url)
  }
  updateSourceCustomerEntity(inputjson, entity_id)
  {
     var url = this.baseUrl + this.apiEntity + entity_id;
     return this.putCall(inputjson,url)
  }

  displaySourceCustomerAddress(inputjson,entity_id)
  {
    var url =this.baseUrl + this.apiEntity + entity_id + this.createSourceCustomerEntityAddress;
    return this.postCall(inputjson,url)
  }

  saveSourceCustomerAddress(inputjson,entity_id)
  {
    var url =this.baseUrl + this.apiEntity+ entity_id + this.saveSourceCustomerEntityAddress;
    return this.postCall(inputjson,url)
  }

  updateSourceCustomerAddress (inputjson, entity_id, address_id) {
    var url =this.baseUrl + this.apiEntity+ entity_id + this.updateSourceCustomerEntityAddress + address_id;
    return this.putCall(inputjson,url)
  }

  deleteSourceCustomerAddress(entity_id, address_id) {
    var url = this.baseUrl + this.apiEntity + entity_id + this.updateSourceCustomerEntityAddress + address_id
    return this.deleteCall({}, url);
  }

  getStateList () {
    var url = this.baseUrl + this.fetchStateList
    return this.postCall({}, url)
  }

  getCityList (inputjson) {
    var url = this.baseUrl + this.fetchCityList
    return this.postCall(inputjson, url)
  }

  getUserTitle (entity_id) {
    var url = this.baseUrl + this.apiEntity + entity_id + this.userTitleQuery
    return this.getCall(url)
  }

  setRefreshToken () {
    let userInfo = localStorage.getItem('user_info')
      if (userInfo) {
        userInfo = JSON.parse(userInfo)
        
        var params = {
          client_id: localStorage.getItem('client_id'),
          user_id: userInfo.user_id,
          server_unique_id: localStorage.getItem('serveruniqueid')
        }
          return this.getRefreshToken(params)
          .then(response => {
            if (response.status === 200) {
              let loginObject  = new login()
              loginObject.setUserInfoInLocalStorage(response)
              localStorage.setItem(
                "refreshtoken",
                response["headers"]["refresh-token"]
              );
              return true
            } else {
              return false
            }
          })
      }
  }
  updateUserAdditionalAttributes (inputjson, entity_id, user_id) {
    var url = this.baseUrl + this.apiEntity + entity_id + this.createUser + '/' + user_id + this.userAdditional
    return this.postCall(inputjson, url)
  }
  queryUserAdditionalAttributes (inputjson, entity_id) {
    var url = this.baseUrl + this.apiEntity + entity_id + '/' + this.userAdditional + this.query
    return this.postCall(inputjson, url)
  }
  updateEntityAdditionalAttributes (inputjson, entity_id) {
    var url = this.baseUrl + this.apiEntity + entity_id + '/' +  this.entityAdditional
    return this.postCall(inputjson, url)
  }
  queryEntityAdditionalAttributes (inputjson) {
    var url = this.baseUrl + this.api + this.entityAdditional + this.query
    return this.postCall(inputjson, url)
  }
  sendEmail(inputjson) {
    let url = this.baseUrl + this.api + this.sendmail
    return this.postCall(inputjson, url)
  }
  enqueryNotification(inputjosn, entity_id){
    var url = this.baseUrl + this.apiEntity + entity_id + this.notificationHistoryQuery
    return this.postCall(inputjosn,url)
  }

  readNotification(inputjson, entity_id, user_id){
    var url = this.baseUrl + this.apiEntity + entity_id + this.createUser + '/' + user_id + this.notificationHistory
    return this.putCall(inputjson,url)
  }

  logoutSession(){
    let inputjosn={
      "user_id": constants.USER_ID,
      "client_id":constants.CLIENT_ID
    }
    var url = this.baseUrl + this.apiUserSession + this.logout
    return this.postCall(inputjosn,url)
  }

  postCall(inputjson, url) {
    var accesstoken = localStorage.getItem("token");
    var self = this;
    return axios
      .request({
        url: url,
        method: "post",
        data: inputjson,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
           'x-auth-token': accesstoken,
           'refresh-token': localStorage.getItem('refreshtoken')
        }
      })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.log(error.response)
        toastservice.error(error.response.data.message);
        return error.response.data;
      });
  }

  putCall(inputjson, url) {
    var accesstoken = localStorage.getItem("token");
    var self = this
    return axios
      .request({
        url: url,
        method: "put",
        data: inputjson,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          'x-auth-token': accesstoken,
          'refresh-token': localStorage.getItem('refreshtoken')
        }
      })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        toastservice.error(error.response.data.message);
        return error.response.data;
      });
  }

  deleteCall(inputjson, url) {
    var self = this
    var accesstoken = localStorage.getItem("token");
    return axios
      .request({
        url: url,
        method: "delete",
        data: inputjson,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          'x-auth-token': accesstoken,
          'refresh-token': localStorage.getItem('refreshtoken')
        }
      })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        toastservice.error(error.response.data.message);
        return error.response.data;
      });
  }

  getCall(url) {
    var self = this
    var accesstoken = localStorage.getItem("token");
    return axios({
      method: "get",
      url: url,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        'x-auth-token': accesstoken,
        'refresh-token': localStorage.getItem('refreshtoken')
      }
    })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        return error.response.data;
      });
  }
}
