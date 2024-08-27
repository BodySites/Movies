import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { IMovie } from "../types/IMovie";
import { LiaHeart, LiaHeartSolid } from "react-icons/lia";
import { FaTrashAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hook";
import { likeMovie, unlikeMovie } from "../redux/features/favourite-slice";

interface CardProperties {
	item: IMovie;
	onCardDelete: (id: number) => void;
}

const MovieCard: React.FC<CardProperties> = ({ item, onCardDelete }) => {
	const favourites = useAppSelector(state => state.favourites.likedMovies);

	const dispatch = useAppDispatch();

	const [isFavourite, setIsFavourite] = useState(false);

	useEffect(() => {
		favourites.some(favourite => favourite.id === item.id)
			? setIsFavourite(true)
			: setIsFavourite(false);
	}, [favourites]);

	function changeFavourite() {
		dispatch(
			!isFavourite
				? likeMovie({ id: item.id, name: item.name })
				: unlikeMovie(item.id)
		);
	}

	function handleDeleteClick() {
		onCardDelete(item.id);
	}

	return (
		<div className="rounded-md flex flex-col text-black bg-slate-200 shadow-lg max-h-[650px] max-w-96 overflow-hidden relative hover:cursor-pointer">
			<img
				src={item.poster.previewUrl || item.poster.url}
				alt="Фото"
				className="rounded-t-md rounded-r-md w-full sm:h-80 h-72 object-center bg-slate-800 flex items-center justify-center"
			/>
			<div
				className="absolute top-2 left-2 hover:cursor-pointer"
				onClick={changeFavourite}>
				{isFavourite ? (
					<LiaHeartSolid size={35} color="red" />
				) : (
					<LiaHeart size={35} stroke="red" color="red" />
				)}
			</div>
			<div
				className="absolute top-2 right-2 hover:cursor-pointer"
				onClick={handleDeleteClick}>
				<FaTrashAlt size={35} color="black" />
			</div>
			<div className="flex flex-col gap-3 p-3">
				<h2 className="text-xl font-bold">{item.name}</h2>
				<div className="flex justify-between items-center gap-2">
					<div className="flex gap-2 items-center">
						<FaStar color="orange" />
						<span className="text-base">
							{item.rating.kp ? `${item.rating.kp}/10` : "Нет оценок"}
						</span>
					</div>
					<div className="text-base">{item.genres[0].name}</div>
				</div>
				<p className="text-base line-clamp-[7]">{item.description}</p>
			</div>
		</div>
	);
};

export default MovieCard;
