export default {
  BASE_URL: "https://vinnoba.com/hopfirst/",
  FORGOT_PASSWORD : "api/user/forgotpassword",
  // BASE_URL = "http://192.168.1.91:8080/";
  SESSIONS_API_URL : "api/user/sessions",
  TOKEN_HEADER_STRING : "x-auth-token",
  ENTITY_ID : localStorage.getItem('entity_id'),
  SOURCE_CUSTOMER_ENTITY_QUERY : ["SOURCE_CUSTOMER"],
  SOURCE_CUSTOMER : "SOURCE_CUSTOMER",
  SOURCE_CUSTOMER_ENTITY_TYPE: 'sourcecustomer',
  MANAGE_USER_ENTITY_TYPE: 'manageuser',
  SOURCE_CUSTOMER_ENTITY : "api/entity/query",
  USER_QUERY:"/user/query",
  CREATE_USER_QUERY:"/user",
  CREATE_SOURCE_COUSTOMER_ENTITY:"/api/entity",
  QUERY_TRANSPORTER : 'api/entity/query',
  ENQUIRY_LIST : '/query',
  USER_IMAGE :'/userimage/query',
  API: "api/",
  QUERY: "/query",
  API_ENTITY: "api/entity/",
  GET_STATE_LIST: "api/country/India/state/query",
  GET_CITY_LIST: "api/country/India/city/query",
  ADD_CITY:"api/city",
  GOOGLE_MAP_KEY: "AIzaSyCCCpwVmFp_9nMxyWEjIiioNyCo5AdL1ok",
  ACTION : '/action',
  USER_TITLE_QUERY: '/titles',
  CHANGEPASSWORD : '/changepassword',
  TRIP: '/trip/',
  POD: '/pod',
  REFRESH_TOKEN: 'user/refreshtoken',
  TRANSPORTER_ROUTE: '/serviceroute',
  USERADDITIONAL: '/useradditionalattributes',
  ENTITY_ADDITIONAL: 'entityadditionalattributes',
  SEND_MAIL: 'sendemail',
  OTHER: 'other',
  NOTIFICATIONHISTORYQUERY: '/notification/history/query',
  NOTIFICATIONHISTORY: '/notification/history',
  FCMTOKEN: '/fcmtoken',
  GENRATE_OTP:"api/user/generateotp",
  LOGOUT:'/logout',
  USER_ID:localStorage.getItem("user_info") ? JSON.parse(localStorage.getItem("user_info")).user_id :null,
  CLIENT_ID:localStorage.getItem("client_id"),
  
  ROLES: [
    {
      name: 'USER_ADMIN',
      id: 'USER_ADMIN',
      value: 'CONTROL_TOWER'
    },
    {
      name: 'CT QUOTES ADMIN',
      id: 'CT_QUOTES_ADMIN',
      value: 'CONTROL_TOWER'
    },
    {
      name: 'ENTITY ADMIN',
      id: 'ENTITY_ADMIN',
      value: 'CONTROL_TOWER'
    },
    { 
      name: 'SCUST ADMIN',
      id: 'SCUST_ADMIN',
      value: 'SOURCE_CUSTOMER'
    }, 
  ],
  MapStyling: [
    {
      "featureType": "all",
      "elementType": "geometry.fill",
      "stylers": [
        {
            "weight": "2.00"
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "geometry.stroke",
    "stylers": [
        {
            "color": "#9c9c9c"
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.text",
      "stylers": [
        {
            "visibility": "on"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
        {
            "color": "#f2f2f2"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [
        {
            "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.fill",
      "stylers": [
        {
            "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
        {
            "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
        {
            "saturation": -100
        },
        {
            "lightness": 45
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
            "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#7b7b7b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
            "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [
        {
            "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [
        {
            "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
        {
            "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
        {
            "color": "#46bcec"
        },
        {
            "visibility": "on"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
            "color": "#b5dae1"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
            "color": "#070707"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "color": "#ffffff"
          }
      ]
    }
  ],
  CONTROL_TOWER: 'CONTROL_TOWER',
  SCUST_ADMIN: 'SOURCE_CUSTOMER',
  ROLE_SCUST_ADMIN: 'SCUST_ADMIN',
  ROLE_CT_ADMIN: 'USER_ADMIN',
  ROLE_CT_QUOTES_ADMIN: 'CT_QUOTES_ADMIN',
  ACCEPTED: "ACCEPTED",
  ACTIVATED : 'ACTIVATED',
  DEACTIVATED :'DEACTIVATED',
  IndiaCode: 'in',
  plus: '+',
  COMPLETED: 'COMPLETED',
  ROUTE_ADDED_MESSAGE: 'Route Added successfully',
  USER_ADDED_MESSAGE: "User Added successfully.",
  USER_EDIT_MESSAGE: "User Edit successfully.",
  ASC: 'ASC',
  DESC: 'DESC',
  CUSTOMER_EDIT_MESSAGE: "Customer Edit successfully.",
  UNREAD: "UNREAD",
  ENQUIRY: "ENQUIRY",
  API_KEY: "AIzaSyBHjfu5_sM5FyDkVpgqIJ1DJsot3EAIzcg",
  AUTH_DOMAIN: "hopfirst-65914.firebaseapp.com",
  DATABASE_URL: "https://hopfirst-65914.firebaseio.com",
  PROJECT_ID: "hopfirst-65914",
  STORAGE_BUCKET: "hopfirst-65914.appspot.com",
  MESSAGING_SENDER_ID: "189210679564",
  APP_ID: "1:189210679564:web:a74c91b1370c1a55981129",
  MEASURMENT_ID: "G-QN9GJ1V0P2",
  MAX_PERCENTAGE:100,
  
}
