import * as React from "react";
import { useEffect, useState } from "react";
import GenericElement from "../../../../components/categorySelect/GenericElement";
import { GenericSelect } from "../../../../components/categorySelect/GenericSelect";
import { MessageList } from "../../../../components/messageList/MessageList";
import useLocale from "../../../../hooks/useLocale";
import adminTagService from "../../../../services/adminTagService";
import "./AdminTagList.css";
import localization from "./localization";

type AdminTagListProps = {};
export const AdminTagList = (props: AdminTagListProps) => {
	const [tagList, setTagList] = useState<Tag[]>([]);
	const [errors, setErrors] = useState<string[]>([]);
	const [messages, setMessages] = useState<string[]>([]);
	const [idRef, setIdRef] = useState<HTMLInputElement | null>(null);
	const [nameRef, setNameRef] = useState<HTMLInputElement | null>(null);

	const [locale] = useLocale();

	useEffect(() => {
		getCategories();
	}, []);


	const getCategories = () => {
		adminTagService.getAll().then(_categories => {
			setTagList(_categories);
		}).catch(err => {
			console.error(err);
			setTagList([]);
		});
	};

	const setTag = (tag: Tag) => {
		if (idRef && nameRef) {
			if (!tag) {
				idRef.value = "";
				nameRef.value = "";
			} else {
				idRef.value = tag.idTag.toString();
				nameRef.value = tag.tagName;
			}
			M.updateTextFields();
		}
	};

	const saveTag = (ev: React.FormEvent) => {
		ev.preventDefault();
		const form = ev.target as HTMLFormElement;
		const categ: Tag = {
			idTag: parseInt(form["idTag"].value),
			tagName: form["tag-name"].value,
		};
		const action = isNaN(categ.idTag) ? adminTagService.save : adminTagService.update;

		action(categ).then(() => {
			getCategories();
			setMessages([localization[locale].tagSavedMessage]);
		}).catch(err => {
			console.error(err);
			if (err.response && err.response.data) {
				setErrors([err.response.data.error]);
			}
		});
	};

	const deleteTag = () => {
		if (!idRef)
			return;

		const categId = parseInt(idRef.value);

		if (isNaN(categId)) {
			setErrors([localization[locale].tagNotFoundMessage]);
			return;
		}

		adminTagService.deleteById(categId).then(() => {
			getCategories();
			setMessages([localization[locale].tagDeletedMessage]);
			if (nameRef && idRef) {
				nameRef.value = "";
				idRef.value = "";
			}
		}).catch(err => {
			console.error(err);
			if (err.response && err.response.data) {
				setErrors([err.response.data.error]);
			}
		});
	};

	return (
		<div id="admin-tag-list">
			<form onSubmit={saveTag}>
				<div className="row">
					<div className="input-field col s12 m8 l4">
						<GenericSelect list={tagList.map(elem =>
							new GenericElement<Tag>(elem, elem.idTag, elem.tagName))}
						               create={true}
						               onSelect={elem => setTag(elem?.element)}
						               newOptionText={localization[locale].tagNewOption}
						               labelText={localization[locale].tagSelectLabel}/>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s12 m8 l4">
						<input ref={elem => setIdRef(elem)} id="idTag" name="idTag" type="text" disabled={true}/>
						<label htmlFor="idTag">ID</label>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s12 m8 l4">
						<input ref={elem => setNameRef(elem)} id="tagName" name="tag-name" type="text"/>
						<label htmlFor="tag-name">{localization[locale].tagNameLabel}</label>
					</div>
				</div>
				<div className="row">
					<div className="col s12 m8 l4">
						<MessageList className="red accent-2 white-text" timeout={3000} messages={errors}/>
						<MessageList className="green accent-2 white-text" timeout={3000} messages={messages}/>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s12">
						<button className="btn" type="submit"><i
							className="material-icons left">save</i>{localization[locale].tagSaveButton}
						</button>
					</div>
					<div className="input-field col s12">
						<button onClick={deleteTag} className="btn red accent-2"
						        type="button"><i
							className="material-icons left">delete</i>{localization[locale].tagDeleteButton}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
