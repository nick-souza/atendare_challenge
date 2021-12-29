import { createRouter, createWebHashHistory } from "vue-router";
import Leads from "../views/Leads.vue";
import Details from "../views/Details.vue";

const routes = [
	{
		path: "/",
		name: "Leads",
		component: Leads,
	},
	{
		path: "/details",
		name: "Details",
		component: Details,
		props: true,
	},
];

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
