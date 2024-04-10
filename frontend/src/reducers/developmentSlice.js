import { createSlice } from '@reduxjs/toolkit'

export const developmentSlice = createSlice({
  name: 'development',
  initialState: {
    //value: "http://3.15.70.119:8000",
    //value: "http://127.0.0.1:8000",
    value: "http://www.ecocatreservations.com"
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload
    }
  },
})

export const { update } = developmentSlice.actions


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export default developmentSlice.reducer
