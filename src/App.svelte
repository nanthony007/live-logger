<script lang="ts">
	import { onMount } from "svelte";
	import LogView from "./lib/components/LogView.svelte";
	import TabSection from "./lib/components/TabSection.svelte";
	import { initializeEmptyTab, type AppData, type TabData } from "./lib/models";

	function loadSessionOrFresh(): AppData {
		const previousData = window.sessionStorage.getItem("logger-data");
		console.log(previousData);
		if (previousData) {
			const parsed: AppData = JSON.parse(previousData);
			parsed.tabData.forEach((td) => {
				td.messages.forEach((m) => {
					m.timestamp = new Date(m.timestamp);
				});
			});
			console.log("loaded previous session data successfully");
			return parsed;
		} else {
			const d: AppData = {
				activeTabIndex: 0,
				tabCount: 1,
				// initialize all 3 of empty tabData
				tabData: [initializeEmptyTab()],
			};
			console.log("initialized new session data");
			return d;
		}
	}

	let appData: AppData = $state(loadSessionOrFresh());

	$effect(() => {
		setInterval(() => {
			window.sessionStorage.setItem("logger-data", JSON.stringify(appData));
		}, 1000);
	});

	function addTabData() {
		const d = initializeEmptyTab();
		appData.tabData.push(d);
		window.sessionStorage.setItem("logger-data", JSON.stringify(appData));
	}
	// only done from the end so we can just pop
	function deleteTabData() {
		const _ = appData.tabData.pop();
		window.sessionStorage.setItem("logger-data", JSON.stringify(appData));
	}

	$inspect(appData);
</script>

<main class="text-center mx-auto text-sky-700 p-4 font-thin">
	<h1 class="text-6xl uppercase py-4 underline underline-offset-auto">Live Logger</h1>

	<TabSection
		bind:selectedTab={appData.activeTabIndex}
		bind:totalTabs={appData.tabCount}
		addTabCallback={addTabData}
		deleteTabCallback={deleteTabData}
	/>

	<LogView bind:tabData={appData.tabData[appData.activeTabIndex]} />
</main>
