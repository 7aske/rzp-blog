import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useLocale from "../../../../hooks/useLocale";
import postService from "../../../../services/postService";
import { PostEditor } from "./postEditor/PostEditor";

type AdminPostEditProps = {};
export const AdminPostEdit = (props: AdminPostEditProps) => {
	const [post, setPost] = useState<PostDTO>();
	const {postSlug} = useParams();
	const [locale] = useLocale();
	useEffect(() => {
		if (postSlug) {
			postService.getByPostSlug(postSlug).then(_post => {
				setPost(_post);
			}).catch(err => {
				console.error(err);
			});
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		console.log(post);
	}, [post]);

	return (
		<div id="admin-post-edit">
			<div className="row">
				<div className="s12 m12 l8">
				</div>
				<div className="s12 m12 l8">
					<PostEditor locale={locale}
					            id={post ? post.idPost : undefined}
					            value={post ? post.postBody : undefined}
					            onChange={(postBody) => setPost({...(post as PostDTO), postBody: postBody})}/>
				</div>
			</div>
		</div>
	);
};
