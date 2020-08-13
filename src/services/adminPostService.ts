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

export const getById = async (idPost: number): Promise<PostDTO | null> => {
	const post: PostDTO = (await axios.get(`${backendUrl}/post/getById/${idPost}`)).data;
	console.log(post);
	return post;
};

const adminPostService = {
	getAllPreviews,
	getById,
}

export default adminPostService;
