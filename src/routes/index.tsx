import MessageView from "~/components/MessageView";

export default function Home() {
	return (
		<main class="text-center mx-auto text-sky-700 p-4 font-thin">
			<h1 class="text-6xl uppercase py-4 underline underline-offset-auto">Live Logger</h1>
			<div class="text-center mx-4 py-2">
				<p>Welcome to the Live Logger application!</p>
				<p>
					Click the <span class="font-bold">"Download"</span> button to download the log as a CSV
					file. Add a <span class="italic">"File Name"</span> to customize your downloaded filename.
				</p>
			</div>

			<MessageView />
		</main>
	);
}
