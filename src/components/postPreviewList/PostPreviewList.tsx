import * as React from "react";
import { PostPreviewComponent, PostPreviewPlaceholder } from "./PostPreviewComponent";
import { PostPreview } from "../../@types/PostPreview";

type PostPreviewListProps = {
	posts: PostPreview[];
};
export const PostPreviewList = ({posts}: PostPreviewListProps) => {
	return (
		<ul className="collection with-header animate__animated animate__fadeIn animate__fast">
			{posts.map((post, i) => {
				if (post != null)
					return <PostPreviewComponent key={i} post={post}/>;
				else
					return <PostPreviewPlaceholder key={i}/>;
			})}
		</ul>
	);
};
