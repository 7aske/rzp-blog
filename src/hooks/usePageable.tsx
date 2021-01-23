import React, { useState } from "react";

export const usePageable = () => {
	const perPage = 10;
	const [page, setPage] = useState(0);

	return {
		perPage,
		page,
		setPage
	}
}
