import * as React from "react";
import { useEffect, useState } from "react";
import localization from "./localization";
import "./CommentList.css";

type CommentListProps = {
	comments: CommentDTO[];
	locale: Locale;
};
export const CommentList = (props: CommentListProps) => {
	return (
		<div className="comment-list">
			{props.comments.map(c => <CommentListItem locale={props.locale} comment={c}/>)}
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
			<h6 className="theme-green-text">{(idUser as UserDTO).userUsername}</h6>
			<p ref={elem => setBodyRef(elem)} className={longComment ? "truncate" : ""}>
				{commentBody}
			</p>
			{longComment ?
				<button onClick={toggleBody}
				        className="btn btn-flat theme-green-text">{truncated ? localization[locale].readMoreBtn : localization[locale].readLessBtn}</button> : ""}
		</div>
	);
};
