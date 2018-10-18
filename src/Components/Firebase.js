import firebase from 'firebase/app';
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyAjiqnvNYGaGA9AczFQaWINOuyYfRothDM",
    authDomain: "proyectos-c135d.firebaseapp.com",
    databaseURL: "https://proyectos-c135d.firebaseio.com",
    projectId: "proyectos-c135d",
    storageBucket: "proyectos-c135d.appspot.com",
    messagingSenderId: "812434149951"
  };
  firebase.initializeApp(config);
export default firebase;