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
	},
	// {
	//   path: '/about',
	//   name: 'About',
	//   // route level code-splitting
	//   // this generates a separate chunk (about.[hash].js) for this route
	//   // which is lazy-loaded when the route is visited.
	//   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	// }
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
