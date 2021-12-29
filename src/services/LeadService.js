import axios from "axios";

//Using LocalHost because I set the proxy in the vue.config.js to get rid of the CORS error:
// const BASE_URL = "http://localhost:8080/lead";
const BASE_URL = "https://api.atendare.com/v1/lead";

//Token:
const TOKEN = "fErAbPBLKVvl9IIL5Bk2ZE8X7tZ78xNKPm6MFi6orF0LqWgx85ou8QvBeZBmucMrhl3Sj2fUc2JUJTghNb8BJxk7W4HLHqyPYIDF";

// Service Class:
class LeadService {
	//Get Method:
	getLeads(pageIndex, pageSize) {
		return axios.get(`${BASE_URL}?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
			//prettier-ignore
			//For some reason prettier messes up the header code block, so I'm disabling it;
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"token": `${TOKEN}`,
			},
		});
	}
	//Get By Id Method:
	getLeadById(id) {
		return axios.get(`${BASE_URL}/${id}`, {
			//prettier-ignore
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"token": `${TOKEN}`,
			},
		});
	}
	//Post Method:
	createLead(fullName, phone, email, cpf) {
		return axios.post(
			BASE_URL,
			{
				name: fullName,
				phone: phone,
				email: email,
				cpf: cpf,
			},
			{
				//prettier-ignore
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"token": `${TOKEN}`,
		},
			}
		);
	}
	//Put Method:
	editLead(id, fullName, phone, email, cpf, birthdate, gender) {
		return axios.put(
			`${BASE_URL}/${id}`,
			{
				name: fullName,
				phone: phone,
				email: email,
				cpf: cpf,
				gender: gender,
				birthdate: birthdate,
			},
			{
				//prettier-ignore
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"token": `${TOKEN}`,
			},
			}
		);
	}
	//Delete Method:
	deleteLead(id) {
		return axios.delete(`${BASE_URL}/${id}`, {
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
