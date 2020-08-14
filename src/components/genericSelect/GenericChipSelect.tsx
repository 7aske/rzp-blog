import * as React from "react";
import { useEffect, useState } from "react";
import GenericElement from "./GenericElement";

type GenericChipSelectProps = {
	id?: string;
	list: GenericElement<any>[];
	onUpdate?: (list: GenericElement<any>[]) => void;
	// onSelect?: (element?: GenericElement<any>) => void;
	value?: any[];
	create?: boolean;
	labelText?: string;
};
export const GenericChipSelect = (props: GenericChipSelectProps) => {
	const [chipRef, setChipRef] = useState<HTMLDivElement | null>();
	const [chipInstance, setChipInstance] = useState<M.Chips>();
	const [data, setData] = useState<GenericElement<any>[]>([]);

	useEffect(() => {
		// setData(props.list);
		console.log("props", props.list);
	}, [props.list]);

	useEffect(() => {
		if (props.value) {
			setData([...props.value]);
		}
	}, [props.value]);

	// useEffect(() => {
	// 	onUpdate();
	// }, [data]);

	const onUpdate = (_data: GenericElement<any>[]) => {
		if (props.onUpdate) {
			props.onUpdate(_data);
		}
	};

	useEffect(() => {
		if (chipRef) {
			const autocompleteData = {};
			props.list.forEach(item => Object.assign(autocompleteData, {[item.name]: null}));
			const initialData: M.ChipData[] = [];
			data.forEach(item => initialData.push({tag: item.name}));
			const instance = M.Chips.init(chipRef, {
				onChipAdd: (element, chip) => {
					const val = chip.childNodes[0].nodeValue;
					const elem = props.list.find(e => e.filter(val));
					if (elem) {
						onUpdate([...data, elem]);
					}
				},
				onChipDelete: (element, chip) => {
					console.log(chip);
				},
				data: initialData,
				autocompleteOptions: {
					data: autocompleteData,
				},
			});
			setChipInstance(instance);
		}
	}, [chipRef, data, props.value, props.list]);


	return (
		<label>
			{props.labelText ? props.labelText : ""}
		<div ref={elem => setChipRef(elem)} className="chips chips-autocomplete chips-placeholder"/>
		</label>
	);
};
