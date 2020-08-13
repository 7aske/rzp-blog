import * as React from "react";
import { createRef, useEffect, useRef, useState } from "react";
import { MessageList } from "../../../../components/messageList/MessageList";
import useLocale from "../../../../hooks/useLocale";
import adminCategoryService from "../../../../services/adminCategoryService";
import "./AdminCategoryList.css";
import localization from "./localization";

type AdminCategoryListProps = {};
export const AdminCategoryList = (props: AdminCategoryListProps) => {
	const [categoryList, setCategoryList] = useState<Category[]>([]);
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
				{dropdownOptions: {closeOnClick: true, onCloseEnd: () => setCategory()}});
		}
		M.updateTextFields();
		// eslint-disable-next-line
	}, [categoryList, errors]);

	const getCategories = () => {
		adminCategoryService.getAll().then(_categories => {
			setCategoryList(_categories);
		}).catch(err => {
			console.error(err);
			setCategoryList([]);
		});
	};

	const setCategory = () => {
		if (idInput.current && nameInput.current && selectRef.current) {
			const categ = categoryList.find(categ => categ.idCategory === parseInt(selectRef.current!.value));
			if (!categ) {
				idInput.current.value = "";
				nameInput.current.value = "";
			} else {
				idInput.current.value = categ.idCategory.toString();
				nameInput.current.value = categ.categoryName;
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
			console.error(err);
			if (err.response && err.response.data) {
				setErrors([err.response.data.error]);
			}
		});
	};

	const deleteCategory = () => {
		if (!idInput.current)
			return;

		const categId = parseInt(idInput.current.value);

		if (isNaN(categId)) {
			setErrors([localization[locale].categoryNotFoundMessage]);
			return;
		}

		adminCategoryService.deleteById(categId).then(() => {
			getCategories();
			setMessages([localization[locale].categoryDeletedMessage]);
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
		<div id="admin-category-list">
				<form onSubmit={saveCategory}>
					<div className="row">
						<div className="input-field col s12 m8 l4">
							<select id="categorySelect" ref={selectRef}>
								<option value="">{localization[locale].categoryNewOption}</option>
								{categoryList.map(categ => <option
									value={categ.idCategory}>{categ.categoryName}</option>)}
							</select>
							<label htmlFor="categorySelect">{localization[locale].categorySelectLabel}</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12 m8 l4">
							<input ref={idInput} id="idCategory" name="idCategory" type="text" disabled={true}/>
							<label htmlFor="idCategory">ID</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12 m8 l4">
							<input ref={nameInput} id="categoryName" name="categoryName" type="text"/>
							<label htmlFor="categoryName">{localization[locale].categoryNameLabel}</label>
						</div>
					</div>
					<div className="row">
						<div className="col s12">
							<MessageList className="red accent-2 white-text" timeout={3000} message={errors}/>
							<MessageList className="green accent-2 white-text" timeout={3000} message={messages}/>
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
