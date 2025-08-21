import { configureStore } from "@reduxjs/toolkit";
import surveysReducer from '../features/surveys/surveySlice';
import availableParticipantsReducer from '../features/members/availableParticipantsSlice';

export const store = configureStore({
    reducer: {
        survey: surveysReducer,
        availableParticipants: availableParticipantsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;