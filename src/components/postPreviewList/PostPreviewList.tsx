import * as React from "react";
import { PostPreview, PostPreviewPlaceholder } from "./PostPreview";

type PostPreviewListProps = {
	posts: PostPreviewDTO[];
};
export const PostPreviewList = ({posts}: PostPreviewListProps) => {
	return (
		<ul className="collection with-header animate__animated animate__fadeIn animate__fast">
			{posts.map((post, i) => {
				if (post != null)
					return <PostPreview key={i} post={post}/>;
				else
					return <PostPreviewPlaceholder key={i}/>;
			})}
		</ul>
	);
};
