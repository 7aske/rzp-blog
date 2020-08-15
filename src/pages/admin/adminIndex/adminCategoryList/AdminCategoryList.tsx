import * as React from "react";
import { useEffect, useState } from "react";
import GenericElement from "../../../../components/genericSelect/GenericElement";
import { GenericSelect } from "../../../../components/genericSelect/GenericSelect";
import { MessageList } from "../../../../components/messageList/MessageList";
import useLocale from "../../../../hooks/useLocale";
import adminCategoryService from "../../../../services/modules/admin/adminCategoryService";
import "./AdminCategoryList.css";
import { getErrorText } from "../../../errors/localization";
import localization from "./localization";
import Console from "../../../../utils/Console";

type AdminCategoryListProps = {};
export const AdminCategoryList = (props: AdminCategoryListProps) => {
	const [errors, setErrors] = useState<string[]>([]);
	const [messages, setMessages] = useState<string[]>([]);
	const [idRef, setIdRef] = useState<HTMLInputElement | null>(null);
	const [nameRef, setNameRef] = useState<HTMLInputElement | null>(null);
	const [locale] = useLocale();

	const [categoryList, setCategoryList] = useState<Category[]>([]);
	const getCategories = () => {
		adminCategoryService.getAll().then(_categories => {
			setCategoryList(_categories);
		}).catch(err => {
			Console.error(err);
			if (err.response && err.response.data) {
				setErrors([getErrorText(err.response.data.error, locale)]);
			}
			setCategoryList([]);
		});
	};

	useEffect(() => {
		getCategories();
	}, []);

	const setCategory = (categ?: Category) => {
		if (idRef && nameRef) {
			if (!categ) {
				idRef.value = "";
				nameRef.value = "";
			} else {
				idRef.value = categ.idCategory.toString();
				nameRef.value = categ.categoryName;
			}
			M.updateTextFields();
		}
	};

	const saveCategory = (ev: React.FormEvent) => {
		ev.preventDefault();
		const form = ev.target as HTMLFormElement;
		const categ: Category = {
			idCategory: parseInt(form["idCategory"].value),
			categoryName: form["categoryName"].value,
		};
		const action = isNaN(categ.idCategory) ? adminCategoryService.save : adminCategoryService.update;

		action(categ).then(() => {
			getCategories();
			setMessages([localization[locale].categorySavedMessage]);
		}).catch(err => {
			Console.error(err);
			if (err.response && err.response.data) {
				setErrors([getErrorText(err.response.data.error, locale)]);
			}
		});
	};

	const deleteCategory = () => {
		if (!idRef)
			return;

		const categId = parseInt(idRef.value);

		if (isNaN(categId)) {
			setErrors([localization[locale].categoryNotFoundMessage]);
			return;
		}

		adminCategoryService.deleteById(categId).then(() => {
			getCategories();
			setMessages([localization[locale].categoryDeletedMessage]);
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
		<div id="admin-category-list">
			<form onSubmit={saveCategory}>
				<div className="row">
					<div className="input-field col s12 m8 l4">
						<GenericSelect
							labelText={localization[locale].categoryNameLabel}
							newOptionText={localization[locale].categoryNewOption}
							create={true}
							list={categoryList.map(elem => new GenericElement<Category>(
								elem,
								elem.idCategory,
								elem.categoryName,
							))} onSelect={(elem) => setCategory(elem?.element)}/>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s12 m8 l4">
						<input ref={elem => setIdRef(elem)} id="idCategory" name="idCategory" type="text"
						       disabled={true}/>
						<label htmlFor="idCategory">ID</label>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s12 m8 l4">
						<input ref={elem => setNameRef(elem)} id="categoryName" name="categoryName" type="text"/>
						<label htmlFor="categoryName">{localization[locale].categoryNameLabel}</label>
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
							className="material-icons left">save</i>{localization[locale].categorySaveButton}
						</button>
					</div>
					<div className="input-field col s12">
						<button onClick={deleteCategory} className="btn red accent-2"
						        type="button"><i
							className="material-icons left">delete</i>{localization[locale].categoryDeleteButton}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
