import { useState, Dispatch, SetStateAction, useEffect } from "react";

type UseSearchProps = {
	key?: string,
}
export const useSearch = (props?: UseSearchProps): [string, Dispatch<SetStateAction<string>>] => {
	const storage: Storage = sessionStorage;
	const [search, setSearch] = useState(storage.getItem(props?.key!) ?? "");

	useEffect(() => {
		storage.setItem(props?.key!, search);
		// eslint-disable-next-line
	}, [search]);

	return [search, setSearch];
};

useSearch.defaultProps = {
	key: "search",
};
