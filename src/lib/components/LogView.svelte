<script lang="ts">
	import { formatElapsed, getElapsed, type Message, type TabData } from "../models";
	import { downloadCsv } from "../download-csv";
	import EditModal from "./EditModal.svelte";

	interface Props {
		tabData: TabData;
	}
	let { tabData = $bindable() }: Props = $props();

	let newMsgText = $state("");
	let modalState = $state(false);
	let editMessageIndex = $state(0);
	let sortedMessages = $derived(tabData.messages.toSorted((a, b) => b.num - a.num));

	let maxMessageNum = $derived.by(() => {
		if (tabData.messages.length > 0) {
			return Math.max(...tabData.messages.map((m) => m.num));
		} else {
			return 0;
		}
	});

	function submitForm(event: Event) {
		event.preventDefault();
		if (tabData.messages.length > 0) {
			const firstMsg = tabData.messages[0];
			const now = new Date();
			const elapsed = getElapsed(firstMsg.timestamp, now);
			const newMessage: Message = {
				num: maxMessageNum + 1,
				text: newMsgText,
				timestamp: now,
				elapsed: elapsed,
			};
			tabData.messages.push(newMessage);
		} else {
			const newMessage: Message = {
				num: maxMessageNum + 1,
				text: newMsgText,
				timestamp: new Date(),
				elapsed: 0.0,
			};
			tabData.messages.push(newMessage);
		}
		newMsgText = "";
	}
</script>

<div class="flex justify-center w-full sm:3/4 md:w-1/2 sm:space-x-4 mx-auto py-5 px-4">
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
			bind:value={tabData.fileName}
		/>
	</div>
</div>
<div class="flex justify-center space-x-2 w-full sm:3/4 md:w-1/2 sm:space-x-4 mx-auto py-5 px-4">
	<button
		class="w-2/3 py-2 bg-red-700 hover:bg-red-500 text-white font-bold rounded-full"
		onclick={() => {
			tabData = { fileName: "", messages: [] };
			window.sessionStorage.clear();
		}}
	>
		<div class="flex justify-center">
			<span>Reset</span>
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
		onclick={() => downloadCsv(tabData.messages, tabData.fileName)}
	>
		<div class="flex justify-center">
			<span>Download</span>
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
					d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
				/>
			</svg>
		</div>
	</button>
</div>

<form
	class="w-full sm:w-2/3 md:w-2/3 flex mx-auto justify-center align-center py-5 px-4 pb-10"
	onsubmit={submitForm}
>
	<div class="w-full">
		<label for="message-text" class="flex justify-start text-sm underline font-medium text-sky-900">
			Message:
		</label>

		<input
			class="w-full pt-2 border-b-2 border-b-sky-700 text-sky-900 placeholder:text-gray-400 focus:outline-none"
			type="text"
			name="message-text"
			id="message-text"
			placeholder="Your message..."
			bind:value={newMsgText}
		/>
	</div>

	<button type="submit" aria-label="submit">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8">
			<path
				fill-rule="evenodd"
				d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>
</form>

<table class="table-auto w-full sm:w-3/4 md:w-3/4 mx-auto py-5 px-4">
	<thead class="border-b-2 border-b-sky-700">
		<tr>
			<th></th>
			<th>Num</th>
			<th>Text</th>
			<th></th>
			<th>Timestamp</th>
			<th>Elapsed</th>
		</tr>
	</thead>
	<tbody>
		{#each sortedMessages as msg}
			<tr class="border-y-2 border-y-sky-700 border-opacity-25">
				<td>
					{#if msg.num !== 1}
						<button
							class="text-red-700 align-middle"
							aria-label={`${msg.num} delete`}
							type="button"
							onclick={() => (tabData.messages = tabData.messages.filter((m) => m.num !== msg.num))}
						>
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
					{/if}
				</td>
				<td class="align-middle">{msg.num}</td>
				<td class="align-middle">{msg.text}</td>
				<td class="align-middle">
					<button
						class="text-slate-500"
						aria-label={`${msg.num} trigger modal`}
						type="button"
						onclick={() => {
							editMessageIndex = tabData.messages.findIndex((m) => m.num == msg.num);
							modalState = !modalState;
						}}
					>
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
				</td>
				<td class="align-middle">{msg.timestamp.toLocaleTimeString()}</td>
				<td class="align-middle">{formatElapsed(msg.elapsed)}</td>
			</tr>
		{/each}
	</tbody>
</table>

<span class="text-slate-500 pt-4">Recorded on {new Date().toLocaleDateString()}</span>

{#if modalState === true}
	<EditModal bind:message={tabData.messages[editMessageIndex]} bind:modalState />
{/if}
