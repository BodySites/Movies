export interface IMovie {
	id: number;
	enName: string;
	description: string;
	rating: { kp: number };
	poster: {
		url: string;
		previewUrl: string;
	};
	genres: Array<{
		name: string;
	}>;
}
