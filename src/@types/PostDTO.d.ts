type PostDTO = {
	postTitle: string;
	postExcerpt: string;
	postSlug: string;
	postBody: string;
	postDatePosted: string;
	postPublished: boolean;
	idCategory: number;
	idUser: number;
	idPost: number;
	postAuthor: string;
	tags: Tag[];
	views: number;
}
