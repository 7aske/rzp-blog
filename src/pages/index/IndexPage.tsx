import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { Pagination } from "../../components/pagination/Pagination";
import { PostPreviewList } from "../../components/postPreviewList/PostPreviewList";
import useLocale from "../../hooks/useLocale";
import Console from "../../utils/Console";
import "./IndexPage.scss";
import localization from "./localization";
import PostPreviewService from "../../services/PostPreview.service";
import { usePageable } from "../../hooks/usePageable";
import { useSearch } from "../../hooks/useSearch";

const postPreviewService = new PostPreviewService();

type IndexPageProps = {};
export const IndexPage = (props: IndexPageProps) => {
	const [locale] = useLocale();
	const {page, perPage, setPage} = usePageable();
	const [posts, setPosts] = useState(new Array(perPage).fill(null));
	const pageCount = useRef<number>(0);
	const [search, setSearch] = useSearch({key:"index.search"});


	useEffect(() => {
		if (search !== "") {
			postPreviewService.getAll(page, search.split(/\s+/))
				.then(res => {
					pageCount.current = Math.ceil(parseInt(res.headers["x-data-count"], 10) / perPage);
					setPosts(res.data)
				})
				.catch(err => {
					Console.error(err);
					setPosts([]);
				});
		} else {
			postPreviewService.getAll(page)
				.then(res => {
					pageCount.current = Math.ceil(parseInt(res.headers["x-data-count"], 10) / perPage);
					setPosts(res.data)
				})
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
					<input value={search} onChange={ev => setSearch(ev.target.value)} placeholder={localization[locale].search}
					       id="search" type="text" autoComplete="off"/>
				</div>
			</div>
			<div className="row">
				{posts.length > 0 ?
					<div className="col s12">
						<PostPreviewList posts={posts} search={search}/>
						<Pagination onPageChange={setPage} pageCount={pageCount.current}/>
					</div>
					: <div className="col s12 no-posts">
						<h3 className="title">{localization[locale].noPosts}</h3>
					</div>}
			</div>
		</div>
	);
};
