import { createStore } from "solid-js/store";
import { Dynamic } from "solid-js/web";

import { TabSection } from "~/components/TabSection";
import { LogView } from "~/components/LogView";
import { JSX, Match, Switch, createMemo, onMount } from "solid-js";

type PageStore = {
	tabCount: number;
	selectedTab: number;
	tabOptions: Array<JSX.Element>;
};

export default function Home() {
	const [store, setStore] = createStore<PageStore>({
		tabCount: 1,
		selectedTab: 1,
		tabOptions: [],
	});
	onMount(() => {
		setStore("tabOptions", store.tabOptions.length, <LogView />);
	});
	// const currentTab = createMemo(() =>
	// 	store.tabOptions.find((_, idx) => idx == store.selectedTab - 1)
	// );
	function incrementTabCount() {
		setStore("tabCount", store.tabCount + 1);
		setStore("tabOptions", store.tabOptions.length, <LogView />);
	}
	function decrementTabCount() {
		// if selected tab is last tab, decrement selected tab
		if (store.tabCount == store.selectedTab) {
			setStore("selectedTab", store.selectedTab - 1);
		}
		setStore("tabCount", store.tabCount - 1);
		setStore("tabOptions", store.tabOptions.slice(0, -1));
	}

	return (
		<main class="text-center mx-auto text-sky-700 p-4 font-thin">
			<h1 class="text-6xl uppercase py-4 underline underline-offset-auto">Live Logger</h1>

			<TabSection
				tabCount={store.tabCount}
				selectedTab={store.selectedTab}
				incrementTabCount={incrementTabCount}
				decrementTabCount={decrementTabCount}
				selectedHandler={(idx) => setStore("selectedTab", idx)}
			/>

			<Switch fallback={<div class="text-red-500">404</div>}>
				<Match when={store.selectedTab == 1}>{store.tabOptions[0]}</Match>
				<Match when={store.selectedTab == 2}>{store.tabOptions[1]}</Match>
				<Match when={store.selectedTab == 3}>{store.tabOptions[2]}</Match>
			</Switch>

			{/* <Dynamic component={currentTab()} /> */}
		</main>
	);
}
