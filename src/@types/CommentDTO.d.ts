export interface CommentDTO {
	id?: number;
	user: {id?: number};
	post: {id?: number};
	body: string;
}
