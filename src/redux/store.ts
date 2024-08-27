import { configureStore } from "@reduxjs/toolkit";
import { moviesAPI } from "./features/movies-api";
import favouriteReducer from "./features/favourite-slice";

export const store = configureStore({
	reducer: {
		[moviesAPI.reducerPath]: moviesAPI.reducer,
		favourites: favouriteReducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(moviesAPI.middleware)
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
