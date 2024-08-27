import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { IMovie } from "../types/IMovie";

interface MovieListProperties {
	movies: IMovie[];
}

const MovieList: React.FC<MovieListProperties> = ({ movies }) => {
	const [deletedMovies, setDeletedMovies] = useState<number[]>([]);

	const [filteredMovies, setFilteredMovies] = useState<IMovie[]>(movies);

	const handleCardDelete = (id: number) => {
		setDeletedMovies([...deletedMovies, id]);
	};

	useEffect(() => {
		const filteredMovies = movies.filter(
			movie => !deletedMovies.includes(movie.id)
		);

		setFilteredMovies(filteredMovies);
	}, [movies, deletedMovies]);

	return (
		<div className="flex justify-center">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 gap-y-11 sm:gap-5 lg:gap-8 2xl:gap-10 max-w-[1400px]">
				{filteredMovies.map((movie, key) => (
					<MovieCard item={movie} key={key} onCardDelete={handleCardDelete} />
				))}
			</div>
		</div>
	);
};

export default MovieList;
