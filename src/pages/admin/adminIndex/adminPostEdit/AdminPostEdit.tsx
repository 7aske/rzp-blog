import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { FloatingActionButton } from "../../../../components/floatingActionButton/FloatingActionButton";
import { GenericChipSelect } from "../../../../components/genericSelect/GenericChipSelect";
import GenericElement from "../../../../components/genericSelect/GenericElement";
import { GenericSelect } from "../../../../components/genericSelect/GenericSelect";
import { MessageList } from "../../../../components/messageList/MessageList";
import { AppContext } from "../../../../context/AppContext";
import useLocale from "../../../../hooks/useLocale";
import adminCategoryService from "../../../../services/modules/admin/adminCategoryService";
import adminPostService from "../../../../services/modules/admin/adminPostService";
import adminTagService from "../../../../services/modules/admin/adminTagService";
import { scrollToTop } from "../../../../utils/utils";
import { getErrorText } from "../../../errors/localization";
import "./AdminPostEdit.css";
import localization from "./localization";
import { PostEditor } from "./postEditor/PostEditor";

type AdminPostEditProps = {};
export const AdminPostEdit = (props: AdminPostEditProps) => {
	const history = useHistory();
	const {ctx} = useContext(AppContext);
	const [errors, setErrors] = useState<string[]>([]);
	const [messages, setMessages] = useState<string[]>([]);
	const [post, setPost] = useState<PostDTO>();
	const [categories, setCategories] = useState<Category[]>([]);
	const [tags, setTags] = useState<Tag[]>([]);
	const {postSlug} = useParams();
	const [locale] = useLocale();

	const getCategories = () => {
		adminCategoryService.getAll().then(_categories => {
			setCategories(_categories);
		}).catch(err => {
			console.error(err);
			setCategories([]);
		});
	};

	useEffect(() => {
		if (post && !post?.idCategory)
			setPost({...(post as PostDTO), idCategory: categories[0].idCategory});
	}, [categories]);


	const getTags = () => {
		adminTagService.getAll().then(_tags => {
			setTags(_tags);
		}).catch(err => {
			console.error(err);
			setTags([]);
		});
	};

	const savePost = () => {
		const action = post?.idPost ? adminPostService.update : adminPostService.save;
		action(post!).then(_post => {
			setMessages([localization[locale].postSavedText]);
		}).catch(err => {
			console.error(err);
			if (err.response && err.response.data) {
				setErrors([getErrorText(err.response.data.error, locale)]);
			}
		});
	};

	const deletePost = () => {
		adminPostService.deleteById(post!.idPost).then(_post => {
			setMessages([localization[locale].postDeletedText]);
			setTimeout(() => {
				history.replace("/admin/posts");
			}, 3000);
		}).catch(err => {
			console.error(err);
			if (err.response && err.response.data) {
				setErrors([getErrorText(err.response.data.error, locale)]);
			}
		});
	};

	useEffect(() => {
		if (postSlug) {
			adminPostService.getByPostSlug(postSlug).then(_post => {
				setPost(_post);
			}).catch(err => {
				console.error(err);
			});
		}
		getCategories();
		getTags();
		setPost({...(post as PostDTO), postPublished: false, idUser: ctx.user!.idUser});
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		console.log(post);
	}, [post]);

	return (
		<div id="admin-post-edit">
			<FloatingActionButton icon="more_vert" toolbar={[{
				icon: "save",
				className: "theme-green",
				onClick: savePost,
			}, {
				icon: "vertical_align_top",
				className: "theme-grey",
				onClick: scrollToTop,
			}]}/>
			<div className="row">
				<div className="s12 m12 l8">
					<div className="row">
						<div className="col s12 m12 l8">
							<div className="row">
								<div className="input-field col s12 m12 l6">
									<input placeholder={localization[locale].postTitlePlaceholder} id="postTitle"
									       type="text"
									       value={post?.postTitle}
									       onChange={(ev) => setPost({
										       ...(post as PostDTO),
										       postTitle: ev.target.value,
									       })}/>
									<label htmlFor="postTitle">{localization[locale].postTitleLabel}</label>
								</div>
								<div className="input-field col s12 m12 l6">
									<input placeholder={localization[locale].postSlugPlaceholder} id="postSlug"
									       type="text"
									       value={post?.postSlug}
									       onChange={(ev) => setPost({
										       ...(post as PostDTO),
										       postSlug: ev.target.value,
									       })}/>
									<label htmlFor="postSlug">{localization[locale].postSlugLabel}</label>
								</div>
							</div>
							<div className="row">
								<div className="input-field col s12 m12 l6">
									<GenericSelect
										value={post?.idCategory}
										list={categories.map(categ => new GenericElement<Category>(categ, categ.idCategory, categ.categoryName))}
										labelText={localization[locale].postCategoryLabel}
										onSelect={elem => elem?.id && setPost({
											...(post as PostDTO),
											idCategory: elem?.id,
										})}/>
								</div>
								<div className="input-field col s12 m12 l6">
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
								<div className="col s12 m12 l8">
									<GenericChipSelect
										labelText={localization[locale].postTagsLabel}
										list={tags.map(tag => new GenericElement<Tag>(tag, tag.idTag, tag.tagName))}
										onUpdate={elems => setPost({
											...(post as PostDTO),
											tags: elems.map(elem => ({
												idTag: elem.id,
												tagName: elem.name,
											})),
										})}
										value={post?.tags ? post?.tags.map(tag => new GenericElement<Tag>(tag, tag.idTag, tag.tagName)) : []}/>
								</div>
							</div>
							<div className="row">
								<div className="input-field col s12 m12 l8">
							<textarea id="postExcerpt" placeholder={localization[locale].postExcerptPlaceholder}
							          className="materialize-textarea"
							          onChange={(ev) => setPost({...(post as PostDTO), postExcerpt: ev.target.value})}/>
									<label htmlFor="postExcerpt">{localization[locale].postExcerptLabel}</label>
								</div>
							</div>
							<div className="row">
								<div className="col s12">
									<MessageList timeout={3000} className="red accent-2 white-text" messages={errors}/>
									<MessageList className="green accent-2 white-text" messages={messages}/>
								</div>
							</div>
						</div>
						<div className="col s12 m12 l4 post-edit-controls">
							<div className="row">
								<div className="col s6 m6 l12">
									<button onClick={savePost} className="btn"
									        name="action">{localization[locale].savePostButton}
										<i className="material-icons right">send</i>
									</button>
								</div>
								<div className="col s6 m6 l12">
									<button onClick={deletePost} className="btn red accent-2"
									        name="action">{localization[locale].deletePostButton}
										<i className="material-icons right">delete</i>
									</button>
								</div>
							</div>
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
