import * as React from "react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import useLocale from "../../hooks/useLocale";
import userCommentService from "../../services/modules/user/userCommentService";
import Console from "../../utils/Console";
import MaterializeTextarea from "../materialize/textarea/MaterializeTextarea";
import localization from "./localization";

type CommentInputProps = {
	idPost: number;
	onCommentSubmit?: (comment: CommentDTO) => void;
};
export const CommentInput = (props: CommentInputProps) => {
	const [locale] = useLocale();
	const {ctx} = useContext(AppContext);
	const [comment, setComment] = useState<CommentDTO>({
		commentBody: "",
		idPost: props.idPost,
		idUser: {idUser: ctx.user ? ctx.user.idUser : undefined},
	});

	useEffect(()=>{
		console.log(comment);
	}, [comment])

	const submit = () => {
		userCommentService.save(comment)
			.then(_comment => {
				if(props.onCommentSubmit) props.onCommentSubmit(_comment);
				setComment({...comment, commentBody: ""});
			})
			.catch(Console.error);
	};

	const setProp = (ev: ChangeEvent<HTMLTextAreaElement>) => {
		setComment({...comment, [ev.target.id]: ev.target.value});
	}

	return (
		<div className="comment-input">
			{ctx.user ?
				<div>
					<div className="row">
						<MaterializeTextarea id="commentBody"
						                     onChange={setProp}
						                     value={comment.commentBody}
						                     label={localization[locale].labelText}/>
					</div>
					<div className="row">
						<button onClick={submit} className="btn theme-green"
						        type="button">{localization[locale].buttonText}</button>
					</div>
				</div> : <div/>}
		</div>
	);
};
