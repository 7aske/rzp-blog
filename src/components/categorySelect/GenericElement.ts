class GenericElement<T> {
	private readonly _element: T;
	private readonly _id: number;
	private readonly _name: string

	constructor(element: T, id: number, name: string) {
		this._element = element;
		this._id = id;
		this._name = name;
	}

	get element(){
		return this._element;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	public filter(other: any) {
		return this.name === other || this.id === other;
	}

}

export default GenericElement;
