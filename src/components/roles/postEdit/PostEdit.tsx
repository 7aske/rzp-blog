import * as React from "react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { AppContext } from "../../../context/AppContext";
import useLocale from "../../../hooks/useLocale";
import { getErrorText } from "../../../pages/errors/localization";
import Console from "../../../utils/Console";
import { scrollToTop } from "../../../utils/utils";
import { FloatingActionButton } from "../../floatingActionButton/FloatingActionButton";
import { GenericChipSelect } from "../../genericSelect/GenericChipSelect";
import GenericElement from "../../genericSelect/GenericElement";
import { GenericSelect } from "../../genericSelect/GenericSelect";
import MaterializeInput, { MaterializeCheckbox } from "../../materialize/input/MaterializeInput";
import MaterializeTextarea from "../../materialize/textarea/MaterializeTextarea";
import { MessageList } from "../../messageList/MessageList";
import localization from "./localization";
import "./PostEdit.css";
import { PostEditor } from "./postEditor/PostEditor";
import PostService from "../../../services/Post.service";
import TagService from "../../../services/Tag.service";
import CategoryService from "../../../services/Category.service";
import PostPreviewService from "../../../services/PostPreview.service";
import { Category } from "../../../@types/Category";
import { Role, Post, Tag } from "../../../api/api";

const postService = new PostService();
const tagService = new TagService();
const categoryService = new CategoryService();
const postPreviewService = new PostPreviewService();

type PostEditProps = {
	roles: Role[];
};
export const PostEdit = (props: PostEditProps) => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [errors, setErrors] = useState<string[]>([]);
	const [messages, setMessages] = useState<string[]>([]);
	const [locale] = useLocale();
	const [post, setPost] = useState<Post>();
	const [tags, setTags] = useState<Tag[]>([]);
	const history = useHistory();
	const {ctx} = useContext(AppContext);
	const {postSlug} = useParams();

	const getCategories = () => {
		categoryService.getAll().then(_categories => {
			setCategories(_categories);
		}).catch(err => {
			Console.error(err);
			setCategories([]);
		});
	};

	useEffect(() => {
		if (post && !post.category)
			setPost({...(post as Post), category: categories[0]});
		// eslint-disable-next-line
	}, [categories]);


	const getTags = () => {
		tagService.getAll().then(_tags => {
			setTags(_tags);
		}).catch(err => {
			Console.error(err);
			setTags([]);
		});
	};

	const savePost = () => {
		if (isNaN(post?.id!)) {
			postService.save(post!).then(_post => {
				setMessages([localization[locale].postSavedText]);
			}).catch(err => {
				Console.error(err);
				if (err.response && err.response.data) {
					setErrors([getErrorText(err.response.data.error, locale)]);
				}
			});
		} else {
			postService.update(post!).then(_post => {
				setMessages([localization[locale].postSavedText]);
			}).catch(err => {
				Console.error(err);
				if (err.response && err.response.data) {
					setErrors([getErrorText(err.response.data.error, locale)]);
				}
			});
		}
	};

	const deletePost = () => {
		postService.deleteById(post!.id!).then(_post => {
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
			postService.getByPostSlug(postSlug)
				.then(res => {
					setPost(res.data);
				})
				.catch(err => {
					Console.error(err);
				});
		}

		getCategories();
		getTags();
		setPost({...(post as Post), published: false, user: ctx.user!});
		// eslint-disable-next-line
	}, []);

	const setProp = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const value = ev.target.value;
		const id = ev.target.id;

		setPost({...(post as Post), [id]: value, published: value === "true"});
	};

	useEffect(() => {
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
				<div className="col s12 m12 l10">
					<div className="row">
						<div className="col s12 m12 l8">
							<div className="row">
								<MaterializeInput placeholder={localization[locale].postTitlePlaceholder}
								                  className="col s12 m12 l6"
								                  id="postTitle"
								                  type="text"
								                  value={post?.title}
								                  label={localization[locale].postTitleLabel}
								                  onChange={setProp}/>
								<MaterializeInput placeholder={localization[locale].postSlugPlaceholder}
								                  className="col s12 m12 l6"
								                  id="postSlug"
								                  type="text"
								                  value={post?.slug}
								                  label={localization[locale].postSlugLabel}
								                  onChange={setProp}/>
							</div>
							<div className="row">
								<div className="col s12 m12 l6">
									<GenericSelect
										value={post?.category?.id}
										list={categories.map(categ => new GenericElement<Category>(categ, categ.id!, categ.name))}
										labelText={localization[locale].postCategoryLabel}
										onSelect={elem => elem?.id && setPost({
											...(post as Post),
											category: {id: elem.id, name: elem.name},
										})}/>
								</div>
								<MaterializeCheckbox id="postPublished"
								                     className="col s12 m12 l6"
								                     label={localization[locale].postPublishedLabel}
								                     value={post?.published + ""}
								                     onChange={setProp}/>
							</div>
							<div className="row">
								<div className="col s12 m12 l12">
									<GenericChipSelect
										labelText={localization[locale].postTagsLabel}
										list={tags.map(tag => new GenericElement<Tag>(tag, tag.id!, tag.name!))}
										onUpdate={elems => setPost({
											...(post as Post),
											tags: elems.map(elem => ({
												id: elem.id,
												name: elem.name,
											})),
										})}
										value={post?.tags ? post?.tags.map(tag => new GenericElement<Tag>(tag, tag.id!, tag.name!)) : []}/>
								</div>
							</div>
							<div className="row">
								<MaterializeTextarea
									id="postExcerpt"
									className="col s12 m12 l12"
									placeholder={localization[locale].postExcerptPlaceholder}
									spellCheck={false}
									value={post?.excerpt}
									label={localization[locale].postExcerptLabel}
									onChange={setProp}/>
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
						            id={post ? post.id : undefined}
						            value={post ? post.body : undefined}
						            onChange={(postBody) => setPost({...(post as Post), body: postBody})}/>
					</div>
				</div>
			</div>
		</div>
	);
};
