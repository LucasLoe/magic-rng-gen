type FancyButtonProps = {
	onClickFunction: () => void;
	title: string;
};

const FancyButton = (props: FancyButtonProps) => {
	return (
		<div className='w-full h-40 flex items-center justify-center' onClick={props.onClickFunction}>
			<a
				href='#_'
				className='relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group'
			>
				<span className='absolute w-0 h-0 transition-all duration-500 ease-out bg-cyan-500 rounded-full group-hover:w-80 group-hover:h-56'></span>
				<span className='absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700'></span>
				<span className='relative'>{props.title}</span>
			</a>
		</div>
	);
};

export default FancyButton;
