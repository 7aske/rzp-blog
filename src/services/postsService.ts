import axios from "axios";
import { backendUrl } from "../globals";

export const getAllPreviews = async (): Promise<PostPreviewDTO[]> => {
	try {
		const posts: PostPreviewDTO[] = (await axios.get(`${backendUrl}/post/getAllPreview`)).data;
		console.log(posts);
		return posts;
	} catch (e) {
		console.error(e);
		return [];
	}
};

export const getByPostSlug = async (postSlug: string): Promise<PostDTO | null> => {
	const post: PostDTO = (await axios.get(`${backendUrl}/post/getByPostSlug/${postSlug}`)).data;
	console.log(post);
	return post;
};

