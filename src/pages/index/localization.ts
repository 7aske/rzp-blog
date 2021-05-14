type IndexPageLocalizationStrings = {
	title: string;
	text: string;
	search: string;
	noPosts: string;
	[key: string]: string;
}

const sr: IndexPageLocalizationStrings = {
	title: "Blog",
	text: "RS - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid consequatur distinctio ducimus error eveniet facilis, fuga impedit iste maxime minus perspiciatis quam quas saepe tenetur ullam vitae, voluptas voluptate. Libero.",
	search: "Pretraga",
	noPosts: "Nema objava",
};

const en: IndexPageLocalizationStrings = {
	title: "Blog",
	text: "EN - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid consequatur distinctio ducimus error eveniet facilis, fuga impedit iste maxime minus perspiciatis quam quas saepe tenetur ullam vitae, voluptas voluptate. Libero.",
	search: "Search",
	noPosts: "No posts",
};

const localization: Localized<IndexPageLocalizationStrings> = {en, sr};

export default localization;
