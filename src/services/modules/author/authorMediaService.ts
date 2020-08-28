import { backendUrl } from "../../../globals";
import Console from "../../../utils/Console";
import { getClient } from "../../client/http";

const submodule = "author";

const mdeUpload = async (file: File): Promise<string> => {
	const client = getClient();
	const formData = new FormData();
	formData.append("image", file);
	const filePath = (await client.post(`${backendUrl}/${submodule}/media/mdeupload`,
		formData,
		{
			headers: {"Content-Type": "multipart/form-data"},
		},
	)).data.data.filePath;
	Console.log(filePath);
	return `${backendUrl}/${filePath}`;
};

const authorMediaService: MediaService = {
	mdeUpload,
};

export default authorMediaService;
