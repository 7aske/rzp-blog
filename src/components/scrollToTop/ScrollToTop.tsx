import * as React from "react";
import { Button, Icon } from "react-materialize";
import { useEffect, useState } from "react";
import "./ScrollToTop.scss"
import { scrollToTop } from "../../utils/utils";

type ScrollToTipProps = {

};
export const ScrollToTop = (props: ScrollToTipProps) => {
	const [visible, setVisible] = useState("");
	const onScroll = () => {
		const {scrollY} = window;
		if (scrollY > 100) {
			setVisible("visible")
		} else {
			setVisible("")
		}
	};

	useEffect(() => {
		window.removeEventListener("scroll", onScroll);
		window.addEventListener("scroll", onScroll);
		// eslint-disable-next-line
	}, []);
	return (
		<Button onClick={scrollToTop} large className={`scroll-to-top theme-green ${visible}`} floating>
			<Icon>vertical_align_top</Icon>
		</Button>
	);
};
