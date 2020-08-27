interface CategoryService {
	getAll: () => Promise<Category[]>,
	deleteById: (idCategory: number) => Promise<boolean>,
	save: (_category: Category) => Promise<Category>,
	update: (_category: Category) => Promise<Category>
	getStats: () => Promise<StatsDTO>
}
