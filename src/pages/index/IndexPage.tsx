import * as React from "react";
import { useEffect, useState } from "react";
import { PostPreviewList } from "../../components/postPreviewList/PostPreviewList";
import useLocale from "../../hooks/useLocale";
import postService from "../../services/postService";
import "./IndexPage.css";
import localization from "./localization";

type IndexPageProps = {};
export const IndexPage = (props: IndexPageProps) => {
	const [locale] = useLocale();
	const postCount = 10;
	const [posts, setPosts] = useState(new Array(postCount).fill(null));

	useEffect(() => {
		postService.getAllPreviews().then(newPosts => {
			setPosts(newPosts);
		}).catch(err => {
			console.error(err);
			setPosts([])
		});
	}, []);


	return (
		<div id="index" className="container">
			<h2 className="title">{localization[locale].title}</h2>
			<p className="text">{localization[locale].text}</p>
			<PostPreviewList posts={posts}/>
		</div>
	);
};
