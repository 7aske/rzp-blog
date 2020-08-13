import * as React from "react";
import { useEffect, useState } from "react";
import "./MessageList.css";

type MessageListProps = {
	message: string[];
	timeout?: number;
	className?: string;
};

export const MessageList = (props: MessageListProps) => {
	const [messages, setMessages] = useState<string[]>([]);

	useEffect(() => {
		setMessages([...props.message]);
	}, [props.message]);

	const filterMessages = (err: string) => {
		setMessages(messages.filter(e => err !== e));
	};

	return (
		<ul className="collection message-list">
			{messages.map(err =>
				<MessageItem key={err} onRemove={filterMessages}
				             className={props.className}
				             timeout={props.timeout}
				             message={err}/>)}
		</ul>
	);
};

type MessageItemProps = {
	message: string;
	timeout?: number;
	className?: string;
	onRemove?: (error: string) => void
}
export const MessageItem = (props: MessageItemProps) => {
	const remove = () => {
		props.onRemove && props.onRemove(props.message);
	};
	useEffect(() => {
		if (props.timeout) {
			setTimeout(remove, props.timeout);
		}
		// eslint-disable-next-line
	}, []);
	return (<li className={`collection-item animate__animated animate__fadeIn animate__faster ${props.className ? props.className : "theme"}`}>{props.message}
		<i onClick={remove} className="material-icons right pointer">close</i>
	</li>);
};
