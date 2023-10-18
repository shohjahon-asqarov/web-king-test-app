import { createSlice } from '@reduxjs/toolkit'

const initialStateValues = {
    questions: [],
}

export const questionSlice = createSlice({
  name: 'counter',
  initialState: initialStateValues,
  reducers: {
    setQuestionsState: (state , action) => {
      state.questions = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setQuestionsState } = questionSlice.actions

export default questionSlice.reducer