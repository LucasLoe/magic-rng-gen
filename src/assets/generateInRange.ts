export default function generateInRange(min: number, max: number, count: number): number[] {
	if (min > max) {
		throw new Error("Min cannot be greater than max");
	}

	if (count > max - min + 1) {
		throw new Error("Count exceeds the range of possible values");
	}

	const range = max - min + 1;
	const randomNumbers: Set<number> = new Set();

	while (randomNumbers.size < count) {
		const randomInteger = Math.floor(Math.random() * range) + min;
		randomNumbers.add(randomInteger);
	}

	// Convert the Set to an array
	const randomNumArray = Array.from(randomNumbers);

	return randomNumArray;
}
