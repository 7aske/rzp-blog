interface PostService {
	deleteById: (idPost: number) => Promise<boolean>,
	getAllPreview: (page?: number, count?: number) => Promise<PostPreviewDTO[]>,
	getById: (idPost: number) => Promise<PostDTO>,
	getByPostSlug: (postSlug: string) => Promise<PostDTO>,
	getPageCount: (count?: number) => Promise<number>,
	save: (_post: PostDTO) => Promise<PostDTO>,
	update: (_post: PostDTO) => Promise<PostDTO>
}

