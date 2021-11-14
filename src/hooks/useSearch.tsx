import { useState, Dispatch, SetStateAction, useEffect } from "react";

export const useSearch = (): [string, Dispatch<SetStateAction<string>>] => {
	const [search, setSearch] = useState(localStorage.getItem("search") ?? "");

	useEffect(() => {
		localStorage.setItem("search", search);
	}, [search]);

	const setSearchWrapper: Dispatch<SetStateAction<string>> = (value: SetStateAction<string>) => {
		setSearch(value);
	};

	return [search, setSearchWrapper];
};
