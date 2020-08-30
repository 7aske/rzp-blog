type CommentDTO = {
	idComment?: number;
	idUser: UserCommentDTO | {idUser?: number};
	idPost: number;
	commentBody: string;
	commentDatePosted?: Date;
}
