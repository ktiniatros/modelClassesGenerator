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
var path = require("path");

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

function generateFileFrom(body, fileName){
	var file = "";
  file += "package " + config.package + ";\n\n" + "/**\n* Generated from " + packageJson.name + " v." + packageJson.version + "\n* created by " + packageJson.author + "\n*/\npublic class " + fileName + " {\n\n"
  
  //{type:nameOfType}
  var mappedProperties = [];
  var saveAlso = Object.keys(config.saveAlso);
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
	  if(saveAlso.indexOf(prop) > -1){
		  generateFileFrom(body[prop], config.saveAlso[prop]);
	  }
  }
  for (var index = 0; index < mappedProperties.length; index++) {
	  var element = mappedProperties[index];
	  file += "\n\tprivate " + element.type + " " + element.name + ";"
  };
  file += "\n\n\t //getters";
  for (var index = 0; index < mappedProperties.length; index++) {
	  var element = mappedProperties[index];
	  file += "\n\tpublic " + element.type + " get_" + element.name + "() { return " + element.name + "; }\n";
  };
  file += "\n\t //setters";
  for (var index = 0; index < mappedProperties.length; index++) {
	  var element = mappedProperties[index];
	  var name = element.name;
	  var type = element.type;
	  file += "\n\tpublic void set" + name.charAt(0).toUpperCase() + name.slice(1) + "(" + type + " " + name + ") { this." + name + " = " + name + "; }\n";
  };
  fs += "\n\n}"
  fs.writeFileSync(path.join(config.projectPath, "app", "src", "main", "java", config.package.replace(/\./g, path.sep), fileName + ".java"), file);
//   console.log(file);
}

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  
  console.log(response.statusCode, body);
  
  generateFileFrom(body, config.className);
});
