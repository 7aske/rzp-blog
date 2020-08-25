import * as React from "react";
import { useEffect } from "react";

type MaterializeInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
	label?: string;
	inputClassName?: string;
};

const MaterializeInput = (props: MaterializeInputProps) => {

	useEffect(() => {
		M.updateTextFields();

		console.log(props.id, props.value);
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

export default MaterializeInput;
