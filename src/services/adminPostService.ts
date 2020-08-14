import axios from "axios";
import { backendUrl } from "../globals";

export const getAllPreviews = async (page = 0, count = 10): Promise<PostPreviewDTO[]> => {
	try {
		const posts: PostPreviewDTO[] = (await axios.get(`${backendUrl}/post/getAllPreview?page=${page}&count=${count}`)).data;
		console.log(posts);
		return posts;
	} catch (e) {
		console.error(e);
		return [];
	}
};

export const getById = async (idPost: number): Promise<PostDTO> => {
	const post: PostDTO = (await axios.get(`${backendUrl}/post/getById/${idPost}`)).data;
	console.log(post);
	return post;
};

export const save = async (_post: PostDTO): Promise<PostDTO> => {
	const post = (await axios.post(`${backendUrl}/post/save`, _post)).data;
	console.log(post);
	return post;
};

export const update = async (_post: PostDTO): Promise<PostDTO> => {
	const post = (await axios.put(`${backendUrl}/post/update`, _post)).data;
	console.log(post);
	return post;
};

export const deleteById = async (idPost: number): Promise<boolean> => {
	const retval = (await axios.delete(`${backendUrl}/post/deleteById/${idPost}`)).data;
	console.log("Deleting", idPost, retval);
	return retval;
}

const adminPostService = {
	getAllPreviews,
	getById,
	save,
	update,
	deleteById,
};

export default adminPostService;
