// Variables
let cookiesCounter = 0;
let costs = [10, 100, 1000, 5000, 100000];
let levels = [1, 1, 1, 1, 1];
let upgrades = [0.1, 1, 5, 10, 100];
let cookiesPerClick = 1;
let cookiesPerSec = 0;

// Selectors
const cookie = document.querySelector('#cookie');
const producedCookies = document.querySelector('#produced-cookies');
const CPCSelector = document.querySelector('#cookies-per-click');
const CPSSelector = document.querySelector('#cookies-per-sec');
const buttons = [
    document.querySelector('#button-1'),
    document.querySelector('#button-2'),
    document.querySelector('#button-3'),
    document.querySelector('#button-4'),
    document.querySelector('#button-5'),
];

// Event Listener for cookie click
cookie.addEventListener('click', () => {
    // animation for clicked cookie
    cookie.classList.add('cookie-clicked');
    setTimeout(() => cookie.classList.remove('cookie-clicked'), 50);

    cookiesCounter += cookiesPerClick;
    updateDisplay();

    // check for bonuses' availability
    checkIfBonusesAvailable();
});

// Event Listener for Level-Up Buttons click
for(let i=1; i<=5; i++){
    buttons.at(i-1).addEventListener('click', () => {
        if(buttons.at(i-1).classList.contains('level-up-btn-available')){
            levels[i-1]++;
            cookiesPerSec += upgrades.at(i-1);
            cookiesCounter -= costs.at(i-1);
            costs[i-1] = Math.round(costs.at(i-1) * 1.3);
            updateDisplay();
            setValues();
            checkIfBonusesAvailable();
        }
    });
}

// Functions
function checkIfBonusesAvailable(){
    for(let i=1; i<=5; i++){
        if(Number(producedCookies.innerText) >= costs.at(i-1))
            document.querySelector('#button-'+i).classList.add('level-up-btn-available');
        else
            document.querySelector('#button-'+i).classList.remove('level-up-btn-available');
    }
}

function updateDisplay(){
    producedCookies.innerText = Math.round(cookiesCounter);
    CPSSelector.innerText = Math.round(10*cookiesPerSec)/10;
}

function setValues(){
    for(let i=1; i<=5; i++){
        let costId = '#bonus-' + i + '-cost';
        let levelId = '#bonus-' + i + '-level';
        let upgradeId = '#bonus-' + i + '-upgrade';
        document.querySelector(costId).innerText = costs.at(i-1);
        document.querySelector(levelId).innerText = levels.at(i-1);
        document.querySelector(upgradeId).innerText = upgrades.at(i-1);
    }
}

// Interval for cookies per sec
const interval = window.setInterval(function (){
    cookiesCounter += cookiesPerSec;
    updateDisplay();
    checkIfBonusesAvailable();

    // dynamically change amount of cookies in page tab
    document.title = '(' + Math.round(cookiesCounter) + ' cookies) Cookie Clicker';
}, 1000);

// Set all values at the start of the game
setValues();