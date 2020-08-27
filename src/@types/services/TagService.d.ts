interface TagService {
	getAll: () => Promise<Tag[]>,
	deleteById: (idTag: number) => Promise<boolean>,
	save: (tag: Tag) => Promise<Tag>,
	update: (tag: Tag) => Promise<Tag>
	getStats: () => Promise<StatsDTO>
}
