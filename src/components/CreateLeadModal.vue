<template>
	<!-- Button to toggle the modal window: -->
	<button class="btn btn-success" type="button" data-bs-target="#createLead" data-bs-toggle="modal" id="button-addon2">Novo</button>

	<div class="modal fade" id="createLead" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="createLeadLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="createLeadLabel">Novo Lead</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" @click="clearForm()"></button>
				</div>
				<div class="modal-body">
					<!-- Preventing reload on submit: -->
					<form @submit.prevent="onSubmit">
						<div class="mb-3">
							<label class="form-label">Nome</label>
							<!-- Using Vuelidate and Maska to control the inputs: -->
							<input class="form-control" v-model="v$.form.name.$model" @blur="v$.form.name.$touch()" />

							<!-- ERROR MESSAGE -->
							<div v-if="v$.form.name.$error">
								<p class="text-danger">Insira um nome entre 5 e 20 caracteres.</p>
							</div>
							<!-- ERROR MESSAGE -->

							<!-- <label class="form-label">Data de Nascimento</label>
							<datepicker class="form-control" v-model="form.bdate" :clearable="false" :upper-limit="form.datePickerLimit" /> -->

							<label class="form-label">Email</label>
							<input class="form-control" v-model="v$.form.email.$model" @blur="v$.form.email.$touch()" />

							<!-- ERROR MESSAGE -->
							<div v-if="v$.form.email.$error">
								<p class="text-danger">Insira um email válido.</p>
							</div>
							<!-- ERROR MESSAGE -->

							<label class="form-label">Telefone</label>
							<input class="form-control" v-maska="'(##) #####-####'" v-model="v$.form.phone.$model" @blur="v$.form.phone.$touch()" />

							<!-- ERROR MESSAGE -->
							<div v-if="v$.form.phone.$error">
								<p class="text-danger">Insira um telefone válido.</p>
							</div>
							<!-- ERROR MESSAGE -->

							<label class="form-label">CPF</label>
							<input class="form-control" v-maska="'###.###.###-##'" v-model="v$.form.cpf.$model" @blur="v$.form.cpf.$touch()" />

							<!-- ERROR MESSAGE -->
							<div v-if="v$.form.cpf.$error">
								<p class="text-danger">Insira um CPF válido.</p>
							</div>
							<!-- ERROR MESSAGE -->
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button
						type="submit"
						data-bs-dismiss="modal"
						class="btn btn-primary"
						@click="
							create();
							clearForm();
						"
						:disabled="v$.form.$invalid"
					>
						Criar
					</button>
					<button type="button" class="btn btn-secondary float-right" data-bs-dismiss="modal" @click="clearForm()">Fechar</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import LeadService from "../services/LeadService";

// // DatePicker
// import Datepicker from "vue3-datepicker";
// import { ref } from "vue";

// Validator
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength, email } from "@vuelidate/validators";

export default {
	components: {
		// Datepicker,
	},
	data() {
		return {
			form: {
				name: "",
				email: "",
				phone: "",
				cpf: "",
				// bdate: new Date(),
				// datePickerLimit: new Date(),
			},
		};
	},
	//Vuelidate
	validations() {
		return {
			form: {
				name: {
					required,
					min: minLength(5),
					max: maxLength(20),
				},
				phone: {
					required,
					min: minLength(15),
					max: maxLength(15),
				},
				email: {
					required,
					email,
				},
				cpf: {
					required,
					min: minLength(14),
					max: maxLength(14),
				},
			},
		};
	},
	methods: {
		// Clearing the input and the input errors (touch):
		clearForm() {
			this.v$.$reset();
			this.form.name = "";
			this.form.phone = "";
			this.form.address = "";
		},
		// Clearing the input and the input errors (touch):
		hideModal() {
			this.v$.$reset();
			this.form.name = "";
			this.form.phone = "";
			this.form.address = "";
		},
		// getLeads() {
		// 	LeadService.getLeads()
		// 		.then((response) => {
		// 			console.log(response.data);
		// 			this.leads = response.data.results;
		// 		})
		// 		.catch(() => {
		// 			console.log("error");
		// 		});
		// },
		create() {
			LeadService.createLead(this.form.name, this.form.phone, this.form.email, this.form.cpf)
				.then((response) => {
					alert("Lead Criado");
					// this.getPacientes();
					console.log(response);
				})
				.catch((error) => alert(error));
		},
	},
	setup() {
		return { v$: useVuelidate() };
	},
};
</script>

<style scoped></style>
