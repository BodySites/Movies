import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMovie, IMovieList } from "../../types/IMovie";
import envs from "../../config/environments";

const defaultMovieList: IMovieList = {
	docs: []
};

export const moviesAPI = createApi({
	reducerPath: "moviesAPI",
	baseQuery: fetchBaseQuery({
		baseUrl: envs.baseApiUrl
	}),
	tagTypes: ["Movie"],
	endpoints: builder => ({
		getMovies: builder.query<IMovieList, number>({
			query(page) {
				return {
					url: `?page=${
						page || 1
					}&limit=30&notNullFields=name&notNullFields=poster.url&notNullFields=description&notNullFields=genres.name&countries.name=Россия`,
					headers: {
						"X-API-KEY": `${envs.apiKey || " "}`
					}
				};
			},
			serializeQueryArgs: ({ endpointName }) => {
				return endpointName;
			},
			merge: (currentCache, newItems) => {
				currentCache.docs.push(...newItems.docs);
			},
			forceRefetch({ currentArg, previousArg }) {
				return currentArg !== previousArg;
			},
			providesTags: (result: IMovieList = defaultMovieList) => [
				"Movie",
				...result.docs.map(({ id }) => ({
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
