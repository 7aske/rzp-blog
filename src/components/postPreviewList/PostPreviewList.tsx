import * as React from "react";
import { PostPreviewComponent, PostPreviewPlaceholder } from "./PostPreviewComponent";
import { PostPreview, UserControllerApi } from "../../api/api";

type PostPreviewListProps = {
	posts: PostPreview[];
	search?: string;
};
export const PostPreviewList = ({posts, search}: PostPreviewListProps) => {
	return (
		<ul className="collection with-header animate__animated animate__fadeIn animate__fast">
			{posts.map((post, i) => {
				if (post != null)
					return <PostPreviewComponent key={i} post={post} search={search}/>;
				else
					return <PostPreviewPlaceholder key={i}/>;
			})}
		</ul>
	);
};
