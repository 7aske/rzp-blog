import axios from "axios";
import { backendUrl } from "../globals";
import Console from "../utils/Console";

const getAllByIdPost = async (idPost: number, page: number, count = 5): Promise<CommentDTO[]> => {
	const comments = (await axios.get(`${backendUrl}/comment/getAllByIdPost/${idPost}?page=${page}&count=${count}`)).data;
	Console.log(comments);
	return comments;
}

const commentService: CommentService = {
	getAllByIdPost,
}

export default commentService;


