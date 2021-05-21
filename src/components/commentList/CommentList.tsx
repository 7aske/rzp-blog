import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Moment from "react-moment";
import { CommentInput } from "../commentInput/CommentInput";
import "./CommentList.scss";
import localization from "./localization";
import CommentService from "../../services/Comment.service";
import { User } from "../../@types/User";
import { Comment } from "../../api/api";

const commentService = new CommentService();

type CommentListProps = {
	idPost: number;
	locale: Locale;
};
export const CommentList = (props: CommentListProps) => {
	const [comments, setComments] = useState<Comment[]>([]);
	const [loading, setLoading] = useState(false);
	const [cantLoadMore, setCantLoadMore] = useState(false);
	const page = useRef(0);

	const getComments = (idPost: number, p: number) => {
		if (loading || cantLoadMore) return;
		setLoading(true);
		commentService.getAllByIdPost(idPost, p)
			.then(res => {
				if (res.data.length === 0) {
					console.log("cant load more");
					setCantLoadMore(true);
				} else {
					page.current = page.current + 1;
					setComments([...comments, ...res.data]);
				}
			})
			.catch(console.error)
			.finally(() => setLoading(false));
	};

	const loadMore = () => {
		console.log(loading, cantLoadMore);
		getComments(props.idPost, page.current);
	};

	const onCommentSubmit = (comment: Comment) => {
		setComments([comment, ...comments]);
	};

	useEffect(() => {
		getComments(props.idPost, page.current);
		// eslint-disable-next-line
	}, []);

	return (
		<div className="comment-list">
			<CommentInput postId={props.idPost} onCommentSubmit={onCommentSubmit}/>
			{comments.map(c => <CommentListItem key={c.id} locale={props.locale} comment={c}/>)}
			{loading ?
				<div className="progress">
					<div className="indeterminate"/>
				</div> : undefined}
			<div>
				<button disabled={cantLoadMore} onClick={loadMore}
				        className="btn btn-flat load-more">{localization[props.locale].loadMoreBtn}</button>
			</div>
		</div>
	);
};


type CommentListItemProps = {
	comment: Comment;
	locale: Locale;
}

const CommentListItem = ({comment: {body, createdDate, id, user}, locale}: CommentListItemProps) => {
	const [bodyRef, setBodyRef] = useState<HTMLParagraphElement | null>(null);
	const longComment = body!.length > 160;
	const [truncated, setTruncated] = useState<boolean>(false);

	useEffect(() => {
		setTruncated(longComment);
		// eslint-disable-next-line
	}, [body]);

	const toggleBody = () => {
		if (bodyRef) {
			bodyRef.classList.toggle("truncate");
			setTruncated(bodyRef.classList.contains("truncate"));
		}
	};

	return (
		<div key={id} className="comment-list-item animate__animated animate__fadeIn">
			<h6 className="theme-green-text">{(user as User).username}</h6>
			<Moment className="theme-grey-light-text" locale={locale} fromNow>{createdDate}</Moment>
			<p ref={elem => setBodyRef(elem)} className={longComment ? "truncate" : ""}>
				{body}
			</p>
			{longComment ?
				<button onClick={toggleBody}
				        className="btn btn-flat theme-green-text">
					{truncated ? localization[locale].readMoreBtn : localization[locale].readLessBtn}
				</button> : ""}
		</div>
	);
};
