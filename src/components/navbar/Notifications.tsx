import * as React from "react";
import { useRef, useEffect, useState } from "react";
import { Dropdown } from "react-materialize";
import { UserControllerApi, Notification, NotificationControllerApi } from "../../api/api";
import "./Notification.scss";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import useLocale from "../../hooks/useLocale";

const userApi = new UserControllerApi();
const notificationService = new NotificationControllerApi();

type NotificationsProps = {};
export const Notifications = (props: NotificationsProps) => {
	const dropdownRef = useRef<HTMLAnchorElement | null>(null);
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [locale] = useLocale();

	useEffect(() => {
		getNotifications();
	}, []);

	const getNotifications = () => {
		userApi.getNotificationsForUser()
			.then(res => {
				setNotifications(res.data);
			});
	};

	useEffect(() => {
		if (dropdownRef.current)
			M.Dropdown.init(dropdownRef.current, {});
	}, [dropdownRef]);

	return (
		<>
			<Dropdown className="notifications collection" trigger={<a><i className="material-icons">{notifications.length === 0 ? "notifications_none": "notifications"}</i></a>}
			          options={{
				          constrainWidth: false,
				          coverTrigger: false,
				          closeOnClick: true,
				          hover: true,
				          alignment: "left",
				          container: <li className="collection-item"/>
			          }}>
				{notifications.map(notif => <NotificationItem notification={notif} locale={locale}/>)}
			</Dropdown>
		</>
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
	}

	return (
		<Link onClick={handleClick} className="notification" to={notification.actionUrl ?? ""} href={notification.actionUrl}>
			<i className="material-icons icon">notifications</i>
			<h6 className="title">{notification.title}</h6>
			<p className="truncate body">{notification.body}</p>
			<Moment className="age" fromNow locale={locale}>{notification.createdDate}</Moment>
		</Link>
	);
};
