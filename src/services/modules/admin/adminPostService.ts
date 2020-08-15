import axios from "axios";
import { backendUrl } from "../../../globals";
import { getClient } from "../../client/http";

const submodule = "admin";

export const getAllPreview = async (page = 0, count = 10): Promise<PostPreviewDTO[]> => {
	const client = getClient();
	const posts: PostPreviewDTO[] = (await client.get(`${backendUrl}/${submodule}/post/getAllPreview?page=${page}&count=${count}`)).data;
	console.log(posts);
	return posts;
};

export const getById = async (idPost: number): Promise<PostDTO> => {
	const client = getClient();
	const post: PostDTO = (await client.get(`${backendUrl}/${submodule}/post/getById/${idPost}`)).data;
	console.log(post);
	return post;
};

export const save = async (_post: PostDTO): Promise<PostDTO> => {
	const client = getClient();
	const post = (await client.post(`${backendUrl}/${submodule}/post/save`, _post)).data;
	console.log(post);
	return post;
};

export const update = async (_post: PostDTO): Promise<PostDTO> => {
	const client = getClient();
	const post = (await client.put(`${backendUrl}/${submodule}/post/update`, _post)).data;
	console.log(post);
	return post;
};

export const deleteById = async (idPost: number): Promise<boolean> => {
	const client = getClient();
	const retval = (await client.delete(`${backendUrl}/${submodule}/post/deleteById/${idPost}`)).data;
	console.log("Deleting", idPost, retval);
	return retval;
};

const getByPostSlug = async (postSlug: string): Promise<PostDTO> => {
	const client = getClient();
	const post: PostDTO = (await client.get(`${backendUrl}/${submodule}/post/getByPostSlug/${postSlug}`)).data;
	console.log(post);
	return post;
};

const getPageCount = async (count = 10): Promise<number> => {
	const client = getClient();
	const _count: number = (await client.get(`${backendUrl}/${submodule}/post/getPageCount?count=${count}`)).data;
	console.log("Page count:", _count);
	return _count;
};

const adminPostService = {
	deleteById,
	getAllPreview,
	getById,
	getByPostSlug,
	getPageCount,
	save,
	update,
};

export default adminPostService;
