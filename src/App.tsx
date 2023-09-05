import { useEffect, useState } from "react";
import NumberSlot from "./assets/NumberSlot";
import generateInRange from "./assets/generateInRange";
import generateInRangeBias from "./assets/generateInRangeBias";

function App() {
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

	useEffect(() => {
		setArrayOfNumbers(Array.from({ length: numberOfSlots }, () => "-"));
		setRandomCount(0);
	}, [numberOfSlots]);

	function generateRandomNumbers() {
		let randomNumberArray =
			randomCount === 3
				? generateInRangeBias(1, 30, numberOfSlots, [2, 11])
				: generateInRange(1, 30, numberOfSlots);
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
						value={numberOfSlots}
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
						value={rngLimit.min}
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
						value={rngLimit.max}
						onChange={(e) => {
							handleLimitChange(e);
						}}
					/>
				</div>
			</form>
			<div className='w-full px-4 flex justify-center flex-wrap'>
				{arrayofNumbers?.map((num) => {
					return <NumberSlot value={num} />;
				})}
			</div>
			<div
				className='w-full h-40 flex items-center justify-center'
				onClick={() => generateRandomNumbers()}
			>
				<a
					href='#_'
					className='relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group'
				>
					<span className='absolute w-0 h-0 transition-all duration-500 ease-out bg-cyan-500 rounded-full group-hover:w-80 group-hover:h-56'></span>
					<span className='absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700'></span>
					<span className='relative'>Generiere Zufallszahlen</span>
				</a>
			</div>
		</>
	);
}

export default App;
