module.exports = {
	package:"package gr.softweb.funkmartini.models",
	className:"FMProfile",
	mapper:{
		"string":"String",
		"number":"Number",
		"boolean":"Boolean",
		address:"FMAddress",
		age: "AgeRange"
	},
	objects:["address"]
};
