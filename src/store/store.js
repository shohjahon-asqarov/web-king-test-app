import { configureStore } from '@reduxjs/toolkit';
import  questionSlice  from './slices/questionsSlice';

export const store = configureStore({
    reducer: {
        questions: questionSlice
    },
})