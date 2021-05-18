import * as React from "react";
import { useEffect, useState } from "react";

type FloatingActionButtonProps = {
	onClick?: (ev?: React.MouseEvent) => void;
	className?: string;
	icon?: string;
	toolbar?: FloatingActionButtonProps[];
};
export const FloatingActionButton = (props: FloatingActionButtonProps) => {
	const [floatButtonRef, setFloatButtonRef] = useState<HTMLDivElement | null>(null);
	useEffect(() => {
		if (floatButtonRef) M.FloatingActionButton.init(floatButtonRef, {hoverEnabled: false});
	}, [floatButtonRef]);
	return (
		<div ref={elem => setFloatButtonRef(elem)} className="fixed-action-btn">
			<ToolbarButton className={props.className} onClick={props.onClick} icon={props.icon}/>
			<ul>
				{props.toolbar ? props.toolbar.map(tool =>
						<li key={tool.icon}><ToolbarButton icon={tool.icon} onClick={tool.onClick} className={tool.className}/></li>)
					: ""}
			</ul>
		</div>
	);
};


type ToolbarButtonProps = {
	onClick?: (ev?: React.MouseEvent) => void;
	className?: string;
	icon?: string;
};
const ToolbarButton = ({className, icon, onClick}: ToolbarButtonProps) => {
	return (
		<button onClick={onClick}
		        className={className ? "btn-floating btn-large theme-green " + className : "btn-floating btn-large"}>
			<i className="material-icons">{icon ? icon : ""}</i>
		</button>
	);
};
