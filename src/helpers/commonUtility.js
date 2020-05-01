import { green, yellow, red, blue } from "@material-ui/core/colors";
import { NumberMatrix } from "../components/smart/NumberMatrix";

/*const UID = require("react-native-uuid");
const electron = require("electron").remote;
const { BrowserWindow } = electron;*/

// Main Routes array
// Misc routes (not related to dashboard) can go here
export const mainRoutes = [
	{ path: "/", component: NumberMatrix, exact: true },
	{ path: "/example", component: NumberMatrix, exact: true },
];

// ------------DEBUG MECHANISM-------------------------------------------//

window.log = function (message, data) {
	log(message, data);
};
const isDebugMode = sessionStorage.getItem("GODEBUG") || localStorage.getItem("GODEBUG");
function log(message, data) {
	if (!isDebugMode) return;
	console.log(`...${message}`, data || "");
}

// ----------------------------------------------------------------------//

export const NewWindow = ({
	width = 500,
	height = 500,
	frame = false,
	show = true,
	URL,
	debug = false,
	optional,
}) => {
	//var win = new BrowserWindow({ width, height, frame, ...optional });
	let win;
	win.on("closed", () => {
		win = null;
	});

	URL && win.loadURL(URL);
	show && win.show();
	debug && win.webContents.openDevTools();

	return win;
};

export function getRandomQuote() {
	const quotes = [
		"The intensity of your experience is more important than immensity of your possessions.",
		"“Play to win, NOT to avoid loosing.”",
		"“The mind, once stretched by a new idea, never regains its original dimensions.”",
	];
	return quotes[getRandomInt(quotes.length)];
}

function getRandomColor() {
	const colors = [green, yellow, red, blue];
	return colors[getRandomInt(colors.length)];
}

function getRandomInt(max) {
	const index = Math.floor(Math.random() * Math.floor(max));
	return index;
}
