<template>
	<!-- DELETE LEAD MODAL -->
	<div
		class="modal fade"
		id="deleteLead"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		tabindex="-1"
		aria-labelledby="staticBackdropLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticBackdropLabel">Excluir Lead</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>

				<!-- Getting the lead name from the helper variable: -->
				<div class="modal-body">Tem certeza que deseja excluir {{ this.deletedLead.name }}?</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
					<!-- Button with the action to delete the lead: -->
					<button id="deleteLeadYes" @click="deleteLead(this.deletedLead)" data-bs-dismiss="modal" type="button" class="btn btn-primary btn-danger">
						Sim!
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- DELETE LEAD MODAL -->

	<!-- -----TABLE----- -->
	<div class="table-responsive">
		<table class="table">
			<thead>
				<tr>
					<!-- Empty TH for the profile pic: -->
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

					<!-- Button to show the details and delete: -->
					<td class="btns">
						<!-- Using the helper funtion to pass the lead data to the modal: -->
						<button @click="deleteLeadHelper(lead)" class="btn btn-dark btn-sm me-2" data-bs-toggle="modal" data-bs-target="#deleteLead">Excluir</button>

						<!-- Router link to redirect to the details page passing in the lead id: -->
						<router-link :to="{ name: 'Details', params: { id: lead.id } }" type="button" class="btn btn-dark btn-sm">Detalhes</router-link>
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

			<!-- Total Pages: -->
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
			//Storing all the leads from the API call:
			leads: [],

			//Pagination:
			pageIndex: 0,
			totalPages: 0,
			pageSize: 10,

			//Had some trouble passing the lead data to the delete modal, so created this variable to temporarily hold the value:
			deletedLead: [],
		};
	},

	methods: {
		//Get method from the Service:
		getLeads() {
			LeadService.getLeads(this.pageIndex, this.pageSize)
				.then((response) => {
					//Get the page index
					this.pageIndex = response.data.pageIndex;

					//Calculate the total pages rounding it up using Math.ceil:
					this.totalPages = Math.ceil(response.data.count / response.data.pageSize);

					//Store the results in the array
					this.leads = response.data.results;
				})
				.catch((error) => {
					console.log(error);
				});
		},

		//Helper function to change the value of the temp variable:
		deleteLeadHelper(lead) {
			this.deletedLead = lead;
		},
		//Delete Method:
		deleteLead(lead) {
			LeadService.deleteLead(lead.id)
				.then((response) => {
					//Reloading the table:
					this.getLeads();

					//Clearing the temp variable:
					this.lead = [];
				})
				.catch((error) => {
					console.log(error);
				});
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
/* Centering the menu btn in the table */
.btns {
	text-align: center;
}
</style>
