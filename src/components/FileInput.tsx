export function FileInput(props: { fileName: string; callback: (text: string) => void }) {
	return (
		<div class="w-3/4">
			<label for="log-title" class="flex justify-start text-sm underline font-medium text-sky-900">
				File Name:
			</label>
			<input
				class="flex w-full pt-2 border-b-2 border-b-sky-700 text-sky-900 placeholder:text-gray-400 focus:outline-none"
				type="text"
				name="log-title"
				id="log-title"
				placeholder="log-messages.csv"
				value={props.fileName}
				onInput={(e) => props.callback(e.target.value)}
			/>
		</div>
	);
}
