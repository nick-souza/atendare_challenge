<template>
	<!-- NavBar: -->
	<nav class="navbar navbar-expand-lg navbar-dark">
		<div class="container-fluid">
			<a class="navbar-brand">
				<img
					src="https://atendare-static.storage.googleapis.com/Images/Atendare/AtendareWhiteLogo.svg"
					alt=""
					width="126"
					height="24"
					class="d-inline-block align-text-top"
				/>
			</a>

			<!-- Toggler Button will only show when using smaller width devices: -->
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav">
					<li class="nav-item">
						<!-- Using router-link to prevent from reloading the page every time we click: -->
						<router-link class="nav-link" aria-current="page" to="/" active-class="active">Leads</router-link>
					</li>
				</ul>
				<ul class="navbar-nav ms-auto">
					<li class="nav-item">
						<!-- Modal component to create new Lead:  -->
						<CreateLeadModal />
					</li>
				</ul>
			</div>
		</div>
	</nav>

	<!-- Rendering the templates: -->
	<div class="container pt-4">
		<router-view />
	</div>
</template>

<script>
// Importing the modal
import CreateLeadModal from "./components/CreateLeadModal.vue";

export default {
	components: {
		CreateLeadModal,
	},
};
</script>

<style>
.navbar {
	background-color: #326195;
}
.nav-item {
	font-size: 120%;
}
</style>
