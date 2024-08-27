import React, { useEffect, useState } from "react";
import { IMovie } from "../types/IMovie";
import { useGetMoviesQuery } from "../redux/features/movies-api";
import MovieList from "../components/MovieList";

const Movies: React.FC = () => {
	const [page, setPage] = useState(1);

	const [movies, setMovies] = useState<IMovie[]>([]);

	const { data: moviesData, isLoading, isError } = useGetMoviesQuery(page);

	useEffect(() => {
		if (moviesData?.docs.length) {
			setMovies(moviesData.docs);
		}
	}, [moviesData?.docs]);

	const handleScroll = () => {
		const bottom =
			Math.ceil(window.innerHeight + window.scrollY) >=
			document.documentElement.scrollHeight;

		if (bottom && !isLoading && !isError) {
			setPage(page + 1);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});

	return (
		<div className="p-12 pt-20 flex flex-col gap-10 font-arial sm:p-8 sm:pt-14">
			{isLoading && (
				<div className="text-xl text-center">Загрузка данных...</div>
			)}
			{isError && (
				<div className="text-xl text-center">Ошибка получения данных</div>
			)}
			{movies.length && !isLoading ? (
				<MovieList movies={movies} />
			) : (
				!isError &&
				!isLoading && <div className="text-xl text-center">Нет фильмов</div>
			)}
		</div>
	);
};

export default Movies;
