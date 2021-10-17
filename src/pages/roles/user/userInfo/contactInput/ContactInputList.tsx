import * as React from "react";
import { useState, useEffect } from "react";
import { Contact, ContactControllerApi } from "../../../../../api/api";
import { ContactInput } from "./ContactInput";
import localization from "./localization";
import useLocale from "../../../../../hooks/useLocale";
import ReactTooltip from "react-tooltip";

const contactApi = new ContactControllerApi();

type ContactInputListProps = {
	contacts?: Contact[];
	onUpdate: (contacts: Contact[]) => void
};
export const ContactInputList = (props: ContactInputListProps) => {
	const [locale] = useLocale()
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [types, setTypes] = useState<string[]>([]);

	useEffect(() => {
		contactApi.getAllContactTypes()
			.then(data => setTypes(data.data as unknown as string[]));
	}, []);

	useEffect(() => {
		setContacts(props.contacts ?? []);
	}, [props.contacts]);

	useEffect(() => {
		props.onUpdate(contacts);
		// eslint-disable-next-line
	}, [contacts]);

	const addInput = () => {
		setContacts([...contacts, {contactType:types[0]}]);
	};

	const handleUpdate = (contact: Contact, index: number) => {
		const _contacts = [...contacts];
		_contacts[index] = contact;
		setContacts(_contacts);
	};

	const handleDelete = (index: number) => {
		const _contacts = [...contacts];
		_contacts.splice(index, 1);
		if (contacts[index].id) {
			contactApi.deleteContactById(contacts[index].id!)
				.then(void 0)
		}
		setContacts(_contacts);
	};

	return (
		<>
			<h4>{localization[locale].title}</h4>
			{contacts.map((c, i) => {
				return (<ContactInput key={i} types={types} contact={c} onUpdate={handleUpdate} onDelete={handleDelete} index={i}/>);
			})}
			<div>
				<button onClick={addInput} id="add-contact-button" className="btn-floating theme-green"><i className="material-icons">add</i>
				</button>
				<ReactTooltip id="add-contact-button" effect="solid" place="top" />
			</div>
		</>
	);
};
