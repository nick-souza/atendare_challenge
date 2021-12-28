<template>
	<LeadsTable />
</template>

<script>
// @ is an alias to /src
import LeadsTable from "@/components/LeadsTable.vue";
import LeadService from "../services/LeadService";

export default {
	name: "Leads",
	components: {
		LeadsTable,
	},
};
</script>
