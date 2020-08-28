import { AutocompleteData } from "materialize-css";
import * as React from "react";
import { useEffect, useState } from "react";

type GenericAutocompleteProps = {
	id?: string;
	// onChange?: (ev: ChangeEvent<HTMLInputElement>) => void
	onUpdate?: (value: string) => void
	type?: string;
	value?: any;
	create?: boolean;
	newOptionText?: string;
	label?: string;
	className?: string;
	inputClassName?: string;
	icon?: string;
	autocompleteData?: string[];
};
export const GenericAutocomplete = (props: GenericAutocompleteProps) => {
	const [ref, setRef] = useState<HTMLElement | null>(null);
	const [value, setValue] = useState<string>("");
	const [instance, setInstance] = useState<M.Autocomplete | null>(null);

	const getAutocompleteData = (data: string[]) => {
		const autocompleteData: AutocompleteData = {};
		data.forEach(d => {
			Object.assign(autocompleteData, {[d]: null});
		});
		return autocompleteData;
	};

	useEffect(() => {
		const data = getAutocompleteData(props.autocompleteData!);
		if (instance) instance.updateData(data);
	}, [props.autocompleteData, instance]);

	useEffect(() => {
		if (ref) {
			let data = {};
			if (props.autocompleteData) {
				data = getAutocompleteData(props.autocompleteData);
			}
			const inst = M.Autocomplete.init(ref, {
				data,
				onAutocomplete: onUpdate,
				minLength: 0,
			});
			setInstance(inst);
		}

		// eslint-disable-next-line
	}, [ref]);

	const onUpdate = (val: string) => {
		setValue(val);
	};


	useEffect(() => {
		props.onUpdate && props.onUpdate(value);
		M.updateTextFields();
		// eslint-disable-next-line
	}, [value]);

	useEffect(() => {
		setValue(props.value);
	}, [props.value]);

	return (
		<div className={`input-field ${props.className}`}>
			{props.icon ? <i className="material-icons prefix">{props.icon}</i> : ""}
			<input ref={elem => setRef(elem)} type={props.type}
			       onChange={ev => setValue(ev.target.value)}
			       id={props.id} className={`autocomplete ${props.inputClassName}`} value={value}/>
			<label htmlFor={props.id}>{props.label}</label>
		</div>
	);
};

GenericAutocomplete.defaultProps = {
	className: "",
	inputClassName: "",
	type: "text",
	label: "",
	value: "",
	autocompleteData: [],
};
