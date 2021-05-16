import { Comment, PostControllerApi } from "../api/api";
import { CommentDTO } from "../@types/CommentDTO";
import { AxiosResponse } from "axios";

export default class CommentService {
	private service = new PostControllerApi();

	public getAllByIdPost(id: number, page: number): Promise<AxiosResponse<Array<Comment>>> {
		return this.service.getAllPostComments(id, `${page},5`);
	}

	public save(postId: number, comment: CommentDTO): Promise<AxiosResponse<Comment>> {
		return this.service.savePostComment(postId, comment);
	}
}
