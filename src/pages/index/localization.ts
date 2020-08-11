type IndexPageLocalizationStrings = {
	title: string;
	text: string;
	[key: string]: string;
}

const sr: IndexPageLocalizationStrings = {
	title: "Blog",
	text: "RS - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid consequatur distinctio ducimus error eveniet facilis, fuga impedit iste maxime minus perspiciatis quam quas saepe tenetur ullam vitae, voluptas voluptate. Libero.",
};

const en: IndexPageLocalizationStrings = {
	title: "Blog",
	text: "EN - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid consequatur distinctio ducimus error eveniet facilis, fuga impedit iste maxime minus perspiciatis quam quas saepe tenetur ullam vitae, voluptas voluptate. Libero.",
};

const localization: Localized<IndexPageLocalizationStrings> = {en, sr};

export default localization;
