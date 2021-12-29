import { createRouter, createWebHashHistory } from "vue-router";
import Leads from "../views/Leads.vue";
import Details from "../views/Details.vue";

//Creating the routes:
const routes = [
	//Main route for displaying the leads:
	{
		path: "/",
		name: "Leads",
		component: Leads,
	},

	//Secondary route to updating the leads:
	{
		path: "/details",
		name: "Details",
		component: Details,
		props: true,
	},
];

//To run in history mode:
const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

//Middleware to dynamically change the title according to the page:
router.beforeEach((to, from, next) => {
	document.title = `${process.env.VUE_APP_TITLE} | ${to.name}`;
	next();
});

export default router;
