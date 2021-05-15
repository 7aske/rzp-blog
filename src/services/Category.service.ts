import { Category, CategoryControllerApi } from "../api/api";
import { AxiosResponse } from "axios";

export default class CategoryService  {
	private service = new CategoryControllerApi();

	public async deleteById(id: number): Promise<AxiosResponse<void>> {
		return this.service.deleteCategoryById(id);
	}

	public async getAll(): Promise<AxiosResponse<Array<Category>>> {
		return this.service.getAllCategories();
	}

	public async save(_category: Category): Promise<AxiosResponse<Category>> {
		return this.service.saveCategory(_category);
	}

	public async update(_category: Category): Promise<AxiosResponse<Category>> {
		return this.service.updateCategory(_category);
	}

}
