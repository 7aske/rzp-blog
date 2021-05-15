import { PostControllerApi, Post } from "../api/api";
import { AxiosResponse } from "axios";

export default class PostService {
	private service = new PostControllerApi();

	public deleteById(id: number): Promise<AxiosResponse<void>> {
		return this.service.deletePostById(id);
	}

	// public getAll(params?: PostQueryParams): Promise<Post[]> {
	// 	if (params)
	// 		return this.get("?q=" + btoa(JSON.stringify(params)));
	// 	return this.get("");
	// }

	public getById(id: number): Promise<AxiosResponse<Post>> {
		return this.service.getPostById(String(id))
	}

	public async getByPostSlug(slug: string): Promise<AxiosResponse<Post>> {
		return this.service.getPostById(slug)
	}

	public save(_post: Post): Promise<AxiosResponse<Post>> {
		return this.service.savePost(_post)
	}

	public update(_post: Post): Promise<AxiosResponse<Post>> {
		return this.service.updatePost(_post);
	}

}
