type NumberSlotProps = {
	value: number | string;
};
const NumberSlot = (props: NumberSlotProps) => {
	return <div className='bg-white min-w-[8rem] h-20 px-4 py-2 shadow-inner text-7xl font-extrabold flex justify-center items-center mx-4 my-2 rounded'>{props.value}</div>;
};

export default NumberSlot;
