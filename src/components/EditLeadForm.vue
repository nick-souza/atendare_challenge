<template>
	<h1 class="mb-4 mt-2">Editar {{ lead.name }}</h1>
	<div class="row">
		<div class="col-sm-6">
			<label for="exampleFormControlInput1" class="form-label">Nome</label>
			<input type="text" class="form-control" id="name" :v-model="lead.name" />
		</div>
		<div class="col-sm-6">
			<label for="exampleFormControlInput1" class="form-label">Email address</label>
			<input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
		</div>
	</div>
	<!--  -->
	<div class="mb-3">
		<label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
		<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
	</div>
</template>

<script>
import LeadService from "../services/LeadService";

export default {
	name: "EditLeadForm",
	props: ["id"],
	data() {
		return {
			delete: this.id,
			lead: [],
		};
	},
	methods: {
		getLeadById() {
			LeadService.getLeadById(this.delete)
				.then((response) => {
					console.log(response.data);
					this.lead = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
	created() {
		//Run get method on page load:
		this.getLeadById();
	},
};
</script>
