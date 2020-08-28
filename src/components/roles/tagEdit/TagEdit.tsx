import * as React from "react";
import { useEffect, useState } from "react";
import useLocale from "../../../hooks/useLocale";
import { getErrorText } from "../../../pages/errors/localization";
import adminTagService from "../../../services/modules/admin/adminTagService";
import authorTagService from "../../../services/modules/author/authorTagService";
import Console from "../../../utils/Console";
import { hasRole } from "../../../utils/utils";
import GenericElement from "../../genericSelect/GenericElement";
import { GenericSelect } from "../../genericSelect/GenericSelect";
import { MessageList } from "../../messageList/MessageList";
import { Stats } from "../../stats/Stats";
import localization from "./localization";
import "./TagEdit.css";

type AdminTagListProps = {
	roles: string[];
};
export const TagEdit = (props: AdminTagListProps) => {
	const tagServices =
		hasRole(props.roles, "admin") ? adminTagService : authorTagService;
	const [tagList, setTagList] = useState<Tag[]>([]);
	const [stats, setStats] = useState<StatsDTO>();
	const [errors, setErrors] = useState<string[]>([]);
	const [messages, setMessages] = useState<string[]>([]);
	const [idRef, setIdRef] = useState<HTMLInputElement | null>(null);
	const [nameRef, setNameRef] = useState<HTMLInputElement | null>(null);

	const [locale] = useLocale();

	useEffect(() => {
		getTags();
	}, []);


	const getTags = () => {
		tagServices.getAll()
			.then(_tags => setTagList(_tags))
			.catch(err => {
				Console.error(err);
				setTagList([]);
			});

		tagServices.getStats()
			.then(_stats => setStats(_stats))
			.catch(err => Console.log(err));
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
		const tag: Tag = {
			idTag: parseInt(form["idTag"].value),
			tagName: form["tag-name"].value,
		};
		const service = isNaN(tag.idTag) ? tagServices.save : tagServices.update;

		service(tag).then(() => {
			getTags();
			setMessages([localization[locale].tagSavedMessage]);
		}).catch(err => {
			Console.error(err);
			if (err.response && err.response.data) {
				setErrors([getErrorText(err.response.data.error, locale)]);
			}
		});
	};

	const deleteTag = () => {
		if (!idRef)
			return;

		const tagId = parseInt(idRef.value);

		if (isNaN(tagId)) {
			setErrors([localization[locale].tagNotFoundMessage]);
			return;
		}

		tagServices.deleteById(tagId).then(() => {
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
							<GenericSelect list={tagList.map(elem =>
								new GenericElement<Tag>(elem, elem.idTag, elem.tagName))}
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
						</div>
					</div>
				</form>
				<div className="col s12 m6">
					<Stats stats={stats} locale={locale}/>
				</div>
			</div>
		</div>
	);
};
