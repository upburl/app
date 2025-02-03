document.getElementById('backButton').addEventListener('click', function () {
    // Add class to move the body down
    document.body.classList.add('move-down');

    // Wait for the animation to complete (1 second), then go back
    setTimeout(function () {
        window.history.back();
    }, 400); // Match this duration with the CSS transition time
});

document.getElementById("popup").classList.add("active");

const boost = document.getElementById('reset');
const colors = ['cyan', 'lightgreen', 'orange', 'yellow', 'pink', 'violet'];
let currentIndex = 0;

function changeColor() {
    boost.style.opacity = 0;
    setTimeout(() => {
        boost.style.backgroundColor = colors[currentIndex];
        boost.style.opacity = 1;
        currentIndex = (currentIndex + 1) % colors.length;
    }, 400);
}

setInterval(changeColor, 200);

function xyz() {
    setTimeout(() => {
        document.getElementById("popup").classList.remove("active");
    }, 1000);
}

const txt = document.getElementById('btntxt');
txt.innerText = "Redeem ";
txt.style.color = 'black';

boost.addEventListener('click', () => {
    window.location.href = "air.html";
});

const redtxt = document.querySelector('.air2');
redtxt.innerText = "⚠️ অ্যাপ uninstall করবেন না। অ্যাপ দিয়ে বিভিন্ন লেনদেনে $UPNXT পাবেন। অ্যাপটি uninstall করলে সমস্ত $UPNXT point চিরতরে চলে যাবে।";

const tapBtn = document.getElementById('tapBtn');
const scoreDisplay = document.getElementById('score');
const progressBar = document.getElementById('progressBar');
const progressDisplay = document.getElementById('progress');
const levelDisplay = document.getElementById('level');
const container = document.querySelector('.container');
tapBtn.style.display = 'none';

let score = document.getElementById('score').textContent;
let lastTapTime = 0;
let taptime = 200;

scoreDisplay.innerText = score;
updateLevelAndProgress();

tapBtn.addEventListener('click', () => {
    let booster = localStorage.getItem('booster') ? parseFloat(localStorage.getItem('booster')) : 1;

    if (booster >= 1) {
        alert(" Air Drop এ চাপ দিন💥");
        tapBtn.disabled = true;
        return;
    }

    const now = new Date().getTime();
    let cash = localStorage.getItem('cash') ? parseFloat(localStorage.getItem('cash')) : 0;

    let lbost = booster / 10 || 0.01;
    let finalBooster = (lbost + cash) || lbost;
    finalBooster = Math.round(finalBooster * 100) / 100;

    if (now - lastTapTime < 140) {
        taptime = 900;
    } else {
        taptime = 200;
    }

    if (now - lastTapTime >= taptime) {
        score = parseFloat(score) + finalBooster;
        score = Math.round(score * 100) / 100;

        const plusOne = document.createElement('div');
        plusOne.classList.add('plus-one');
        plusOne.textContent = `+${finalBooster}`;
        container.appendChild(plusOne);

        setTimeout(() => {
            plusOne.remove();
        }, 800);

        scoreDisplay.innerText = score;
        updateLevelAndProgress();

        localStorage.setItem('score', score);
        lastTapTime = now;
    }
});

function updateLevelAndProgress() {
    const baseThreshold = 100;
    let cumulativeScore = 0;
    let level = 0;

    while (score >= cumulativeScore) {
        level++;
        cumulativeScore += baseThreshold * Math.pow(1.05, level - 1);
    }

    const progressInLevel = score - (cumulativeScore - baseThreshold * Math.pow(1.05, level - 1));

    localStorage.setItem('booster', level);

    progressBar.style.width = `${(progressInLevel / (baseThreshold * Math.pow(1.05, level - 1))) * 100}%`;
    progressDisplay.innerText = `${progressInLevel.toFixed(0)} / ${(baseThreshold * Math.pow(1.05, level - 1)).toFixed(0)}`;
    levelDisplay.innerText = `Level ${level}`;
}

window.addEventListener('load', () => {
    const paragraph = document.querySelector('.air');
    const texts = [
        "অ্যাপে লেনদেন করুন 🔄",
        "কয়েন সংগ্রহ করুন 🪙",
        "রিডিম করে টাকা নিন 💰"
    ];
    let currentIndex = 0;

    function updateTextWithAnimation() {
        paragraph.style.opacity = 0;
        setTimeout(() => {
            paragraph.innerText = texts[currentIndex];
            paragraph.style.opacity = 1;
            currentIndex = (currentIndex + 1) % texts.length;
        }, 500);
    }

    paragraph.innerText = texts[0];
    paragraph.style.opacity = 1;
    setInterval(updateTextWithAnimation, 3000);
    paragraph.style.transition = 'opacity 0.5s';

    score = localStorage.getItem('score') ? parseFloat(localStorage.getItem('score')) : 0;
    scoreDisplay.innerText = score;
    const secureData = JSON.parse(localStorage.getItem("secureData"));
    const name = secureData ? secureData.name : 'Guest';
    document.getElementById("name").innerText = name;
    updateLevelAndProgress();
    xyz();
});
