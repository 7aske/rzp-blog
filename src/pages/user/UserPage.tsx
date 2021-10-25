import * as React from "react";
import { useState, useEffect, useReducer } from "react";
import { useParams, useHistory } from "react-router";
import { User, UserControllerApi, PostPreviewControllerApi, Contact } from "../../api/api";
import "./UserPage.scss";
import useLocale from "../../hooks/useLocale";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { PostPreviewList } from "../../components/postPreviewList/PostPreviewList";
import profile from "../../assets/img/team/profile.png";
import localization from "./localization";
import Moment from "react-moment";
import { environment } from "../../environment";
import { Head } from "../../components/meta/Head";

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
				return (<i className="material-icons left theme-green-text">public</i>);
			case "PHONE":
				return (<i className="material-icons left theme-green-text">local_phone</i>);
			case "ADDRESS":
				return (<i className="material-icons left theme-green-text">home</i>);
			case "EMAIL":
				return (<i className="material-icons left theme-green-text">email</i>);
			default:
				return (<i className="material-icons left theme-green-text">info_outline</i>);
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
			<Head title={user?.firstName + " " + user?.lastName} author={user?.displayName} description={user?.about} image={user?.profileImage??profile}/>
			<div className="container">
				<div className="row">
					<div className="col s12 l3">
						<div className="user-view image-container">
							<div className="row">
								<div className="col s6 l12">
									<div className="image-wrapper">
										<img alt="User profile" className="circle" src={user?.profileImage ? environment.backendUrl + "/" + user.profileImage : profile}
										     onError={ev => (ev.target as HTMLImageElement).src = profile}/>
									</div>
								</div>
								<div className="col s6 l12">
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
						{user?.username ?
							<PostList username={user?.username}/> : undefined}
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
	const initialState = {
		posts: [],
		username: props.username,
		loading: false,
		cantLoadMore: false,
		page: 0,
	};

	const reducer = (state: any, action: { type: string, value: any }) => {
		switch (action.type) {
			case "setPosts":
				console.log(action.value);
				return {...state, posts: [...state.posts, ...action.value]};
			case "setPage":
				return {...state, page: action.value};
			case "setLoading":
				return {...state, loading: action.value};
			case "setCantLoadMore":
				return {...state, cantLoadMore: action.value};
			case "setUsername":
				return {...state, username: action.value};
			case "reset":
				return initialState;
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const [locale] = useLocale();

	const loadPosts = () => {
		if (!props.username) return;
		if (state.loading || state.cantLoadMore) return;
		dispatch({type: "setLoading", value: true});

		const query = new QueryBuilder().eq("user.username", state.username).build();
		postPreviewApi.getAllPostPreviewsNotDeleted(state.page + ",2", query, "datePosted")
			.then(res => {
				if (res.data.length === 0) {
					dispatch({type: "setCantLoadMore", value: true});
				} else {
					dispatch({type: "setPage", value: state.page + 1});
					dispatch({type: "setPosts", value: res.data});
				}
			})
			.catch(console.error)
			.finally(() => dispatch({type: "setLoading", value: false}));
	};

	const loadMore = () => {
		loadPosts();
	};

	useEffect(() => {
		loadPosts();
		// eslint-disable-next-line
	}, [state.username])

	useEffect(() => {
		dispatch({type: "reset", value: undefined});
		// eslint-disable-next-line
	}, [props.username]);

	return (
		<div className="row posts-container">
			<h4 className="list-title theme-green-text">{localization[locale].latestPosts}</h4>
			<div className="col s12">
				<PostPreviewList posts={state.posts}/>
			</div>
			{state.loading ?
				<div className="progress">
					<div className="indeterminate"/>
				</div> : undefined}
			<div className="center">
				<button disabled={state.cantLoadMore} onClick={loadMore}
				        className="btn theme-green theme-white-text load-more">{localization[locale].loadMore}
				</button>
			</div>
		</div>
	);
};
