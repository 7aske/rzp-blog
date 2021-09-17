import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { GenericAutocomplete } from "../../components/genericSelect/GenericAutocomplete";
import { Pagination } from "../../components/pagination/Pagination";
import { PostPreviewList } from "../../components/postPreviewList/PostPreviewList";
import useLocale from "../../hooks/useLocale";
import { scrollToTop } from "../../utils/utils";
import localization from "./localization";
import Console from "../../utils/Console";
import PostPreviewService from "../../services/PostPreview.service";
import TagService from "../../services/Tag.service";
import PostService from "../../services/Post.service";
import { usePageable } from "../../hooks/usePageable";
import { PostPreview, Tag } from "../../api/api";

const postPreviewService = new PostPreviewService();
const postService = new PostService();
const tagService = new TagService();

type TagPageProps = {};
export const TagPage = (props: TagPageProps) => {
	const {tagName} = useParams();
	const [tag, setTag] = useState<Tag | null>(null);
	const [tags, setTags] = useState<Tag []>([]);
	const {page, perPage, setPage} = usePageable();
	const [posts, setPosts] = useState<PostPreview[]>(new Array(perPage).fill(null));
	const pageCount = useRef(0);
	const [locale] = useLocale();

	useEffect(() => {
		tagService.getAll()
			.then(res => {
				setTags(res.data);
				const tag = res.data.find(t => t.name === tagName);
				if (tag) {
					setTag(tag);
				}
			})
			.catch(err => {
				Console.error(err);
				setTags([]);
			});

		scrollToTop();
		// eslint-disable-next-line
	}, [tagName]);

	const getPosts = () => {
		if (tag?.name)
			postPreviewService.getAllByTagName(page, tag?.name!)
				.then(res => {
					setPosts(res.data);
					pageCount.current = Math.ceil(parseInt(res.headers["x-data-count"], 10) / perPage);
					if (tag) window.history.replaceState(null, null!, "/#/tag/" + tag?.name);
				})
				.catch(err => {
					Console.error(err);
					setPosts([]);
				});
	};

	useEffect(() => {
		getPosts();
		if (tag) window.history.replaceState(null, null!, "/#/tag/" + tag?.name);
		// eslint-disable-next-line
	}, [tag]);

	useEffect(() => {
		getPosts();
		// eslint-disable-next-line
	}, [page]);

	return (
		<div id="category-page" className="container theme-white-text">
			<div className="row">
				<div className="col s12">
					<h4><span className="theme-green-text">{localization[locale].title}</span>: {tag?.name}
					</h4>
				</div>
			</div>
			<div className="row">
				<div className="col s12 m12 l3">
					<GenericAutocomplete value={tagName}
					                     label={localization[locale].choosePageText}
					                     onUpdate={val => setTag(tags.find(t => t.name === val)!)}
					                     autocompleteData={tags.map(t => t.name!)}/>
				</div>
			</div>
			<div className="row">
				<PostPreviewList posts={posts}/>
				<Pagination onPageChange={setPage} pageCount={pageCount.current}/>
			</div>
		</div>
	);
};
