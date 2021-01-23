import { Identifiable } from "./generic/Identifiable";
import { Auditable } from "./generic/Auditable";

export interface Category extends Identifiable, Auditable {
	name: string;
}
