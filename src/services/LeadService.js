import axios from "axios";

//Using LocalHost because I set the proxy in the vue.config.js to get rid of the CORS error:
const BASE_URL = "http://localhost:8080/lead";

//Token:
const TOKEN = "fErAbPBLKVvl9IIL5Bk2ZE8X7tZ78xNKPm6MFi6orF0LqWgx85ou8QvBeZBmucMrhl3Sj2fUc2JUJTghNb8BJxk7W4HLHqyPYIDF";

// Service Class:
class LeadService {
	//Get Method:
	getLeads() {
		// return axios.get(`${BASE_URL}?pageIndex=${pageIndex}&pageSize=${pageSize}`);
		return axios.get(`${BASE_URL}?pageIndex=0&pageSize=15`, {
			//prettier-ignore
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"token": `${TOKEN}`,
			},
		});
	}
}

//Exporting the class:
export default new LeadService();
