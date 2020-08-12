type PostPreviewDTO = {
	postTitle: string;
	postExcerpt: string;
	postSlug: string;
	postDatePosted: string;
	postDateUpdated: string;
	categoryName: string;
	idUser: number;
	idPost: number;
	postAuthor: string;
	postPublished: boolean;
	tagList: Tag[];
	views: number;
}
