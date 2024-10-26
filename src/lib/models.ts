export interface Message {
	num: number;
	text: string;
	timestamp: Date;
	elapsed: number;
}

export interface TabData {
	messages: Message[];
	fileName: string;
}

export function initializeEmptyTab(): TabData {
	const d: TabData = {
		messages: [],
		fileName: "",
	};
	return d;
}

export interface AppData {
	tabCount: number;
	activeTabIndex: number;
	tabData: TabData[];
}

export function getElapsed(original: Date, current: Date): number {
	let timeDiff = current.getTime() - original.getTime();
	if (timeDiff > 0) {
		// convert timeDiff to seconds
		let seconds = timeDiff / 1000;
		return seconds;
	} else {
		return 0.0;
	}
}

export function formatElapsed(elapsed: number): string {
	if (elapsed > 3600) {
		// hours
		let h = Math.floor(elapsed / 3600);
		let m = Math.floor((elapsed % 3600) / 60);
		let s = Math.floor(elapsed % 60);
		return `${h}h:${m}m:${s}s`;
	} else if (elapsed > 60) {
		// minutes
		let m = Math.floor(elapsed / 60);
		let s = Math.floor(elapsed % 60);
		return `${m}m:${s}s`;
	} else {
		// seconds
		return `${elapsed}s`;
	}
}
