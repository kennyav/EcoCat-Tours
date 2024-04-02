import { createSlice } from '@reduxjs/toolkit'

export const refreshSlice = createSlice({
  name: 'refresh',
  initialState: {
    value: false,
  },
  reducers: {
    updateRefresh: (state, action) => {
      state.value = action.payload
    }
  },
})

export const { updateRefresh } = refreshSlice.actions


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export default refreshSlice.reducer
