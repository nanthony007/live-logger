export class Message {
	num: number;
	text: string;
	timestamp: Date;
	elapsed: number;

	constructor(num: number, text: string) {
		this.num = num;
		this.text = text.trim();
		this.timestamp = new Date();
		this.elapsed = 0.0;
	}

	setElapsed(original: Message) {
		let timeDiff = original ? this.timestamp.getTime() - original.timestamp.getTime() : 0;
		if (timeDiff > 0) {
			// convert timeDiff to seconds
			let seconds = timeDiff / 1000;
			this.elapsed = seconds;
		} else {
			this.elapsed = 0.0;
		}
	}

	toJSON() {
		return {
			num: this.num,
			text: this.text,
			timestamp: this.timestamp.toUTCString(),
			elapsed: this.elapsed,
		};
	}

	static fromJSON(json: any) {
		let m = new Message(json.num, json.text);
		// overwrite timestamp and elapsed
		m.timestamp = new Date(json.timestamp);
		m.elapsed = json.elapsed;
		return m;
	}
}
