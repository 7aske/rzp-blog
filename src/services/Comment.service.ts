import AbstractHttpClient from "./client/AbstractHttpClient";
import { ICommentService } from "../@types/services/CommentService";

export default class CommentService extends AbstractHttpClient implements ICommentService {

	constructor() {
		super("/comments");
	}

	public getAllByIdPost(id: number, page: number, count?: number): Promise<CommentDTO[]> {
		return this.get(`/${id}?page=${page},${count}`);
	}

	public save(_comment: CommentDTO): Promise<CommentDTO> {
		return this.post("", _comment);
	}

}
