import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GenericAutocomplete } from "../../components/genericSelect/GenericAutocomplete";
import GenericElement from "../../components/genericSelect/GenericElement";
import { GenericSelect } from "../../components/genericSelect/GenericSelect";
import { Pagination } from "../../components/pagination/Pagination";
import { PostPreviewList } from "../../components/postPreviewList/PostPreviewList";
import useLocale from "../../hooks/useLocale";
import tagService from "../../services/tagService";
import postService from "../../services/postService";
import { scrollToTop } from "../../utils/utils";
import localization from "./localization";
import Console from "../../utils/Console";

type TagPageProps = {};
export const TagPage = (props: TagPageProps) => {
	const {tagName} = useParams();
	const [tag, setTag] = useState<Tag | null>(null);
	const [tags, setTags] = useState<Tag []>([]);
	const postCount = 10;
	const [posts, setPosts] = useState<PostPreviewDTO[]>(new Array(postCount).fill(null));
	const [pageCount, setPageCount] = useState(0);
	const [page, setPage] = useState(0);
	const [locale] = useLocale();

	useEffect(() => {
		tagService.getAll().then(_tags => {
			setTags(_tags);
			const tag = _tags.find(c => c.tagName === tagName);
			if (tag) {
				setTag(tag);
			}
		}).catch(err => {
			Console.error(err);
			setTags([]);
		});

		scrollToTop();
		// eslint-disable-next-line
	}, [tagName]);

	const getTags = () => {
		postService.getAllPreview({tag: tag?.tagName, page, published: true}).then(_posts => {
			setPosts(_posts);
			if (tag) window.history.replaceState(null, null!, "/#/tag/" + tag?.tagName);
		}).catch(err => {
			Console.error(err);
			setPosts([]);
		});
	};

	useEffect(() => {
		getTags();
		postService.getPageCount({tag: tag?.tagName, published: true}).then(_pageCount => {
			setPageCount(_pageCount);
		});
		if (tag) window.history.replaceState(null, null!, "/#/tag/" + tag?.tagName);
		// eslint-disable-next-line
	}, [tag]);

	useEffect(() => {
		getTags();
		// eslint-disable-next-line
	}, [page]);

	return (
		<div id="category-page" className="container theme-white-text">
			<div className="row">
				<div className="col s12">
					<h4><span className="theme-green-text">{localization[locale].title}</span>: {tag?.tagName}
					</h4>
				</div>
			</div>
			<div className="row">
				<div className="col s12 m12 l3">
					<GenericAutocomplete value={tagName}
					                     label={localization[locale].choosePageText}
					                     onUpdate={val => setTag(tags.find(t => t.tagName === val)!)}
					                     autocompleteData={tags.map(t => t.tagName)}/>
				</div>
			</div>
			<div className="row">
				<PostPreviewList posts={posts}/>
				<Pagination onPageChange={setPage} pageCount={pageCount}/>
			</div>
		</div>
	);
};
