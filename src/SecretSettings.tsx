import { useState } from "react";
import FancyButton from "./assets/FancyButton";
import { useNavigate } from "react-router-dom";
import NumberSlot from "./assets/NumberSlot";

type DeleteButtonProps = {
	action: () => void;
};

const SecretSettings = () => {
	const [fakeNumbers, setFakeNumbers] = useState<number[]>([]);
	const [currentNumber, setCurrentNumber] = useState<number>(0);
	const navigate = useNavigate();

	function handleSubmit() {
		console.log("");
		navigate("/", { state: { fakeNumbers: fakeNumbers } });
	}

	function handleDeleteNumberByIndex(idx: number) {
		const newFakeNumbers = [...fakeNumbers];
		newFakeNumbers.splice(idx, 1);
		setFakeNumbers(newFakeNumbers);
	}

	function handleKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Enter") {
			addNumber();
		}
	}

	function addNumber() {
		const newFakeNumbers = [...fakeNumbers, currentNumber];
		if (currentNumber) {
			setFakeNumbers(newFakeNumbers);
			setCurrentNumber(0);
		}
	}

	const DeleteButton = (props: DeleteButtonProps) => {
		return (
			<button
				className='rounded bg-red-500 hover:outline hover:outline-2 hover:outline-slate-800  w-6 h-6 text-sm text-white absolute -top-3 -right-3 p-1 text-center flex justify-center items-center shadow-xl'
				onClick={() => props.action()}
			>
				{"X"}
			</button>
		);
	};

	return (
		<>
			<h1 className='mx-auto py-8 lg:text-5xl md:text-3xl text-2xl font-semibold text-red-500 text-center'>
				SECRET SETTINGS
			</h1>
			<div className='mx-auto w-32 flex flex-row py-4 items-center justify-between'>
				<p className='text-white font-semibold'>Zahl:</p>
				<input
					className='mx-4 w-16 px-2 py-1 rounded-lg border border-slate-200 hover:border-blue-800 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40'
					type='number'
					placeholder='3'
					aria-label='number of slots'
					value={currentNumber || ""}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setCurrentNumber(e.target.valueAsNumber);
					}}
					onKeyDown={(e) => handleKeyDown(e)}
				/>
				<button
					className='bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded text-sm'
					onClick={() => addNumber()}
				>
					Hinzufügen
				</button>
			</div>
			<div className='w-full px-4 flex justify-center flex-wrap bg-red-900'>
				{fakeNumbers.length != 0 && (
					<p className='text-lg text-white font-extrabold w-full text-center py-4 tracking-wider'>
						Hinzugefügte Zahlen:
					</p>
				)}
				{fakeNumbers?.map((num, idx) => {
					return (
						<NumberSlot key={idx} value={num}>
							<DeleteButton action={() => handleDeleteNumberByIndex(idx)} />
						</NumberSlot>
					);
				})}
			</div>
			<FancyButton title='Speichern und Fortfahren' onClickFunction={() => handleSubmit()} />
		</>
	);
};

export default SecretSettings;
