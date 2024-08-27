import React from "react";
import { IMovie } from "../types/IMovie";
import { FaStar } from "react-icons/fa6";

interface MovieProperties {
	item: IMovie;
}

const MovieInfo: React.FC<MovieProperties> = ({ item }) => {
	return (
		<div className="flex flex-wrap gap-8 justify-center">
			<div className="md:flex-[0_1_30%] max-w-xl min-w-72 flex flex-col items-center">
				<img
					src={item.poster.url}
					alt="Фото"
					className="rounded-md object-cover bg-slate-800 max-h-[550px]"
				/>
				<div className="flex flex-wrap justify-center gap-2 mt-2">
					{item.genres.map((genre, key) => (
						<span
							key={key}
							className="text-base md:text-xl bg-gray-200 rounded-full px-3 py-1 text-black">
							{genre.name}
						</span>
					))}
				</div>
			</div>
			<div className="flex-[1_1] flex flex-col gap-4 min-w-[270px]">
				<h1 className="text-xl md:text-3xl font-bold text-black">
					{item.name} (<span>{item.year}</span>)
				</h1>
				<div className="flex items-center gap-2 md:mb-4">
					<FaStar color="orange" />
					<span className="text-base md:text-xl">
						{item.rating.kp ? `${item.rating.kp}/10` : "Нет оценок"}
					</span>
				</div>
				<p className="text-base md:text-xl">{item.description}</p>
			</div>
		</div>
	);
};

export default MovieInfo;
