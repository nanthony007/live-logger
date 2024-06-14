import { For } from "solid-js";
import MessageItem from "./MessageItem";
import { Message } from "~/models";

export default function MessageList(props: { messages: Message[] }) {
	// TODO: add styling and such in a container
	return <For each={props.messages}>{(msg, _) => <MessageItem msg={msg} />}</For>;
}
