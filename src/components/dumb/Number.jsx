import React, { useMemo } from "react";
import { Card, Typography } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import { theme } from "../../assets/theme";

const useStyles = makeStyles({
	typography: {
		position: "absolute",
		alignItems: "center",
		justifyContent: "center",
		display: "flex",
		margin: 2,
		width: "100%",
		height: "100%",
	},
	transparent: {
		opacity: 0,
	},
	square: {
		maxWidth: 56,
		maxHeight: 56,
		transition: theme.transitions.create(["border-color", "box-shadow"]),
		"&:hover": {
			backgroundColor: theme.colors.blue[300],
			borderColor: theme.colors.indigo[500],
		},
		"&.Mui-focused": {
			boxShadow: `${fade(theme.colors.blue[400], 0.25)} 0 0 0 3px`,
			borderColor: theme.colors.blue[500],
			backgroundColor: theme.colors.blue[200],
		},
	},
	noselect: {
		MozUserSelect: "none",
		WebkitUserSelect: "none",
		MoUserSelect: "none",
		UserSelect: "none",
	},
});

export const Number = ({ number }) => {
	const classes = useStyles();
	const comp = useMemo(() => {
		console.log(`NUMBER: rendering number`);
		return (
			<Card
				key={number}
				id={number}
				className={classnames(classes.typography, classes.square)}
			>
				<Typography variant="h4" className={classes.noselect}>
					{number}
				</Typography>
			</Card>
		);
	}, []);

	return comp;
};
