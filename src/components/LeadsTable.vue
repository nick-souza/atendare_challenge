<template>
	<div class="table-responsive">
		<!-- -----TABLE----- -->
		<table class="table">
			<thead>
				<tr>
					<!-- <th scope="col">#Id</th> -->
					<th scope="col"></th>
					<th scope="col">Nome</th>
					<th scope="col">Email</th>
					<th scope="col">Telefone</th>
					<th scope="col">CPF</th>
					<th scope="col">Menu</th>
				</tr>
			</thead>
			<tbody>
				<!-- Looping through the leads array and printing each in a td: -->
				<tr v-for="lead in leads" :key="lead.id">
					<td style="width: 50px"><img :src="lead.image" /></td>
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

					<!-- Button to show the details: -->
					<td>
						<button href="#" type="button" @click="showId(lead)" class="btn btn-dark btn-sm"><i class="bi bi-pencil"></i> Detalhes</button>
					</td>
				</tr>
			</tbody>
		</table>
		<!-- -----TABLE----- -->

		<!-- -----PAGINATION BUTTONS----- -->
		<ul class="pagination pagination-md justify-content-center text-center">
			<!-- Adding the class "disabled" if is the first page: -->
			<li class="page-item" :class="pageIndex === 0 ? 'disabled' : ''">
				<!-- Calling the pageDown method on click: -->
				<button class="page-link" @click="pageDown()">Próxima</button>
			</li>
			<li class="page-link" style="background-color: inherit">{{ this.pageIndex + 1 }} of {{ this.totalPages }}</li>

			<!-- Adding the class "disabled" if is the last page: -->
			<li class="page-item" :class="pageIndex === this.totalPages - 1 ? 'disabled' : ''">
				<!-- Calling the pageUp method on click: -->
				<button class="page-link" @click="pageUp()">Anterior</button>
			</li>
		</ul>
		<!-- -----PAGINATION BUTTONS----- -->
	</div>
</template>

<script>
import LeadService from "../services/LeadService";

export default {
	name: "LeadsTable",
	data() {
		return {
			//Store all the leads:
			leads: [],

			//Pagination:
			pageIndex: 0,
			totalPages: 0,
			pageSize: 10,
		};
	},
	methods: {
		//Get method form the Service:
		getLeads() {
			LeadService.getLeads(this.pageIndex, this.pageSize)
				.then((response) => {
					console.log(response.data);
					//Get the page index
					this.pageIndex = response.data.pageIndex;
					//Calculate the total pages rounding it up using Math.ceil:
					this.totalPages = Math.ceil(response.data.count / response.data.pageSize);
					//Store the results in the array
					this.leads = response.data.results;
				})
				.catch(() => {
					console.log("error");
				});
		},
		showId(lead) {
			console.log(lead.id);
		},

		//Pagination Methods:
		pageUp() {
			if (this.pageIndex < this.totalPages - 1) {
				//Adding to the page index:
				this.pageIndex = this.pageIndex + 1;
				//Reloading the table:
				this.getLeads();
			}
		},
		pageDown() {
			if (this.pageIndex < this.totalPages && this.pageIndex > 0) {
				//Subtracting from the page index:
				this.pageIndex = this.pageIndex - 1;
				//Reloading the table:
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

<style scoped>
/* Resizing the imgs: */
.table > tbody > tr > td img {
	width: 22px;
}
</style>
