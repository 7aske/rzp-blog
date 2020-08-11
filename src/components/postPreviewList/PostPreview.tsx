import * as React from "react";
import { Link } from "react-router-dom";
import useLocale from "../../hooks/useLocale";
import { formatDate } from "../../utils/utils";
import "./PostPreview.css";

type PostPreviewProps = {
	post: PostPreviewDTO
};
export const PostPreview = ({post: {postDatePosted, postExcerpt, postSlug, postTitle, postAuthor, categoryName, tagList}}: PostPreviewProps) => {
	const [locale] = useLocale();

	return (
		<li className="collection-item">
			<div className="post-preview">
				<span><Link to={"/category/" + categoryName}>{categoryName}</Link></span>
				<Link to={postSlug}><h4>{postTitle}</h4></Link>
				<h5>{postAuthor.toLocaleUpperCase()}</h5>
				<h6>{formatDate(postDatePosted, locale)}</h6>
				<p>{postExcerpt}</p>
			</div>
		</li>
	);
};

export const PostPreviewPlaceholder = () => {
	return <li className="collection-item post-preview-placeholder">
		<div className="outer animate__animated animate__flash animate__delay-1s animate__slower animate__infinite">
			<div className="inner title"/>
			<div className="inner author"/>
			<div className="inner date"/>
			<div className="inner excerpt"/>
		</div>
	</li>;
};
