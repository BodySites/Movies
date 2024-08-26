import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMovie } from "../../types/IMovie";

export const moviesAPI = createApi({
	reducerPath: "moviesAPI",
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_URL
	}),
	tagTypes: ["Movie"],
	endpoints: builder => ({
		getMovies: builder.query<IMovie[], number>({
			query(page) {
				return {
					url: `/?page=${page || 1}&limit=30`,
					headers: {
						"X-API-KEY": `${import.meta.env.VITE_API_KEY || " "}`
					}
				};
			},
			serializeQueryArgs: ({ endpointName }) => {
				return endpointName;
			},
			merge: (currentCache, newItems) => {
				currentCache.push(...newItems);
			},
			forceRefetch({ currentArg, previousArg }) {
				return currentArg !== previousArg;
			},
			providesTags: (result: IMovie[] = []) => [
				"Movie",
				...result.map(({ id }) => ({
					type: "Movie" as const,
					id
				}))
			]
		}),
		getMovie: builder.query<IMovie, string>({
			query(id) {
				return {
					url: `/${id}`,
					headers: {
						"X-API-KEY": `${import.meta.env.VITE_API_KEY || " "}`
					}
				};
			},
			providesTags: (_result, _error, argument) => [
				{ type: "Movie", id: argument }
			]
		})
	})
});

export const { useGetMovieQuery, useGetMoviesQuery } = moviesAPI;
