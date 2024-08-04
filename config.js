import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCTFarEaBaa5FcRLzhjgLmINyFREezQx50",
  authDomain: "todo-app-70f82.firebaseapp.com",
  projectId: "todo-app-70f82",
  storageBucket: "todo-app-70f82.appspot.com",
  messagingSenderId: "796102706251",
  appId: "1:796102706251:web:eb033da3c17bc5d67479ce",
  measurementId: "G-0CRZKYMV7K"
};
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
// export const auth = getAuth(app);
export const db = getFirestore(app);