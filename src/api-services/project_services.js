import Axios from 'axios';

const END_POINT = "http://collaborate.deploy:8080/api/project";

export default
{
	index(id)
	{
		return Axios.get(`${END_POINT}/${id}`);
	}
}