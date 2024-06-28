type TabButtonProps = {
	label: string;
	isActive: boolean;
	onClick: () => void;
};

export function TabButton(props: TabButtonProps) {
	return (
		<button
			type="button"
			class="font-bold text-white rounded px-4 py-2"
			classList={
				props.isActive ? { "bg-sky-500": true, underline: true } : { "bg-slate-500": true }
			}
			onClick={props.onClick}
		>
			{props.label}
		</button>
	);
}
