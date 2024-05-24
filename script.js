document.getElementById('spin-button').addEventListener('click', () => {
    spinSlotMachine().then((result) => {
        alert(`Slot machine result: ${result}`);
    });
});

function spinSlotMachine() {
    return new Promise((resolve) => {
        const numberDisplay = document.getElementById('number-display');
        const targetNumber = Math.floor(Math.random() * 20000) + 1;
        const targetNumberStr = targetNumber.toString().padStart(5, '0');

        let currentDigits = Array.from(numberDisplay.textContent);
        let targetDigits = Array.from(targetNumberStr);

        let spinCount = 0;
        const maxSpins = 50;
        const spinSpeed = 50;

        const interval = setInterval(() => {
            spinCount++;
            for (let i = 0; i < currentDigits.length; i++) {
                if (spinCount < maxSpins) {
                    currentDigits[i] = Math.floor(Math.random() * 10).toString();
                } else {
                    currentDigits[i] = targetDigits[i];
                }
            }
            numberDisplay.textContent = currentDigits.join('');
            if (spinCount >= maxSpins) {
                clearInterval(interval);
                resolve(targetNumberStr); // Resolve the promise with the final result
            }
        }, spinSpeed);
    });
}
