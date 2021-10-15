import { MediaControllerApi, Media } from "../api/api";
import { AxiosResponse } from "axios";
import { QueryBuilder } from "../utils/QueryBuilder";

export default class MediaService {
	private service = new MediaControllerApi();

	public getAll(page: number): Promise<AxiosResponse<Array<Media>>> {
		return this.service.getAllMedias(String(page), new QueryBuilder().eq("type", "POST_IMAGE").build());
	}

	public upload(file: any): Promise<AxiosResponse<Media>> {
		return this.service.uploadMedia(file);
	}

	public deleteById(id: number): Promise<AxiosResponse<void>> {
		return this.service.deleteMediaById(id);
	}
}
