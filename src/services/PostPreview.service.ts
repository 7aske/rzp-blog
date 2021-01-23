import AbstractHttpClient from "./client/AbstractHttpClient";
import { IPostPreviewService } from "../@types/services/PostPreviewService";
import { PostPreview } from "../@types/PostPreview";
import { paramsToQuery, pageRequestToQuery } from "../utils/utils";
import { PageRequest } from "../@types/RequestQuery";

export default class PostPreviewService extends AbstractHttpClient implements IPostPreviewService {
	constructor() {
		super("/previews");
	}

	public async getAll(pageRequest: PageRequest, params?: PostQueryParams): Promise<PostPreview[]> {
		if (params) {
			const query: any = {
				criteria: paramsToQuery(params),
				op: "AND"
			}
			return (await this.get(`?page=${pageRequestToQuery(pageRequest)}&q=${btoa(JSON.stringify(query))}`)).data;
		}
		return (await this.get(`?page=${pageRequestToQuery(pageRequest)}`)).data;
	}

}
