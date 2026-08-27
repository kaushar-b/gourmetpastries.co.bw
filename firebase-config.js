import { initializeApp }  from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore }   from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getAuth }        from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey:            "AIzaSyD4ShD2m1CihPXHzBrj_MiGSPt-94VP6Ok",
  authDomain:        "gourmet-fine-pastries-web.firebaseapp.com",
  projectId:         "gourmet-fine-pastries-web",
  storageBucket:     "gourmet-fine-pastries-web.firebasestorage.app",
  messagingSenderId: "359853824136",
  appId:             "1:359853824136:web:4d75b45d43ed80466b273d"
};

const app = initializeApp(firebaseConfig);
export const db   = getFirestore(app);
export const auth = getAuth(app);
