import "easymde/dist/easymde.min.css";
import marked from "marked";
import * as React from "react";
import { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import { MessageList } from "../../../messageList/MessageList";
import { backendUrl } from "../../../../globals";
import localization from "./localization";
import "./PostEditor.css";


type PostEditorProps = {
	id?: number;
	value?: string;
	locale?: string;
	onChange: (html: string) => void;
};
export const PostEditor = (props: PostEditorProps) => {
	const [messages, setMessages] = useState<string[]>([]);
	const locale = props.locale || "en";


	return (
		<div id="post-editor" className="markdown-container" key={props.id}>
			<MessageList className="red accent-2" messages={messages}/>
			<br/>
			<SimpleMDE onChange={props.onChange}
			           options={{
				           // autosave: {
					       //     enabled: true,
					       //     uniqueId: props.id ? props.id.toString() : "newPost",
					       //     delay: 1000,
					       //     submit_delay: 5000,
					       //     timeFormat: {
						   //         locale,
						   //         format: {
							//            hour: "2-digit",
							//            minute: "2-digit",
							//            second: "numeric",
						   //         },
					       //     },
					       //     text: localization[locale].autosaved,
				           // },
				           initialValue: props.value,
				           sideBySideFullscreen: true,
				           previewRender: function (plainText) {
					           return marked(plainText, {gfm: true}); // Returns HTML from a custom parser
				           },
				           uploadImage: true,
				           showIcons: ["strikethrough", "code", "table", "redo", "heading", "undo", "horizontal-rule"],
				           imageUploadEndpoint: `${backendUrl}/media/mdeupload`,
				           renderingConfig: {
					           codeSyntaxHighlighting: true,
					           markedOptions: {
						           gfm: true,
					           },
				           },
				           spellChecker: false,
				           errorMessages: {
					           fileTooLarge: localization[locale].fileTooLarge,
					           importError: localization[locale].importError,
					           noFileGiven: localization[locale].noFileGiven,
					           typeNotAllowed: localization[locale].typeNotAllowed,
				           },
				           errorCallback: (err) => setMessages([err]),
				           status: ["autosave", "cursor"],

			           }}/>
		</div>
	);
};
