import { createMuiTheme } from "@material-ui/core/styles";
import { blue, green, red, yellow, orange, indigo } from "@material-ui/core/colors";

export const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#9796f0",
		},
		secondary: {
			main: "#fbc7d4",
		},
		type: "light",
	},
	colors: {
		blue: blue,
		green: green,
		red: red,
		yellow: yellow,
		orange: orange,
		indigo: indigo,
	},
	typography: {
		useNextVariants: true,
		fontFamily: "'Rajdhani', sans-serif",
		fontSize: 14,
	},
});
