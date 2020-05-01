import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { animated, useSpring, useTransition, useChain, config, useSprings } from "react-spring";
import { Number } from "../dumb/Number";
import * as matrixLib from "../../helpers/matrix";

const useStyles = makeStyles({
	card: {
		position: "absolute",
		width: 540,
		height: 540,
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		margin: "auto",
	},
});

export const NumberMatrix = () => {
	const classes = useStyles();
	const size = 5;
	const totalCount = size * size;

	const [state, setState] = useState({
		matrix: matrixLib.getItemsArray(size),
		load: false,
	});

	const onShuffle = useCallback(() => {
		const shuffledArr = matrixLib.shuffle(size, state.matrix);
		console.log(`NUMBERMATRIX: Shuffled`, shuffledArr);
		setState({
			matrix: shuffledArr.sort((a, b) => a.id - b.id),
			// load: true,
		});
	}, []);

	const transitions = useTransition(state.matrix, (item) => item.item, {
		native: true,
		unique: true,
		from: ({ xy }) => ({
			transform: `translate3d(${xy[0]}px, ${xy[1]}px, 0) scale(0)`,
			width: 60,
			height: 60,
		}),
		enter: ({ xy }) => ({ transform: `translate3d(${xy[0]}, ${xy[1]}, 0) scale(1)` }),
		update: ({ xy }) => ({ transform: `translate3d(${xy[0]}px, ${xy[1]}px, 0) scale(1)` }),
		leave: { opacity: 0 },
		config: { mass: 1, tension: 200, friction: 10 },
		trail: !state.load ? size * size : 100,
		onRest: ({ id }) => {
			// shuffle after finishing animation on last item
			// last id is 1 less total count
			if (!state.load && id === totalCount - 1) {
				console.log(`NUMBERMATRIX: shuffling grid`);
				setTimeout(() => onShuffle(), 2000);
			}
		},
	});

	/**
	 * Number component should render just once.
	 * Animations will be updated on matrix update
	 */
	const render = useMemo(() => {
		console.log(`NUMBERMATRIX: rendering matrix`, state.matrix);
		return (
			<Grid
				key="grid"
				id="grid"
				container
				direction="row"
				justify="space-between"
				alignItems="flex-start"
				className={classes.card}
				style={{ width: size * 60, height: size * 60 }}
			>
				{state.matrix.map((m, i) => {
					const { item, props, key } = transitions[i];
					return (
						<animated.div key={key} id={key} style={{ position: "absolute", ...props }}>
							<Number number={item.item} />
						</animated.div>
					);
				})}
			</Grid>
		);
	}, [state.matrix]);

	// #endregion
	return render;
};
