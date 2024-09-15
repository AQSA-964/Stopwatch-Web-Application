let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

document.getElementById("start-pause").addEventListener("click", startPause);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", recordLap);

function startPause() {
	if (isRunning) {
		clearInterval(timer);
		isRunning = false;
		document.getElementById("start-pause").innerText = "Start";
	} else {
		isRunning = true;
		startTime = Date.now() - elapsedTime;
		timer = setInterval(updateTime, 1000);
		document.getElementById("start-pause").innerText = "Pause";
	}
}

function reset() {
	clearInterval(timer);
	isRunning = false;
	elapsedTime = 0;
	laps = [];
	document.getElementById("display").innerText = "00:00:00";
	document.getElementById("start-pause").innerText = "Start";
	document.getElementById("laps").innerHTML = "";
}

function recordLap() {
	if (isRunning) {
		laps.push(elapsedTime);
		displayLaps();
	}
}

function updateTime() {
	elapsedTime = Date.now() - startTime;
	document.getElementById("display").innerText = formatTime(elapsedTime);
}

function formatTime(time) {
	const hours = Math.floor(time / (1000 * 60 * 60));
	const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((time % (1000 * 60)) / 1000);
	return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
	return number < 10 ? "0" + number : number;
}

function displayLaps() {
	const lapsContainer = document.getElementById("laps");
	lapsContainer.innerHTML = "";
	laps.forEach((lap, index) => {
		const lapElement = document.createElement("div");
		lapElement.className = "lap";
		lapElement.innerText = `Lap ${index + 1}: ${formatTime(lap)}`;
		lapsContainer.appendChild(lapElement);
	});
}
