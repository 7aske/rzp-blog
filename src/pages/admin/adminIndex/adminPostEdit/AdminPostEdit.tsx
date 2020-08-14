import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GenericElement from "../../../../components/categorySelect/GenericElement";
import { GenericSelect } from "../../../../components/categorySelect/GenericSelect";
import useLocale from "../../../../hooks/useLocale";
import adminCategoryService from "../../../../services/adminCategoryService";
import adminTagService from "../../../../services/adminTagService";
import postService from "../../../../services/postService";
import localization from "./localization";
import { PostEditor } from "./postEditor/PostEditor";

type AdminPostEditProps = {};
export const AdminPostEdit = (props: AdminPostEditProps) => {
	const [post, setPost] = useState<PostDTO>();
	const [categories, setCategories] = useState<Category[]>([]);
	const [tags, setTags] = useState<Tag[]>([]);
	const {postSlug} = useParams();
	const [locale] = useLocale();

	const getCategories = () => {
		adminCategoryService.getAll().then(_categories => {
			setCategories(_categories);
			if (!postSlug)
				setPost({...(post as PostDTO), idCategory: _categories[0].idCategory});
		}).catch(err => {
			console.error(err);
			setCategories([]);
		});
	};


	const getTags = () => {
		adminTagService.getAll().then(_tags => {
			setTags(_tags);
		}).catch(err => {
			console.error(err);
			setTags([]);
		});
	};

	useEffect(() => {
		if (postSlug) {
			postService.getByPostSlug(postSlug).then(_post => {
				setPost(_post);
			}).catch(err => {
				console.error(err);
			});
		}
		getCategories();
		getTags();
		setPost({...(post as PostDTO), postPublished: false});
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		console.log(post);
	}, [post]);

	return (
		<div id="admin-post-edit">
			<div className="row">
				<div className="s12 m12 l8">
					<div className="row">
						<div className="input-field col s12 m12 l6 xl4">
							<input placeholder={localization[locale].postTitlePlaceholder} id="postTitle" type="text"
							       value={post?.postTitle}
							       onChange={(ev) => setPost({...(post as PostDTO), postTitle: ev.target.value})}/>
							<label htmlFor="postTitle">{localization[locale].postTitleLabel}</label>
						</div>
						<div className="input-field col s12 m12 l6 xl4">
							<input placeholder={localization[locale].postSlugPlaceholder} id="postSlug" type="text"
							       value={post?.postSlug}
							       onChange={(ev) => setPost({...(post as PostDTO), postSlug: ev.target.value})}/>
							<label htmlFor="postSlug">{localization[locale].postSlugLabel}</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12 m12 l6 xl4">
							<GenericSelect
								value={post?.idCategory}
								list={categories.map(categ => new GenericElement<Category>(categ, categ.idCategory, categ.categoryName))}
								labelText={localization[locale].postCategoryLabel}
								onSelect={elem => elem?.id && setPost({...(post as PostDTO), idCategory: elem?.id})}/>
						</div>
						<div className="input-field col s12 m12 l6 xl4">
							<label>
								<input type="checkbox" className="filled-in"
								       checked={post?.postPublished}
								       onChange={(ev) => setPost({
									       ...(post as PostDTO),
									       postPublished: Boolean(ev.target.checked),
								       })}/>
								<span>{localization[locale].postPublishedLabel}</span>
							</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12 m12 l8 xl8">
							<textarea id="postExcerpt" placeholder={localization[locale].postExcerptPlaceholder}
							          className="materialize-textarea"
							          onChange={(ev) => setPost({...(post as PostDTO), postExcerpt: ev.target.value})}/>
							<label htmlFor="postExcerpt">{localization[locale].postExcerptLabel}</label>
						</div>
					</div>
					<div className="row">
						<PostEditor locale={locale}
						            id={post ? post.idPost : undefined}
						            value={post ? post.postBody : undefined}
						            onChange={(postBody) => setPost({...(post as PostDTO), postBody: postBody})}/>
					</div>
				</div>
			</div>
		</div>
	);
};
