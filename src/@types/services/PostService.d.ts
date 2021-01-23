import { Post } from "../Post";
import { PageRequest } from "../RequestQuery";

export interface IPostService {
	deleteById: (id: number) => Promise<boolean>,
	getAll: () => Promise<Post[]>,
	getById: (id: number) => Promise<Post>,
	getByPostSlug: (slug: string) => Promise<Post>,
	getPageCount: (pageRequest: PageRequest, params?: PostQueryParams) => Promise<number>,
	save: (_post: PostDTO) => Promise<Post>,
	update: (_post: PostDTO) => Promise<Post>
}

