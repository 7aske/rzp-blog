import * as React from "react";
import { Link } from "react-router-dom";
import useLocale from "../../hooks/useLocale";
import { formatDate } from "../../utils/utils";
import {PostPreview} from "../../@types/PostPreview";
import "./PostPreview.css";

type PostPreviewProps = {
	post: PostPreview
};
export const PostPreviewComponent = ({post: {createdDate, excerpt, slug, title, user, category, tags}}: PostPreviewProps) => {
	const [locale] = useLocale();

	return (
		<li className="collection-item post-preview-item">
			<div className="post-preview">
				<div className="category">
					<span><Link to={"/category/" + category.name}>{category.name}</Link></span>
				</div>
				<Link to={"/posts/" + slug}><h4>{title}</h4></Link>
				<h5>{user.displayName?.toLocaleUpperCase()}</h5>
				<h6>{formatDate(createdDate!, locale)}</h6>
				<p>{excerpt}</p>
				<div className="tags">
					{tags.map(tag => <span key={tag.name} className="tag"><Link replace={true} className="theme-green-lightest-text" to={`/tag/${tag.name}`}>{tag.name}</Link></span>)}
				</div>
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
