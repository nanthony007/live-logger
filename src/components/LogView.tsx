import { Component, For, Show, createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import { createEffect } from "solid-js";
import { downloadCsv } from "~/lib/download";
import { Message, getElapsed, formatElapsed } from "~/lib/models";
import { FileInput } from "~/components/FileInput";
import { NewMessageForm } from "~/components/NewMessageForm";
import { EditMessageModal } from "~/components/EditModal";
import { LogTable } from "~/components/LogTable";

export type EditTarget = {
	idx: number;
	text: string;
	inEditMode: boolean;
};

type LogViewStore = {
	messageList: Message[];
	messageCount: number;
	maxMessageNum: number;
	fileName: string;
	editTarget: EditTarget;
};

// export function LogView(props: { viewID: number }) {
export function LogView() {
	const [store, setStore] = createStore<LogViewStore>({
		messageList: [],
		messageCount: 0,
		maxMessageNum: 0,
		fileName: "",
		editTarget: {
			idx: 0,
			text: "",
			inEditMode: false,
		},
	});
	createEffect(() => {
		setStore("messageCount", store.messageList.length);
		setStore("maxMessageNum", Math.max(...store.messageList.map((m) => m.num), 0));
	});
	const sortedMessages = createMemo(() => {
		return store.messageList.toSorted((a, b) => b.num - a.num);
	});

	function addMessage(text: string) {
		if (store.messageCount > 0) {
			const originalMsg = store.messageList.at(0);
			if (!originalMsg) {
				console.error("Message not found");
				return;
			}
			const now = new Date();
			const elapsed = getElapsed(originalMsg.timestamp, now);
			const newMessage: Message = {
				num: store.maxMessageNum + 1,
				text: text,
				timestamp: now,
				elapsed: elapsed,
			};
			setStore("messageList", store.messageCount, newMessage);
		} else {
			const newMessage: Message = {
				num: store.maxMessageNum + 1,
				text: text,
				timestamp: new Date(),
				elapsed: 0.0,
			};
			setStore("messageList", store.messageCount, newMessage);
		}
	}

	function deleteMessage(num: number) {
		setStore(
			"messageList",
			store.messageList.filter((m) => m.num !== num)
		);
	}

	function editMessage(idx: number, newText: string) {
		setStore("messageList", idx, {
			text: newText,
		});
	}

	function updateEditTarget(num: number, text: string, inEditMode: boolean) {
		setStore("editTarget", {
			idx: store.messageList.findIndex((msg) => msg.num === num),
			text: text,
			inEditMode: inEditMode,
		});
	}

	return (
		<>
			{/* file name input section */}
			<div class="flex justify-center w-full sm:3/4 md:w-1/2 sm:space-x-4 mx-auto py-5 px-4">
				<FileInput fileName={store.fileName} callback={(text) => setStore("fileName", text)} />
			</div>
			<div class="flex justify-center space-x-2 w-full sm:3/4 md:w-1/2 sm:space-x-4 mx-auto py-5 px-4">
				{/* reset/clear and download button section */}
				<button
					class="w-2/3 py-2 bg-red-700 hover:bg-red-500 text-white font-bold rounded-full"
					onClick={() => {
						setStore("messageList", []);
						setStore("fileName", "");
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
					class="w-2/3 py-2 bg-sky-700 hover:bg-sky-500 text-white font-bold rounded-full"
					onClick={() => downloadCsv(store.messageList, store.fileName)}
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
			<NewMessageForm listCallback={addMessage} />

			{/* display messages */}
			<LogTable
				messages={sortedMessages()}
				deleteMessageCallback={deleteMessage}
				triggerModalCallback={updateEditTarget}
			/>

			<span class="text-slate-500 pt-4">Recorded on {new Date().toLocaleDateString()}</span>

			<Show when={store.editTarget.inEditMode}>
				<EditMessageModal
					idx={store.editTarget.idx}
					originalText={store.editTarget.text}
					editMessageCallback={editMessage}
					visibilityCallback={(v) => setStore("editTarget", "inEditMode", v)}
				/>
			</Show>
		</>
	);
}
