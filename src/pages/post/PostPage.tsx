import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { CommentList } from "../../components/commentList/CommentList";
import { MarkdownContainer } from "../../components/markdown/MarkdownContainer";
import useLocale from "../../hooks/useLocale";
import Console from "../../utils/Console";
import { formatDate, scrollToTop, scrollTo } from "../../utils/utils";
import localization from "./localization";
import "./PostPage.scss";
import PostService from "../../services/Post.service";
import { Post } from "../../api/api";
import { ScrollToTop } from "../../components/scrollToTop/ScrollToTop";
import { Head } from "../../components/meta/Head";

const postService = new PostService();

export const PostPage = () => {
	const [locale] = useLocale();
	const {slug} = useParams();
	const location = useLocation();
	const history = useHistory();
	const [post, setPost] = useState<Post>();

	useEffect(() => {
		Console.log(slug);
		postService.getByPostSlug(slug)
			.then(res => {
				if (res.data)
					setPost(res.data);
			})
			.catch(err => {
				Console.error(err);
				history.replace("/404");
			});
		scrollToTop();

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (location.hash && post) {
			setTimeout(() => scrollTo(location.hash), 1000);
		}
	}, [location.hash, post]);

	return (
		<div id="post" className="container">
			{post ?
				<Head title={post?.title!} description={post?.excerpt!} image={post?.image}
				      author={post!.user!.displayName!}/> : undefined}
			<ScrollToTop/>
			<button className={"btn btn-back"} onClick={history.goBack}>{localization[locale].back}</button>
			{post ?
				<article className="animate__animated animate__fadeIn animate__slow">
					<h2 className="title">{post?.title}</h2>
					<Link className="theme-white-text" to={"/users/" + post.user?.username}><h5
						className="author">{post?.user?.displayName?.toUpperCase()}</h5></Link>
					<h6 className="date">{formatDate(post?.createdDate ? post.createdDate : "", locale)}</h6>
					<MarkdownContainer content={post?.body ? post?.body : ""}/>
					<hr/>
					<h4 className="theme-green-text">{localization[locale].commentTitle}</h4>
					<div id="comments" className="row">
						<div className="col s12 m12 l6">
							<CommentList idPost={post.id!} locale={locale}/>
						</div>
					</div>
				</article>
				: <div className="post-placeholder">
					<div className="title placeholder"/>
					<div className="text placeholder"/>
					<div className="header placeholder"/>
					<div className="text placeholder"/>
					<div className="header placeholder"/>
					<div className="text placeholder"/>
					<div className="header placeholder"/>
					<div className="text placeholder"/>
				</div>}
		</div>
	);
};

