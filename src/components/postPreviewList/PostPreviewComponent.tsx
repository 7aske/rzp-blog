import * as React from "react";
import { Link } from "react-router-dom";
import useLocale from "../../hooks/useLocale";
import { formatDate } from "../../utils/utils";
import "./PostPreview.scss";
import { PostPreview } from "../../api/api";
import Highlighter from "react-highlight-words";

type PostPreviewProps = {
	post: PostPreview
	search?: string
};
export const PostPreviewComponent = ({
	                                     post: {createdDate, excerpt, slug, title, user, category, tags},
	                                     search,
                                     }: PostPreviewProps) => {
	const [locale] = useLocale();

	return (
		<li className="collection-item post-preview-item">
			<div className="post-preview">
				<div className="category">
					<span>
						<Link className="theme-green-light-text" to={"/category/" + category?.name}>
							<Highlighter highlightClassName="theme-green"
							             searchWords={search ? search.split(/\s+/) : []}
							             textToHighlight={category?.name!}/>
						</Link>
					</span>
				</div>
				<Link to={"/posts/" + slug}>
					<h4>
						<Highlighter highlightClassName="theme-green"
						             searchWords={search ? search.split(/\s+/) : []}
						             textToHighlight={title!}/>
					</h4>
				</Link>
				<h5>
					<Link className={"theme-white-text"} to={`/users/${user?.username}`}>
					<Highlighter highlightClassName="theme-green" searchWords={search ? search.split(/\s+/) : []}
					             textToHighlight={user?.displayName?.toLocaleUpperCase()!}/>
					</Link>
				</h5>
				<h6>
					{formatDate(createdDate!, locale)}
				</h6>
				<p>
					<Highlighter highlightClassName="theme-green" searchWords={search ? search.split(/\s+/) : []}
					             textToHighlight={excerpt!}/>
				</p>
				<div className="tags">
					{tags?.map(tag => <Link replace={true} className="tag"
					                        to={`/tag/${tag.name}`}> <span key={tag.name}
					                                                       className="theme-grey-text">{tag.name}</span></Link>)}
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
