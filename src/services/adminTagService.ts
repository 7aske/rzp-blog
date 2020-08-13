import { backendUrl } from "../globals";
import { getClient } from "./client/http";

const getAll = async () => {
	const client = getClient();
	return (await client.get(`${backendUrl}/tag/getAll`)).data;
};

const save = async (tag: Tag) => {
	const client = getClient();
	return (await client.post(`${backendUrl}/tag/save`, tag)).data;
};


const update = async (tag: Tag) => {
	const client = getClient();
	return (await client.put(`${backendUrl}/tag/update`, tag)).data;
};


const deleteById = async (idTag: number) => {
	const client = getClient();
	return (await client.delete(`${backendUrl}/tag/deleteById/${idTag}`)).data;
};


const adminTagService = {
	getAll,
	deleteById,
	save,
	update,
};

export default adminTagService;
