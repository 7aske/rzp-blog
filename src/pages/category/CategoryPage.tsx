import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import GenericElement from "../../components/genericSelect/GenericElement";
import { GenericSelect } from "../../components/genericSelect/GenericSelect";
import { Pagination } from "../../components/pagination/Pagination";
import { PostPreviewList } from "../../components/postPreviewList/PostPreviewList";
import useLocale from "../../hooks/useLocale";
import { scrollToTop } from "../../utils/utils";
import localization from "./localization";
import Console from "../../utils/Console";
import CategoryService from "../../services/Category.service";
import PostService from "../../services/Post.service";
import PostPreviewService from "../../services/PostPreview.service";
import { usePageable } from "../../hooks/usePageable";
import { PostPreview, Category } from "../../api/api";

const categoryService = new CategoryService();
const postService = new PostService();
const postPreviewService = new PostPreviewService();

type CategoryPageProps = {};
export const CategoryPage = (props: CategoryPageProps) => {
	const {categoryName} = useParams();
	const [category, setCategory] = useState<Category | null>(null);
	const [categories, setCategories] = useState<Category[]>([]);
	const {page, perPage, setPage} = usePageable();
	const pageCount = useRef<number>(0);
	const [posts, setPosts] = useState<PostPreview[]>(new Array(perPage).fill(null));
	const [locale] = useLocale();

	useEffect(() => {
		categoryService.getAll()
			.then(res => {
				setCategories(res.data);
				const categ = res.data.find(c => c.name === categoryName);
				if (categ) {
					setCategory(categ);
				}
			})
			.catch(err => {
				Console.error(err);
				setCategories([]);
			});

		scrollToTop();
		// eslint-disable-next-line
	}, []);

	const getPosts = () => {
		postPreviewService.getAllByCategoryName(page, category?.name!)
			.then(res => {
				setPosts(res.data);
				pageCount.current = Math.ceil(parseInt(res.headers["x-data-count"], 10) / perPage);
				if (category) window.history.replaceState(null, null!, "/#/category/" + category?.name);
			})
			.catch(err => {
				Console.error(err);
				setPosts([]);
			});
	};

	useEffect(() => {
		getPosts();
		// eslint-disable-next-line
	}, [category]);

	useEffect(() => {
		getPosts();
		// eslint-disable-next-line
	}, [page]);

	return (
		<div id="category-page" className="container theme-white-text">
			<div className="row">
				<div className="col s12">
					<h4><span className="theme-green-text">{localization[locale].title}</span>: {category?.name}
					</h4>
				</div>
			</div>
			<div className="row">
				<div className="col s12 m12 l3">
					<GenericSelect
						value={category?.id}
						labelText={localization[locale].chooseCategoryText}
						list={categories.map(categ => new GenericElement<Category>(categ, categ.id!, categ.name!))}
						onSelect={val => setCategory(val?.element)}/>
				</div>
			</div>
			<div className="row">
				<PostPreviewList posts={posts}/>
				<Pagination onPageChange={setPage} pageCount={pageCount.current}/>
			</div>
		</div>
	);
};
