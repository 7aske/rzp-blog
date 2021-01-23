import AbstractHttpClient from "./client/AbstractHttpClient";
import { ITagService } from "../@types/services/TagService";
import { Tag } from "../@types/Tag";

export default class TagService extends AbstractHttpClient implements ITagService {

	constructor() {
		super("/tags");
	}

	public async deleteById(id: number): Promise<void> {
		await this.delete(`/${id}`);
	}

	public async getAll(): Promise<Tag[]> {
		return (await this.get("")).data;
	}

	public async save(tag: Tag): Promise<Tag> {
		return (await this.post("", tag)).data;
	}

	public async update(tag: Tag): Promise<Tag> {
		return (await this.put("", tag)).data;
	}

}
