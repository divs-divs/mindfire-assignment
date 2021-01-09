import axios from "axios";
import constants from "../constants/constant";
import toastService from "./toastnotification";
const toastservice = new toastService();

export default class AuthenticationService {
  baseUrl = constants.BASE_URL;
  forgotPasswordUrl = constants.FORGOT_PASSWORD;
  sessionsApi = constants.SESSIONS_API_URL;

    
  getUserInfo () {
    return localStorage.getItem('user_info')
  }

  loginRequest(username, password) {
    var url = 'http://localhost:3001/api/v1/users';
    var loginBody = {};
    var clientid = this.createJavascriptClientId();
    loginBody["client_id"] = clientid;
    localStorage.setItem("client_id", clientid);
    return this.postRequest(loginBody, url, username, password);
  }
  forgotPassword(email) {
    var url = this.baseUrl + this.forgotPasswordUrl;
    var forgotPasswordInputJson = {};
    forgotPasswordInputJson["email_id"] = email;
    return this.forgotPasswordRequest(url, forgotPasswordInputJson);
  }
  genrateOTP(json){
    var url = this.baseUrl + constants.GENRATE_OTP;
    return this.postRequest(json,url);
  }

  fcmTokenRequest(fcmToken){
    var userId =localStorage.getItem("user_info")
    var user_id = JSON.parse(userId).user_id
    var entity_id = localStorage.getItem("entity_id")
    var inputJson = {};
    var url = constants.BASE_URL+constants.API_ENTITY+entity_id+constants.CREATE_USER_QUERY+'/'+user_id+constants.FCMTOKEN
    inputJson["fcm_token"] = fcmToken;
    inputJson["client_id"] = this.createJavascriptClientId();
    return this.postFcmTokenRequest(url, inputJson);
  }

  postFcmTokenRequest(url,loginBody){
      return axios({
      method: "post",
      url: url,
      data: loginBody,
      headers: {
        "Content-Type": "application/json",
        "x-auth-token" : localStorage.getItem("token")
      }
    })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        return error.response.data;
      });
  }

  postRequest(body, url, username, password) {
    var base64 = btoa(username + ":" + password);
    return axios({
      method: "post",
      url: url,
      data: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + base64
      }
    })
      .then(function(response) {
        toastservice.success(response.data.message);
        return response;
      })
      .catch(function(error) {
        toastservice.error(error.response.data.message);
        return error.response.data;
      });
  }

 forgotPasswordRequest(url, loginBody) {
    return axios({
      method: "post",
      url: url,
      data: loginBody,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function(response) {
        toastservice.success(response.data.message);
        return response;
      })
      .catch(function (error) {
        toastservice.error(error.response.data.message);
        return error.response.data;
      });
  }

  createJavascriptClientId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
