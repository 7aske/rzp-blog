import * as M from "materialize-css";
import * as React from "react";
import { createRef, useEffect, useRef } from "react";
// @ts-ignore
import logo from "../../../assets/img/logo.png";
import "./Sidenav.scss";

type SidenavProps = {
	menuItems: JSX.Element[];
};

export const Sidenav = (props: SidenavProps) => {
	const sidenavRef = createRef<HTMLUListElement>();
	const sidenavInstance = useRef<M.Sidenav>();

	useEffect(() => {
		if (sidenavRef.current)
			sidenavInstance.current = M.Sidenav.init(sidenavRef.current, {draggable: true, edge: "right"});
	}, [sidenavRef]);

	return (
		<div>
			<ul ref={sidenavRef} id="sidenav" className="sidenav">
				<li>
					<div className="user-view">
						{/*eslint-disable-next-line*/}
						<a className="logo sidenav-close" href="#">
							<img src={logo} alt="Logo"/>
						</a>
						{/*eslint-disable-next-line*/}
						<a className="name">
							Company Name
						</a>
						<a className="email" href="mailto:company@gmail.com">
							company@gmail.com
						</a>
					</div>
				</li>
				{props.menuItems.map((item, i) => <li key={i}>{item}</li>)}
			</ul>
		</div>
	);
};
