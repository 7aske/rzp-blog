import * as React from "react";
import { useEffect, useState } from "react";
import { Pagination } from "../../components/pagination/Pagination";
import { PostPreviewList } from "../../components/postPreviewList/PostPreviewList";
import useLocale from "../../hooks/useLocale";
import Console from "../../utils/Console";
import "./IndexPage.scss";
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
	const [search, setSearch] = useState("");


	useEffect(() => {
		if (search !== "") {
			postPreviewService.getAll(page, search.split(/\s+/))
				.then(res => {
					setPosts(res.data)
				})
				.catch(err => {
					Console.error(err);
					setPosts([]);
				});
		} else {
			postPreviewService.getAll(page)
				.then(res => setPosts(res.data))
				.catch(err => {
					Console.error(err);
					setPosts([]);
				});
		}
		M.updateTextFields();
	}, [page, search]);


	return (
		<div id="index" className="container">
			<div className="row">
				<div className="col s12">
					<h2 className="title">{localization[locale].title}</h2>
					<p className="text">{localization[locale].text}</p>
				</div>
			</div>
			<div className="row">
				<div className="input-field col s12 m12 l6 xl6 right">
					<input onChange={ev => setSearch(ev.target.value)} placeholder={localization[locale].search}
					       id="search" type="text" autoComplete="off"/>
				</div>
			</div>
			<div className="row">
				{posts.length > 0 ?
					<div className="col s12">
						<PostPreviewList posts={posts} search={search}/>
						<Pagination onPageChange={setPage} pageCount={pageCount}/>
					</div>
					: <div className="col s12 no-posts">
						<h3 className="title">{localization[locale].noPosts}</h3>
					</div>}
			</div>
		</div>
	);
};
