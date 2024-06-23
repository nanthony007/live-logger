import { createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import MessageTable from "~/components/MessageTable";
import { Message } from "~/models";

export default function MessageView() {
	const [store, setStore] = createStore<{
		message: string;
		messageList: Message[];
		logTitle: string;
	}>({
		message: "",
		messageList: [],
		logTitle: "",
	});
	// copies :/
	const orderedMessages = createMemo(() => store.messageList.toSorted((a, b) => b.num - a.num));
	const messageCount = createMemo(() => store.messageList.length);

	function addMessage(text: string) {
		if (messageCount() > 0) {
			let originalMsg = store.messageList[0];
			let m = new Message(messageCount() + 1, text);
			m.setElapsed(originalMsg);
			setStore("messageList", messageCount(), m);
		} else {
			let m = new Message(messageCount() + 1, text);
			setStore("messageList", messageCount(), m);
		}
	}

	function downloadMessages() {
		// convert to CSV
		let csv = "num,text,timestamp,elapsed\n";
		store.messageList.forEach((msg) => {
			csv += `${msg.num},${msg.text},${msg.timestamp.toUTCString().replace(",", "")},${
				msg.elapsed
			}\n`;
		});
		let blob = new Blob([csv], { type: "text/csv" });
		let url = window.URL.createObjectURL(blob);
		let a = document.createElement("a");
		a.href = url;
		a.download = store.logTitle ? `${store.logTitle}.csv` : "log-messages.csv";
		a.click();
		window.URL.revokeObjectURL(url);
	}

	return (
		<>
			{/* file name input section */}
			<div class="w-full sm:w-3/4 flex flex-col space-y-3 items-center sm:flex-row sm:space-x-4 mx-auto py-5 px-4">
				<div>
					<label
						for="log-title"
						class="flex justify-start text-sm underline font-medium text-sky-900"
					>
						Log title:
					</label>
					<input
						class="flex pt-2 border-b-2 border-b-sky-700 text-sky-900 placeholder:text-gray-400 focus:outline-none"
						type="text"
						name="log-title"
						id="log-title"
						placeholder="Log Title"
						value={store.logTitle}
						onInput={(e) => setStore("logTitle", e.target.value)}
					/>
				</div>
				{/* reset/clear and download button section */}
				<button
					class="w-3/4 sm:w-2/3 md:w-1/2 bg-red-700 hover:bg-red-500 text-white font-bold rounded-full"
					onClick={() => {
						setStore("messageList", []);
						setStore("logTitle", "");
					}}
				>
					<div class="flex justify-center">
						<span class="">Reset</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="size-6"
						>
							<path
								fill-rule="evenodd"
								d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
				</button>
				<button
					class="w-3/4 sm:w-2/3 md:w-1/2 bg-sky-700 hover:bg-sky-500 text-white font-bold rounded-full"
					onClick={() => downloadMessages()}
				>
					<div class="flex justify-center">
						<span class="">Download</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width={1.5}
							stroke="currentColor"
							class="size-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
							/>
						</svg>
					</div>
				</button>
			</div>

			{/* message submission section */}
			<form
				class="w-full sm:w-2/3 md:w-2/3 flex mx-auto justify-center align-center py-5 px-4 pb-10"
				onSubmit={(e) => {
					e.preventDefault();
					addMessage(store.message);
					setStore("message", "");
				}}
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
						value={store.message}
						onInput={(e) => setStore("message", e.target.value)}
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

			{/* display messages */}
			<MessageTable messages={orderedMessages()} />
		</>
	);
}
