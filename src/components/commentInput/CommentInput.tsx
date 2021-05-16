import * as React from "react";
import { ChangeEvent, useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import useLocale from "../../hooks/useLocale";
import Console from "../../utils/Console";
import MaterializeTextarea from "../materialize/textarea/MaterializeTextarea";
import localization from "./localization";
import routes from "../../router/localization";
import CommentService from "../../services/Comment.service";
import { CommentDTO } from "../../@types/CommentDTO";
import { Comment } from "../../api/api";

const commentService = new CommentService();

type CommentInputProps = {
	postId: number;
	onCommentSubmit?: (comment: Comment) => void;
};
export const CommentInput = (props: CommentInputProps) => {
	const [locale] = useLocale();
	const {ctx} = useContext(AppContext);

	const [comment, setComment] = useState<CommentDTO>({
		body: "",
		post: {id: props.postId},
		user: ctx.user!
	});

	const submit = () => {
		commentService.save(comment.post.id!, comment)
			.then(res => {
				if (props.onCommentSubmit) props.onCommentSubmit(res.data);
				setComment({...comment, body: ""});
			})
			.catch(Console.error);
	};

	const setProp = (ev: ChangeEvent<HTMLTextAreaElement>) => {
		setComment({
			...comment,
			[ev.target.id]: ev.target.value,
			user: ctx.user!
		});
	};


	return (
		<div className="comment-input">
			{ctx.user ?
				<div>
					<div className="row">
						<MaterializeTextarea id="body"
						                     onChange={setProp}
						                     value={comment.body}
						                     label={localization[locale].labelText}/>
					</div>
					<div className="row">
						<button onClick={submit} className="btn theme-green"
						        type="button">{localization[locale].buttonText}</button>
					</div>
				</div> : <div>
					{localization[locale].loginText}
					<br/>
					<Link className="theme-green-text" to="/login">{routes[locale].login}</Link>
				</div>}
		</div>
	);
};
