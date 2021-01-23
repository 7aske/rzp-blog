import * as React from "react";
import { useEffect, useState } from "react";
import { Pagination } from "../../components/pagination/Pagination";
import { PostPreviewList } from "../../components/postPreviewList/PostPreviewList";
import useLocale from "../../hooks/useLocale";
import Console from "../../utils/Console";
import "./IndexPage.css";
import localization from "./localization";
import PostService from "../../services/Post.service";
import PostPreviewService from "../../services/PostPreview.service";
import { usePageable } from "../../hooks/usePageable";

const postService = new PostService();
const postPreviewService = new PostPreviewService();

type IndexPageProps = {};
export const IndexPage = (props: IndexPageProps) => {
	const [locale] = useLocale();
	const {page, perPage, setPage} = usePageable();
	const [posts, setPosts] = useState(new Array(perPage).fill(null));
	const [pageCount, setPageCount] = useState(1);


	useEffect(() => {
		postService.getPageCount({page, count: perPage})
			.then(setPageCount);
	}, []);

	useEffect(() => {
		postPreviewService.getAll({page, count: perPage})
			.then(setPosts)
			.catch(err => {
				Console.error(err);
				setPosts([]);
			});
	}, [page]);


	return (
		<div id="index" className="container">
			<div className="row">
				<div className="col s12">
					<h2 className="title">{localization[locale].title}</h2>
					<p className="text">{localization[locale].text}</p>
				</div>
			</div>
			<div className="row">
				{posts.length > 0 ?
					<div className="col s12">
						<PostPreviewList posts={posts}/>
						<Pagination onPageChange={setPage} pageCount={pageCount}/>
					</div>
					: <div className="col s12 no-posts">
						<h3 className="title">{localization[locale].noPosts}</h3>
					</div>}
			</div>
		</div>
	);
};
