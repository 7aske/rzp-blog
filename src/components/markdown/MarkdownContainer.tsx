import marked from "marked";
import * as React from "react";
import "./MarkdownContainer.css"

type MarkdownContainerProps = {
	content: string;
};
export const MarkdownContainer = (props: MarkdownContainerProps) => {
	return (
		<div className="markdown-container" dangerouslySetInnerHTML={{__html:marked(props.content)}}/>
	);
};
