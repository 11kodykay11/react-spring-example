export const getItemsArray = (size = 9) => {
	return Array(size * size)
		.fill(0)
		.map((x, i) => {
			const c = i % size;
			const r = (i - c) / size;
			return (x = {
				id: i,
				item: i + 1,
				xy: [c * 60, r * 60],
			});
		});
};

/**
 * https://bost.ocks.org/mike/shuffle/
 */
export function shuffle(size, matrix) {
	let array = JSON.parse(JSON.stringify(matrix));
	let m = array.length;
	let t = null;
	let i;
	// While there remain elements to shuffle…
	while (m) {
		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);
		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}

	// adjust xy position and rc position
	array.map((x, i) => {
		const c = i % size;
		const r = (i - c) / size;
		x.id = i;
		x.xy = [c * 60, r * 60];
	});

	return array;
}

export const getNumberMatrix = (size = 9, isRandom = false) => {
	let numArr = getItemsArray(size);
	if (isRandom) numArr = shuffle(numArr);
	let n = 0;
	let arr = Array(size)
		.fill(0)
		.map((_, i) =>
			Array(size)
				.fill(0)
				.map((num, j) => (num = numArr[n++]))
		);
	return arr;
};
