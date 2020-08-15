import axios from "axios";
import { backendUrl } from "../globals";
import Console from "../utils/Console";

const getAll = async (): Promise<Category[]> => {
	const categories = (await axios.get(`${backendUrl}/category/getAll`)).data;
	Console.log(categories);
	return categories;
};

const categoryService = {
	getAll,
};

export default categoryService;
