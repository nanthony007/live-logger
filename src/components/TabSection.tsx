import { For, Show } from "solid-js";
import { TabButton } from "./TabButton";

/** Tab Component */
type TabSectionProps = {
	tabCount: number;
	selectedTab: number;
	incrementTabCount: () => void;
	decrementTabCount: () => void;
	selectedHandler: (idx: number) => void;
};

export function TabSection(props: TabSectionProps) {
	return (
		<>
			<div class="flex justify-center space-x-8 py-2">
				<Show when={props.tabCount > 1}>
					<button
						type="button"
						class="bg-red-700 hover:bg-red-500 active:bg-red-500 text-white font-bold rounded-2xl"
						onClick={props.decrementTabCount}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-8"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>
					</button>
				</Show>
				<Show when={props.tabCount < 3}>
					<button
						type="button"
						class="bg-sky-700 hover:bg-sky-500 active:bg-sky-500 text-white font-bold rounded-2xl"
						onClick={props.incrementTabCount}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-8"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>
					</button>
				</Show>
			</div>
			<div
				class="flex flex-row w-full sm:w-3/4 md:wd-2/3 mx-auto"
				classList={
					props.tabCount == 1
						? {
								"justify-center": true,
								"justify-around": false,
						  }
						: {
								"justify-center": false,
								"justify-around": true,
						  }
				}
			>
				<For
					each={[...Array(props.tabCount).keys()].map((x) => x + 1)}
					fallback={<span>No tabs</span>}
				>
					{(tab, index) => (
						<TabButton
							label={`Session ${tab}`}
							isActive={props.selectedTab == tab}
							onClick={() => props.selectedHandler(index() + 1)}
						/>
					)}
				</For>
			</div>
		</>
	);
}
