//form
// var request = require("request");

// var options = { method: 'POST',
//   url: 'https://api.funkmartini.gr/v1/auth/login',
//   headers: 
//    { 'postman-token': '06ecb364-6edf-cf2c-2b68-4faf2323c0f6',
//      'cache-control': 'no-cache',
//      'content-type': 'multipart/form-data; boundary=---011000010111000001101001' },
//   formData: { username: 'demo1@softweb.gr', password: 'demo2015' } };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });

//x-www-form-urlencoded
var request = require("request");

var config = require("./config");

var baseURL = 'https://api.funkmartini.gr/v1';
var loginURL = baseURL + '/auth/login'; 
var profileURL = baseURL + '/users/profile';

var fs = require("fs");

var packageJson = fs.readFileSync("package.json");
packageJson = JSON.parse(packageJson.toString());
console.log(packageJson);

var token = "374f09a1-d3e6-40e3-ba89-2d1dff6ace15";
var options = { method: 'POST',
 url: profileURL,
//   url:'http://37.139.6.39:8066/api/login',
headers:{
	"Authorization":"Bearer " + token	
},
 json:true,
  body: {  }};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  
  console.log(response.statusCode, body);
  
  var file = "";
  file += config.package + "\n\n" + "/**\n* Generated from " + packageJson.name + " v." + packageJson.version + "\n* created from " + packageJson.author + "\n*/\npublic class " + config.className + " {\n\n"
  
  var strings = [];
  var booleans = [];
  //{type:nameOfType}
  var mappedProperties = [];
  for(var prop in body){
	  console.log(prop, typeof body[prop]);
	  if(config.mapper[prop] || config.mapper[typeof body[prop]]){
		  var newProperty = {
			  name:prop,
			  type:config.mapper[prop] || config.mapper[typeof body[prop]]
		  };
		  newProperty[prop] = config.mapper[prop];
		  mappedProperties.push(newProperty);
	  }
  }
  for (var index = 0; index < mappedProperties.length; index++) {
	  var element = mappedProperties[index];
	  file += "\n\tprivate " + element.type + " " + element.name + ";"
  };
  file += "\n\n\t //getters";
  for (var index = 0; index < mappedProperties.length; index++) {
	  var element = mappedProperties[index];
	  file += "\tpublic " + element.type + " get_" + element.name + "() { return " + element.name + "; }\n";
  };
  file += "\n\t //setters";
  for (var index = 0; index < mappedProperties.length; index++) {
	  var element = mappedProperties[index];
	  var name = element.name;
	  var type = element.type;
	  file += "\n\tpublic void set" + name.charAt(0).toUpperCase() + name.slice(1) + "(" + type + " " + name + ") { this." + name + " = " + name + "; }\n";
  };
  
//   for (var index = 0; index < strings.length; index++) {
// 	  var element = strings[index];
// 	  file += "\tprivate String " + element + ";\n"
//   };
//   for (var index = 0; index < booleans.length; index++) {
// 	  var element = booleans[index];
// 	  file += "\tprivate Boolean " + element + ";\n"
//   };
//   file += "\n\t //getters";
//   for (var index = 0; index < strings.length; index++) {
// 	  var element = strings[index];
// 	  file += "\tpublic String get_" + element + "() { return " + element + "; }\n";
//   };
//   for (var index = 0; index < booleans.length; index++) {
// 	  var element = booleans[index];
// 	  file += "\tpublic Boolean get_" + element + "() { return " + element + "; }\n";
//   };
//   file += "\n\t //setters";
//   for (var index = 0; index < strings.length; index++) {
// 	  var element = strings[index];
// 	  file += "\tpublic void set" + element.charAt(0).toUpperCase() + element.slice(1) + "(String " + element + ") { this." + element + " = " + element + "; }\n";
//   };
//   for (var index = 0; index < booleans.length; index++) {
// 	  var element = booleans[index];
// 	  file += "\tpublic void set" + element.charAt(0).toUpperCase() + element.slice(1) + "(Boolean " + element + ") { this." + element + " = " + element + "; }\n";
//   };
  console.log(file);
});
