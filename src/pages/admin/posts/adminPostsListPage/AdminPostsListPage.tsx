import * as React from "react";
import { useEffect, useState } from "react";
import adminPostService from "../../../../services/adminPostService";
import "./AdminPostsListPage.css"

type AdminPostsListPageProps = {};
export const AdminPostsListPage = (props: AdminPostsListPageProps) => {
	const [posts, setPosts] = useState<PostPreviewDTO[]>([]);
	useEffect(() => {
		adminPostService.getAllPreviews().then(res => {
			setPosts(res);
		}).catch(err => {
			setPosts([]);
			console.error(err);
		});
	}, []);
	return (
		<div id="admin-post-list-page" className="container white-text">
			<ul>
				{posts.map(post => <li>{post.postSlug}</li>)}
			</ul>
		</div>
	);
};
