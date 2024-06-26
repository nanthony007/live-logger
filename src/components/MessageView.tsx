import { For, createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import { Message } from "~/models";

function formatElapsed(elapsed: number): string {
	if (elapsed > 3600) {
		// hours
		let h = Math.floor(elapsed / 3600);
		let m = Math.floor((elapsed % 3600) / 60);
		let s = Math.floor(elapsed % 60);
		return `${h}h:${m}m:${s}s`;
	} else if (elapsed > 60) {
		// minutes
		let m = Math.floor(elapsed / 60);
		let s = Math.floor(elapsed % 60);
		return `${m}m:${s}s`;
	} else {
		// seconds
		return `${elapsed}s`;
	}
}

export default function MessageView() {
	const today = new Date();
	const [store, setStore] = createStore<{
		message: string;
		messageList: Message[];
		logTitle: string;
		editedMessage: string;
	}>({
		message: "",
		messageList: [],
		logTitle: "",
		editedMessage: "",
	});
	// copies :/
	const orderedMessages = createMemo(() => store.messageList.toSorted((a, b) => b.num - a.num));
	const messageCount = createMemo(() => store.messageList.length);
	const maxMessageNum = createMemo(() => store.messageList.reduce((a, b) => Math.max(a, b.num), 0));

	function addMessage(text: string) {
		if (messageCount() > 0) {
			let originalMsg = store.messageList[0];
			let m = new Message(maxMessageNum() + 1, text);
			m.setElapsed(originalMsg);
			setStore("messageList", messageCount(), m);
		} else {
			let m = new Message(maxMessageNum() + 1, text);
			setStore("messageList", messageCount(), m);
		}
	}

	function deleteMessage(num: number, event: Event) {
		setStore(
			"messageList",
			store.messageList.filter((msg) => msg.num !== num)
		);
	}

	function editMessage(num: number, _: Event) {
		let msgIndex = store.messageList.findIndex((m) => m.num === num);
		if (msgIndex < 0) {
			console.error(`Message with num ${num} not found`);
			return;
		}
		let msg = store.messageList[msgIndex];
		msg.text = store.editedMessage;
		setStore("messageList", msgIndex, msg);
		// update existing UI as well
		let textSpan = document.getElementById(`msg-text-${num}`);
		if (textSpan) {
			textSpan.innerText = store.editedMessage;
		}
		toggleModal(num, _);
	}

	function toggleModal(num: number, _: Event) {
		let modal = document.getElementById(`modal-${num}`);
		if (modal) {
			modal.classList.toggle("hidden");
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

			<table class="table-auto w-full sm:w-3/4 md:w-3/4 mx-auto py-5 px-4">
				<thead class="border-b-2 border-b-sky-700">
					<tr>
						<th></th>
						<th>Num</th>
						<th>Text</th>
						<th>Timestamp</th>
						<th>Elapsed</th>
					</tr>
				</thead>
				<tbody>
					<For each={orderedMessages()}>
						{(msg, _) => (
							<tr class="border-y-2 border-y-sky-700 border-opacity-25">
								<td class="flex justify-center space-x-2">
									<button class="text-red-700" type="button" onClick={[deleteMessage, msg.num]}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="size-6"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
											/>
										</svg>
									</button>
								</td>
								<td>{msg.num}</td>
								<td>
									<span id={`msg-text-${msg.num}`}>{msg.text}</span>
									<button class="text-slate-500" type="button" onClick={[toggleModal, msg.num]}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="size-6"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
											/>
										</svg>
									</button>
									<div
										id={`modal-${msg.num}`}
										tabindex="-1"
										aria-hidden="true"
										class="hidden overflow-y-auto overflow-x-hidden justify-center items-center w-full max-h-full"
									>
										<div class="relative p-4 w-full max-w-2xl max-h-full">
											{/* <!-- Modal content --> */}
											<div class="relative bg-white rounded-lg shadow">
												{/* <!-- Modal header --> */}
												<div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
													<h3 class="text-xl font-semibold text-slate-900">New Message</h3>
													<button
														type="button"
														class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
														onClick={[toggleModal, msg.num]}
													>
														<svg
															class="w-3 h-3"
															aria-hidden="true"
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 14 14"
														>
															<path
																stroke="currentColor"
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
															/>
														</svg>
														<span class="sr-only">Close modal</span>
													</button>
												</div>
												{/* <!-- Modal body --> */}
												<div class="p-4 md:p-5 space-y-4">
													<input
														type="text"
														value={msg.text}
														onInput={(e) => setStore("editedMessage", e.target.value)}
													/>
												</div>
												{/* <!-- Modal footer --> */}
												<div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
													<button
														type="button"
														class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
														onClick={[editMessage, msg.num]}
													>
														Confirm
													</button>
												</div>
											</div>
										</div>
									</div>
								</td>
								<td>{msg.timestamp.toLocaleTimeString()}</td>
								<td>{formatElapsed(msg.elapsed)}</td>
							</tr>
						)}
					</For>
				</tbody>
			</table>
			<span class="text-slate-500 pt-4">Recorded on {today.toLocaleDateString()}</span>
		</>
	);
}
