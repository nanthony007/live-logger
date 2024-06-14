import { createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import MessageList from "~/components/MessageList";
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
			csv += `${msg.num},${msg.text},${msg.timestamp.toUTCString()},${msg.elapsed}\n`;
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
			<h1>Message List</h1>
			<input
				type="text"
				value={store.logTitle}
				onInput={(e) => setStore("logTitle", e.target.value)}
				placeholder="Log Title"
			/>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addMessage(store.message);
					setStore("message", "");
				}}
			>
				<label for="msg">Message:</label>
				<input
					type="text"
					id="msg"
					name="msg"
					value={store.message}
					onInput={(e) => setStore("message", e.target.value)}
				/>
				<button type="submit">Add Message</button>
			</form>

			<button
				onClick={() => {
					setStore("messageList", []);
					setStore("logTitle", "");
				}}
			>
				Reset Messages
			</button>

			<button onClick={() => downloadMessages()}>Download Messages</button>

			<MessageList messages={orderedMessages()} />
		</>
	);
}
