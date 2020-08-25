import * as React from "react";

type MaterializeTextareaProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
	label?: string;
};
const MaterializeTextarea = (props: MaterializeTextareaProps) => {
	return (
		<div className={`input-field ${props.className}`}>
			<textarea ref={elem => elem && M.textareaAutoResize(elem)} className="materialize-textarea" value={props.value}
			          id={props.id} onChange={props.onChange}/>
			<label htmlFor={props.id}>{props.label}</label>
		</div>
	);
};

MaterializeTextarea.defaultProps = {
	label: "",
	onChange: () => {
	},
};
export default MaterializeTextarea;
