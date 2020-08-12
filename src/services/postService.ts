import axios from "axios";
import { backendUrl } from "../globals";

const getAllPreviews = async (): Promise<PostPreviewDTO[]> => {
	try {
		const posts: PostPreviewDTO[] = (await axios.get(`${backendUrl}/post/getAllPreview?published=true`)).data;
		console.log(posts);
		return posts;
	} catch (e) {
		console.error(e);
		return [];
	}
};

const getByPostSlug = async (postSlug: string): Promise<PostDTO | null> => {
	const post: PostDTO = (await axios.get(`${backendUrl}/post/getByPostSlug/${postSlug}`)).data;
	console.log(post);
	return post;
};

const getPageCount = async (): Promise<number> => {
	const count: number = (await axios.get(`${backendUrl}/post/getPageCount`)).data;
	console.log("Page count: ", count);
	return count;
};

const postService = {
	getAllPreviews,
	getByPostSlug,
	getPageCount,
};

export default postService;

