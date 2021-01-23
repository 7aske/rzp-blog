import { Tag } from "./Tag";
import { Category } from "./Category";
import { User } from "./User";
import { Identifiable } from "./generic/Identifiable";
import { Auditable } from "./generic/Auditable";

export interface Post extends Identifiable, Auditable {
	title: string;
	excerpt: string;
	slug: string;
	body: string;
	published: boolean;
	category: Category;
	user: User;
	tags: Tag[];
	views: number;
}
