import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
//import { Loader } from "@googlemaps/js-api-loader"

window._globalUserData_ = {
  UserInfo: null,
  SelectedChatRoomData: null,
};
window._globalListingData_ = null;

const app = firebase.initializeApp({
  apiKey: "AIzaSyD4Ivgo-gp_MAfNOTdeYH9ZnR4bDI5Hz1k",
  authDomain: "flatfinder-9d96b.firebaseapp.com",
  projectId: "flatfinder-9d96b",
  storageBucket: "flatfinder-9d96b.appspot.com",
  messagingSenderId: "994179538917",
  appId: "1:994179538917:web:7a27826f4642996be2590c",
  measurementId: "G-2BHM0EN03M",
});

// export const loader = new Loader({
//     key: 'AIzaSyCnxU0-EoXpxOg9mzZMFBuQbhaoKVgFHbI'
//   });
  

export const auth = app.auth();
export const db = app.firestore();
