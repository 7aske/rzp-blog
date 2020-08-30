interface CommentService {
	getAllByIdPost: (idPost: number, page: number, count?: number) => Promise<CommentDTO[]>;
}

interface UserCommentService {
	save: (comment: CommentDTO) => Promise<CommentDTO>;
}
