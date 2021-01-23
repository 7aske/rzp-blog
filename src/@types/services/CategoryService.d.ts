import { Category } from "../Category";

export interface ICategoryService {
	getAll: () => Promise<Category[]>,
	deleteById: (id: number) => Promise<boolean>,
	save: (_category: Category) => Promise<Category>,
	update: (_category: Category) => Promise<Category>
}
