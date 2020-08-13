import * as React from "react";
import { createRef, useEffect, useRef, useState } from "react";
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
	const selectInstance = useRef<M.FormSelect>();
	const idInput = createRef<HTMLInputElement>();
	const nameInput = createRef<HTMLInputElement>();
	const selectRef = createRef<HTMLSelectElement>();
	const [locale] = useLocale();

	useEffect(() => {
		getCategories();
	}, []);

	useEffect(() => {
		if (selectRef.current) {
			selectInstance.current = M.FormSelect.init(selectRef.current,
				{dropdownOptions: {closeOnClick: true, onCloseEnd: () => setTag()}});
		}
		M.updateTextFields();
		// eslint-disable-next-line
	}, [tagList, errors]);

	const getCategories = () => {
		adminTagService.getAll().then(_categories => {
			setTagList(_categories);
		}).catch(err => {
			console.error(err);
			setTagList([]);
		});
	};

	const setTag = () => {
		if (idInput.current && nameInput.current && selectRef.current) {
			const categ = tagList.find(categ => categ.idTag === parseInt(selectRef.current!.value));
			if (!categ) {
				idInput.current.value = "";
				nameInput.current.value = "";
			} else {
				idInput.current.value = categ.idTag.toString();
				nameInput.current.value = categ.tagName;
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
		if (!idInput.current)
			return;

		const categId = parseInt(idInput.current.value);

		if (isNaN(categId)) {
			setErrors([localization[locale].tagNotFoundMessage]);
			return;
		}

		adminTagService.deleteById(categId).then(() => {
			getCategories();
			setMessages([localization[locale].tagDeletedMessage]);
			if (nameInput.current && idInput.current) {
				nameInput.current.value = "";
				idInput.current.value = "";
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
							<select id="tagSelect" ref={selectRef}>
								<option value="">{localization[locale].tagNewOption}</option>
								{tagList.map(categ => <option
									value={categ.idTag}>{categ.tagName}</option>)}
							</select>
							<label htmlFor="tagSelect">{localization[locale].tagSelectLabel}</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12 m8 l4">
							<input ref={idInput} id="idTag" name="idTag" type="text" disabled={true}/>
							<label htmlFor="idTag">ID</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12 m8 l4">
							<input ref={nameInput} id="tagName" name="tag-name" type="text"/>
							<label htmlFor="tag-name">{localization[locale].tagNameLabel}</label>
						</div>
					</div>
					<div className="row">
						<div className="col s12 m8 l4">
							<MessageList className="red accent-2 white-text" timeout={3000} message={errors}/>
							<MessageList className="green accent-2 white-text" timeout={3000} message={messages}/>
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
