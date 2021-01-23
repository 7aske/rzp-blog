import { PostPreview } from "../PostPreview";
import { PageRequest } from "../RequestQuery";

export interface IPostPreviewService {
	getAll: (pageRequest: PageRequest, params?: PostQueryParams) => Promise<PostPreview[]>
}

