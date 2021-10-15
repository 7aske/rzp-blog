import * as React from "react";
import { ChangeEvent, useContext, useEffect, useState, useRef } from "react";
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
import localization from "./localization";
import "./PostEdit.scss";
import { PostEditor } from "./postEditor/PostEditor";
import PostService from "../../../services/Post.service";
import TagService from "../../../services/Tag.service";
import CategoryService from "../../../services/Category.service";
import { Role, Post, Tag, PostRecordStatusEnum, Category } from "../../../api/api";
import { Button, Modal } from "react-materialize";
import { MediaView } from "../mediaView/MediaView";
import code from "../../../assets/img/code.png";
import Toast from "../../../utils/Toast";

const postService = new PostService();
const tagService = new TagService();
const categoryService = new CategoryService();

type PostEditProps = {
	roles: Role[];
};
export const PostEdit = (props: PostEditProps) => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [locale] = useLocale();
	const [post, setPost] = useState<Post>();
	const [tags, setTags] = useState<Tag[]>([]);
	const [modalOpen, setModalOpen] = useState(false);
	const history = useHistory();
	const {ctx} = useContext(AppContext);
	const {postSlug} = useParams();
	const tapRef = useRef(null);

	const getCategories = () => {
		categoryService.getAll().then(res => {
			setCategories(res.data);
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
		tagService.getAll().then(res => {
			setTags(res.data);
		}).catch(err => {
			Console.error(err);
			setTags([]);
		});
	};

	const savePost = () => {
		if (isNaN(post?.id!)) {
			postService.save(post!).then(_post => {
				Toast.showSuccess(localization[locale].postSavedText);
			}).catch(err => {
				Toast.showError(getErrorText(err, locale));
			});
		} else {
			postService.update(post!).then(_post => {
				Toast.showSuccess(localization[locale].postSavedText);
			}).catch(err => {
				Toast.showError(getErrorText(err, locale));
			});
		}
	};

	const deletePost = () => {
		postService.deleteById(post!.id!).then(_post => {
			Toast.showSuccess(localization[locale].postDeletedText);
			setTimeout(() => {
				history.replace("/author/posts");
			}, 3000);
		}).catch(err => {
			Toast.showError(getErrorText(err, locale));
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

	useEffect(() => {
		if (tapRef.current) {
			const instance = M.TapTarget.init(tapRef.current!, {});
			instance.open();
		}

	}, [tapRef]);

	const setProp = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const value = ev.target.value;
		const id = ev.target.id;
		console.log(value);
		if (id === "recordStatus") {
			setPost({
				...(post as Post),
				[id]: value === "true" ? PostRecordStatusEnum.Active : PostRecordStatusEnum.Deleted,
			});
		} else if (id === "title") {
			const slug = value.replace(/\s+/g, "-").replace(/[^\w-]/g, "").toLocaleLowerCase();
			setPost({...(post as Post), [id]: value, slug});
		} else {
			setPost({...(post as Post), [id]: value});
		}
	};

	return (
		<div id="admin-post-edit">
			<FloatingActionButton icon="more_vert" toolbar={[{
				icon: "vertical_align_top",
				className: "theme-grey",
				onClick: scrollToTop,
				tooltip: localization[locale].tooltipToTop,
			}, {
				icon: "save",
				className: "theme-green",
				onClick: savePost,
				tooltip: localization[locale].tooltipSave,
			}, {
				icon: "delete",
				className: "red accent-2",
				onClick: deletePost,
				tooltip: localization[locale].tooltipDelete,
			}, {
				icon: "image",
				className: "theme-grey",
				onClick: () => setModalOpen(true),
				tooltip: localization[locale].tooltipImages,
			}]}/>
			<div ref={tapRef} className="tap-target theme-green theme-grey-text" data-target="fab">
				<div className="tap-target-content">
					<h5>{localization[locale].tapTargetHeader}</h5>
					<p>{localization[locale].tapTargetBody}</p>
				</div>
			</div>
			<div className="row">
				<div className="col s12 m12 l10">
					<div className="row">
						<div className="col s12 m12 l8">
							<div className="row">
								<MaterializeInput placeholder={localization[locale].postTitlePlaceholder}
								                  className="col s12 m12 l6"
								                  id="title"
								                  type="text"
								                  value={post?.title}
								                  label={localization[locale].postTitleLabel}
								                  onChange={setProp}/>
								<MaterializeInput placeholder={localization[locale].postSlugPlaceholder}
								                  className="col s12 m12 l6"
								                  id="slug"
								                  type="text"
								                  value={post?.slug}
								                  label={localization[locale].postSlugLabel}
								                  onChange={setProp}/>
							</div>
							<div className="row">
								<div className="col s12 m12 l6">
									<GenericSelect
										value={post?.category?.id}
										list={categories.map(categ => new GenericElement<Category>(categ, categ.id!, categ.name!))}
										labelText={localization[locale].postCategoryLabel}
										onSelect={elem => elem?.id && setPost({
											...(post as Post),
											category: {id: elem.id, name: elem.name},
										})}/>
								</div>
								<MaterializeCheckbox id="recordStatus"
								                     className="col s12 m12 l6"
								                     label={localization[locale].postPublishedLabel}
								                     value={post?.recordStatus === "ACTIVE" ? "true" : "false"}
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
								<div className="col s12 l3 post-preview-image hide-on-med-and-down">
									<a href={post?.image} rel="noopener noreferrer" target="_blank"
									   style={{pointerEvents: !post?.image ? "none": "initial"}}>
										<img src={post?.image ? post?.image : code} alt="Post preview"
										     onError={ev => (ev.target as HTMLImageElement).src = code}/>
									</a>
								</div>
								<MaterializeInput placeholder={localization[locale].postImagePlaceholder}
								                  className="col s12 m12 l9"
								                  id="image"
								                  type="text"
								                  value={post?.image}
								                  label={localization[locale].postImageLabel}
								                  onChange={setProp}/>
							</div>
							<div className="row">
								<MaterializeTextarea
									id="excerpt"
									className="col s12 m12 l12"
									placeholder={localization[locale].postExcerptPlaceholder}
									spellCheck={false}
									value={post?.excerpt}
									label={localization[locale].postExcerptLabel}
									onChange={setProp}/>
							</div>
						</div>
					</div>
					<div className="row">
						<PostEditor locale={locale}
						            id={post ? post.id : undefined}
						            value={post ? post.body : undefined}
						            onChange={(postBody) => setPost({...(post as Post), body: postBody})}/>
					</div>
					<Modal
						actions={[
							<Button flat modal="close" node="button" waves="green">Close</Button>,
						]}
						options={{
							preventScrolling: true,
							onCloseEnd: () => setModalOpen(false),
						}}
						id={`modal-post`}
						open={modalOpen}>
						<MediaView/>
					</Modal>
				</div>
			</div>
		</div>
	);
};
