import { backendUrl } from "../../../globals";
import Console from "../../../utils/Console";
import { getClient } from "../../client/http";

const submodule = "author";

const getAll = async (): Promise<Tag[]> => {
	const client = getClient();
	let data = (await client.get(`${backendUrl}/${submodule}/tag/getAll`)).data;
	Console.log(data);
	return data;
};

const save = async (tag: Tag): Promise<Tag> => {
	const client = getClient();
	let data = (await client.post(`${backendUrl}/${submodule}/tag/save`, tag)).data;
	Console.log(data);
	return data;
};


const update = async (tag: Tag): Promise<Tag> => {
	const client = getClient();
	let data = (await client.put(`${backendUrl}/${submodule}/tag/update`, tag)).data;
	Console.log(data);
	return data;
};


const deleteById = async (idTag: number): Promise<boolean> => {
	const client = getClient();
	let data = (await client.delete(`${backendUrl}/${submodule}/tag/deleteById/${idTag}`)).data;
	Console.log(data);
	return data;
};

const getStats = async (): Promise<StatsDTO> => {
	const client = getClient();
	const stats = (await client.get(`${backendUrl}/${submodule}/tag/getStats`)).data;
	Console.log(stats);
	return stats;
}

const authorTagService: TagService = {
	getAll,
	deleteById,
	save,
	update,
	getStats
};

export default authorTagService;
