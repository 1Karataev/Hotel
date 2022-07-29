import {  createSlice, PayloadAction } from '@reduxjs/toolkit';




 export interface Login {
 login:string,
 password:string,
 
}
interface Auth {
  auth: Login,
  valid: boolean
}
const initialState: Auth = {
 auth:{ login:'', password:''},
 valid: false
};


const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<Login>) {
      state.auth = action.payload
      console.log(state.auth)
    },
     setValid(state, action: PayloadAction<boolean>) {
      state.valid = action.payload
    },
   
  },
});
export const { setAuth, setValid } = AuthSlice.actions;

export default AuthSlice.reducer;