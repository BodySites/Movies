import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { IMovie } from "../types/IMovie";
import { useAppSelector } from "../hooks/redux-hook";

interface MovieListProperties {
	movies: IMovie[];
	activeFilter: boolean;
}

const MovieList: React.FC<MovieListProperties> = ({ movies, activeFilter }) => {
	const favourites = useAppSelector(state => state.favourites.likedMovies);

	const [deletedMovies, setDeletedMovies] = useState<number[]>([]);

	const [filteredMovies, setFilteredMovies] = useState<IMovie[]>(movies);

	const handleCardDelete = (id: number) => {
		setDeletedMovies([...deletedMovies, id]);
	};

	useEffect(() => {
		let filteredMovies = movies.filter(
			movie => !deletedMovies.includes(movie.id)
		);

		activeFilter &&
			(filteredMovies = filteredMovies.filter(movie =>
				favourites.some(favourite => favourite.id === movie.id)
			));

		setFilteredMovies(filteredMovies);
	}, [movies, deletedMovies, activeFilter, favourites]);

	return (
		<div className="flex justify-center">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 gap-y-11 sm:gap-5 lg:gap-8 2xl:gap-10 max-w-[1400px]">
				{filteredMovies.map(movie => (
					<MovieCard
						item={movie}
						key={movie.id}
						onCardDelete={handleCardDelete}
					/>
				))}
			</div>
		</div>
	);
};

export default MovieList;
