import type { Component } from "solid-js";
import { createStore } from "solid-js/store";

import { JSX, Match, Switch, onMount } from "solid-js";
import { TabSection } from "./components/TabSection";
import { LogView } from "./components/LogView";

type AppStore = {
	tabCount: number;
	selectedTab: number;
	tabOptions: Array<() => JSX.Element>;
};

const App: Component = () => {
	const [store, setStore] = createStore<AppStore>({
		tabCount: 1,
		selectedTab: 1,
		tabOptions: [],
	});
	onMount(() => {
		setStore("tabOptions", store.tabOptions.length, () => <LogView />);
	});

	function incrementTabCount() {
		setStore("tabCount", store.tabCount + 1);
		setStore("tabOptions", store.tabOptions.length, () => <LogView />);
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
		<div class="text-center mx-auto text-sky-700 p-4 font-thin">
			<h1 class="text-6xl uppercase py-4 underline underline-offset-auto">Live Logger</h1>

			<TabSection
				tabCount={store.tabCount}
				selectedTab={store.selectedTab}
				incrementTabCount={incrementTabCount}
				decrementTabCount={decrementTabCount}
				selectedHandler={(idx) => setStore("selectedTab", idx)}
			/>

			<Switch fallback={<div>Tab not found</div>}>
				<Match when={store.selectedTab == 1}>
					<LogView />
				</Match>
				<Match when={store.selectedTab == 2}>
					<LogView />
				</Match>
				<Match when={store.selectedTab == 3}>
					<LogView />
				</Match>
			</Switch>
			{/* <Dynamic component={store.tabOptions.find((_, idx) => idx == store.selectedTab - 1)} /> */}

			{/* <LogView /> */}
		</div>
	);
};

export default App;
