import { PostPreviewControllerApi } from "../api/api";
import { QueryBuilder } from "../utils/QueryBuilder";

export default class PostPreviewService {
	private service = new PostPreviewControllerApi();

	public async getAll(page = 0, queryParams: string[] = []) {
		const stringAttrs = ["slug", "title", "excerpt"];
		const arrAttrs = ["category"];
		const builder = new QueryBuilder();
		stringAttrs.forEach(attr => queryParams.forEach(param => builder.like(attr, param).or()));
		arrAttrs.forEach(attr => queryParams.forEach(param => builder.like(attr + ".name", param).or()));
		console.log(builder.build());
		return this.service.getAllPostPreviews(String(page), builder.build());
	}

	public async getAllByCategoryName(page = 0, categoryName: string) {
		const query = new QueryBuilder()
			.eq("category.name", categoryName)
			.build();
		return this.service.getAllPostPreviews(String(page), query);
	}

	public async getAllByTagName(page = 0, tagName: string) {
		const query = new QueryBuilder()
			.eq("tags.name", tagName)
			.build();
		return this.service.getAllPostPreviews(String(page), query);
	}
}
