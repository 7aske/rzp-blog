import { backendUrl } from "../globals";
import { getClient } from "./client/http";

const getAll = async () => {
	const client = getClient();
	const categories =  (await client.get(`${backendUrl}/category/getAll`)).data;
	console.log(categories);
	return categories;
};

const save = async (_category: Category) => {
	const client = getClient();
	const category = (await client.post(`${backendUrl}/category/save`, _category)).data;
	console.log(category);
	return category;
};


const update = async (_category: Category) => {
	const client = getClient();
	const category = (await client.put(`${backendUrl}/category/update`, _category)).data;
	console.log(category);
	return category;
};


const deleteById = async (idCategory: number) => {
	const client = getClient();
	const retval = (await client.delete(`${backendUrl}/category/deleteById/${idCategory}`)).data;
	console.log(retval);
	return retval;
};


const adminCategoryService = {
	getAll,
	deleteById,
	save,
	update,
};

export default adminCategoryService;
