import axios from "axios";
import { backendUrl } from "../globals";

const getAll = async (): Promise<Category[]> => {
	const categories = (await axios.get(`${backendUrl}/category/getAll`)).data;
	console.log(categories);
	return categories;
};

const categoryService = {
	getAll,
};

export default categoryService;
