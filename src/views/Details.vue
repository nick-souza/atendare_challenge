<template>
	<!-- Rendering the component passing in the Lead ID -->
	<EditLeadForm :id="id" />
</template>

<script>
import EditLeadForm from "../components/EditLeadForm.vue";

export default {
	name: "Details",
	components: {
		EditLeadForm,
	},

	//Lead ID Prop:
	props: ["id"],
};
</script>
