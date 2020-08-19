import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { AppContext } from "../../../context/AppContext";
import useLocale from "../../../hooks/useLocale";
import { getErrorText } from "../../../pages/errors/localization";
import adminCategoryService from "../../../services/modules/admin/adminCategoryService";
import adminPostService from "../../../services/modules/admin/adminPostService";
import adminTagService from "../../../services/modules/admin/adminTagService";
import authorCategoryService from "../../../services/modules/author/authorCategoryService";
import authorPostService from "../../../services/modules/author/authorPostService";
import authorTagService from "../../../services/modules/author/authorTagService";
import Console from "../../../utils/Console";
import { hasRole, scrollToTop } from "../../../utils/utils";
import { FloatingActionButton } from "../../floatingActionButton/FloatingActionButton";
import { GenericChipSelect } from "../../genericSelect/GenericChipSelect";
import GenericElement from "../../genericSelect/GenericElement";
import { GenericSelect } from "../../genericSelect/GenericSelect";
import { MessageList } from "../../messageList/MessageList";
import localization from "./localization";
import "./PostEdit.css";
import { PostEditor } from "./postEditor/PostEditor";

type PostEditProps = {
	roles: string[];
};
export const PostEdit = (props: PostEditProps) => {

	const postServices: PostService =
		hasRole(props.roles, "admin") ? adminPostService : authorPostService;
	const tagServices =
		hasRole(props.roles, "admin") ? adminTagService : authorTagService;
	const categoryServices =
		hasRole(props.roles, "admin") ? adminCategoryService : authorCategoryService;

	const [categories, setCategories] = useState<Category[]>([]);
	const [errors, setErrors] = useState<string[]>([]);
	const [locale] = useLocale();
	const [messages, setMessages] = useState<string[]>([]);
	const [post, setPost] = useState<PostDTO>();
	const [tags, setTags] = useState<Tag[]>([]);
	const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(null);
	const history = useHistory();
	const {ctx} = useContext(AppContext);
	const {postSlug} = useParams();

	const getCategories = () => {
		categoryServices.getAll().then(_categories => {
			setCategories(_categories);
		}).catch(err => {
			Console.error(err);
			setCategories([]);
		});
	};

	useEffect(() => {
		if (post && !post.idCategory)
			setPost({...(post as PostDTO), idCategory: categories[0].idCategory});
		// eslint-disable-next-line
	}, [categories]);


	const getTags = () => {
		tagServices.getAll().then(_tags => {
			setTags(_tags);
		}).catch(err => {
			Console.error(err);
			setTags([]);
		});
	};

	const savePost = () => {
		const service = post?.idPost ? postServices.update : postServices.save;
		service(post!).then(_post => {
			setMessages([localization[locale].postSavedText]);
		}).catch(err => {
			Console.error(err);
			if (err.response && err.response.data) {
				setErrors([getErrorText(err.response.data.error, locale)]);
			}
		});
	};

	const deletePost = () => {
		postServices.deleteById(post!.idPost).then(_post => {
			setMessages([localization[locale].postDeletedText]);
			setTimeout(() => {
				history.replace("/admin/posts");
			}, 3000);
		}).catch(err => {
			Console.error(err);
			if (err.response && err.response.data) {
				setErrors([getErrorText(err.response.data.error, locale)]);
			}
		});
	};

	useEffect(() => {
		if (postSlug) {
			postServices.getByPostSlug(postSlug).then(_post => {
				setPost(_post);
			}).catch(err => {
				Console.error(err);
			});
		}

		getCategories();
		getTags();
		setPost({...(post as PostDTO), postPublished: false, idUser: ctx.user!.idUser});
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (textareaRef) {
			M.textareaAutoResize(textareaRef);
		}
		Console.log(post);
		// eslint-disable-next-line
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
								<div className="col s12 m12 l6">
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
									<textarea
										id="postExcerpt"
										ref={elem => setTextareaRef(elem)}
										placeholder={localization[locale].postExcerptPlaceholder}
										className="materialize-textarea"
										spellCheck={false}
										value={post?.postExcerpt}
										onChange={(ev) => setPost({
											...(post as PostDTO),
											postExcerpt: ev.target.value,
										})}/>
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
