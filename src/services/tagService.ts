import axios from "axios";
import { backendUrl } from "../globals";
import Console from "../utils/Console";

const getAll = async (): Promise<Tag[]> => {
	const tags = (await axios.get(`${backendUrl}/tag/getAll`)).data;
	Console.log(tags);
	return tags;
};

const tagService = {
	getAll,
};

export default tagService;
