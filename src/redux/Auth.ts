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
 valid: JSON.parse(localStorage.getItem('valid')??'false')
};


const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<Login>) {
      state.auth = action.payload
      
    },
     setValid(state, action: PayloadAction<boolean>) {
      state.valid = action.payload
      localStorage.setItem('valid', JSON.stringify(action.payload))
    },
   
  },
});
export const { setAuth, setValid } = AuthSlice.actions;

export default AuthSlice.reducer;