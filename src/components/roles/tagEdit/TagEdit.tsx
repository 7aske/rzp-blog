import * as React from "react";
import { useEffect, useState } from "react";
import useLocale from "../../../hooks/useLocale";
import { getErrorText } from "../../../pages/errors/localization";
import Console from "../../../utils/Console";
import GenericElement from "../../genericSelect/GenericElement";
import { GenericSelect } from "../../genericSelect/GenericSelect";
import { MessageList } from "../../messageList/MessageList";
import localization from "./localization";
import "./TagEdit.css";
import { Tag } from "../../../@types/Tag";
import { Role } from "../../../@types/Role";
import TagService from "../../../services/Tag.service";

const tagService = new TagService();

type AdminTagListProps = {
	roles: Role[];
};
export const TagEdit = (props: AdminTagListProps) => {
	const [tags, setTags] = useState<Tag[]>([]);
	const [errors, setErrors] = useState<string[]>([]);
	const [messages, setMessages] = useState<string[]>([]);
	const [idRef, setIdRef] = useState<HTMLInputElement | null>(null);
	const [nameRef, setNameRef] = useState<HTMLInputElement | null>(null);

	const [locale] = useLocale();

	useEffect(() => {
		getTags();
	}, []);


	const getTags = () => {
		tagService.getAll()
			.then(setTags)
			.catch(err => {
				Console.error(err);
				setTags([]);
			});
	};

	const setTag = (tag: Tag) => {
		if (idRef && nameRef) {
			if (!tag) {
				idRef.value = "";
				nameRef.value = "";
			} else {
				idRef.value = tag.id!.toString();
				nameRef.value = tag.name;
			}
			M.updateTextFields();
		}
	};

	const saveTag = (ev: React.FormEvent) => {
		ev.preventDefault();
		const form = ev.target as HTMLFormElement;
		const categ: Tag = {
			id: parseInt(form["idTag"].value),
			name: form["tag-name"].value,
		};

		if (isNaN(categ.id!)) {
			tagService.save(categ).then(_tag => {
				setTags([...tags, _tag]);
				setMessages([localization[locale].tagSavedMessage]);
			}).catch(err => {
				setErrors([getErrorText(err, locale)]);
			});
		} else {
			tagService.update(categ).then(_tag => {
				setTags(tags.map(t => t.id === _tag.id ? _tag : t));
				setMessages([localization[locale].tagSavedMessage]);
			}).catch(err => {
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
		<div id="admin-tag-edit">
			<div className="row">
				<form onSubmit={saveTag} className="col s12 m6">
					<h3>{localization[locale].title}</h3>
					<div className="row">
						<div className="input-field col s12 m8">
							<GenericSelect list={tags.map(elem =>
								new GenericElement<Tag>(elem, elem.id!, elem.name))}
							               create={true}
							               onSelect={elem => setTag(elem?.element)}
							               newOptionText={localization[locale].tagNewOption}
							               labelText={localization[locale].tagSelectLabel}/>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12 m8">
							<input ref={elem => setIdRef(elem)} id="idTag" name="idTag" type="text" disabled={true}/>
							<label htmlFor="idTag">ID</label>
						</div>
					</div>
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
			</div>
		</div>
	);
};
