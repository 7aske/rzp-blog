import { backendUrl } from "../../../globals";
import Console from "../../../utils/Console";
import { getClient } from "../../client/http";

const submodule = "user";

const save = async (comment: CommentDTO): Promise<CommentDTO> => {
	const client = getClient();
	const _comment = (await client.post(`${backendUrl}/${submodule}/comment/save`, comment)).data
	Console.log(_comment);
	return _comment;
}

const userCommentService: UserCommentService = {
	save,
}

export default userCommentService;
