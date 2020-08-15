import axios from "axios";
import { backendUrl } from "../globals";

const getAllPreview = async (params?: PostQueryParams): Promise<PostPreviewDTO[]> => {
	const posts: PostPreviewDTO[] = (await axios.get(`${backendUrl}/post/getAllPreview`, {params})).data;
	console.log(posts);
	return posts;
};

const getByPostSlug = async (postSlug: string): Promise<PostDTO> => {
	const post: PostDTO = (await axios.get(`${backendUrl}/post/getByPostSlug/${postSlug}`)).data;
	console.log(post);
	return post;
};

const getPageCount = async (params?: PostQueryParams): Promise<number> => {
	const _count: number = (await axios.get(`${backendUrl}/post/getPageCount`, {params})).data;
	console.log("Page count:", _count);
	return _count;
};

const postService = {
	getAllPreview,
	getByPostSlug,
	getPageCount,
};

export default postService;

