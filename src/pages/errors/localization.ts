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
	"user.update.username-invalid": string;
	"user.update.username-empty": string;
	"user.update.username-short": string;
	"user.update.user-exists": string;
	"user.update.displayname-invalid": string;
	"user.update.displayname-empty": string;
	"user.update.displayname-short": string;
	"user.update.firstname-invalid": string;
	"user.update.firstname-empty": string;
	"user.update.lastname-invalid": string;
	"user.update.lastname-empty": string;
	"user.update.email-invalid": string;
	"user.update.email-empty": string;
	"user.update.about-invalid": string;
	"user.update.address-invalid": string;
	"user.update.password-invalid": string;
	"user.update.password-empty": string;
	"user.update.password-not-matching": string;
	"email.validation.invalid": string;
	"password.validation.change.not-match": string;
	"password.validation.not-match": string;
	"password.validation.invalid": string;
	"password.invalid": string;
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
	"user.update.username-invalid": "Korisničko ime nije validno",
	"user.update.username-empty": "Korisničko ime nije validno",
	"user.update.username-short": "Korisničko ime mora biti duze od 5 karaktera",
	"user.update.user-exists": "Korisničko ime je već zauzeto",
	"user.update.displayname-invalid": "Ime nije validno",
	"user.update.displayname-empty": "Ime nije validno",
	"user.update.displayname-short": "Ime mora biti duže od 5 karatkera",
	"user.update.firstname-invalid": "Ime nije validno",
	"user.update.firstname-empty": "Ime nije validno",
	"user.update.lastname-invalid": "Prezime nije validno",
	"user.update.lastname-empty": "Prezime nije validno",
	"user.update.email-invalid": "Email nije validan",
	"user.update.email-empty": "Email nije validan",
	"user.update.about-invalid": "Opis nije validan",
	"user.update.address-invalid": "Adresa nije validna",
	"user.update.password-invalid": "Šifra mora da sadrži makar jedan broj, jedno veliko slovo, i jedno malo slovo",
	"user.update.password-empty": "Šifra mora da sadrži makar jedan broj, jedno veliko slovo, i jedno malo slovo",
	"user.update.password-not-matching": "Šifre se ne poklapaju",
	"email.validation.invalid": "Email nije validan",
	"password.invalid": "Šifra nije ispravna",
	"password.validation.change.not-match": "Šifre se ne poklapaju",
	"password.validation.invalid": "Šifra mora da sadrži makar jedan broj, jedno veliko slovo, i jedno malo slovo",
	"password.validation.not-match": "Šifre se ne poklapaju"
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
	"user.update.username-invalid": "Username is invalid",
	"user.update.username-empty": "Username is invalid",
	"user.update.username-short": "Username must be longer than 5 characters",
	"user.update.user-exists": "Username is already used",
	"user.update.displayname-invalid": "Display name is invalid",
	"user.update.displayname-empty": "Display name is invalid",
	"user.update.displayname-short": "Display name must be longer than 5 characters",
	"user.update.firstname-invalid": "First name is invalid",
	"user.update.firstname-empty":  "First name is invalid",
	"user.update.lastname-invalid": "Last name is invalid",
	"user.update.lastname-empty":  "Last name is invalid",
	"user.update.email-invalid": "Email is invalid",
	"user.update.email-empty":  "Email is invalid",
	"user.update.about-invalid": "About is invalid",
	"user.update.address-invalid": "Address is invalid",
	"user.update.password-invalid": "Password must at least contain one number, one uppercase letter and one lowercase letter",
	"user.update.password-empty":  "Password must at least contain one number, one uppercase letter and one lowercase letter",
	"user.update.password-not-matching": "Passwords do not match",
	"email.validation.invalid": "Email is invalid",
	"password.invalid": "Password is invalid",
	"password.validation.change.not-match": "Passwords do not match",
	"password.validation.invalid": "Password must at least contain one number, one uppercase letter and one lowercase letter",
	"password.validation.not-match": "Passwords do not match"
};

export const getErrorText = (error: any, locale: string) => {
	console.error(error);
	let errKey = "generic";
	if (error.response && error.response.data) {
		errKey = error.response.data.error
	}
	if (Object.keys(localization[locale]).indexOf(errKey) !== -1) {
		return localization[locale][errKey];
	} else {
		return localization[locale].generic;
	}
};

const localization: Localized<ErrorLocalizationStrings> = {en, sr};

export default localization;
