import axios from "axios";
import { backendUrl } from "../globals";

const getAllPreviews = async (): Promise<PostPreviewDTO[]> => {
	const posts: PostPreviewDTO[] = (await axios.get(`${backendUrl}/post/getAllPreview?published=true`)).data;
	console.log(posts);
	return posts;
};

const getByPostSlug = async (postSlug: string): Promise<PostDTO> => {
	const post: PostDTO = (await axios.get(`${backendUrl}/post/getByPostSlug/${postSlug}`)).data;
	console.log(post);
	return post;
};

const getPageCount = async (count = 10): Promise<number> => {
	const _count: number = (await axios.get(`${backendUrl}/post/getPageCount?count=${count}`)).data;
	console.log("Page count:", _count);
	return _count;
};

const postService = {
	getAllPreviews,
	getByPostSlug,
	getPageCount,
};

export default postService;

