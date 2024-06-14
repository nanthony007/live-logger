import MessageView from "~/components/MessageView";

export default function Home() {
	return (
		<main class="text-center mx-auto text-sky-700 p-4 font-thin">
			<h1 class="text-6xl uppercase my-16 underline underline-offset-auto">Live Logger</h1>
			<div class="text-center mx-4 py-5">
				<p>Welcome to the Live Logger application!</p>
				<p>
					Click the <strong>"Download"</strong> button to download the log as a CSV file.
				</p>
				<p class="italic">
					Add a <strong>"Log Title"</strong> to customize your downloaded filename
					(default="log-messages.csv").
				</p>
			</div>

			<MessageView />
		</main>
	);
}
