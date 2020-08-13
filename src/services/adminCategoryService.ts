import { backendUrl } from "../globals";
import { getClient } from "./client/http";

const getAll = async () => {
	const client = getClient();
	return (await client.get(`${backendUrl}/category/getAll`)).data;
};

const save = async (category: Category) => {
	const client = getClient();
	return (await client.post(`${backendUrl}/category/save`, category)).data;
};


const update = async (category: Category) => {
	const client = getClient();
	return (await client.put(`${backendUrl}/category/update`, category)).data;
};


const deleteById = async (idCategory: number) => {
	const client = getClient();
	return (await client.delete(`${backendUrl}/category/deleteById/${idCategory}`)).data;
};


const adminCategoryService = {
	getAll,
	deleteById,
	save,
	update,
};

export default adminCategoryService;
