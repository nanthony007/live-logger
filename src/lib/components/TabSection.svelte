<script lang="ts">
	interface Props {
		selectedTab: number;
		totalTabs: number;
		addTabCallback: () => void;
		deleteTabCallback: () => void;
	}

	let {
		selectedTab = $bindable(),
		totalTabs = $bindable(),
		addTabCallback,
		deleteTabCallback,
	}: Props = $props();

	function handleDecrement() {
		// if selected tab is last, move selected
		if (totalTabs - 1 === selectedTab) {
			totalTabs = totalTabs - 1;
			selectedTab = selectedTab - 1;
		} else {
			// otherwise just pop it off
			totalTabs = totalTabs - 1;
		}
		deleteTabCallback();
	}

	function handleIncrement() {
		totalTabs = totalTabs + 1;
		addTabCallback();
	}
</script>

<div class="flex justify-center space-x-8 py-2">
	{#if totalTabs > 1}
		<button
			type="button"
			aria-label="remove tab"
			class="bg-red-700 hover:bg-red-500 active:bg-red-500 text-white font-bold rounded-2xl"
			onclick={() => handleDecrement()}
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
	{/if}
	{#if totalTabs < 3}
		<button
			type="button"
			aria-label="add tab"
			class="bg-sky-700 hover:bg-sky-500 active:bg-sky-500 text-white font-bold rounded-2xl"
			onclick={() => handleIncrement()}
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
	{/if}
</div>
{#if totalTabs === 1}
	<div class="flex flex-row w-full sm:w-3/4 md:wd-2/3 mx-auto justify-center">
		{#each [...Array(totalTabs).keys()] as tabLabel}
			{#if selectedTab === tabLabel}
				<button type="button" class="font-bold text-white rounded px-4 py-2 bg-sky-500 underline">
					Session {tabLabel + 1}
				</button>
			{:else}
				<button
					type="button"
					class="font-bold text-white rounded px-4 py-2 bg-slate-500"
					onclick={() => (selectedTab = tabLabel)}
				>
					Session {tabLabel + 1}
				</button>
			{/if}
		{/each}
	</div>
{:else}
	<div class="flex flex-row w-full sm:w-3/4 md:wd-2/3 mx-auto justify-around">
		{#each [...Array(totalTabs).keys()] as tabLabel}
			{#if selectedTab === tabLabel}
				<button type="button" class="font-bold text-white rounded px-4 py-2 bg-sky-500 underline">
					Session {tabLabel + 1}
				</button>
			{:else}
				<button
					type="button"
					class="font-bold text-white rounded px-4 py-2 bg-slate-500"
					onclick={() => (selectedTab = tabLabel)}
				>
					Session {tabLabel + 1}
				</button>
			{/if}
		{/each}
	</div>
{/if}
