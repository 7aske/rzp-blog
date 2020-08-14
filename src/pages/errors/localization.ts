type ErrorLocalizationStrings = {
	"generic": string;
	"auth.login.invalid-credentials": string;
	"post.save.post-not-found": string;
	"post.save.locale-invalid": string;
	"post.save.slug-empty": string;
	"post.save.slug-exists": string;
	"post.save.title-empty": string;
	"post.save.category-invalid": string;
	"post.save.category-not-found": string;
	"post.save.translations-invalid": string;
	"post.save.body-empty": string;
	"post.save.excerpt-empty": string;
	"tag.save.name-exists": string;
	"tag.save.name-invalid": string;
	"tag.save.tag-not-found": string;
	"category.save.name-invalid": string;
	"category.save.category-not-found": string;
	"role.save.name-invalid": string;
	"role.save.role-not-found": string;
	"comment.save.body-empty": string;
	"comment.save.post-not-found": string;
	"comment.save.user-invalid": string;
	"auth.token.expired": string;
	"auth.unauthorized": string;
	[key: string]: string;
}

const sr: ErrorLocalizationStrings = {
	"generic": "Došlo je do greške",
	"auth.login.invalid-credentials": "Pogrešni korisnički podaci",
	"post.save.post-not-found": "Post ne postoji",
	"post.save.locale-invalid": "Jezik nije validan",
	"post.save.slug-empty": "URL slug je prazan",
	"post.save.slug-exists": "URL slug već postoji",
	"post.save.title-empty": "Naslov je prazan",
	"post.save.category-invalid": "Kategorija nije validna",
	"post.save.category-not-found": "Kategorija nije nađena",
	"post.save.translations-invalid": "Nema sadržaja",
	"post.save.body-empty": "Tekst objave je prazan",
	"post.save.excerpt-empty": "Kratak sadrzaj je prazan",
	"tag.save.name-exists": "Tag veċ postoji",
	"tag.save.name-invalid": "Ime nije validno",
	"tag.save.tag-not-found": "Tag nije nađen",
	"category.save.name-invalid": "Ime nije validno",
	"category.save.category-not-found": "Kategorija nije nađena",
	"role.save.name-invalid": "Ime nije validno",
	"role.save.role-not-found": "Rola nije nađena",
	"comment.save.body-empty": "Tekst komentara je prazan",
	"comment.save.post-not-found": "Post nije nađen",
	"comment.save.user-invalid": "Korisnik nije validan",
	"auth.token.expired": "Sesija je istekla. Molimo ulogujte se",
	"auth.unauthorized": "Nije dozvoljeno. Molimo ulogujte se",
};

const en: ErrorLocalizationStrings = {
	"generic": "There was an error.",
	"auth.login.invalid-credentials": "Invalid credentials",
	"post.save.post-not-found": "Post not found",
	"post.save.locale-invalid": "Locale is invalid",
	"post.save.slug-empty": "URL slug is empty",
	"post.save.slug-exists": "URL slug already exists",
	"post.save.title-empty": "Title is empty",
	"post.save.category-invalid": "Category is invalid",
	"post.save.category-not-found": "Category not found",
	"post.save.translations-invalid": "No content",
	"post.save.body-empty": "Post body is empty",
	"post.save.excerpt-empty": "Post excerpt is empty",
	"tag.save.name-exists": "Tag already exists",
	"tag.save.name-invalid": "Name is invalid",
	"tag.save.tag-not-found": "Tag not found",
	"category.save.name-invalid": "Name is invalid",
	"category.save.category-not-found": "Category not found",
	"role.save.name-invalid": "Name is invalid",
	"role.save.role-not-found": "Role not found",
	"comment.save.body-empty": "Comment body is empty",
	"comment.save.post-not-found": "Post not found",
	"comment.save.user-invalid": "User is invalid",
	"auth.token.expired": "Session expired. Please log in",
	"auth.unauthorized": "Unauthorized. Please log in",
};

export const getErrorText = (error: string, locale: string) => {
	if (Object.keys(localization[locale]).indexOf(error) !== -1) {
		return localization[locale][error];
	} else {
		return localization[locale].generic;
	}
};

const localization: Localized<ErrorLocalizationStrings> = {en, sr};

export default localization;
