import { Message } from "./models";

export function downloadCsv(data: Message[], fileName: string = "log-messages.csv") {
	// convert to CSV
	let csv = "num,text,timestamp,elapsed\n";
	data.forEach((item) => {
		csv += `
        ${item.num},\
        ${item.text},\
        ${item.timestamp.toUTCString().replace(",", "")},\
        ${item.elapsed}\n\
        `;
	});
	let blob = new Blob([csv], { type: "text/csv" });
	let url = window.URL.createObjectURL(blob);
	let a = document.createElement("a");
	a.href = url;
	if (fileName.endsWith(".csv")) {
		a.download = fileName;
	} else {
		a.download = `${fileName}.csv`;
	}
	a.click();
	window.URL.revokeObjectURL(url);
}
