import * as React from "react";
import { Helmet } from "react-helmet";
import code from "../../assets/img/code.png"

type HeadProps = {
	title?: string
	description?: string;
	image?: string;
	author?: string;
};
export const Head = ({author, description, image, title, children}: React.PropsWithChildren<HeadProps>) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta property="og:title" content={title}/>
			<meta property="og:description" content={description??""}/>
			<meta property="og:image" content={image??code}/>
			<meta property="author" content={author}/>
			<meta property="title" content={title}/>
			<meta property="description" content={description??""}/>
			{children}
		</Helmet>
	);
};

Head.defaultProps = {
	title: process.env.REACT_APP_DEFAULT_TITLE
}
