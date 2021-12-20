import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import { setUserData } from './userSlice';

export const submitLogin =
  ({ email, password }) =>
  async (dispatch) => {
    const isAdmin = email.includes('admin') || false;
    // console.log(isAdmin);
    return jwtService
      .signInWithEmailAndPassword(email, password, isAdmin)
      .then((user) => {
        const data = {
          role: isAdmin ? ['admin'] : ['staff'],
          data: {
            displayName: isAdmin ? 'admin' : email,
            photoURL: 'assets/images/avatars/Perfil-Wuay.jpg',
            email,
            displayUser: isAdmin ? 'admin' : email,
            diplayDocument: email,
          },
        };

        dispatch(setUserData(data));

        dispatch(
          showMessage({
            message: 'Inicio de sesión satisfactorio',
            variant: 'success',
          })
        );

        return dispatch(loginSuccess());
      })
      .catch((errors) => {
        dispatch(
          showMessage({
            message: errors,
            variant: 'error',
          })
        );
        return dispatch(loginError(errors));
      });
  };

export const submitLoginWithFireBase =
  ({ email, password }) =>
  async (dispatch) => {
    if (!firebaseService.auth) {
      console.warn("Firebase Service didn't initialize, check your configuration");

      return () => false;
    }
    return firebaseService.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return dispatch(loginSuccess());
      })
      .catch((error) => {
        const emailErrorCodes = [
          'auth/email-already-in-use',
          'auth/invalid-email',
          'auth/operation-not-allowed',
          'auth/user-not-found',
          'auth/user-disabled',
        ];
        const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];
        const response = [];

        if (emailErrorCodes.includes(error.code)) {
          response.push({
            type: 'email',
            message: error.message,
          });
        }

        if (passwordErrorCodes.includes(error.code)) {
          response.push({
            type: 'password',
            message: error.message,
          });
        }

        if (error.code === 'auth/invalid-api-key') {
          dispatch(showMessage({ message: error.message }));
        }

        return dispatch(loginError(response));
      });
  };

const initialState = {
  success: false,
  errors: [],
};

const loginSlice = createSlice({
  name: 'auth/login',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    loginError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },
  },
  extraReducers: {},
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
