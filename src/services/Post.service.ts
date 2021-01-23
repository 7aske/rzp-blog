import AbstractHttpClient from "./client/AbstractHttpClient";
import { IPostService } from "../@types/services/PostService";
import { Post } from "../@types/Post";
import { paramsToQuery, pageRequestToQuery } from "../utils/utils";
import { PageRequest } from "../@types/RequestQuery";

export default class PostService extends AbstractHttpClient implements IPostService {
	constructor() {
		super("/posts");
	}

	public deleteById(id: number): Promise<boolean> {
		return this.delete(`/${id}`);
	}

	public getAll(params?: PostQueryParams): Promise<Post[]> {
		if (params)
			return this.get("?q=" + btoa(JSON.stringify(params)));
		return this.get("");
	}

	public getById(id: number): Promise<Post> {
		return this.get(`/${id}`);
	}

	public async getByPostSlug(slug: string): Promise<Post> {
		return (await this.get(`/${slug}`)).data;
	}

	public async getPageCount(pageRequest: PageRequest, params?: PostQueryParams): Promise<number> {
		if (params) {
			const query: any = {
				criteria: paramsToQuery(params),
				op: "AND",
			};
			return (await this.get(`/pages?page=${pageRequestToQuery(pageRequest)}&q=${btoa(JSON.stringify(query))}`)).data.value;
		}
		return (await this.get(`/pages?page=${pageRequestToQuery(pageRequest)}`)).data.value;
	}

	public save(_post: Post): Promise<Post> {
		return this.post("", _post);
	}

	public update(_post: Post): Promise<Post> {
		return this.put("", _post);
	}

}
