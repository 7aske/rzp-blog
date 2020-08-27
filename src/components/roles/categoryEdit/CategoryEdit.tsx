import * as React from "react";
import { useEffect, useState } from "react";
import useLocale from "../../../hooks/useLocale";
import { getErrorText } from "../../../pages/errors/localization";
import adminCategoryService from "../../../services/modules/admin/adminCategoryService";
import authorCategoryService from "../../../services/modules/author/authorCategoryService";
import Console from "../../../utils/Console";
import { hasRole } from "../../../utils/utils";
import { CategoryStats } from "../../categoryStats/CategoryStats";
import GenericElement from "../../genericSelect/GenericElement";
import { GenericSelect } from "../../genericSelect/GenericSelect";
import { MessageList } from "../../messageList/MessageList";
import "./CategoryEdit.css";
import localization from "./localization";

type CategoryEditProps = {
	roles: string[];
};
export const CategoryEdit = (props: CategoryEditProps) => {
	const categoryServices =
		hasRole(props.roles, "admin") ? adminCategoryService : authorCategoryService;

	const [stats, setStats] = useState<CategoryStatsDTO>();
	const [errors, setErrors] = useState<string[]>([]);
	const [messages, setMessages] = useState<string[]>([]);
	const [idRef, setIdRef] = useState<HTMLInputElement | null>(null);
	const [nameRef, setNameRef] = useState<HTMLInputElement | null>(null);
	const [locale] = useLocale();

	const [categoryList, setCategoryList] = useState<Category[]>([]);
	const getCategories = () => {
		categoryServices.getAll().then(_categories => {
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
		categoryServices.getStats().then(res => setStats(res)).catch(err => Console.error(err));
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
		const service = isNaN(categ.idCategory) ? categoryServices.save : categoryServices.update;

		service(categ).then(() => {
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

		categoryServices.deleteById(categId).then(() => {
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
		<div id="admin-category-edit">
			<form onSubmit={saveCategory} className="row">
				<div className="col s12 m6">
					<h3>{localization[locale].title}</h3>
					<div className="row">
						<div className="input-field col s12 m8">
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
						<div className="input-field col s12 m8">
							<input ref={elem => setIdRef(elem)} id="idCategory" name="idCategory" type="text"
							       disabled={true}/>
							<label htmlFor="idCategory">ID</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12 m8">
							<input ref={elem => setNameRef(elem)} id="categoryName" name="categoryName" type="text"/>
							<label htmlFor="categoryName">{localization[locale].categoryNameLabel}</label>
						</div>
					</div>
					<div className="row">
						<div className="col s12 m8">
							<MessageList className="red accent-2 white-text" timeout={3000} messages={errors}/>
							<MessageList className="green accent-2 white-text" timeout={3000} messages={messages}/>
						</div>
					</div>
					<div className="row">
						<button className="btn btn-form" type="submit"><i
							className="material-icons left">save</i>{localization[locale].categorySaveButton}
						</button>
						<br/>
						<button onClick={deleteCategory} className="btn btn-form red accent-2"
						        type="button"><i
							className="material-icons left">delete</i>{localization[locale].categoryDeleteButton}
						</button>
					</div>
				</div>
				<div className="col s12 m6">
					<CategoryStats locale={locale} stats={stats!}/>
				</div>
			</form>
		</div>
	);
};
