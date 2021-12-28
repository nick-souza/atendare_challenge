<template>
	<h1>Detalhes</h1>
</template>

<script>
import LeadService from "../services/LeadService";

export default {
	name: "EditLeadForm",
	methods: {
		getLeadById() {
			LeadService.getLeadById(id).then();
		},
	},
};
</script>
