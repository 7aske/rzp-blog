import { PostRecordStatusEnum, PostPreviewRecordStatusEnum, UserRecordStatusEnum } from "../api/api";
import { Icon } from "react-materialize";
import React from "react";
import ReactTooltip from "react-tooltip";
import localization from "./localization";

export const getPostStatusIcon = (status: PostRecordStatusEnum | PostPreviewRecordStatusEnum, locale: string) => {
	const id = btoa(Math.random().toString());
	switch (status) {
		case PostRecordStatusEnum.Active:
			return <>
				<Icon data-for={id} data-tip={localization[locale].postStatusActive}>assignment</Icon>
				<ReactTooltip id={id} effect="solid" place="top"/>
			</>;
		case PostRecordStatusEnum.Deleted:
			return <>
				<Icon data-for={id} data-tip={localization[locale].postStatusDeleted}
				      className="red-text accent-2">close</Icon>
				<ReactTooltip id={id} effect="solid" place="top"/>
			</>;
		case PostRecordStatusEnum.None:
		case PostRecordStatusEnum.Expired:
		case PostRecordStatusEnum.Locked:
		default:
			return undefined;

	}
};

export const getUserStatusIcon = (status: UserRecordStatusEnum, locale: string) => {
	const id = btoa(Math.random().toString());
	switch (status) {
		case UserRecordStatusEnum.Active:
			return <>
				<Icon data-for={id} data-tip={localization[locale].userStatusActive}>check</Icon>
				<ReactTooltip id={id} effect="solid" place="top"/>
			</>;
		case UserRecordStatusEnum.Expired:
			return <>
				<Icon data-for={id} data-tip={localization[locale].userStatusExpired}
				      className="red-text accent-2">do_not_disturb_on</Icon>
				<ReactTooltip id={id} effect="solid" place="top"/>
			</>;
		case UserRecordStatusEnum.None:
		case UserRecordStatusEnum.Locked:
		case UserRecordStatusEnum.Deleted:
		default:
			return undefined;

	}
};
