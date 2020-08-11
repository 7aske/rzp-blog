import * as React from "react";

type ErrorListProps = {
	errors: string[];
};
export const ErrorList = (props: ErrorListProps) => {
	return (
		<ul className="collection">
			{props.errors.map((err, i) => <ErrorItem key={i} error={err}/>)}
		</ul>
	);
};

type ErrorItemProps = {
	error: string;
}
export const ErrorItem = (props: ErrorItemProps) => {
	return <li className="collection-item red accent-2 white-text animate__animated animate__fadeIn animate__faster">{props.error}</li>
}
