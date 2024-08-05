let startStopButton = document.getElementById('startStop');
let resetButton = document.getElementById('reset');
let hoursDisplay = document.getElementById('hours');
let minutesDisplay = document.getElementById('minutes');
let secondsDisplay = document.getElementById('seconds');
let historyList = document.getElementById('historyList');

let interval;
let seconds = 0;
let minutes = 0;
let hours = 0;
let isRunning = false;

function updateDisplay() {
    hoursDisplay.textContent = String(hours).padStart(2, '0');
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function startStopwatch() {
    if (isRunning) return;
    isRunning = true;
    interval = setInterval(() => {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        updateDisplay();
    }, 1000);
}

function stopStopwatch() {
    isRunning = false;
    clearInterval(interval);
    addToHistory();
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();
}

function addToHistory() {
    let listItem = document.createElement('li');
    listItem.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    historyList.appendChild(listItem);
}

startStopButton.addEventListener('click', () => {
    if (isRunning) {
        stopStopwatch();
        startStopButton.textContent = 'Start';
    } else {
        startStopwatch();
        startStopButton.textContent = 'Stop';
    }
});

resetButton.addEventListener('click', resetStopwatch);
