import * as React from "react";
import { useEffect, useState } from "react";
import GenericElement from "./GenericElement";

type GenericChipSelectProps = {
	id?: string;
	list: GenericElement<any>[];
	onUpdate?: (list: GenericElement<any>[]) => void;
	value?: any[];
	className?: string;
	create?: boolean;
	labelText?: string;
};
export const GenericChipSelect = (props: GenericChipSelectProps) => {
	const [chipRef, setChipRef] = useState<HTMLDivElement | null>();
	const [data, setData] = useState<GenericElement<any>[]>([]);

	useEffect(() => {
		if (props.value) {
			setData([...props.value]);
		}
	}, [props.value]);

	const onUpdate = (_data: GenericElement<any>[]) => {
		if (props.onUpdate) {
			props.onUpdate(_data);
		}
	};

	useEffect(() => {
		if (!chipRef) return;
		const autocompleteData = {};
		props.list.forEach(item => Object.assign(autocompleteData, {[item.name]: null}));
		const initialData: M.ChipData[] = [];
		data.forEach(item => initialData.push({tag: item.name}));
		M.Chips.init(chipRef, {
			onChipAdd: (element, chip) => {
				const val = chip.childNodes[0].nodeValue;
				const elem = props.list.find(e => e.filter(val));
				if (elem) {
					onUpdate([...data, elem]);
				}
			},
			onChipDelete: (element, chip) => {
				const val = chip.childNodes[0].nodeValue;
				const elem = props.list.find(e => e.filter(val));
				if (elem) {
					onUpdate(data.filter(e => e.name !== elem.name));
				}
			},
			data: initialData,
			autocompleteOptions: {
				data: autocompleteData,
				minLength: 0,
			},
		});
		// eslint-disable-next-line
	}, [chipRef, data, props.value, props.list]);


	return (
		<div className={props.className}>
			<label>
				{props.labelText ? props.labelText : ""}
				<div ref={elem => setChipRef(elem)} className="chips chips-autocomplete chips-placeholder"/>
			</label>
		</div>
	);
};
