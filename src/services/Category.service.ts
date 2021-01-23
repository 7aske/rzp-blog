import { ICategoryService } from "../@types/services/CategoryService";
import AbstractHttpClient from "./client/AbstractHttpClient";
import { Category } from "../@types/Category";

export default class CategoryService extends AbstractHttpClient implements ICategoryService {
	constructor() {
		super("/categories")
	}

	public async deleteById(id: number): Promise<boolean> {
		return (await this.delete(`/${id}`)).data;
	}

	public async getAll(): Promise<Category[]> {
		return (await this.get("")).data;
	}

	public async save(_category: Category): Promise<Category> {
		return (await this.post("", _category)).data;
	}

	public async update(_category: Category): Promise<Category> {
		return (await this.put("", _category)).data;
	}

}
