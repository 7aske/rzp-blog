import * as React from "react";
import { useEffect, useState } from "react";
import useLocale from "../../../hooks/useLocale";
import { getErrorText } from "../../../pages/errors/localization";
import Console from "../../../utils/Console";
import GenericElement from "../../genericSelect/GenericElement";
import { GenericSelect } from "../../genericSelect/GenericSelect";
import { MessageList } from "../../messageList/MessageList";
import "./CategoryEdit.scss";
import localization from "./localization";
import CategoryService from "../../../services/Category.service";
import { Category } from "../../../api/api";

const categoryService = new CategoryService();

export const CategoryEdit = () => {
	const [errors, setErrors] = useState<string[]>([]);
	const [messages, setMessages] = useState<string[]>([]);
	const [idRef, setIdRef] = useState<HTMLInputElement | null>(null);
	const [nameRef, setNameRef] = useState<HTMLInputElement | null>(null);
	const [locale] = useLocale();

	const [categoryList, setCategoryList] = useState<Category[]>([]);
	const getCategories = () => {
		categoryService.getAll()
			.then(res => {
				setCategoryList(res.data);
			})
			.catch(err => {
				Console.error(err);
				if (err.response && err.response.data) {
					setErrors([getErrorText(err.response.data.error, locale)]);
				}
				setCategoryList([]);
			});
	};

	useEffect(() => {
		getCategories();
		// eslint-disable-next-line
	}, []);

	const setCategory = (categ?: Category) => {
		if (idRef && nameRef) {
			if (!categ) {
				idRef.value = "";
				nameRef.value = "";
			} else {
				idRef.value = categ.id!.toString();
				nameRef.value = categ.name!;
			}
			M.updateTextFields();
		}
	};

	const saveCategory = (ev: React.FormEvent) => {
		ev.preventDefault();
		const form = ev.target as HTMLFormElement;
		const categ: Category = {
			id: parseInt(form["idCategory"].value),
			name: form["categoryName"].value,
		};

		if (isNaN(categ.id!)) {
			categoryService.save(categ)
				.then(res => {
					setCategoryList([...categoryList, res.data]);
					setMessages([localization[locale].categorySavedMessage]);
				})
				.catch(err => {
					setErrors([getErrorText(err, locale)]);
				});
		} else {
			categoryService.update(categ).then(res => {
				setCategoryList(categoryList.map(c => c.id === res.data.id ? res.data : c));
				setMessages([localization[locale].categorySavedMessage]);
			}).catch(err => {
				setErrors([getErrorText(err, locale)]);
			});
		}
	};

	const deleteCategory = () => {
		if (!idRef)
			return;

		const categId = parseInt(idRef.value);

		if (isNaN(categId)) {
			setErrors([localization[locale].categoryNotFoundMessage]);
			return;
		}

		categoryService.deleteById(categId).then(() => {
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
									elem.id!,
									elem.name!,
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
						<div className="col s12">
							<button className="btn btn-form" type="submit"><i
								className="material-icons left">save</i>{localization[locale].categorySaveButton}
							</button>
							<br/>
							<button onClick={deleteCategory} className="btn btn-form red accent-2"
							        type="button"><i
								className="material-icons left">delete</i>{localization[locale].categoryDeleteButton}
							</button>
							<br/>
							<button className="btn btn-form grey" type="reset">
								<i className="material-icons left">clear</i>{localization[locale].categoryResetButton}
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};
