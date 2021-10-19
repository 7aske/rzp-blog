import * as React from "react";
import { useContext, ChangeEvent, useState, useRef, useEffect } from "react";
import { User } from "../../../../@types/User";
import MaterializeInput from "../../../../components/materialize/input/MaterializeInput";
import MaterializeTextarea from "../../../../components/materialize/textarea/MaterializeTextarea";
import { AppContext } from "../../../../context/AppContext";
import useLocale from "../../../../hooks/useLocale";
import UserService from "../../../../services/User.service";
import localization from "./localization";
import { ContactInputList } from "./contactInput/ContactInputList";
import { Contact } from "../../../../api/api";
import profile from "../../../../assets/img/team/profile.png";
import Toast from "../../../../utils/Toast";
import { environment } from "../../../../environment";
import "./UserInfo.scss";
import { Button, Icon } from "react-materialize";
import MediaService from "../../../../services/MediaService";


const service = new UserService();
const mediaApi = new MediaService();

export const UserInfoPage = () => {
	const {ctx} = useContext(AppContext);
	const [locale] = useLocale();
	const [user, setUser] = useState(ctx.user);
	const [image, setImage] = useState<File | null>(null);
	const imageRef = useRef<HTMLImageElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const updateProp = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setUser({...(user as User), [ev.target.id]: ev.target.value});
	};

	useEffect(() => {
		resetImage();
		// eslint-disable-next-line
	}, [imageRef]);

	const resetImage = () => {
		if (imageRef.current) {
			setImage(null);
			imageRef.current!.src = `${environment.backendUrl!}/${user?.profileImage}` as string;
			if (!imageRef.current!.src) {
				imageRef.current!.src = profile;
			}
		}
		if (inputRef.current) {
			inputRef.current!.value = "";
		}
	};

	const save = () => {
		(async function () {
			const _user: User = {...(user as User)};

			if (image) {
				try {
					const res = (await mediaApi.uploadProfileImage(image));
					const uploaded = res.data;
					_user.image = uploaded!;
				} catch (e) {
					if (e.response.status === 413) {
						Toast.showError("upload.file.too-large", locale);
					} else {
						Toast.showError("upload.failed", locale);
					}
				}
			}

			service.update(_user as any).then(data => {
				Toast.showSuccess(localization[locale].userSavedText)
				setUser(data.data as User);
			}).catch(err => {
				Toast.showError(err, locale);
			});
		})();
	};

	const handleContactsUpdate = (contacts: Contact[]) => {
		if (user) {
			user.contacts = contacts;
			setUser(user);
		}
	};

	return (
		<div id="user-info">
			<div className="row">
				<form onSubmit={ev => ev.preventDefault()} className="col s12 m12 l8">
					<div className="row">
						<div className="col m12 l4">
							<div className="user-profile-image-container">
								<Button onClick={resetImage} node="button" floating
								        className={"red accent-2 reset-button " + (image !== null ? "" : "hidden")}><Icon>clear</Icon></Button>
								<div className={"btn file-field theme-green " + (image === null ? "" : "hidden")}>
									<div className="">
										<span><i className="material-icons">file_upload</i></span>
										<input ref={inputRef} type="file" onChange={ev => {
											const reader = new FileReader();
											reader.onload = e => imageRef!.current!.src = e.target!.result as any;
											if (ev.target.files && ev.target.files[0] instanceof Blob) {
												reader.readAsDataURL(ev.target.files![0] as any);
												setImage(ev.target.files ? ev.target.files[0] : null);
											}
										}}/>
									</div>
									<div className="file-path-wrapper">
										<input className="file-path" type="text"/>
									</div>
								</div>
								<div className="user-profile-image-wrapper">
									<img ref={imageRef} alt="User profile preview"
									     onError={ev => (ev.target as HTMLImageElement).src = profile}/>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<MaterializeInput className="col s12 m12 l6" value={user?.username}
						                  id="username" type="text"
						                  onChange={updateProp} label={localization[locale].userUsernameLabel}/>
						<MaterializeInput className="col s12 m12 l6" value={user?.displayName}
						                  id="displayName" type="text"
						                  onChange={updateProp} label={localization[locale].userDisplayNameLabel}/>
					</div>
					<div className="row">
						<MaterializeInput className="col s12 m12" value={user?.email}
						                  id="email" type="text"
						                  onChange={updateProp} label={localization[locale].userEmailLabel}/>
					</div>
					<div className="row">
						<MaterializeInput className="col s12 m12 l6" value={user?.firstName}
						                  id="firstName" type="text"
						                  onChange={updateProp} label={localization[locale].userFirstNameLabel}/>
						<MaterializeInput className="col s12 m12 l6" value={user?.lastName}
						                  id="lastName" type="text"
						                  onChange={updateProp} label={localization[locale].userLastNameLabel}/>
					</div>
					<div className="row">
						<MaterializeTextarea
							className="col s12 m12 l12"
							value={user?.about}
							id="about"
							onChange={updateProp}
							label={localization[locale].userAboutLabel}/>
					</div>
					<div className="row">
						<div className="col s12">
							<ContactInputList contacts={user?.contacts} onUpdate={handleContactsUpdate}/>
						</div>
					</div>
					<div className="row">
						<div className="col s12">
							<button onClick={save} className="btn theme-green"
							        name="action">{localization[locale].saveUserButton}
								<i className="material-icons right">send</i>
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
