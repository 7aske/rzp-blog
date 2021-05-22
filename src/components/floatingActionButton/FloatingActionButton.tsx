import * as React from "react";
import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";

type ToolbarProps = {
	icon: string;
	className?: string;
	onClick: (arg: any, ...args: any) => void,
	tooltip?: string;
}

type FloatingActionButtonProps = {
	onClick?: (ev?: React.MouseEvent) => void;
	className?: string;
	icon?: string;
	id?: string;
	toolbar?: ToolbarProps[];
};
export const FloatingActionButton = (props: FloatingActionButtonProps) => {
	const [floatButtonRef, setFloatButtonRef] = useState<HTMLDivElement | null>(null);
	useEffect(() => {
		if (floatButtonRef) M.FloatingActionButton.init(floatButtonRef, {hoverEnabled: false});
	}, [floatButtonRef]);
	return (
		<div id={props.id} ref={elem => setFloatButtonRef(elem)} className="fixed-action-btn">
			<ToolbarButton id="fab" className={props.className} onClick={props.onClick} icon={props.icon}/>
			<ul>
				{props.toolbar ? props.toolbar.map(tool =>
						<li key={tool.icon}  data-for={`toolbar-tooltip-${tool.icon}`} data-tip={tool.tooltip}>
							<ToolbarButton icon={tool.icon} onClick={tool.onClick} className={tool.className}/>
							{!!tool.tooltip ? <ReactTooltip id={`toolbar-tooltip-${tool.icon}`} effect="solid" place="left"/> : undefined}
						</li>)
					: ""}
			</ul>
		</div>
	);
};


type ToolbarButtonProps = {
	onClick?: (ev?: React.MouseEvent) => void;
	className?: string;
	icon?: string;
	id?: string;
};
const ToolbarButton = ({className, icon, onClick, id}: ToolbarButtonProps) => {
	return (
		<button id={id} onClick={onClick} className={className ? "btn-floating btn-large theme-green " + className : "btn-floating btn-large"}>
			<i className="material-icons">{icon ? icon : ""}</i>
		</button>
	);
};
