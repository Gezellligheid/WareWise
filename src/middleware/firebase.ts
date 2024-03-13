import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  User,
} from "firebase/auth";
import { ref } from "vue";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const isUserLoggedIn = ref(false);

let instance = null;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFH2Ru6u2E8Nntrhu2PDPtawKEVY0ZPs8",
  authDomain: "warewise-f05fd.firebaseapp.com",
  projectId: "warewise-f05fd",
  storageBucket: "warewise-f05fd.appspot.com",
  messagingSenderId: "975859458932",
  appId: "1:975859458932:web:8a92e20d39358ec4e04221",
};

const initApp = () => {
  instance = initializeApp(firebaseConfig);
};
// Initialize Firebase

const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithRedirect(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);

      if (credential === null) {
        return;
      }

      const token = credential.accessToken;
      const user = result.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

// const getUser = () => {
//   const auth = getAuth();
//   const user = auth.currentUser;

//   if (user !== null) {
//     return user;
//   } else {
//     return null;
//   }
// };

const reloadUser = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user !== null) {
    user.reload().then(() => {
      // User reloaded.
    });
  }
};

const onAuthStateChanged = () => {
  const auth = getAuth();
  auth.onAuthStateChanged((user) => {
    if (user !== null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      isUserLoggedIn.value = true;
      // ...
    } else {
      // User is signed out

      isUserLoggedIn.value = false;
      // ...
    }
  });
};

const getUser = async (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
};

export default instance;
export {
  loginWithGoogle,
  getUser,
  onAuthStateChanged,
  reloadUser,
  initApp,
  isUserLoggedIn,
};
