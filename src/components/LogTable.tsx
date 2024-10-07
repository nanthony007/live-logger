import { For, Show } from "solid-js";
import { Message, formatElapsed } from "~/lib/models";

export function LogTable(props: {
	messages: Message[];
	deleteMessageCallback: (num: number) => void;
	triggerModalCallback: (idx: number, text: string, inEditMode: boolean) => void;
}) {
	return (
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
				<For each={props.messages}>
					{(msg) => (
						<tr class="border-y-2 border-y-sky-700 border-opacity-25">
							<td>
								<Show when={msg.num !== 1} fallback={""}>
									<button
										class="text-red-700 align-middle"
										type="button"
										onClick={[props.deleteMessageCallback, msg.num]}
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
								</Show>
							</td>
							<td class="align-middle">{msg.num}</td>
							<td class="align-middle">{msg.text}</td>
							<td class="align-middle">
								<button
									class="text-slate-500"
									type="button"
									onClick={() => props.triggerModalCallback(msg.num, msg.text, true)}
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
					)}
				</For>
			</tbody>
		</table>
	);
}
