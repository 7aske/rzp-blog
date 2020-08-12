import * as React from "react";
import { AdminPostList } from "../../../../admin/adminPostList/AdminPostList";
import { Sidebar } from "../../../../components/sidebar/Sidebar";
import "./AdminPostsListPage.css";

type AdminPostsListPageProps = {};
export const AdminPostsListPage = (props: AdminPostsListPageProps) => {


	return (
		<div id="admin-post-list-page" className="white-text">
			<div className="row">
				<div className="col s12 m3 hide-on-med-and-down">
					<Sidebar/>
				</div>
				<div className="col s12 m9">
					<AdminPostList/>
				</div>
			</div>
		</div>
	);
};
