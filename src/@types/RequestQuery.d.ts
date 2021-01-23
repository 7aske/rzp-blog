export interface PageRequest {
	page?: number;
	count?: number;
}

export interface SearchCriteria {
	key: string;
	value: any;
	op: string;
}
