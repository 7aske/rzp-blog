import * as React from "react";
import { ChangeEvent, useEffect, useState } from "react";

type MaterializeInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
	label?: string;
	inputClassName?: string;
};

const MaterializeInput = (props: MaterializeInputProps) => {

	useEffect(() => {
		M.updateTextFields();
	}, [props.value]);

	return (
		<div className={`input-field ${props.className}`}>
			<input disabled={props.disabled} autoFocus={props.autoFocus} hidden={props.hidden}
			       style={props.style} id={props.id} onChange={props.onChange} value={props.value}
			       onClick={props.onClick} checked={props.checked} className={props.inputClassName}
			       required={props.required} type={props.type}/>
			<label htmlFor={props.id}>{props.label}</label>
		</div>
	);
};

MaterializeInput.defaultProps = {
	type: "text",
	label: "",
};

type MaterializeCheckboxProps =
	React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
	& {
	label?: string;
	value?: string | boolean;
	inputClassName?: string;
};
export const MaterializeCheckbox = (props: MaterializeCheckboxProps) => {
	const [val, setVal] = useState<boolean>(props.value === "true");

	useEffect(() => {
		setVal(props.value === "true");
	}, [props.value]);

	const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
		const newVal = !val;
		ev.target.value = newVal + "";

		if (props.onChange) {
			props.onChange(ev);
		}

		setVal(newVal);
	};

	return (
		<div className={props.className}>
			<label>
				<input disabled={props.disabled} autoFocus={props.autoFocus} hidden={props.hidden}
				       style={props.style} id={props.id} onChange={onChange}
				       onClick={props.onClick} checked={val} className={"filled-in " + props.inputClassName}
				       required={props.required} type={props.type}/>
				<span>{props.label}</span>
			</label>
		</div>
	);
};


MaterializeCheckbox.defaultProps = {
	inputClassName: "",
	type: "checkbox",
	label: "",
};


export default MaterializeInput;
