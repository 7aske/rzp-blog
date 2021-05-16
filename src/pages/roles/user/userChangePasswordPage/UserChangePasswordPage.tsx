import * as React from "react";
import { PasswordChangeInput } from "../../../../components/propertyUpdateInput/PasswordChangeInput";
import useLocale from "../../../../hooks/useLocale";
import localization from "./localization";

export const UserChangePasswordPage = () => {
	const [locale] = useLocale();
	return (
		<div className="container">
			<div className="row">
				<h4 className="theme-white-text">{localization[locale].changePasswordText}</h4>
				<p className="theme-white-text flow-text">{localization[locale].changePasswordHint}</p>
				<div className="col s12 m12 l8">
					<PasswordChangeInput/>
				</div>
			</div>
		</div>
	);
};
