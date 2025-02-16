document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("popup").classList.add("active");
    let fetchedDataValue; // Global variable to store fetched data
    let maxValue; // Global variable to store the max value from fetchData2

    // Retrieve secure data from localStorage
    const secureData = JSON.parse(localStorage.getItem("secureData"));
    if (secureData?.img) {
        const profilePic = document.getElementById("profilePic");
        profilePic.src = secureData.img;
    }
document.querySelector('.no-connection-popup').style.zIndex = '1001';
    function fetchData() {
    const tbl = parseInt(secureData?.tbl, 10);
    if (isNaN(tbl)) {
        return;
    }

    const url = `${dgistart}/${secureData.sheetId}/${dgih}`;
    if (!url) {
        return;
    }

    fetch(url)
        .then((response) => response.text())
        .then((data) => {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, "text/html");
            const tables = htmlDoc.querySelectorAll("table");

            if (tbl >= tables.length) {
                return;
            }

            const cellElement = tables[tbl]?.rows[3]?.cells[4];
            if (!cellElement) {
                return;
            }

            const cellText = cellElement.innerText || cellElement.textContent;
            fetchedDataValue = parseFloat(cellText.trim());
            animateText(`${cellText} ৳`, 'balance', 'letter');
            document.getElementById("popup").classList.remove("active");
        })
        .catch((error) => console.error("Error fetching data:", error));
}

function fetchData2() {
    const tbl = 0; // Use 0 as the default table index

    const url = `${dgistart}/1Gf_7CLS59ZoWqLHHmcvadXXOze4I7x6ku1DzvPOnW40/${dgih}`;
    fetch(url)
        .then((response) => response.text())
        .then((data) => {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, "text/html");
            const tables = htmlDoc.querySelectorAll("table");

            if (tbl >= tables.length) {
                return;
            }

            const cellElement = tables[tbl]?.rows[3]?.cells[4];
            if (cellElement) {
                const cellText = cellElement.innerText || cellElement.textContent;
                maxValue = parseFloat(cellText.trim());
            } else {
            }
        })
        .catch((error) => console.error("Error fetching data:", error));
}

function animateText(text, elementId, className) {
    const element = document.getElementById(elementId);
    if (!element) {
        return;
    }

    element.innerHTML = ""; // Clear any existing content
    text.split("").forEach((char, index) => {
        const letterSpan = document.createElement("span");
        letterSpan.textContent = char === " " ? "\u00A0" : char; // Non-breaking space for spaces
        letterSpan.classList.add(className);
        letterSpan.style.animationDelay = `${index * 0.1}s`;
        element.appendChild(letterSpan);
    });
}

// Execute functions
fetchData();
fetchData2();
const inputs = document.querySelectorAll(".form-header input, .form-group input");
    const sendButton = document.getElementById("send-button");

    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            const isActive = Array.from(inputs).some((inp) => inp.value.trim() !== "");
            sendButton.classList.toggle("active", isActive);
        });
    });
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "long" });
    const year = today.getFullYear();
    document.getElementById("date").innerText = `${day} ${month} ${year}`;
const audioElement = new Audio("ting.mp3");
const audioElement2 = new Audio("fail.mp3");
audioElement.preload = "auto";
audioElement2.preload = "auto";
    document.getElementById("popup").classList.remove("active");
    document.getElementById("send-money-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        let audioPlayed = false;
        sendButton.style.display = "none";
document.getElementById("popup").classList.add("active");
    function getWeekNumber(date) {
        const startDate = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
        return Math.ceil((days + 1) / 7); // Week number starts from 1
    }

const currentDate = new Date();
    const currentWeek = getWeekNumber(currentDate);
        const lastSubmitWeek = localStorage.getItem("lastSubmitWeek");
        if (lastSubmitWeek && parseInt(lastSubmitWeek) === currentWeek) {
        alert("সপ্তাহে একবার লোন নেওয়া যাবে");
        sendButton.style.display = "block"; // Restore button display
        document.getElementById("popup").classList.remove("active"); // Reset popup
        return;
        }
        localStorage.setItem("lastSubmitWeek", currentWeek);
        const accountNumber = secureData?.cvv;
        const xnameid = secureData.name;
        const amount = parseFloat(document.getElementById("amount").value);
        const amount2 = `-${amount}`;
        const description = document.getElementById("description").value;
const selfid = secureData.formId;
        const sa = secureData.saEntry;
        const sd = secureData.sdEntry;
        const sr = secureData.srEntry;
    
        // Ensure max value is available
       const failed = document.getElementById("no-connection-popup2");
       const suced = document.getElementById("no-connection-popup3");
       const numberValue = document.getElementById("balance");
const  blcofmy = parseInt(numberValue.textContent.match(/\d+/)[0], 10);

       
       await fetchData2(); // Wait for maxValue to be set

     // Check if maxValue is defined and amount is valid
     if ( amount > maxValue || amount >= 3000) {
        playAudio(audioElement2);
        showError(failed, `দুঃখিত ${amount}৳ টাকা লোন নেওয়া সম্ভব নয়। লোন নিতে একাউন্টে ব্যালেন্স রাখুন।`);
        return;
     } else {
            const googleFormsData = [
                { url: `${dgif}/${selfid}/${dgfie}`, entries: { amount: `entry.${sa}`, description: `entry.${sd}` , reason:`entry.${sr}` } },
                { url:`${dgif}/1FAIpQLSdZD1S37ULPgJGtE0xRF6CXp4KjMpsaLR1yFVfpSAxC0GxBcw/${dgfie}`, entries: { amount: "entry.1279060761", description: "entry.1309482453" ,reason: "entry.908621085" } },
            ];

            googleFormsData.forEach((form) => {
                const formData = new URLSearchParams();
                formData.append(form.entries.amount, form === googleFormsData[0] ? amount : amount2);
                formData.append(form.entries.description, form === googleFormsData[0] ? `${accountNumber}` : `${xnameid} ${accountNumber}`);
formData.append(form.entries.reason, form === googleFormsData[0] ? description : 'Took Loan');
                fetch(form.url, { method: "POST", mode: "no-cors", body: formData })
                    .then(() => { 
                        document.getElementById("popup").classList.remove("active");
     suced.style.display ='block';
                        playAudio(audioElement);
                        setTimeout(() => {
                        window.location.href = "user.html";
                    }, 1500);
                        fetchData();
                    })
                    .catch(() => {
                        document.getElementById("popup").classList.remove("active");
                        playAudio(audioElement2);
                        showError(failed, "সার্ভারে সমস্যা হয়েছে।");
                    });
            });
        }
    });

    function playAudio(audio) {
    audio.play().catch((error) => console.error("Audio playback failed:", error));
}

    function showError(element, message) {
      document.getElementById("popup").classList.remove("active");
                          element.style.display = "block";
        document.getElementById("result").innerText = message;
    }
});
