import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMovie } from "../../types/IMovie";
import envs from "../../config/environments";

export const moviesAPI = createApi({
	reducerPath: "moviesAPI",
	baseQuery: fetchBaseQuery({
		baseUrl: envs.baseApiUrl
	}),
	tagTypes: ["Movie"],
	endpoints: builder => ({
		getMovies: builder.query<IMovie[], number>({
			query(page) {
				return {
					url: `/?page=${page || 1}&limit=30`,
					headers: {
						"X-API-KEY": `${envs.apiKey || " "}`
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
						"X-API-KEY": `${envs.apiKey || " "}`
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
