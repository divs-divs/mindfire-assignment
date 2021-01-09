import firebase from 'firebase';
import constants from "./constants/constant";
const config={
  apiKey: constants.API_KEY,
  authDomain: constants.AUTH_DOMAIN,
  databaseURL: constants.DATABASE_URL,
  projectId: constants.PROJECT_ID,
  storageBucket: constants.STORAGE_BUCKET,
  messagingSenderId: constants.MESSAGING_SENDER_ID,
  appId: constants.APP_ID,
  measurementId: constants.MEASURMENT_ID
}
firebase.initializeApp(config)


export default firebase