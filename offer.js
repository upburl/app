document.addEventListener("DOMContentLoaded", function () {
    const codeElement = document.getElementById("code");
    const resultElement = document.getElementById("result");
    const popupElement = document.getElementById("popup");
    const sendButton = document.getElementById("send-button");
    const moneyForm = document.getElementById("money-form");
    codeElement.style.display = "";

    const secureData = JSON.parse(localStorage.getItem("secureData")) || {};
    const url = `${dgistart}/${secureData.sheetId}/${dgih}`;
    let tbl = 0;

    // Fetch and process data
    fetch(url)
        .then((response) => response.text())
        .then((data) => {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, "text/html");
            const tables = htmlDoc.querySelectorAll("table");

            if (tbl < tables.length) {
                const cellElement = tables[tbl]?.rows[4]?.cells[3];
                if (cellElement) {
                    const cellText = cellElement.innerText || cellElement.textContent;
                    const match = cellText.match(/-?\d+(\.\d+)?/);
                    const maxValue = match ? parseFloat(match[0]) : 0;

                    codeElement.value = maxValue === 0
                        ? "কোনো বোনাস নেই"
                        : `${maxValue} টাকা বোনাস`;
                    codeElement.style.border = maxValue === 0
                        ? "2px solid red"
                        : "2px solid green";

                    if (maxValue !== 0) timing();
                }
            }
        })
        .catch((error) => console.error("Error fetching data:", error));

    // Handle form submission
    moneyForm.addEventListener("submit", function (event) {
        event.preventDefault();
        sendButton.style.display = "none";

        const bonusAmount = parseFloat(document.getElementById("code").value) || 0;
        const successAudio = new Audio("ting.mp3");
        const failAudio = new Audio("fail.mp3");
        let audioPlayed = false;

        popupElement.classList.add("active");

        if (bonusAmount >= 3) {
            edit().then(() => {
                const formUrls = [
                    `${dgif}/1FAIpQLSdZD1S37ULPgJGtE0xRF6CXp4KjMpsaLR1yFVfpSAxC0GxBcw/${dgfie}`,
                    `${dgif}/${secureData.formId}/${dgfie}`,
                    `${dgif}/1FAIpQLSdhJ-tQgQ79WAej4BQ-Ok8_-Bf-vhUwLabYO4fO-iFd4sCdHA/${dgfie}`
                ];

                const formData = [
                    new FormData(),
                    new FormData(),
                    new FormData()
                ];

                formData[0].append("entry.1279060761", '0');
                formData[0].append("entry.1309482453", `${secureData.name || 'Guest'} [${secureData.cvv}]`);
                formData[0].append("entry.908621085", `${bonusAmount} BDT Claimed Bonus`);

                formData[1].append(`entry.${secureData.saEntry}`, bonusAmount);
                formData[1].append(`entry.${secureData.sdEntry}`, `${secureData.name || 'Guest'} [${secureData.cvv}]`);
                formData[1].append(`entry.${secureData.srEntry}`, "বোনাস Claim");

                formData[2].append("entry.1014140243", `-${bonusAmount}`);
                formData[2].append("entry.233163644", `${secureData.name || 'Guest'} [${secureData.cvv}]`);
                formData[2].append("entry.1511985907", "Bonus Claim");

                Promise.all(
                    formUrls.map((url, i) =>
                        fetch(url, { method: "POST", body: formData[i], mode: "no-cors" })
                    )
                ).then(() => {
                    // Redirect after successful form submission
                    window.location.href = "user.html";
                }).catch((error) => {
                    if (!audioPlayed) {
                        failAudio.play().catch(console.error);
                        audioPlayed = true;
                    }
                    resultElement.textContent = `Error: ${error}`;
                });
            });
        } else {
            popupElement.classList.remove("active");
            resultElement.textContent = "দুঃখিত, এই মুহূর্তে কোনো বোনাস নেই।";
        }
    });

    async function edit() {
        popupElement.classList.add("active");
const bonusAmountx = parseFloat(document.getElementById("code").value) || 0;
        
        if (secureData) {
            const payload = {
                sheetId: secureData.sheetId,
                sheetName: "1টি ফর্ম প্রতিক্রিয়া",
                action: "updateCell",
                row: 3,
                column: 3,
                value: "Bonus Value 0"
            };

            try {
                const response = await fetch(
                    "https://script.google.com/macros/s/AKfycbwVNVJsEAgAmUuNYxG8qpslRAdOcIwAAEuUEI_XlY7lydXVsniY_XH7IBv6LOwtGp4o/exec",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                    }
                );
                const result = await response.text();
                popupElement.classList.remove("active");
                resultElement.textContent = `আপনি পেয়েছেন ${bonusAmountx} টাকা বোনাস`;

            } catch (error) {
                popupElement.classList.remove("active");
                resultElement.textContent = `Error: ${error.message}`;
            }
        } else {
            popupElement.classList.remove("active");
            resultElement.textContent = "Please try again.";
        }
    }

    function timing() {
        let r = 2;
        const interval = setInterval(() => {
            if (r > 0) {
                animateText(`Wait ${r}s`, "result", "letter");
                resultElement.style.color = "red";
                r--;
            } else {
                clearInterval(interval);
                resultElement.textContent = "";
                resultElement.style.color = "green";
                sendButton.style.display = "block";
            }
        }, 1000);
    }

    function animateText(text, elementId, className) {
        const element = document.getElementById(elementId);
        element.innerHTML = "";
        text.split("").forEach((char, idx) => {
            const span = document.createElement("span");
            span.textContent = char === " " ? "\xa0" : char;
            span.className = className;
            span.style.animationDelay = `${0.1 * idx}s`;
            element.appendChild(span);
        });
    }
});
