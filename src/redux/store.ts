import { configureStore } from "@reduxjs/toolkit";
import { moviesAPI } from "./features/movies-api";

export const store = configureStore({
	reducer: {
		[moviesAPI.reducerPath]: moviesAPI.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(moviesAPI.middleware)
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
