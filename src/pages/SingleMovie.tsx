import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMovieQuery } from "../redux/features/movies-api";
import { IMovie } from "../types/IMovie";
import { FaArrowLeft } from "react-icons/fa6";
import MovieInfo from "../components/MovieInfo";

const SingleMovie: React.FC = () => {
	const { id } = useParams();

	const navigate = useNavigate();

	const { data: movieData, isLoading, isError } = useGetMovieQuery(id || "0");

	const [movie, setMovie] = useState<IMovie>();

	useEffect(() => {
		if (movieData) {
			setMovie(movieData);
		}
	}, [movieData]);

	function back() {
		navigate("/movies");
	}

	return (
		<main className="font-arial p-8 pt-8 flex flex-col gap-6 text-gray-100 md:pt-16 2xl:p-24 2xl:pt-16">
			<div
				className="flex gap-2 items-center hover:cursor-pointer"
				onClick={back}>
				<FaArrowLeft size={15} />
				<span>Вернуться к списку фильмов</span>
			</div>
			{isLoading && (
				<div className="text-3xl flex items-center justify-center h-full">
					Загрузка данных...
				</div>
			)}
			{isError && (
				<div className="text-3xl flex items-center justify-center h-full">
					Ошибка получения данных
				</div>
			)}
			{movie && !isLoading ? (
				<MovieInfo item={movie} />
			) : (
				!isError &&
				!isLoading && (
					<div className="text-3xl flex items-center justify-center h-full">
						Фильм не найден
					</div>
				)
			)}
		</main>
	);
};

export default SingleMovie;
