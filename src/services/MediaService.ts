import { MediaControllerApi, Media } from "../api/api";
import { AxiosResponse } from "axios";
import { QueryBuilder } from "../utils/QueryBuilder";

export default class MediaService {
	private service = new MediaControllerApi();

	public getAll(page: number, queryParams: string[] = []): Promise<AxiosResponse<Array<Media>>> {
		const stringAttrs = ["keywords"];
		const builder = new QueryBuilder();
		stringAttrs.forEach(attr => queryParams.forEach(param => builder.like(attr, param).or()));
		return this.service.getAllMedias(String(page), builder.build());
	}

	public upload(type: "PROFILE_IMAGE" | "POST_IMAGE", file: any): Promise<AxiosResponse<Media>> {
		return this.service.uploadMedia(type, file);
	}

	public update(media: Media): Promise<AxiosResponse<Media>> {
		return this.service.updateMedia(media);
	}

	public deleteById(id: number): Promise<AxiosResponse<void>> {
		return this.service.deleteMediaById(id);
	}
}
