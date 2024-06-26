import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'loginTitle',
  initialState: {
    value: "Bookings",
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload
    }
  },
})

export const { update } = loginSlice.actions


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectTitle = (state) => state.loginTitle.value

export default loginSlice.reducer
