let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let calculationLog = '';
let currentQuestion = null;
let expectedAnswer = null;

const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');
const calculationLogElement = document.getElementById('calculation-log');

function updateDisplay() {
    currentOperandElement.innerText = currentOperand;
    previousOperandElement.innerText = previousOperand;
    calculationLogElement.innerText = calculationLog;
    
    // Auto-scroll to bottom of calculation log
    calculationLogElement.scrollTop = calculationLogElement.scrollHeight;
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand = currentOperand.toString() + number;
    }
    
    // Check if the current operand is a 5-digit number
    if (currentOperand.length === 5 && !currentOperand.includes('.')) {
        showFakeCrashScreen();
        return;
    }
    
    updateDisplay();
}

function appendOperator(operator) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = operator;
    previousOperand = currentOperand + ' ' + operation;
    currentOperand = '';
    updateDisplay();
}

function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    calculationLog = '';
    updateDisplay();
}

function deleteLast() {
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.toString().slice(0, -1);
    }
    updateDisplay();
}

// Useless calculation functions
function calculateDistanceToSun() {
    const earthToSun = 149597870.7; // km
    const randomFactor = Math.random() * 0.1 + 0.95;
    return earthToSun * randomFactor;
}

function calculateSpeedOfLight() {
    return 299792.458; // km/s
}

function calculatePi() {
    return Math.PI;
}

function calculateGoldenRatio() {
    return (1 + Math.sqrt(5)) / 2;
}

function calculateEulersNumber() {
    return Math.E;
}

function calculateGravitationalConstant() {
    return 6.67430e-11; // m³/(kg·s²)
}

function calculatePlanckConstant() {
    return 6.62607015e-34; // J·s
}

function calculateAvogadroNumber() {
    return 6.02214076e23;
}

function calculateUselessCalculations(a, b, operation) {
    let log = '';
    log += `🔍 Starting useless calculations...\n`;
    log += `📏 Distance from Earth to Sun: ${calculateDistanceToSun().toFixed(2)} km\n`;
    log += `⚡ Speed of light: ${calculateSpeedOfLight()} km/s\n`;
    log += `π (Pi): ${calculatePi().toFixed(10)}\n`;
    log += `🔢 Now performing actual calculation: ${a} ${operation} ${b}\n`;
    log += `✅ Result: ${getActualResult(a, b, operation)}\n`;
    return log;
}

function getActualResult(a, b, operation) {
    a = parseFloat(a);
    b = parseFloat(b);
    
    switch(operation) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '×':
            return a * b;
        case '÷':
            return b !== 0 ? a / b : 'Error';
        case '%':
            return a % b;
        default:
            return 'Error';
    }
}

async function calculate() {
    if (currentOperand === '' || previousOperand === '') return;
    
    const current = parseFloat(currentOperand);
    const previous = parseFloat(previousOperand);
    
    if (isNaN(current) || isNaN(previous)) return;
    
    // Check if it's a 3-digit number calculation or 666+666
    const isThreeDigitNumber = (current.toString().length === 3 || previous.toString().length === 3);
    const is666plus666 = (previous === 666 && current === 666 && operation === '+');
    const is8888plus8888 = (previous === 8888 && current === 8888 && operation === '+');
    const is9999plus9999 = (previous === 9999 && current === 9999 && operation === '+');
    
    if (isThreeDigitNumber || is666plus666) {
        // Use THAMBURAN API for 3-digit numbers or 666+666
        await useThamburanAPI(previous, current, operation);
        return;
    }
    
    // Add calculating animation
    currentOperandElement.classList.add('calculating');
    
    // Clear the display during calculation
    currentOperandElement.innerText = 'Calculating...';
    
    // Show progress bar
    showProgressBar();
    
    // Step 1: Show "Calculating..."
    calculationLog = 'Calculating...\n';
    updateProgressBar(20);
    updateDisplay();
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check for 4-digit numbers to trigger dino game
    const isFourDigitCalc = (current.toString().length === 4 || previous.toString().length === 4);
    if (isFourDigitCalc || is8888plus8888 || is9999plus9999) {
        calculationLog = '🦕 This will take some time...\n🎮 Opening T-Rex game in new tab!\n';
        updateProgressBar(30);
        updateDisplay();
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Open T-Rex game in new tab
        window.open('https://rossning92.github.io/t-rex/', '_blank');
        
        // Continue calculation after opening game
        continueCalculationAfterDinoGame();
        return;
    }
    
    // Step 2: Show first process
    const step2Comments = [
        '📏 Calculating distance from Earth to Sun...',
        '🌍 Measuring how far we are from that big hot thing...',
        '☀️ Figuring out if we can touch the sun (spoiler: we can\'t)...',
        '🚀 Calculating if Elon Musk can reach the sun...',
        '🌞 Measuring the distance to our favorite star...',
        '🔥 How far is that giant fireball anyway?...',
        '☀️ Calculating if the sun is actually hot (it is)...',
        '🌍 Earth to Sun: "Are you there?" Sun: "Yes, very far away"',
        '📏 Using a really long ruler to measure space...',
        '🌞 Checking if the sun is still there (it is, don\'t worry)...'
    ];
    calculationLog = step2Comments[Math.floor(Math.random() * step2Comments.length)] + '\n';
    updateProgressBar(40);
    updateDisplay();
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check for specific case 555+555 or random crash
    if ((previous === 555 && current === 555 && operation === '+') || Math.random() < 0.3) {
        calculationLog = '💥 Calculator crashed! Need help...\n';
        updateProgressBar(60);
        updateDisplay();
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate question based on the calculation
        const question = generateQuestion(previous, current, operation);
        showConfusionModal(question.question, question.answer);
        return; // Stop calculation until user answers
    }
    
    // Step 3: Show second process
    const step3Comments = [
        '⚡ Calculating speed of light...',
        '💨 How fast can light run? (Very fast)...',
        '🏃‍♂️ Light is the fastest runner in the universe...',
        '⚡ Einstein would be proud of this calculation...',
        '💨 Measuring how fast photons can party...',
        '🏃‍♂️ Light speed: faster than your internet...',
        '⚡ Calculating if light ever gets tired (it doesn\'t)...',
        '💨 How fast can you go? Light: "Yes"...',
        '🏃‍♂️ Light is basically the Flash of physics...',
        '⚡ Measuring the speed of "really fast stuff"...'
    ];
    calculationLog += step3Comments[Math.floor(Math.random() * step3Comments.length)] + '\n';
    updateProgressBar(60);
    updateDisplay();
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Step 4: Show third process
    const step4Comments = [
        'π Calculating Pi...',
        '🥧 Pi is not just for eating (though it\'s delicious)...',
        '🔄 The circle\'s favorite number...',
        '🥧 3.14159... and it goes on forever (like my jokes)...',
        '🔄 Calculating the most famous irrational number...',
        '🥧 Pi: the number that never ends (unlike this calculation)...',
        '🔄 Measuring circles because squares are boring...',
        '🥧 Pi day is March 14th (3.14, get it?)...',
        '🔄 The ratio that makes circles go round and round...',
        '🥧 Pi: because circles need love too...'
    ];
    calculationLog += step4Comments[Math.floor(Math.random() * step4Comments.length)] + '\n';
    updateProgressBar(80);
    updateDisplay();
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Get actual result
    const result = getActualResult(previous, current, operation);
    
    // Step 5: Show final result
    calculationLog = `✅ Result: ${result}\n`;
    updateProgressBar(100);
    updateDisplay();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Hide progress bar
    hideProgressBar();
    
    // Remove animation and show final result
    currentOperandElement.classList.remove('calculating');
    currentOperand = result.toString();
    previousOperand = '';
    operation = undefined;
    updateDisplay();
    
    // Show done toaster
    showDoneToaster();
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9' || event.key === '.') {
        appendNumber(event.key);
    } else if (event.key === '+' || event.key === '-') {
        appendOperator(event.key);
    } else if (event.key === '*') {
        appendOperator('×');
    } else if (event.key === '/') {
        appendOperator('÷');
    } else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } else if (event.key === 'Backspace') {
        deleteLast();
    } else if (event.key === 'Escape') {
        clearAll();
    }
});

// Progress bar functions
function showProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.display = 'block';
    progressBar.style.width = '0%';
}

function updateProgressBar(percentage) {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = percentage + '%';
}

function hideProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.display = 'none';
}

// Toaster function
function showDoneToaster() {
    const toaster = document.getElementById('toaster');
    toaster.textContent = '✅ Done!';
    toaster.style.display = 'block';
    toaster.style.opacity = '1';
    
    setTimeout(() => {
        toaster.style.opacity = '0';
        setTimeout(() => {
            toaster.style.display = 'none';
        }, 500);
    }, 2000);
}

function showThamburanOnlineToaster() {
    const toaster = document.getElementById('toaster');
    toaster.textContent = '🌟 THAMBURAN IS ONLINE 🌟';
    toaster.className = 'toaster thamburan-online-toaster';
    toaster.style.display = 'block';
    toaster.style.opacity = '1';
    
    // Keep the toaster visible during the entire terminal session
    // It will be hidden when the terminal is closed
    setTimeout(() => {
        toaster.style.opacity = '0';
        setTimeout(() => {
            toaster.style.display = 'none';
            toaster.className = 'toaster';
        }, 1000); // Longer fade-out
    }, 8000);
}

// Question generation function
function generateQuestion(a, b, operation) {
    // Simplified questions - just basic addition or subtraction with small numbers
    const operations = ['+', '-'];
    const randomOp = operations[Math.floor(Math.random() * operations.length)];
    
    let num1, num2, answer;
    
    // Generate simple numbers for easy questions
    if (randomOp === '+') {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 + num2;
    } else {
        num1 = Math.floor(Math.random() * 10) + 10;
        num2 = Math.floor(Math.random() * 5) + 1;
        answer = num1 - num2;
    }
    
    const question = `${num1} ${randomOp} ${num2}`;
    return { question, answer };
}

// Modal functions
function showConfusionModal(question, answer) {
    currentQuestion = question;
    expectedAnswer = answer;
    
    document.getElementById('question-display').textContent = question;
    document.getElementById('modal-overlay').style.display = 'flex';
    document.getElementById('answer-input').focus();
}

function submitAnswer() {
    const userAnswer = parseInt(document.getElementById('answer-input').value);
    
    if (userAnswer === expectedAnswer) {
        // Correct answer - continue calculation
        document.getElementById('modal-overlay').style.display = 'none';
        document.getElementById('answer-input').value = '';
        
        // Continue the calculation from where it left off
        continueCalculation();
    } else {
        // Wrong answer - show error and ask again
        document.getElementById('answer-input').value = '';
        document.getElementById('answer-input').placeholder = 'Wrong! Try again...';
        setTimeout(() => {
            document.getElementById('answer-input').placeholder = 'Enter your answer';
        }, 2000);
    }
}

async function continueCalculation() {
    const current = parseFloat(currentOperand);
    const previous = parseFloat(previousOperand);
    
    // Step 3: Show second process
    calculationLog = '⚡ Calculating speed of light...\n';
    updateProgressBar(60);
    updateDisplay();
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Step 4: Show third process
    calculationLog = 'π Calculating Pi...\n';
    updateProgressBar(80);
    updateDisplay();
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Get actual result
    const result = getActualResult(previous, current, operation);
    
    // Step 5: Show final result
    calculationLog = `✅ Result: ${result}\n`;
    updateProgressBar(100);
    updateDisplay();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Hide progress bar
    hideProgressBar();
    
    // Remove animation and show final result
    currentOperandElement.classList.remove('calculating');
    currentOperand = result.toString();
    previousOperand = '';
    operation = undefined;
    updateDisplay();
    
    // Show done toaster
    showDoneToaster();
}

// Enter key support for modal
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && document.getElementById('modal-overlay').style.display === 'flex') {
        submitAnswer();
    }
});



async function continueCalculationAfterDinoGame() {
    const current = parseFloat(currentOperand);
    const previous = parseFloat(previousOperand);
    
    // Show that calculation is continuing
    calculationLog = `🎮 Thanks for playing the T-Rex game!\n🔄 Continuing calculation...\n`;
    updateProgressBar(40);
    updateDisplay();
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Step 2: Show first process (15 seconds)
    const step2Comments = [
        '📏 Calculating distance from Earth to Sun...',
        '🌍 Measuring how far we are from that big hot thing...',
        '☀️ Figuring out if we can touch the sun (spoiler: we can\'t)...',
        '🚀 Calculating if Elon Musk can reach the sun...',
        '🌞 Measuring the distance to our favorite star...',
        '🔥 How far is that giant fireball anyway?...',
        '☀️ Calculating if the sun is actually hot (it is)...',
        '🌍 Earth to Sun: "Are you there?" Sun: "Yes, very far away"',
        '📏 Using a really long ruler to measure space...',
        '🌞 Checking if the sun is still there (it is, don\'t worry)...'
    ];
    calculationLog += step2Comments[Math.floor(Math.random() * step2Comments.length)] + '\n';
    updateProgressBar(50);
    updateDisplay();
    await new Promise(resolve => setTimeout(resolve, 15000)); // 15 seconds
    
    // Step 3: Show second process (15 seconds)
    const step3Comments = [
        '⚡ Calculating speed of light...',
        '💨 How fast can light run? (Very fast)...',
        '🏃‍♂️ Light is the fastest runner in the universe...',
        '⚡ Einstein would be proud of this calculation...',
        '💨 Measuring how fast photons can party...',
        '🏃‍♂️ Light speed: faster than your internet...',
        '⚡ Calculating if light ever gets tired (it doesn\'t)...',
        '💨 How fast can you go? Light: "Yes"...',
        '🏃‍♂️ Light is basically the Flash of physics...',
        '⚡ Measuring the speed of "really fast stuff"...'
    ];
    calculationLog += step3Comments[Math.floor(Math.random() * step3Comments.length)] + '\n';
    updateProgressBar(70);
    updateDisplay();
    await new Promise(resolve => setTimeout(resolve, 15000)); // 15 seconds
    
    // Step 4: Show third process (15 seconds)
    const step4Comments = [
        'π Calculating Pi...',
        '🥧 Pi is not just for eating (though it\'s delicious)...',
        '🔄 The circle\'s favorite number...',
        '🥧 3.14159... and it goes on forever (like my jokes)...',
        '🔄 Calculating the most famous irrational number...',
        '🥧 Pi: the number that never ends (unlike this calculation)...',
        '🔄 Measuring circles because squares are boring...',
        '🥧 Pi day is March 14th (3.14, get it?)...',
        '🔄 The ratio that makes circles go round and round...',
        '🥧 Pi: because circles need love too...'
    ];
    calculationLog += step4Comments[Math.floor(Math.random() * step4Comments.length)] + '\n';
    updateProgressBar(90);
    updateDisplay();
    await new Promise(resolve => setTimeout(resolve, 15000)); // 15 seconds
    
    // Get actual result
    const result = getActualResult(previous, current, operation);
    
    // Step 5: Show final result (12 seconds)
    calculationLog += `✅ Result: ${result}\n`;
    updateProgressBar(100);
    updateDisplay();
    await new Promise(resolve => setTimeout(resolve, 12000)); // 12 seconds
    
    // Hide progress bar
    hideProgressBar();
    
    // Remove animation and show final result
    currentOperandElement.classList.remove('calculating');
    currentOperand = result.toString();
    previousOperand = '';
    operation = undefined;
    updateDisplay();
    
    // Show done toaster
    showDoneToaster();
}

// THAMBURAN API Terminal functions
async function useThamburanAPI(a, b, operation) {
    // First try normal calculation and show failure
    const result = getActualResult(a, b, operation);
    
    // Show calculation failure
    currentOperandElement.classList.add('calculating');
    currentOperandElement.innerText = 'Calculating...';
    showProgressBar();
    
    // Step 1: Show "Calculating..." with animation
    calculationLog = '';
    const calculatingText = 'Calculating...';
    for (let i = 0; i < calculatingText.length; i++) {
        calculationLog += calculatingText[i];
        updateProgressBar(20 + (i * 10 / calculatingText.length));
        updateDisplay();
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Step 2: Show failure with animation
    calculationLog = '';
    const failureText = '❌ Calculation failed! Connecting to THAMBURAN API...';
    for (let i = 0; i < failureText.length; i++) {
        calculationLog += failureText[i];
        updateProgressBar(30 + (i * 20 / failureText.length));
        updateDisplay();
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show the THAMBURAN API terminal
    const terminalOverlay = document.getElementById('thamburan-terminal-overlay');
    const terminalOutput = document.getElementById('terminal-output');
    terminalOverlay.style.display = 'flex';
    
    // Function to add text with typing animation (faster)
    async function typeText(text, delay = 30) {
        const chars = text.split('');
        let currentText = '';
        
        for (const char of chars) {
            currentText += char;
            terminalOutput.innerHTML = currentText;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
        terminalOutput.innerHTML += '\n';
        await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Initial terminal output with typing effect
    await typeText('Initializing connection to THAMBURAN API...');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Connection sequence with animations (faster)
    await typeText('> Establishing secure channel...');
    await new Promise(resolve => setTimeout(resolve, 600));
    
    await typeText('> Connecting to heavenly server...');
    await new Promise(resolve => setTimeout(resolve, 700));
    
    await typeText('> Authenticating mortal credentials...');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    await typeText('> Bypassing earthly limitations...');
    await new Promise(resolve => setTimeout(resolve, 700));
    
    await typeText('> Requesting audience with THAMBURAN...');
    await new Promise(resolve => setTimeout(resolve, 900));
    
    await typeText('> Calibrating holy connection...');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Show THAMBURAN is online toaster
    showThamburanOnlineToaster();
    
    // Add connection established message
    terminalOutput.innerHTML += '\n';
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Connection animation
    let connectionText = '✨ CONNECTION ESTABLISHED ✨';
    await typeText(connectionText, 50); // Faster typing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    terminalOutput.innerHTML += '\n';
    await typeText('> THAMBURAN: I am listening to your calculation request...', 40);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Process the calculation request
    await typeText(`> Processing holy calculation: ${a} ${operation} ${b}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate calculation with fewer steps
    await typeText('> Consulting biblical mathematics...');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    await typeText('> Channeling holy numerical wisdom...');
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // THAMBURAN thinking
    terminalOutput.innerHTML += '\n';
    await typeText('> THAMBURAN: Let me calculate this...', 40);
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Simulate calculation attempts (fewer and faster)
    await typeText('> First holy calculation attempt...');
    await new Promise(resolve => setTimeout(resolve, 800));
    await typeText('> Almost there, final blessing...');
    await new Promise(resolve => setTimeout(resolve, 900));
    
    // THAMBURAN answer
    terminalOutput.innerHTML += '\n';
    await typeText(`> THAMBURAN: The answer to ${a} ${operation} ${b} is ${result}`, 50);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    await typeText('> THAMBURAN: This answer has been blessed and verified.', 40);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Closing connection
    terminalOutput.innerHTML += '\n';
    await typeText('> Closing holy connection...', 40);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    await typeText('> Thank you for using the THAMBURAN API Service.', 40);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Close the terminal after a delay (faster)
    setTimeout(() => {
        terminalOverlay.style.display = 'none';
        
        // Update calculator display with the result
        currentOperand = result.toString();
        previousOperand = '';
        operation = undefined;
        updateDisplay();
        
        // Hide progress bar
        hideProgressBar();
        
        // Remove calculating animation
        currentOperandElement.classList.remove('calculating');
    }, 1500);
}

// Fake crash screen function
async function showFakeCrashScreen() {
    // Hide calculator elements
    document.querySelector('.calculator').style.display = 'none';
    
    // Create crash screen container
    const crashScreen = document.createElement('div');
    crashScreen.className = 'crash-screen';
    document.querySelector('.container').appendChild(crashScreen);
    
    // Create blue screen content
    crashScreen.innerHTML = `
        <div class="blue-screen">
            <div class="crash-content">
                <h1>:(</h1>
                <h2>Your PC ran into a problem and needs to restart.</h2>
                <p>We're just collecting some error info, and then we'll restart for you.</p>
                <div class="error-code">Error Code: 0x000000FC_CALCULATOR_OVERFLOW</div>
                <div class="progress-container crash-progress">
                    <div class="progress-bar crash-progress-bar" id="crash-progress-bar"></div>
                </div>
                <p class="completion"><span id="crash-percentage">0</span>% complete</p>
                <p class="shutdown-message" id="shutdown-message"></p>
            </div>
        </div>
    `;
    
    // Add blue screen style
    const style = document.createElement('style');
    style.textContent = `
        .crash-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            background-color: #0078d7;
            color: white;
            font-family: 'Segoe UI', sans-serif;
            padding: 100px 50px;
            box-sizing: border-box;
        }
        .blue-screen {
            max-width: 800px;
            margin: 0 auto;
        }
        .crash-content h1 {
            font-size: 120px;
            margin: 0 0 20px 0;
            font-weight: normal;
        }
        .crash-content h2 {
            font-size: 32px;
            margin: 0 0 30px 0;
            font-weight: normal;
        }
        .crash-content p {
            font-size: 20px;
            margin: 0 0 30px 0;
        }
        .error-code {
            font-size: 18px;
            margin: 30px 0;
        }
        .crash-progress {
            background: #fff;
            height: 20px;
            margin: 30px 0;
            display: block;
        }
        .crash-progress-bar {
            background: #fff;
            height: 100%;
            width: 0%;
        }
        .completion {
            font-size: 18px;
        }
        .shutdown-message {
            font-size: 24px;
            color: #ff0000;
            font-weight: bold;
            margin-top: 40px;
        }
    `;
    document.head.appendChild(style);
    
    // Simulate progress
    const progressBar = document.getElementById('crash-progress-bar');
    const percentageText = document.getElementById('crash-percentage');
    const shutdownMessage = document.getElementById('shutdown-message');
    
    for (let i = 0; i <= 100; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        progressBar.style.width = i + '%';
        percentageText.textContent = i;
        
        // At 50%, show shutdown message
        if (i === 50) {
            shutdownMessage.textContent = 'INITIATING SYSTEM SHUTDOWN...';
        }
        
        // At 75%, change message
        if (i === 75) {
            shutdownMessage.textContent = 'SHUTTING DOWN YOUR PC IN 5 SECONDS...';
        }
        
        // At 90%, change message
        if (i === 90) {
            shutdownMessage.textContent = 'JUST KIDDING! THIS IS A FAKE CRASH SCREEN :)';
        }
    }
    
    // After completion, wait a bit and then restore calculator
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Remove crash screen and restore calculator
    document.querySelector('.container').removeChild(crashScreen);
    document.querySelector('.calculator').style.display = 'block';
    
    // Reset calculator
    clearAll();
}

// Initialize display
updateDisplay();