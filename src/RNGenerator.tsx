import { useEffect, useState } from "react";
import NumberSlot from "./assets/NumberSlot";
import generateInRange from "./assets/generateInRange";
import generateInRangeBias from "./assets/generateInRangeBias";
import FancyButton from "./assets/FancyButton";
import { useLocation } from "react-router-dom";

function RNGenerator() {
	const initialNumberOfSlots = 3;
	const [numberOfSlots, setNumberOfSlots] = useState(initialNumberOfSlots);
	const [arrayofNumbers, setArrayOfNumbers] = useState<number[] | string[]>(
		Array.from({ length: initialNumberOfSlots }, () => "-")
	);
	const [randomCount, setRandomCount] = useState(0);
	const [rngLimit, setRngLimit] = useState({
		min: 1,
		max: 30,
	});
	const [fakeNumbers, setFakeNumbers] = useState<number[]>(new Array(0));
	const locationObject = useLocation();

	useEffect(() => {
		setArrayOfNumbers(Array.from({ length: numberOfSlots }, () => "-"));
		setRandomCount(0);
	}, [numberOfSlots]);

	useEffect(() => {
		locationObject && setFakeNumbers(locationObject?.state?.fakeNumbers);
	}, [location]);

	function generateRandomNumbers() {
		let randomNumberArray =
			randomCount === 3 && fakeNumbers
				? generateInRangeBias(rngLimit.min, rngLimit.max, numberOfSlots, fakeNumbers)
				: generateInRange(rngLimit.min, rngLimit.max, numberOfSlots);
		setArrayOfNumbers(randomNumberArray);
		setRandomCount((prevCount) => prevCount + 1);
	}

	function handleLimitChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.id === "min") {
			setRngLimit((prevVal) => ({
				...prevVal,
				min: e.target.valueAsNumber,
			}));
		}
		if (e.target.id === "max") {
			setRngLimit((prevVal) => ({
				...prevVal,
				max: e.target.valueAsNumber,
			}));
		}
	}

	return (
		<>
			{fakeNumbers && fakeNumbers.length != 0 && (
				<div className='absolute top-0 left-o w-4 h-4 bg-slate-300'></div>
			)}
			<h1 className='mx-auto py-8 lg:text-5xl md:text-3xl text-xl font-semibold text-white text-center'>
				Random Number Generator
			</h1>
			<form className=' mx-auto my-8 max-w-xs'>
				<div className='w-full flex flex-row py-4 mx-auto items-center justify-between'>
					<p className='text-white font-semibold'>Anzahl der Slots:</p>
					<input
						className='ml-4 w-32 px-2 py-1 rounded-lg border border-slate-200 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40'
						type='number'
						placeholder='3'
						aria-label='number of slots'
						value={numberOfSlots || ""}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setNumberOfSlots(e.target.valueAsNumber);
						}}
					/>
				</div>
				<div className='w-full flex flex-row py-4 mx-auto items-center justify-between'>
					<p className='text-white font-semibold'>Min. Zahl:</p>
					<input
						className='ml-4 w-32 px-2 py-1 rounded-lg border border-slate-200 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40'
						type='number'
						id='min'
						placeholder='3'
						aria-label='Min. Zahl:'
						value={rngLimit.min || ""}
						onChange={(e) => {
							handleLimitChange(e);
						}}
					/>
				</div>
				<div className='w-full flex flex-row py-4 mx-auto items-center justify-between'>
					<p className='text-white font-semibold'>Max. Zahl:</p>
					<input
						className='ml-4 w-32 px-2 py-1 rounded-lg border border-slate-200 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40'
						type='number'
						id='max'
						placeholder='3'
						aria-label='Max. Zahl:'
						value={rngLimit.max || ""}
						onChange={(e) => {
							handleLimitChange(e);
						}}
					/>
				</div>
			</form>
			<div className='w-full px-4 flex justify-center flex-wrap'>
				{arrayofNumbers?.map((num, idx) => {
					return <NumberSlot key={idx} value={num} />;
				})}
			</div>
			<FancyButton
				title='Generiere Zufallszahlen'
				onClickFunction={() => generateRandomNumbers()}
			/>
		</>
	);
}

export default RNGenerator;
