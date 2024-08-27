import { createSlice } from "@reduxjs/toolkit";

type favouriteType = {
	id: number;
	name: string;
};

const loadFromLocalStorage = () => {
	try {
		const serializedLikes = localStorage.getItem("likedMovies");
		if (serializedLikes === null) {
			return [];
		}
		return JSON.parse(serializedLikes) as favouriteType[];
	} catch (error) {
		return [];
	}
};

const saveToLocalStorage = (likedMovies: favouriteType[]) => {
	localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
};

const favouriteSlice = createSlice({
	name: "favourites",
	initialState: {
		likedMovies: loadFromLocalStorage()
	},
	reducers: {
		likeMovie(state, action: { payload: favouriteType }) {
			if (!state.likedMovies.includes(action.payload)) {
				state.likedMovies.push(action.payload);
				saveToLocalStorage(state.likedMovies);
			}
		},
		unlikeMovie(state, action: { payload: number }) {
			state.likedMovies = state.likedMovies.filter(
				movie => movie.id !== action.payload
			);
			saveToLocalStorage(state.likedMovies);
		}
	}
});

export const { likeMovie, unlikeMovie } = favouriteSlice.actions;
export default favouriteSlice.reducer;
