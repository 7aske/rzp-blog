import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { MarkdownContainer } from "../../components/markdown/MarkdownContainer";
import useLocale from "../../hooks/useLocale";
import postService from "../../services/postService";
import { formatDate, scrollToTop } from "../../utils/utils";
import "./PostPage.css";
import localization from "./localization";

export const PostPage = () => {
	const [locale] = useLocale();
	const {slug} = useParams();
	const history = useHistory();
	const [post, setPost] = useState<PostDTO>();

	useEffect(() => {
		console.log(slug);
		postService.getByPostSlug(slug).then(_post => {
			if (_post)
				setPost(_post);
		}).catch(err => {
			console.error(err);
			history.replace("/404");
		});
		scrollToTop();

		// eslint-disable-next-line
	}, []);

	return (
		<div id="post" className="container">
			<Link className={"btn btn-back"} to={"/"}>{localization[locale].back}</Link>
			<article className="animate__animated animate__fadeIn animate__slow">
				<h2 className="title">{post?.postTitle}</h2>
				<h5 className="author">{post?.postAuthor.toUpperCase()}</h5>
				<h6 className="date">{formatDate(post?.postDatePosted ? post.postDatePosted : "", locale)}</h6>
				<MarkdownContainer content={post?.postBody ? post?.postBody : ""}/>
			</article>
		</div>
	);
};
