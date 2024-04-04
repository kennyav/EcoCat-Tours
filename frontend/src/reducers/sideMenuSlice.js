import { createSlice } from '@reduxjs/toolkit'

export const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState: {
    value: false,
  },
  reducers: {
    updateSideMenu: (state, action) => {
      state.value = action.payload
    }
  },
})

export const { updateSideMenu } = sideMenuSlice.actions


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export default sideMenuSlice.reducer
