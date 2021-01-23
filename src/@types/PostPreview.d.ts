import { Tag } from "./Tag";
import { Identifiable } from "./generic/Identifiable";
import { Auditable } from "./generic/Auditable";
import { Category } from "./Category";
import { User } from "./User";

export interface PostPreview extends Identifiable, Auditable {
	title: string;
	excerpt: string;
	slug: string;
	category: Category;
	user: User;
	tags: Tag[];
	views: number;
}
