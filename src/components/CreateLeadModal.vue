<template>
	<!-- Button to toggle the modal window: -->
	<button class="btn btn-success" type="button" data-bs-target="#createLead" data-bs-toggle="modal" id="button-addon2">Novo</button>

	<!-- MODAL -->
	<div class="modal fade" id="createLead" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="createLeadLabel" aria-hidden="true">
		<!-- Centered with static backdrop: -->
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="createLeadLabel">Novo Lead</h5>

					<!-- Clearing the form on close: -->
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
					<!-- Calling create() and clearForm() on click, but only if all the inputs passed the verification: -->
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

					<!-- Clearing the form on close: -->
					<button type="button" class="btn btn-secondary float-right" data-bs-dismiss="modal" @click="clearForm()">Fechar</button>
				</div>
			</div>
		</div>
	</div>
	<!-- MODAL -->
</template>

<script>
import LeadService from "../services/LeadService";

// Validator
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength, email } from "@vuelidate/validators";

export default {
	data() {
		return {
			//Storing the form data:
			form: {
				name: "",
				email: "",
				phone: "",
				cpf: "",
			},
		};
	},

	//Doing the validations:
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
			this.form.email = "";
			this.form.cpf = "";
		},

		// Clearing the input and the input errors (touch):
		hideModal() {
			this.clearForm();
		},

		//Create method:
		create() {
			LeadService.createLead(this.form.name, this.form.phone, this.form.email, this.form.cpf)
				.then((response) => {
					//Redirecting the user to the details page to finish filling in the information:
					this.$router.push({
						name: "Details",

						//Passing in the id from the success response:
						params: { id: response.data.success.id },
					});
				})
				.catch((error) => alert(error));
		},
	},

	//Using the Vuelidate:
	setup() {
		return { v$: useVuelidate() };
	},
};
</script>

<style scoped></style>
