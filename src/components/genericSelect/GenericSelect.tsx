import * as React from "react";
import { createRef, useEffect, useRef } from "react";
import GenericElement from "./GenericElement";

type GenericSelectProps = {
	id?: string;
	list: GenericElement<any>[];
	onUpdate?: (list: GenericElement<any>[]) => void;
	onSelect?: (element?: GenericElement<any>) => void;
	value?: any;
	create?: boolean;
	newOptionText?: string;
	labelText?: string;
};
export const GenericSelect = (props: GenericSelectProps) => {
	const selectInstance = useRef<M.FormSelect>();
	const selectRef = createRef<HTMLSelectElement>();


	useEffect(() => {
		if (selectRef.current) {
			selectInstance.current = M.FormSelect.init(selectRef.current,
				{dropdownOptions: {closeOnClick: true, onCloseEnd: selectElement}});
		}
		M.updateTextFields();
		props.onUpdate && props.onUpdate(props.list);
		// eslint-disable-next-line
	}, [props.list, props.value]);

	const selectElement = () => {
		if (selectInstance.current) {
			const categName = selectInstance.current.input.value;
			const categ = props.list.find(elem => elem.filter(categName));
			props.onSelect && props.onSelect(categ);
		}
	};

	return (
		<div className="input-field">
			<select value={props.value} id={props.id} ref={selectRef}>
				{!!props.create ? <option value="">{props.newOptionText}</option> : ""}
				{props.list.map(elem =>
					<option key={elem.id}
					        value={elem.id}>{elem.name}</option>)}
			</select>
			<label htmlFor={props.id}>{props.labelText}</label>
		</div>
	);
};

