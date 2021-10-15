import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router";
import { User, PostPreview, UserControllerApi, PostPreviewControllerApi, Contact } from "../../api/api";
import "./UserPage.scss";
import useLocale from "../../hooks/useLocale";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { PostPreviewList } from "../../components/postPreviewList/PostPreviewList";
import profile from "../../assets/img/team/profile.png";
import localization from "./localization";
import Moment from "react-moment";

const userApi = new UserControllerApi();
const postPreviewApi = new PostPreviewControllerApi();

export const UserPage = () => {
	const [user, setUser] = useState<User>();

	const {username} = useParams();

	const history = useHistory();

	const [locale] = useLocale();

	useEffect(() => {
		if (username) {
			userApi.getUserById(username)
				.then(res => setUser(res.data))
				.catch(() => history.goBack());
		}
		// eslint-disable-next-line
	}, [username]);

	const getIcon = (contact: Contact) => {
		switch (contact.contactType) {
			case "WEBSITE":
				return <i className="material-icons left theme-green-text">public</i>;
			case "PHONE":
				return <i className="material-icons left theme-green-text">local_phone</i>;
			case "ADDRESS":
				return <i className="material-icons left theme-green-text">home</i>;
			case "EMAIL":
				return <i className="material-icons left theme-green-text">email</i>;
			default:
				return <i className="material-icons left theme-green-text">info_outline</i>;
		}
	};

	const getURL = (value?: string): string => {
		if (!value) return "#";
		try {
			return new URL(value).href;
		} catch (e) {
			return new URL("http://" + value).href;
		}
	};

	const formatValue = (contact: Contact) => {
		switch (contact.contactType) {
			case "PHONE":
				return <a className="theme-green-light-text" href={"tel:" + contact.value}>{contact.value}</a>;
			case "EMAIL":
				return <a className="theme-green-light-text" href={"mail:" + contact.value}>{contact.value}</a>;
			case "ADDRESS":
				return <span className="theme-green-light-text">{contact.value}</span>;
			default:
				return <a rel="noreferrer noopener" target="_blank" className="theme-green-light-text"
				          href={getURL(contact.value)}>{contact.value}</a>;

		}
	};

	return (
		<div id="user-page">
			<div className="container">
				<div className="row">
					<div className="col s12 l3">
						<div className="user-view image-container">
							<div className="row">
								<div className="col s4 l12">
									<img alt="User profile" className="circle" src={profile}/>
								</div>
								<div className="col s8 l12">
									<span><h5 className="white-text name">{user?.displayName}</h5></span><br/>
									<span><h5 className="white-text name">{user?.firstName} {user?.lastName}</h5></span><br/>
									<p className="theme-white-text">{user?.about}</p>
									<span className="theme-grey-light-text">{localization[locale].joined} <Moment
										className="theme-grey-light-text" locale={locale}
										fromNow>{user?.createdDate}</Moment></span>
								</div>
							</div>
						</div>
						<div>
							<ul className="collection">
								{user?.contacts?.map(contact => {
									return (
										<li className="collection-item">{getIcon(contact)} {formatValue(contact)}</li>
									);
								})}
							</ul>
						</div>
					</div>
					<div className="col s12 l9">
						<PostList username={user?.username}/>
					</div>
				</div>
			</div>
		</div>
	);
};


type PostListProps = {
	username?: string;
};
const PostList = (props: PostListProps) => {
	const [posts, setPosts] = useState<PostPreview[]>([]);
	const [loading, setLoading] = useState(false);
	const [cantLoadMore, setCantLoadMore] = useState(false);
	const page = useRef(0);
	const [locale] = useLocale();

	const loadPosts = () => {
		if (!props.username) return;
		if (loading || cantLoadMore) return;
		setLoading(true);
		const query = new QueryBuilder().eq("user.username", props.username).build();
		postPreviewApi.getAllPostPreviews(page.current + ",2", "datePosted", query)
			.then(res => {
				if (res.data.length === 0) {
					console.log("cant load more");
					setCantLoadMore(true);
				} else {
					page.current = page.current + 1;
					setPosts([...posts, ...res.data]);
				}
			})
			.catch(console.error)
			.finally(() => setLoading(false));
	};

	const loadMore = () => {
		console.log(loading, cantLoadMore);
		loadPosts();
	};

	useEffect(() => {
		loadPosts();
		// eslint-disable-next-line
	}, [props.username]);

	return (
		<div className="row posts-container">
			<h4 className="list-title theme-green-text">{localization[locale].latestPosts}</h4>
			<div className="col s12">
				<PostPreviewList posts={posts}/>
			</div>
			{loading ?
				<div className="progress">
					<div className="indeterminate"/>
				</div> : undefined}
			<div className="center">
				<button disabled={cantLoadMore} onClick={loadMore}
				        className="btn theme-green theme-white-text load-more">{localization[locale].loadMore}
				</button>
			</div>
		</div>
	);
};
