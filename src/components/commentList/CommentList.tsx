import * as React from "react";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import Console from "../../utils/Console";
import { CommentInput } from "../commentInput/CommentInput";
import "./CommentList.css";
import localization from "./localization";
import CommentService from "../../services/Comment.service";
import { User } from "../../@types/User";

const commentService = new CommentService();

type CommentListProps = {
	idPost: number;
	locale: Locale;
};
export const CommentList = (props: CommentListProps) => {

	const [comments, setComments] = useState<CommentDTO[]>([]);
	const [page, setPage] = useState(0);
	const [cantLoadMore, setCantLoadMore] = useState(false);

	const getComments = (idPost: number, page: number) => {
		commentService.getAllByIdPost(idPost, page)
			.then(_comments => {
				if (_comments.length === 0) {
					setCantLoadMore(true);
				}
				setComments([...comments, ..._comments]);
			})
			.catch(Console.error);
	};

	const loadMore = () => {
		setPage(page + 1);
	};

	const onCommentSubmit = (comment: CommentDTO) => {
		setComments([...comments, comment]);
	};

	useEffect(() => {
		getComments(props.idPost, page);
		// eslint-disable-next-line
	}, [page]);

	return (
		<div className="comment-list">
			{comments.map(c => <CommentListItem locale={props.locale} comment={c}/>)}
			<div>
				<button disabled={cantLoadMore} onClick={loadMore}
				        className="btn btn-flat load-more">{localization[props.locale].loadMoreBtn}</button>
			</div>
			<CommentInput idPost={props.idPost} onCommentSubmit={onCommentSubmit}/>

		</div>
	);
};


type CommentListItemProps = {
	comment: CommentDTO;
	locale: Locale;
}

const CommentListItem = ({comment: {commentBody, commentDatePosted, idComment, idPost, idUser}, locale}: CommentListItemProps) => {
	const [bodyRef, setBodyRef] = useState<HTMLParagraphElement | null>(null);
	const longComment = commentBody.length > 160;
	const [truncated, setTruncated] = useState<boolean>(false);

	useEffect(() => {
		setTruncated(longComment);
	}, [commentBody]);

	const toggleBody = () => {
		if (bodyRef) {
			bodyRef.classList.toggle("truncate");
			setTruncated(bodyRef.classList.contains("truncate"));
		}
	};

	return (
		<div key={idComment} className="comment-list-item">
			<h6 className="theme-green-text">{(idUser as User).username}</h6>
			<Moment className="theme-grey-light-text" locale={locale} fromNow>{commentDatePosted}</Moment>
			<p ref={elem => setBodyRef(elem)} className={longComment ? "truncate" : ""}>
				{commentBody}
			</p>
			{longComment ?
				<button onClick={toggleBody}
				        className="btn btn-flat theme-green-text">{truncated ? localization[locale].readMoreBtn : localization[locale].readLessBtn}</button> : ""}

		</div>
	);
};
