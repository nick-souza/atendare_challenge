<template>
	<div class="home">
		<HelloWorld msg="Welcome to Your Vue.js App" />
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import LeadService from "../services/LeadService";

export default {
	name: "Home",
	components: {
		HelloWorld,
	},
	data() {
		return {
			leads: [],
		};
	},
	methods: {
		getLeads() {
			LeadService.getLeads()
				.then((response) => {
					console.log(response.data);
					// this.leads = response.data.content;
				})
				.catch(() => {
					console.log("error");
				});
		},
	},
	created() {
		this.getLeads();
	},
};
</script>
