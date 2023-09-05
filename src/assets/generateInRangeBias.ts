export default function generateInRangeBias(
	min: number,
	max: number,
	count: number,
	existingNumbers: number[]
): number[] {
	if (min > max) {
		throw new Error("Min cannot be greater than max");
	}

	if (count < existingNumbers.length) {
		throw new Error("Count is smaller than the number of existing numbers");
	}

	const range = max - min + 1;
	const randomNumbers: Set<number> = new Set(existingNumbers);

	while (randomNumbers.size < count) {
		const randomInteger = Math.floor(Math.random() * range) + min;
		randomNumbers.add(randomInteger);
	}

	// Convert the Set to an array with random positions
	const randomNumArray = Array.from(randomNumbers).sort(() => Math.random() - 0.5);

	return randomNumArray;
}
