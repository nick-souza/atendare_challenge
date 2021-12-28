<template>
	<div class="container pt-4">
		<!-- TABLE -->
		<table class="table">
			<thead>
				<tr>
					<th scope="col">Nome</th>
					<th scope="col">Email</th>
					<th scope="col">Telefone</th>
					<th scope="col">CPF</th>
					<th scope="col">Menu</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="lead in leads" :key="lead.id">
					<td>
						{{ lead.name }}
					</td>
					<td>
						{{ lead.email }}
					</td>
					<td>
						{{ lead.phone }}
					</td>
					<td>
						{{ lead.cpf }}
					</td>
					<td>
						<button href="#" type="button" class="btn btn-dark btn-sm"><i class="bi bi-pencil"></i> Detalhes</button>
					</td>
				</tr>
			</tbody>
		</table>
		<!-- TABLE -->

		<!-- TABLE BUTTONS -->
		<ul class="pagination pagination-md justify-content-center text-center">
			<li class="page-item" :class="page === 0 ? 'disabled' : ''">
				<button class="page-link" @click="pageDown()">Próxima</button>
			</li>
			<li class="page-link" style="background-color: inherit">{{ this.page + 1 }} of {{ this.totalPages }}</li>
			<li class="page-item" :class="page === this.totalPages - 1 ? 'disabled' : ''">
				<button class="page-link" @click="pageUp()">Anterior</button>
			</li>
		</ul>
		<!-- TABLE BUTTONS -->
	</div>
</template>

<script>
import LeadService from "../services/LeadService";

export default {
	name: "HelloWorld",
	props: {
		msg: String,
	},
	data() {
		return {
			//Store all the leads:
			leads: [],

			//Pagination:
			page: 0,
			totalPages: 0,
		};
	},
	methods: {
		//Get method form the Service:
		getLeads() {
			LeadService.getLeads()
				.then((response) => {
					console.log(response.data);
					this.leads = response.data.results;
				})
				.catch(() => {
					console.log("error");
				});
		},

		//Pagination Methods:
		pageUp() {
			if (this.page < this.totalPages - 1) {
				this.page = this.page + 1;
				this.getLeads();
			}
		},
		pageDown() {
			if (this.page < this.totalPages && this.page > 0) {
				this.page = this.page - 1;
				this.getLeads();
			}
		},
	},
	created() {
		//Run get method on page load:
		this.getLeads();
	},
};
</script>

<style scoped></style>
