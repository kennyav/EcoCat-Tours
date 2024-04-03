import { createSlice } from '@reduxjs/toolkit'

export const dateViewSlice = createSlice({
  name: 'dateView',
  initialState: {
    value: "Month",
  },
  reducers: {
    updateDateView: (state, action) => {
      state.value = action.payload
    }
  },
})

export const { updateDateView } = dateViewSlice.actions


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export default dateViewSlice.reducer
