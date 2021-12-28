//Configuring Proxy to handle the CORS error:

module.exports = {
	devServer: {
		proxy: "https://api.atendare.com/v1/",
	},
};
