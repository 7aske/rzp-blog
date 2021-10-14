import * as React from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { User } from "../../api/api";

export const UserPage = () => {
	const [user, setUser] = useState<User>();
	const {username} = useParams();
	return (
		<div>

		</div>
	);
};
