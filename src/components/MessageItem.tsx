import { Message } from "~/models";

export default function MessageItem(props: { msg: Message }) {
	// TODO: add row-based and column-based styling emulating a table appearance
	return (
		<p class="bg-gray-200 text-red-600">
			{props.msg.num} -- {props.msg.text} -- {props.msg.timestamp.toUTCString()} --{" "}
			{props.msg.elapsed}s
		</p>
	);
}
