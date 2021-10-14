import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Media } from "../../../api/api";
import MediaService from "../../../services/MediaService";
import { usePageable } from "../../../hooks/usePageable";
import { Preloader, Button, Icon } from "react-materialize";
import { Pagination } from "../../pagination/Pagination";
import useLocale from "../../../hooks/useLocale";
import { environment } from "../../../environment";
import ImageViewer from "react-simple-image-viewer";
import "./MediaView.scss";
import localization from "./localization";
import { humanFileSize } from "../../../utils/utils";
import Toast from "../../../utils/Toast";
import ReactTooltip from "react-tooltip";

const service = new MediaService();

export const MediaView = () => {
	const {page, perPage, setPage} = usePageable();
	const [locale] = useLocale();
	const pageCount = useRef(0);
	const [loading, setLoading] = useState(false);
	const [media, setMedia] = useState<Media[]>([]);
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const [currentImage, setCurrentImage] = useState(0);

	const getAll = () => {
		setLoading(true);
		service.getAll(page)
			.then(res => {
				pageCount.current = Math.ceil(parseInt(res.headers["x-data-count"], 10) / perPage);
				setMedia(res.data);
			})
			.catch(console.error)
			.finally(() => setLoading(false));
	};

	const openImageViewer = useCallback(index => {
		setCurrentImage(index);
		setIsViewerOpen(true);
	}, []);

	const closeImageViewer = () => {
		setCurrentImage(0);
		setIsViewerOpen(false);
	};

	useEffect(() => {
		getAll();
	}, [page]);

	return (
		<div id="media-view" className="list-page">
			{isViewerOpen && (
				<ImageViewer
					src={media.map(m => environment.backendUrl + "/" + m.uri)}
					currentIndex={currentImage}
					onClose={closeImageViewer}
					backgroundStyle={{
						backgroundColor: "rgba(0,0,0,0.9)",
					}}
				/>
			)}
			<nav>
				<div className="nav-wrapper">
					<ul className="right">
					</ul>
				</div>
			</nav>
			<Preloader active={loading}/>
			<ul className="collection">
				{media.map((m, i) => (
					<MediaViewListItem media={m} index={i} locale={locale} onDelete={() => getAll()} onOpen={openImageViewer}/>))}
			</ul>
			<Pagination className="right" onPageChange={setPage} pageCount={pageCount.current}/>
		</div>
	);
};

type MediaViewListItemProps = {
	media: Media;
	index: number;
	locale: string;
	onOpen: (index: number) => void
	onDelete: (index: number) => void
};
const MediaViewListItem = (props: MediaViewListItemProps) => {
	const [media, setMedia] = useState(props.media);

	useEffect(() => {
		setMedia(props.media);
	}, [props.media]);

	const handleDelete = () => {
		service.deleteById(props.media.id!)
			.then(() => {
				props.onDelete(props.index)
				Toast.showSuccess(localization[props.locale].deleteSuccess);
			})
			.catch(err => Toast.showError(err))
	}

	if (media)
		return (
			<li key={props.index} className="collection-item">
				<div className="row">
					<div className="col s12 l4">
						<img src={environment.backendUrl + "/" + media.uri}
						     onClick={() => props.onOpen(props.index)}
						     width="300"
						     style={{margin: "2px"}}
						     alt=""/>
						<br/>
					</div>
					<div className="col s12 l8">
						<table>
							<thead>
							<tr>
								<th>{localization[props.locale].size}</th>
								<th>{localization[props.locale].width}</th>
								<th>{localization[props.locale].height}</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td>{humanFileSize(media.size!)}</td>
								<td>{media.width}</td>
								<td>{media.height}</td>
							</tr>
							</tbody>
						</table>
						<table>
							<tbody>
							<tr>
								<td><a rel="noopener noreferrer" className="theme-green-text" target="_blank"
								       href={environment.backendUrl + "/" + media.uri}>{media.uri}</a>
									<Button data-for={`copy-tooltip-${props.media.id}`} data-tip={localization[props.locale].copy}
										onClick={() => {
										navigator.clipboard.writeText(environment.backendUrl + "/" + media.uri)
											.then(() => Toast.showSuccess(localization[props.locale].copySuccess));
									}} flat node="button">
										<Icon className="theme-green-light-text">content_copy</Icon>
									</Button>
									<ReactTooltip id={`copy-tooltip-${props.media.id}`} effect="solid" place="top" />
									<ReactTooltip id={`delete-tooltip-${props.media.id}`} effect="solid" place="top" />
								</td>
								<td>
									<Button data-for={`delete-tooltip-${props.media.id}`} data-tip={localization[props.locale].delete}
									        flat className="red-text text-accent-2 accent-2" onClick={handleDelete} node="button"><Icon>delete</Icon></Button>
								</td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>
			</li>
		);
	else
		return (<li className="admin-post-list-item collection-item"/>);

};
