import { Identifiable } from "./generic/Identifiable";
import { Auditable } from "./generic/Auditable";

export interface Tag extends Identifiable, Auditable {
	name: string;
}
