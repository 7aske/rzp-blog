import * as React from "react";
import { useNotifications } from "../../hooks/useNotifications";
import { Notification, NotificationControllerApi } from "../../api/api";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import useLocale from "../../hooks/useLocale";
import "./NotificationsPage.scss"
import { Button } from "react-materialize";
import localization from "./localization";

const notificationService = new NotificationControllerApi();
export const NotificationsPage = () => {
	const {notifications, loadMore, hasMore} = useNotifications({variant:"ALL"});
	const [locale] = useLocale();


	return (
		<div id="notifications" className="container">
			<ul className="collection">
				{notifications.length === 0 ? <h5 className="center theme-white-text">{localization[locale].noNotifications}</h5> : undefined}
				{notifications.map(notif => <NotificationItem notification={notif} locale={locale}/>)}
			</ul>
			<div className="row load-more-container">
				<Button className="load-more" flat disabled={!hasMore} onClick={loadMore}>{localization[locale].loadMore}</Button>
			</div>
		</div>
	);
};


type NotificationProps = {
	notification: Notification;
	locale: string;
}
const NotificationItem = ({notification, locale}: NotificationProps) => {

	const handleClick = () => {
		notificationService.markAsRead(notification.id!)
			.then(console.log);
	};

	return (
		<li className="collection-item">
			<Link onClick={handleClick} className="notification" to={notification.actionUrl ?? ""}
			      href={notification.actionUrl}>
				<i className="material-icons icon">{notification.read ? "notifications_none": "notifications"}</i>
				<h6 className="title">{notification.title}</h6>
				<p className="truncate body">{notification.body}</p>
				<Moment className="age" fromNow locale={locale}>{notification.createdDate}</Moment>
			</Link>
		</li>
	);
};
