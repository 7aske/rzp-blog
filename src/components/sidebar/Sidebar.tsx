import * as React from "react";
import "./Sidebar.css";

type SidebarProps = {
	items: JSX.Element[];
};
export const Sidebar = (props: SidebarProps) => {
	return (
		<div className="sidebar row">
			<div className="col s12">
				<ul className="collection">
					{props.items.map(item => <li className="collection-item">{item}</li>)}
				</ul>
			</div>
		</div>
	);
};
