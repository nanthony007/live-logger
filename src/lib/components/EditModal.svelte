<script lang="ts">
	import type { Message } from "../models";

	interface Props {
		message: Message;
		modalState: boolean;
	}
	let { message = $bindable(), modalState = $bindable() }: Props = $props();
</script>

<div tabindex="-1" aria-hidden="true" class="fixed inset-0 z-10 overflow-y-auto modal">
	<div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
		<div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>
		<span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
		&#8203;
		<div
			class="inline-block px-4 py-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
		>
			<div class="flex items-center justify-between rounded-t">
				<button
					type="button"
					class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
					onclick={() => (modalState = !modalState)}
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
			<h3 class="text-lg font-medium leading-6 text-sky-900">Edit Message:</h3>
			<form
				class="w-full sm:w-2/3 md:w-2/3 flex flex-col space-y-2 mx-auto justify-center pb-5 px-4"
				onsubmit={(e) => {
					e.preventDefault();
					modalState = !modalState;
				}}
			>
				<div class="flex justify-center space-x-2">
					<label hidden for="edit-message-text"> Edit message: </label>
					<input
						name="edit-message-text"
						type="text"
						bind:value={message.text}
						class="w-full border-b-2 border-b-sky-700 text-sky-900 placeholder:text-gray-400 focus:outline-none"
					/>
				</div>
				<button
					type="submit"
					class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
					onclick={(e) => {
						e.preventDefault();
						modalState = !modalState;
					}}
				>
					Confirm
				</button>
			</form>
		</div>
	</div>
</div>
