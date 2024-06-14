import { Message } from "~/models";

export default function MessageItem(props: { msg: Message }) {
	return (
		<tr class="border-y-2 border-y-sky-700 border-opacity-25">
			<td>{props.msg.num}</td>
			<td>{props.msg.text}</td>
			<td>{props.msg.timestamp.toUTCString()}</td>
			<td>{props.msg.elapsed}s</td>
		</tr>
	);
}
