interface CommentService {
	getAllByIdPost: (idPost: number) => Promise<CommentDTO[]>;
}

interface UserCommentService {
	save: (comment: CommentDTO) => Promise<CommentDTO>;
}
