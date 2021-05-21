import { MediaControllerApi, Media } from "../api/api";
import { AxiosResponse } from "axios";

export default class MediaService {
	private service = new MediaControllerApi();

	public getAll(page: number): Promise<AxiosResponse<Array<Media>>> {
		return this.service.getAllMedias(String(page));
	}

	public upload(form:FormData): Promise<AxiosResponse<Media>> {
		return this.service.uploadMedia(form.get("file"));
	}

	public deleteById(id: number): Promise<AxiosResponse<void>> {
		return this.service.deleteMediaById(id);
	}
}
