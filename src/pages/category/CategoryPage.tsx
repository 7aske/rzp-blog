import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import GenericElement from "../../components/genericSelect/GenericElement";
import { GenericSelect } from "../../components/genericSelect/GenericSelect";
import { Pagination } from "../../components/pagination/Pagination";
import { PostPreviewList } from "../../components/postPreviewList/PostPreviewList";
import useLocale from "../../hooks/useLocale";
import categoryService from "../../services/categoryService";
import postService from "../../services/postService";
import localization from "./localization";

type CategoryPageProps = {};
export const CategoryPage = (props: CategoryPageProps) => {
	const {categoryName} = useParams();
	const [category, setCategory] = useState<Category | null>(null);
	const [categories, setCategories] = useState<Category[]>([]);
	const [posts, setPosts] = useState<PostPreviewDTO[]>([]);
	const [pageCount, setPageCount] = useState(0);
	const [page, setPage] = useState(0);
	const [locale] = useLocale();

	useEffect(() => {
		categoryService.getAll().then(_categories => {
			setCategories(_categories);
			const categ = _categories.find(c => c.categoryName === categoryName);
			if (categ) {
				setCategory(categ);
			}
		}).catch(err => {
			console.error(err);
			setCategories([]);
		});
		// eslint-disable-next-line
	}, []);

	const getPosts = () => {
		postService.getAllPreview({category: category?.categoryName, page, published: true}).then(_posts => {
			setPosts(_posts);
			if (category) window.history.replaceState(null, null!, "/#/category/" + category?.categoryName);
		}).catch(err => {
			console.error(err);
			setPosts([]);
		});
	};

	useEffect(() => {
		getPosts();
		postService.getPageCount({category: category?.categoryName, published: true}).then(_pageCount => {
			setPageCount(_pageCount);
		});
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
					<h4><span className="theme-green-text">{localization[locale].title}</span>: {category?.categoryName}
					</h4>
				</div>
			</div>
			<div className="row">
				<div className="col s12 m12 l3">
					<GenericSelect
						value={category?.idCategory}
						labelText={localization[locale].chooseCategoryText}
						list={categories.map(categ => new GenericElement<Category>(categ, categ.idCategory, categ.categoryName))}
						onSelect={val => setCategory(val?.element)}/>
				</div>
			</div>
			<div className="row">
				<PostPreviewList posts={posts}/>
				<Pagination onPageChange={setPage} pageCount={pageCount}/>
			</div>
		</div>
	);
};
