const Console = {
	log: function (message?: any, ...args: any[]) {
		if (process.env.NODE_ENV === "production") return;
		console.log(message, ...args);
	},
	error: function (message?: any, ...args: any[]) {
		if (process.env.NODE_ENV === "production") return;
		console.error(message, ...args);
	},
};
export default Console;
