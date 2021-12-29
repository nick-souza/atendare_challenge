<template>
	<h1 class="mb-4 mt-2">
		Editar
		{{ lead.name }}
	</h1>
	<form @submit.prevent="onSubmit">
		<div class="row">
			<div class="col-sm-6">
				<label for="editLead" class="form-label">Nome</label>
				<input type="text" class="form-control" id="name" v-model="v$.form.name.$model" @blur="v$.form.name.$touch()" />

				<!-- ERROR MESSAGE -->
				<div v-if="v$.form.name.$error">
					<p class="text-danger">Insira um nome entre 5 e 20 caracteres.</p>
				</div>
				<!-- ERROR MESSAGE -->
			</div>
			<div class="col-sm-6">
				<label for="editLead" class="form-label">Email</label>
				<input type="email" class="form-control" id="email" v-model="v$.form.email.$model" @blur="v$.form.email.$touch()" />

				<!-- ERROR MESSAGE -->
				<div v-if="v$.form.email.$error">
					<p class="text-danger">Insira um email válido.</p>
				</div>
				<!-- ERROR MESSAGE -->
			</div>
		</div>
		<div class="row mt-3">
			<div class="col-sm-6">
				<label for="editLead" class="form-label">Telefone</label>
				<input type="text" class="form-control" id="phone" v-model="v$.form.phone.$model" @blur="v$.form.phone.$touch()" v-maska="'(##) #####-####'" />

				<!-- ERROR MESSAGE -->
				<div v-if="v$.form.phone.$error">
					<p class="text-danger">Insira um telefone válido.</p>
				</div>
				<!-- ERROR MESSAGE -->
			</div>
			<div class="col-sm-6">
				<label for="editLead" class="form-label">CPF</label>
				<input type="text" class="form-control" id="cpf" v-model="v$.form.cpf.$model" @blur="v$.form.cpf.$touch()" v-maska="'###.###.###-##'" />

				<!-- ERROR MESSAGE -->
				<div v-if="v$.form.cpf.$error">
					<p class="text-danger">Insira um CPF válido.</p>
				</div>
				<!-- ERROR MESSAGE -->
			</div>
		</div>
		<div class="row mt-3">
			<div class="col-sm-6">
				<label for="editLead" class="form-label">Gênero</label>
				<select class="form-select" v-model="this.form.gender" ref="gender">
					<option value="1" selected>Feminino</option>
					<option value="2">Masculino</option>
				</select>
			</div>
			<div class="col-sm-6">
				<label for="editLead" class="form-label">Data de Nascimento</label>
				<datepicker class="form-control" v-model="this.form.birthdate" :clearable="false" :upper-limit="datePickerLimit" ref="birthdate" />
			</div>
		</div>
		<div class="mt-5 d-grid gap-2">
			<button type="submit" class="btn btn-success" @click="editLead()" :disabled="v$.form.$invalid">Salvar</button>
		</div>
	</form>
</template>

<script>
import LeadService from "../services/LeadService";

// DatePicker
import Datepicker from "vue3-datepicker";
import { ref } from "vue";

// Validator
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength, email } from "@vuelidate/validators";

export default {
	name: "EditLeadForm",

	components: {
		Datepicker,
	},
	setup() {
		return {
			v$: useVuelidate(),
		};
	},

	props: ["id"],

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

	data() {
		return {
			leadProp: this.id,
			lead: [],
			form: {
				name: "",
				email: "",
				phone: "",
				cpf: "",
				gender: "",
				birthdate: new Date(),
			},
			datePickerLimit: new Date(),
		};
	},
	methods: {
		getLeadById() {
			LeadService.getLeadById(this.leadProp)
				.then((response) => {
					console.log(response.data);
					this.lead = response.data;

					// Assigning the user values:
					this.form.name = this.lead.name;
					this.form.email = this.lead.email;
					this.form.phone = this.lead.phone;
					this.form.cpf = this.lead.cpf;
					this.form.gender = this.lead.gender;
					this.form.birthdate = new Date(this.lead.birthdate);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		editLead() {
			LeadService.editLead(this.lead.id, this.form.name, this.form.phone, this.form.email, this.form.cpf, this.form.birthdate.toISOString(), this.form.gender)
				.then((response) => {
					console.log(response.data);
					this.$router.push("/");
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
