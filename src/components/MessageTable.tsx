import { For } from "solid-js";
import MessageItem from "./MessageItem";
import { Message } from "~/models";

export default function MessageTable(props: { messages: Message[] }) {
	return (
		<table class="table-auto w-full sm:w-3/4 md:w-3/4 mx-auto py-5 px-4">
			<thead class="border-b-2 border-b-sky-700">
				<tr>
					<th>Num</th>
					<th>Text</th>
					<th>Timestamp</th>
					<th>Elapsed</th>
				</tr>
			</thead>
			<tbody>
				<For each={props.messages}>{(msg, _) => <MessageItem msg={msg} />}</For>
			</tbody>
		</table>
	);
}
