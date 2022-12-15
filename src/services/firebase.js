import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, set, child, update } from "firebase/database";
import { sharedInstance as events } from "../scenes/EventCenter";

var firebaseConfig = {
  apiKey: "AIzaSyC5N2tpQWGaE-39kBJ2mjoztnDJWyO-Peg",
  authDomain: "ruinas-del-tiempo.firebaseapp.com",
  projectId: "ruinas-del-tiempo",
  storageBucket: "ruinas-del-tiempo.appspot.com",
  messagingSenderId: "190667805552",
  appId: "1:190667805552:web:9cdcdc91c47bbb52dcb5b5",
  measurementId: "G-97XXMMFSHE",
  databaseURL: "https://ruinas-del-tiempo-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function getData() {
  const dbRef = ref(db);
  get(child(dbRef, "users/inicioJugador"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        events.emit("dato-recibido", data);
      } else {
      }
    })
    .catch((error) => {
    });
}

export async function pushData(comienzo) {
  update(ref(db, "users/"), {
    inicioJugador: comienzo,
  })
    .then(() => {
    })
    .catch((error) => {
    });
}
