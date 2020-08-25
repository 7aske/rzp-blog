import * as React from "react";

type MaterializeTextareaProps =
	React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
	& {
	label?: string;
	inputClassName?: string;
};
const MaterializeTextarea = (props: MaterializeTextareaProps) => {
	return (
		<div className={`input-field ${props.className}`}>
			<textarea ref={elem => elem && M.textareaAutoResize(elem)}
			          className={`materialize-textarea ${props.inputClassName}`}
			          value={props.value}
			          id={props.id} onChange={props.onChange}/>
			<label htmlFor={props.id}>{props.label}</label>
		</div>
	);
};

MaterializeTextarea.defaultProps = {
	label: "",
};
export default MaterializeTextarea;
