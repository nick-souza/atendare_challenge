<template>
	<EditLeadForm :id="id" />
</template>

<script>
import EditLeadForm from "../components/EditLeadForm.vue";

export default {
	name: "Details",
	components: {
		EditLeadForm,
	},
	props: ["id"],
};
</script>
