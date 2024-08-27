import React, { useState } from "react";

interface ButtonProperties {
	title: string;
	changeActive: (active: boolean) => void;
}

const FilterFavourites: React.FC<ButtonProperties> = ({
	title,
	changeActive
}) => {
	const [active, setActive] = useState(false);

	function changeActiveFilter() {
		changeActive(!active);
		setActive(!active);
	}

	return (
		<button
			className={`p-3 rounded-xl text-base text-white hover:bg-opacity-60 ${
				active ? "bg-green-900" : "bg-green-600"
			}`}
			onClick={changeActiveFilter}>
			{title}
		</button>
	);
};

export default FilterFavourites;
