import * as React from "react";
import { useEffect, useState } from "react";
import useLocale from "../../../hooks/useLocale";
import { getErrorText } from "../../../pages/errors/localization";
import Console from "../../../utils/Console";
import GenericElement from "../../genericSelect/GenericElement";
import { GenericSelect } from "../../genericSelect/GenericSelect";
import { MessageList } from "../../messageList/MessageList";
import localization from "./localization";
import "./TagEdit.scss";
import TagService from "../../../services/Tag.service";
import { Tag, PostControllerApi, PostSummary } from "../../../api/api";
import { ProgressBar } from "react-materialize";
import {Link} from "react-router-dom";

const tagService = new TagService();
const postService = new PostControllerApi();

export const TagEdit = () => {
	const [tags, setTags] = useState<Tag[]>([]);
	const [errors, setErrors] = useState<string[]>([]);
	const [messages, setMessages] = useState<string[]>([]);
	const [idRef, setIdRef] = useState<HTMLInputElement | null>(null);
	const [nameRef, setNameRef] = useState<HTMLInputElement | null>(null);
	const [stats, setStats] = useState<PostSummary | null>(null);

	const [locale] = useLocale();

	useEffect(() => {
		getTags();
		getStats();
	}, []);


	const getTags = () => {
		tagService.getAll()
			.then(res => setTags(res.data))
			.catch(err => {
				Console.error(err);
				setTags([]);
			});
	};

	const getStats = () => {
		postService.getPostSummary("TAG")
			.then(res => setStats(res.data));
	};

	const setTag = (tag: Tag) => {
		if (idRef && nameRef) {
			if (!tag) {
				idRef.value = "";
				nameRef.value = "";
			} else {
				idRef.value = tag.id!.toString();
				nameRef.value = tag.name!;
			}
			M.updateTextFields();
		}
	};

	const saveTag = (ev: React.FormEvent) => {
		ev.preventDefault();
		const form = ev.target as HTMLFormElement;
		const tag: Tag = {
			id: parseInt(form["idTag"].value),
			name: form["tag-name"].value,
		};

		if (isNaN(tag.id!)) {
			tagService.save(tag)
				.then(res => {
					setTags([...tags, res.data]);
					setMessages([localization[locale].tagSavedMessage]);
				})
				.catch(err => {
					setErrors([getErrorText(err, locale)]);
				});
		} else {
			tagService.update(tag)
				.then(res => {
					setTags(tags.map(t => t.id === res.data.id ? res.data : t));
					setMessages([localization[locale].tagSavedMessage]);
				})
				.catch(err => {
					setErrors([getErrorText(err, locale)]);
				});
		}
	};

	const deleteTag = () => {
		if (!idRef)
			return;

		const tagId = parseInt(idRef.value);

		if (isNaN(tagId)) {
			setErrors([localization[locale].tagNotFoundMessage]);
			return;
		}

		tagService.deleteById(tagId).then(() => {
			getTags();
			setMessages([localization[locale].tagDeletedMessage]);
			if (nameRef && idRef) {
				nameRef.value = "";
				idRef.value = "";
			}
		}).catch(err => {
			Console.error(err);
			if (err.response && err.response.data) {
				setErrors([getErrorText(err.response.data.error, locale)]);
			}
		});
	};

	return (
		<div id="admin-tag-edit" className="row">
			<form onSubmit={saveTag} className="col s12 m6">
				<h3>{localization[locale].title}</h3>
				<div className="row">
					<div className="input-field col s12 m8">
						<GenericSelect list={tags.map(elem =>
							new GenericElement<Tag>(elem, elem.id!, elem.name!))}
						               create={true}
						               onSelect={elem => setTag(elem?.element)}
						               newOptionText={localization[locale].tagNewOption}
						               labelText={localization[locale].tagSelectLabel}/>
					</div>
				</div>
				<input hidden ref={elem => setIdRef(elem)} id="idTag" name="idTag" type="text" disabled={true}/>
				<div className="row">
					<div className="input-field col s12 m8">
						<input ref={elem => setNameRef(elem)} id="tagName" name="tag-name" type="text"/>
						<label htmlFor="tag-name">{localization[locale].tagNameLabel}</label>
					</div>
				</div>
				<div className="row">
					<div className="col s12 m8">
						<MessageList className="red accent-2 white-text" timeout={3000} messages={errors}/>
						<MessageList className="green accent-2 white-text" timeout={3000} messages={messages}/>
					</div>
				</div>
				<div className="row">
					<div className="col s12">
						<button className="btn btn-form" type="submit">
							<i className="material-icons left">save</i>{localization[locale].tagSaveButton}
						</button>
						<br/>
						<button onClick={deleteTag} className="btn btn-form red accent-2" type="button">
							<i className="material-icons left">delete</i>{localization[locale].tagDeleteButton}
						</button>
						<br/>
						<button className="btn btn-form grey" type="reset">
							<i className="material-icons left">clear</i>{localization[locale].tagResetButton}
						</button>
					</div>
				</div>
			</form>
			<div className="col s12 m6">
				<div className="row ">
					<div className="col s12 m8 stats">
						{stats ? Object.keys(stats.summary!).map(key => (<>
							<Link to={"/tag/" + key}><h6 className="theme-white-text">{key}&nbsp;<span
								className="theme-grey-light-text">({stats.summary![key]})</span></h6>
							</Link>
							<div className="progress">
								<div className="determinate"
								     style={{width: Math.round(stats.summary![key] / stats.count! * 100) + "%"}}/>
							</div>
						</>)) : <ProgressBar/>}
					</div>
					<div className="s12 m4"/>
				</div>
			</div>
		</div>
	);
};
