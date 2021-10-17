import * as React from "react";
import { useRef, useEffect } from "react";
import { Contact } from "../../../../../api/api";
import localization from "./localization";
import useLocale from "../../../../../hooks/useLocale";

type ContactInputProps = {
	contact: Contact;
	index: number;
	types: string[];
	onUpdate: (c: Contact, index: number) => void
	onDelete: (index: number) => void
};

export const ContactInput = (props: ContactInputProps) => {
	const hash = useRef(btoa(Math.random() + "").replace(/=+/, ""));
	const selectRef = useRef<HTMLSelectElement | null>(null);
	const [locale] = useLocale();

	useEffect(() => {
		if (selectRef.current) {
			M.FormSelect.init(selectRef.current, {});
		}
		M.updateTextFields();
		// eslint-disable-next-line
	}, [props.contact, selectRef.current, locale]);

	return (
		<div className="row">
			<div className="input-field col s4 l4">
				<select ref={selectRef} id={hash.current + "-type"} value={props.contact.contactType}
				        onChange={ev => props.onUpdate({
					        ...props.contact,
					        contactType: ev.target.value,
				        }, props.index)}>
					{props.types.map(value => <option key={value} value={value}>{localization[locale][value]}</option>)}
				</select>
				<label>{localization[locale].type}</label>
			</div>
			<div className="input-field col s6 l6">
				<input placeholder={localization[locale].value} id={hash.current + "-value"} type="text" value={props.contact.value}
				       onChange={ev => props.onUpdate({
					       ...props.contact,
					       value: ev.target.value,
				       }, props.index)}/>
				<label htmlFor={hash.current + "-value"}>{localization[locale].value}</label>
			</div>
			<div className="col s2 l2" style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-around", height:"6em"}}>
				<button onClick={() => props.onDelete(props.index)} className="btn btn-floating red accent-2"><i className="material-icons">delete_sweep</i>
				</button>
			</div>
		</div>
	);
};
