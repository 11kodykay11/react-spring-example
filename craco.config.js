/*
In this project the @craco/craco module is used to override the create-react-app default webpack
config instructing it to build for the electron-renderer.
This allows the app to run in electron AND have access to the filesystem
*/
let target = "electron-renderer";
if (process.env.REACT_APP_MODE === "electron") {
	target = "electron-renderer";
}
console.log(`craco: setting target to ${target}`);

module.exports = {
	webpack: {
		configure: {
			target: target,
		},
	},
};
