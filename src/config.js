import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyA8VrD9fnQNpqkuzok4FGg8ciQm9G15bRM",
  authDomain: "locations-a1886.firebaseapp.com",
  databaseURL: "https://locations-a1886.firebaseio.com",
  projectId: "locations-a1886",
  storageBucket: "locations-a1886.appspot.com",
  messagingSenderId: "51826958775"
};
const fire = firebase.initializeApp(config);

fire.firestore().settings({
  timestampsInSnapshots: true
});

export default fire;
