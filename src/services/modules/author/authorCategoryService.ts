import { backendUrl } from "../../../globals";
import { getClient } from "../../client/http";
import Console from "../../../utils/Console";

const submodule = "author";

const getAll = async (): Promise<Category[]> => {
	const client = getClient();
	const categories =  (await client.get(`${backendUrl}/${submodule}/category/getAll`)).data;
	Console.log(categories);
	return categories;
};

const save = async (_category: Category): Promise<Category> => {
	const client = getClient();
	const category = (await client.post(`${backendUrl}/${submodule}/category/save`, _category)).data;
	Console.log(category);
	return category;
};


const update = async (_category: Category): Promise<Category> => {
	const client = getClient();
	const category = (await client.put(`${backendUrl}/${submodule}/category/update`, _category)).data;
	Console.log(category);
	return category;
};


const deleteById = async (idCategory: number): Promise<boolean> => {
	const client = getClient();
	const retval = (await client.delete(`${backendUrl}/${submodule}/category/deleteById/${idCategory}`)).data;
	Console.log(retval);
	return retval;
};

const getStats = async (): Promise<StatsDTO> => {
	const client = getClient();
	const stats = (await client.get(`${backendUrl}/${submodule}/category/getStats`)).data;
	Console.log(stats);
	return stats;
}


const authorCategoryService: CategoryService = {
	getAll,
	deleteById,
	save,
	update,
	getStats,
};

export default authorCategoryService;
