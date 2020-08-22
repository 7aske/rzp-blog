import * as React from "react";
import { UserEdit } from "../../components/roles/userEdit/UserEdit";

type RegisterPageProps = {};
export const RegisterPage = (props: RegisterPageProps) => {
	return (
		<div className="register-page">
			<UserEdit roles={[]}/>
		</div>
	);
};
