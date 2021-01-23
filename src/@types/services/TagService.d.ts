import { Tag } from "../Tag";

export interface ITagService {
	getAll: () => Promise<Tag[]>,
	deleteById: (id: number) => Promise<void>,
	save: (tag: Tag) => Promise<Tag>,
	update: (tag: Tag) => Promise<Tag>
}
