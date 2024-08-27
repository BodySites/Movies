export interface IMovie {
	id: number;
	name: string;
	description: string;
	rating: { kp: number };
	poster: {
		url: string;
		previewUrl: string;
	};
	genres: Array<{
		name: string;
	}>;
	year: number;
}

export interface IMovieList {
	docs: IMovie[];
	pages: number;
}
