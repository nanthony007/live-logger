import { createSignal } from "solid-js";

export function NewMessageForm(props: { listCallback: (text: string) => void }) {
	const [newMessage, setNewMessage] = createSignal("");

	function submitForm(event: Event) {
		event.preventDefault();
		props.listCallback(newMessage());
		setNewMessage("");
	}
	return (
		<form
			class="w-full sm:w-2/3 md:w-2/3 flex mx-auto justify-center align-center py-5 px-4 pb-10"
			onSubmit={submitForm}
		>
			<div class="w-full">
				<label
					for="message-text"
					class="flex justify-start text-sm underline font-medium text-sky-900"
				>
					Message:
				</label>

				<input
					class="w-full pt-2 border-b-2 border-b-sky-700 text-sky-900 placeholder:text-gray-400 focus:outline-none"
					type="text"
					name="message-text"
					id="message-text"
					placeholder="Your message..."
					value={newMessage()}
					onInput={(e) => setNewMessage(e.target.value)}
				/>
			</div>

			<button type="submit">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="size-8"
				>
					<path
						fill-rule="evenodd"
						d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</form>
	);
}
