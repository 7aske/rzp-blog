import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GenericAutocomplete } from "../../components/genericSelect/GenericAutocomplete";
import { Pagination } from "../../components/pagination/Pagination";
import { PostPreviewList } from "../../components/postPreviewList/PostPreviewList";
import useLocale from "../../hooks/useLocale";
import { scrollToTop } from "../../utils/utils";
import localization from "./localization";
import Console from "../../utils/Console";
import PostPreviewService from "../../services/PostPreview.service";
import { Tag } from "../../@types/Tag";
import { PostPreview } from "../../@types/PostPreview";
import TagService from "../../services/Tag.service";
import PostService from "../../services/Post.service";
import { usePageable } from "../../hooks/usePageable";

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
	const [pageCount, setPageCount] = useState(0);
	const [locale] = useLocale();

	useEffect(() => {
		tagService.getAll().then(_tags => {
			setTags(_tags);
			const tag = _tags.find(c => c.name === tagName);
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
		postPreviewService.getAll({page, count: perPage}, {tag: tag?.name}).then(_posts => {
			setPosts(_posts);
			if (tag) window.history.replaceState(null, null!, "/#/tag/" + tag?.name);
		}).catch(err => {
			Console.error(err);
			setPosts([]);
		});
	};

	useEffect(() => {
		getTags();
		postService.getPageCount({page, count:perPage}, {tag: tag?.name, published: true}).then(_pageCount => {
			setPageCount(_pageCount);
		});
		if (tag) window.history.replaceState(null, null!, "/#/tag/" + tag?.name);
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
					<h4><span className="theme-green-text">{localization[locale].title}</span>: {tag?.name}
					</h4>
				</div>
			</div>
			<div className="row">
				<div className="col s12 m12 l3">
					<GenericAutocomplete value={tagName}
					                     label={localization[locale].choosePageText}
					                     onUpdate={val => setTag(tags.find(t => t.name === val)!)}
					                     autocompleteData={tags.map(t => t.name)}/>
				</div>
			</div>
			<div className="row">
				<PostPreviewList posts={posts}/>
				<Pagination onPageChange={setPage} pageCount={pageCount}/>
			</div>
		</div>
	);
};
