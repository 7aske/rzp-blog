export interface ICommentService {
	getAllByIdPost: (id: number, page: number, count?: number) => Promise<CommentDTO[]>;
	save: (comment: CommentDTO) => Promise<CommentDTO>;
}
