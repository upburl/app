const inputs = document.querySelectorAll(".form-header input, .form-group input");
const sendButton = document.getElementById("send-button");

// Enable or disable the "Send" button based on form input completion
inputs.forEach((input) => {
    input.addEventListener("input", () => {
        const allFilled = Array.from(inputs).every((inp) => inp.value.trim() !== "");
        sendButton.classList.toggle("active", allFilled);
    });
});
function getQueryParams() {
    const queryString = window.location.search; // Get the query string from the URL
    const params = {};

    if (queryString) {
        const pairs = queryString.substring(1).split("&"); // Remove "?" and split parameters
        for (const pair of pairs) {
            const [key, value] = pair.split("="); // Split key and value
            params[decodeURIComponent(key)] = decodeURIComponent(value || "");
        }
    }

    return params; // Return an object with all parameters
}

const profiles = {
      "বিদ্যানন্দ ফাউন্ডেশন": "bid.jpeg",
      "তাসাউফ ফাউন্ডেশন": "uplogo.png",
      "শক্তি ফাউন্ডেশন": "shakti.png",
      "আস-সুন্নাহ ফাউন্ডেশন": "as.png",
      "UPB": "uplogo.png",
    };

    // Function to update profile picture based on the selection
    function updateProfile() {
      const profilePic = document.getElementById("profilePic");
      const name = document.getElementById("name").value.trim();
      profilePic.src = profiles[name] || (name === "" ? "user.jpg" : "who.png");
    }

    // Initialize with default profile picture
    updateProfile();
document.addEventListener("DOMContentLoaded", () => {document.getElementById("popup").classList.add("active");
    function loadTableData() {
    const secureData = JSON.parse(localStorage.getItem("secureData"));

    const tableNumber = Number('0'); // Fetching the table number from local storage and converting to an integer
    const params = getQueryParams();

    const sheetId = params.sheetid;

    const urls = `${dgistart}/${sheetId}/${dgih}`; // Placeholder: Define `dgistart`, `dgih` properly

    fetch(urls)
        .then((response) => response.text())
        .then((html) => {
            const parser = new DOMParser();
            const tables = parser.parseFromString(html, "text/html").querySelectorAll("table");

            if (tableNumber >= tables.length) {
                window.location.href = "index.html";
                return;
            }

            const cell = tables[tableNumber].rows[3].cells[4];
            const balanceText = cell.innerText || cell.textContent;
                      const balancexx = parseFloat(balanceText.trim());
const balance = `${balancexx} ৳`;
            const balanceDisplay = document.getElementById("balance");
            balanceDisplay.innerHTML = "";
            balance.split("").forEach((char, index) => {
                const span = document.createElement("span");
                span.textContent = char === " " ? "\u00A0" : char;
                span.classList.add("letter");
                span.style.animationDelay = `${0.1 * index}s`;
                balanceDisplay.appendChild(span);
            });

            document.getElementById("popup").classList.remove("active");
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            document.getElementById("popup").classList.remove("active");
        });
}

window.onload = loadTableData;

    // Handle form submission
    document.getElementById("send-money-form").addEventListener("submit", (event) => {
        event.preventDefault();

        const bonusAmount = document.getElementById("amount").value.trim();
        const popup = document.getElementById("popup");
        const successAudio = new Audio("ting.mp3");
        const failAudio = new Audio("fail.mp3");
        successAudio.preload = "auto";
        failAudio.preload = "auto";
        let audioPlayed = false;
const params = getQueryParams();

        popup.classList.add("active");
        const secureData = JSON.parse(localStorage.getItem("secureData")) || {};
        const balance = parseFloat(document.getElementById("balance").innerText.trim());
         const fname = document.getElementById("name").value.trim();
        const suced = document.getElementById('no-connection-popup3');
        const failed = document.getElementById('no-connection-popup2');
        const name = params.name;
        const id = params.id;
        const amount = Math.floor(parseFloat(bonusAmount));
const selfid = params.formid;
    const sa = params.sa;
    const sd = params.sd;
    const sr = params.sr;
         if (amount >= 1 && amount <= balance ) {
             document.getElementById('backButton').style.display = 'none';
                const dbloc1 = `${dgif}/1FAIpQLScYOJAMovsNf876zTEaP_1ZqADQ8WY7TgAprMMAwpFaTDAu_w/${dgfie}`;
                const dbloc2 = `${dgif}/${selfid}/${dgfie}`;
                const dbloc3 = `${dgif}/1FAIpQLSdZD1S37ULPgJGtE0xRF6CXp4KjMpsaLR1yFVfpSAxC0GxBcw/${dgfie}`;

                const dblocd1 = new FormData();
                dblocd1.append('entry.1169114959', `${amount}`);
                dblocd1.append('entry.776341666', `${fname} [${id}]`);
                dblocd1.append('entry.1002142323', `Donation Receive`);

                const dblocd2 = new FormData();
                dblocd2.append(`entry.${sa}`, `-${amount}`);
                dblocd2.append(`entry.${sd}`, `${fname}`);
                dblocd2.append(`entry.${sr}`, "ডোনেশন");

                const dblocd3 = new FormData();
                dblocd3.append('entry.1279060761', `-${amount}`);
                dblocd3.append('entry.1309482453', `${name} [${id}]`);
                dblocd3.append('entry.908621085', `ডোনেশন ${fname}`);

                Promise.all([
                    fetch(dbloc1, { method: 'POST', body: dblocd1, mode: 'no-cors' }),
                    fetch(dbloc2, { method: 'POST', body: dblocd2, mode: 'no-cors' }),
                    fetch(dbloc3, { method: 'POST', body: dblocd3, mode: 'no-cors' })
                ])
                .then(() => {
            window.parent.postMessage({ amount: amount, status: "dension_success" }, "*");
        
                    suced.style.display = 'block';
                                      popup.classList.remove("active");
                 })
                .catch((error) => {
                    popup.classList.remove("active");
                    if (!audioPlayed) {
                        failAudio.play().catch(console.error);
                        audioPlayed = true;
                    }   failed.style.display = 'block';
           
                });
        } else {
              failed.style.display = 'block';
            popup.classList.remove("active");
            document.getElementById("result").innerText = "দুঃখিত, এই মুহূর্তে Server Active নেই";
        }
    });
});
