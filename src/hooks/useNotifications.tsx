import { useState, useEffect } from "react";
import { Notification, UserControllerApi } from "../api/api";
import { usePageable } from "./usePageable";

const notificationApi = new UserControllerApi();
type UseNotificationsProps = {
	variant?: "ALL" | "UNREAD"
}
export const useNotifications = (props?: UseNotificationsProps) => {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [hasMore, setHasMore] = useState(true);
	const {page, setPage} = usePageable();

	// eslint-disable-next-line
	useEffect(() => void updateNotifications(), [page])

	const updateNotifications = () =>
		notificationApi.getNotificationsForUser(props && props.variant === "ALL", page+",5")
			.then(res => {
				if (res.data.length === 0) {
					setHasMore(false);
				} else {
					setNotifications([...notifications, ...res.data])
				}
			});

	const loadMore = () => setPage(page + 1)

	return {notifications, loadMore, hasMore};
};
