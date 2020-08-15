import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { MarkdownContainer } from "../../components/markdown/MarkdownContainer";
import useLocale from "../../hooks/useLocale";
import postService from "../../services/postService";
import { formatDate, scrollToTop } from "../../utils/utils";
import "./PostPage.css";
import localization from "./localization";
import Console from "../../utils/Console";

export const PostPage = () => {
	const [locale] = useLocale();
	const {slug} = useParams();
	const history = useHistory();
	const [post, setPost] = useState<PostDTO>();

	useEffect(() => {
		Console.log(slug);
		postService.getByPostSlug(slug).then(_post => {
			if (_post)
				setPost(_post);
		}).catch(err => {
			Console.error(err);
			history.replace("/404");
		});
		scrollToTop();

		// eslint-disable-next-line
	}, []);

	return (
		<div id="post" className="container">
			<button className={"btn btn-back"} onClick={history.goBack}>{localization[locale].back}</button>
			<article className="animate__animated animate__fadeIn animate__slow">
				<h2 className="title">{post?.postTitle}</h2>
				<h5 className="author">{post?.postAuthor.toUpperCase()}</h5>
				<h6 className="date">{formatDate(post?.postDatePosted ? post.postDatePosted : "", locale)}</h6>
				<MarkdownContainer content={post?.postBody ? post?.postBody : ""}/>
			</article>
		</div>
	);
};
