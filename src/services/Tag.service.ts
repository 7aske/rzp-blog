import { AxiosResponse } from "axios";
import { TagControllerApi, Tag } from "../api/api";

export default class TagService {
	private service = new TagControllerApi();

	public async deleteById(id: number): Promise<AxiosResponse<void>> {
		return this.service.deleteTagById(id);
	}

	public async getAll(): Promise<AxiosResponse<Array<Tag>>> {
		return this.service.getAllTags();
	}

	public async save(tag: Tag): Promise<AxiosResponse<Tag>> {
		return this.service.saveTag(tag);
	}

	public async update(tag: Tag): Promise<AxiosResponse<Tag>> {
		return this.service.updateTag(tag);
	}

}
