import * as React from "react";
import "./Sidebar.css";

type SidebarProps = {
	items: JSX.Element[];
};
export const Sidebar = (props: SidebarProps) => {
	return (
		<div className="sidebar row">
			<div className="col s12">
				<ul className="collection hide-on-med-and-down">
					{props.items.map((item, i) => <li key={i} className="collection-item">{item}</li>)}
				</ul>
				<nav className="hide-on-large-only">
					<div className="nav-wrapper">
						<ul className="center">
							{props.items.map((item, i) => <li key={i} className="collection-item">{item}</li>)}
						</ul>
					</div>
				</nav>
			</div>
		</div>
	);
};
