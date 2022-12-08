import { createContext, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDawQyUAHfpmsg5939nMOoTG1bCE11wNwA",
  authDomain: "algorif-eb555.firebaseapp.com",
  databaseURL: "https://algorif-eb555-default-rtdb.firebaseio.com",
  projectId: "algorif-eb555",
  storageBucket: "algorif-eb555.appspot.com",
  messagingSenderId: "617491934888",
  appId: "1:617491934888:web:3058646b81b569d8e8dc9d",
  measurementId: "G-HLV12L77SB"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

export const AuthContext = createContext({ undefined });



export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);



  const initialize = async () => {
    //const localStorage = localStorage()
    const user = JSON.parse(localStorage.getItem('@AuthFirebase:metadata'))
    if (user) {
      signIn(user)
    }
    //auth.currentUser = user
    try {
      const isAuthenticated = auth.currentUser ? true : false;

      if (isAuthenticated) {
        const user = auth.currentUser;

        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: user
        });
      } else {
        dispatch({
          type: HANDLERS.INITIALIZE
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(() => {
    initialize().catch(console.error);
  }, []);

  const signIn = (user) => {
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signOut = async () => {
    await auth.signOut();
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  const getUserDetails = async () => {
    const ref = doc(db, "coders", auth.currentUser.uid);
    const data = await getDoc(ref)

    //console.log(data)
    return data.data();
  }

  async function setUserDetails(email, userName, state, city, phone) {
    const ref = doc(db, "coders", auth.currentUser.uid);
    await updateDoc(ref, {
      email: email,
      userName: userName,
      state: state,
      city: city,
      phone: phone
    });
  }

  async function setPictureUser(file) {
    const storageRef = ref(storage, auth.currentUser.uid + ".png");
    await uploadBytes(storageRef, file)
  }

  const getPictureUser = async (setImgURL) => {
      if(auth.currentUser) {
        getDownloadURL(ref(storage, auth.currentUser.uid + ".png"))
      .then((url) => {
        setImgURL(url)
      })  
    }  
  }

  async function setRegisterUser(email, userName, state, city) {
    try {
      await setDoc(doc(db, "coders", auth.currentUser.uid), {
        email: email, 
        userName: userName,
        state: state,
        city: city,
        phone: '',
      });
      console.log(auth.currentUser.uid)
    } catch (error) {
      console.log(error)
      alert(error)
    }

    const storageRef = ref(storage, auth.currentUser.uid + ".png");
    await uploadBytes(storageRef)
    // ...
  }
  
  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signOut,
        getUserDetails,
        setUserDetails,
        setPictureUser,
        getPictureUser,
        setRegisterUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
