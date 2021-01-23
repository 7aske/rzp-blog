import { Identifiable } from "./generic/Identifiable";
import { Auditable } from "./generic/Auditable";

export interface Role extends Identifiable, Auditable {
	name: string;
}
