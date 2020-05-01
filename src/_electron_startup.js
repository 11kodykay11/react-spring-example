//Cannot use import statement for electron. Gives Error
const url = require("url");
const path = require("path");
const electron = require("electron");
const app = electron.app;
const browser = electron.BrowserWindow;

app.on("ready", () => {
	//Determine URL for startup.
	//Development env will require webpack dev server
	//and request http://localhost:3000 url.
	//ELECTRON_START_URL is set in package.json
	console.log("App ready");
	const startupURL =
		process.env.ELECTRON_START_URL ||
		url.format({
			pathname: path.join(__dirname, "/../build/index.html"),
			protocol: "file:",
			slashes: true,
		});

	createMainWindow({ urlToLoad: startupURL, isDebug: true });
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

/*app.on("activate", function () {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (browser.getAllWindows().length === 0) createMainWindow();
});*/

function createMainWindow({ isHidden = false, urlToLoad, isDebug = true }) {
	console.log("creating new window");
	let win = new browser({
		width: 500,
		height: 500,
		show: !isHidden,
		//This is required to let React access electron
		webPreferences: {
			nodeIntegration: true,
		},
	});
	// and load the index.html of the app.
	win.loadURL(urlToLoad);

	//Open dev tools if debug is on
	if (isDebug) win.webContents.openDevTools();

	//Free memory on close
	win.on("closed", () => (win = null));
}
