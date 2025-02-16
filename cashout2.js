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
      "Bkash": "Bkash.png",
      "Upay": "Upay.png",
      "Rocket": "Rocket.jpeg",
    "Bank": "Bank.png",
      "হাতে": "Hand.jpeg",
    };

    // Function to update profile picture based on the selection
    function updateProfile() {
      const profilePic = document.getElementById("profilePic");
      const name = document.getElementById("name").value;
        const inputValue = name;
    const keywords = ['Bkash', 'Upay'];
    const includesKeyword = keywords.some(keyword => inputValue.includes(keyword));

    if (includesKeyword) {
        document.getElementById('acnum').setAttribute('maxLength', 11);
    }else{     document.getElementById('acnum').setAttribute('maxLength', 19);
   }
      profilePic.src = profiles[name] || (name === "" ? "user.jpg" : "who.png");
        
    }

    updateProfile();
document.addEventListener("DOMContentLoaded", () => {document.getElementById("popup").classList.add("active");
  let params = getQueryParams();

 let limit;
    let limit2;
      function fetchData2() {
    const tbl = 0; // Use 0 as the default table index

    const url = `${dgistart}/${params.sheetid}/${dgih}`;
    fetch(url)
        .then((response) => response.text())
        .then((data) => {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, "text/html");
            const tables = htmlDoc.querySelectorAll("table");

            if (tbl >= tables.length) {
                return;
            }

            const cellElement = tables[tbl]?.rows[4]?.cells[2];
            if (cellElement) {
                const cellText = cellElement.innerText || cellElement.textContent;
let match = cellText.match(/^dps balance (\d+)\/dps\/(\d+)$/);

 limit = match ? parseFloat(match[2]) : '0';  // Second number (1000)
 limit2 = match ? parseFloat(match[1]) : '0'; // First number (2000)

     if(limit !== '0'){
         alert(`আপনি ${limit} টাকা পর্যন্ত কোনো চার্জ ছাড়াই ক্যাশআউট করতে পারবেন`);
     } 
                console.log(limit);
                console.log(limit2);
            } else {
            }
        })
        .catch((error) => console.error("Error fetching data:", error));
}
  // Load balance from a table
    function loadTableData() {
        const tableNumber = Number('0'); // Fetching the table number from local storage and converting to an integer
       const sheetId = params.sheetid;

    const urls = `${dgistart}/${sheetId}/${dgih}`; // Placeholder: Define `dgistart`, `dgih` properly

    fetch(urls)
        .then((response) => response.text())
        .then((html) => {
            const parser = new DOMParser();
            const tables = parser.parseFromString(html, "text/html").querySelectorAll("table");

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
    

fetchData2();
loadTableData();
    document.getElementById("send-money-form").addEventListener("submit", (event) => {
        event.preventDefault();

        let bonusAmount = document.getElementById("amount").value.trim();
        let popup = document.getElementById("popup");
        let successAudio = new Audio("ting.mp3");
        let failAudio = new Audio("fail.mp3");
        successAudio.preload = "auto";
        failAudio.preload = "auto";
        let audioPlayed = false;
let params = getQueryParams();

        popup.classList.add("active");
        
        let balance = parseFloat(document.getElementById("balance").innerText.trim());
         let fname = document.getElementById("name").value.trim();
        let suced = document.getElementById('no-connection-popup3');
        let failed = document.getElementById('no-connection-popup2');
        let name = params.name;
        let id = params.id;
        let  acnum = document.getElementById("acnum").value;
        if( acnum === id){
            acnum = 'ঐ';
        }let amount = Math.floor(parseFloat(bonusAmount));
let selfid = params.formid;
    let sa = params.sa;
    let sd = params.sd;
    let sr = params.sr;
             let charge = 0;
            let today = new Date().toDateString(); // Get current date as a string
            let lastWithdrawDate = localStorage.getItem("lastWithdrawDate") || "";
 let lastWithdraw = parseFloat(localStorage.getItem("lastWithdraw")) || 0;
            let withdrawCount = parseInt(localStorage.getItem("withdrawCount")) || 0;

            if (amount > limit){
           nextlimit = amount - limit;
                console.log(nextlimit);
            // Reset counts if it's a new day
            if (lastWithdrawDate !== today) {
                localStorage.setItem("lastWithdraw", "0");
                localStorage.setItem("withdrawCount", "0");
                localStorage.setItem("lastWithdrawDate", today);
            }

           
            // Calculate charge based on the amount
            if (nextlimit < 50) {
                lastWithdraw += nextlimit;
                withdrawCount++;

                if (lastWithdraw > 50 || withdrawCount > 2) {
                    charge = 1;
                } else {
                    charge = 0;
                }

                localStorage.setItem("lastWithdraw", lastWithdraw);
                localStorage.setItem("withdrawCount", withdrawCount);
            } else if (nextlimit >= 50 && nextlimit < 100) {
                charge = 1; // Fixed: Any amount >= 50 and <= 100 incurs a charge of 1
            } else if (nextlimit >= 100 && nextlimit < 500) {
                charge = 2;
            } else if (nextlimit >= 500 && nextlimit < 1000) {
                charge = 3;
            } else {
                charge = 5;
            }

            // Reset for amounts ≥ 50
            if (nextlimit >= 50) {
                localStorage.setItem("lastWithdraw", "0");
                localStorage.setItem("withdrawCount", "0");
                localStorage.setItem("lastWithdrawDate", today);
            }
                nextlimit = '0';
            } else {
                charge = 0;
                if(limit >= amount){
                    nextlimit = limit - amount;
                }else{
                    nextlimit = '0';
                }console.log(nextlimit);
            }
        let totalDeduction = amount + charge;

      if (amount >= 5 && totalDeduction <= balance) {
          document.getElementById('backButton').style.display = 'none';

         const dbloc1 = `${dgif}/1FAIpQLScYOJAMovsNf876zTEaP_1ZqADQ8WY7TgAprMMAwpFaTDAu_w/${dgfie}`;
            const dblocx = `${dgif}/1FAIpQLSdhJ-tQgQ79WAej4BQ-Ok8_-Bf-vhUwLabYO4fO-iFd4sCdHA/${dgfie}`;
              const dbloc2 = `${dgif}/${selfid}/${dgfie}`;
                const dbloc3 = `${dgif}/1FAIpQLSdZD1S37ULPgJGtE0xRF6CXp4KjMpsaLR1yFVfpSAxC0GxBcw/${dgfie}`;

                const dblocd1 = new FormData();
                dblocd1.append('entry.1169114959', `${amount}`);
                dblocd1.append('entry.776341666', `${fname} [${id}]`);
                dblocd1.append('entry.1002142323', `Cashout Receive ${acnum}`);
const dblocdx = new FormData();
                dblocdx.append('entry.1014140243', `${charge}`);
                dblocdx.append('entry.233163644', `${fname} [${id}]`);
                dblocdx.append('entry.1511985907', `Cashout Receive ${acnum}`);

                const dblocd2 = new FormData();
                dblocd2.append(`entry.${sa}`, `-${totalDeduction}`);
                dblocd2.append(`entry.${sd}`, `${fname}-${acnum} চার্জ ${charge} টাকা`);
                dblocd2.append(`entry.${sr}`, `ক্যাশ আউট ${amount} টাকা`);

                const dblocd3 = new FormData();
                dblocd3.append('entry.1279060761', `-${amount}`);
                dblocd3.append('entry.1309482453', `${name} [${id}]`);
                dblocd3.append('entry.908621085', `ক্যাশ আউট  ${fname}`);

                Promise.all([
                    fetch(dbloc1, { method: 'POST', body: dblocd1, mode: 'no-cors' }),
                    fetch(dblocx, { method: 'POST', body: dblocdx, mode: 'no-cors' }),
                    fetch(dbloc2, { method: 'POST', body: dblocd2, mode: 'no-cors' }),
                    fetch(dbloc3, { method: 'POST', body: dblocd3, mode: 'no-cors' })
                ])
                .then(() => {
                    if(limit <='0'){
            window.parent.postMessage({ amount: amount, status: "cashout_success" }, "*");
                   suced.style.display = 'block';
  } else {edit();}
})       
                .catch((error) => {
                    popup.classList.remove("active");
                    if (!audioPlayed) {
                        failAudio.play().catch(console.error);
                        audioPlayed = true;
                    }   failed.style.display = 'block';
                });
        } else {
    let errorMessage = ``;
   
    if (amount < 5) {
        errorMessage = ` সর্বনিম্ন 5 টাকা বের করতে পারবেন `;
    }

    if (totalDeduction >= balance) {
        errorMessage = ` পর্যাপ্ত ব্যালেন্স নেই , ${charge} টাকা চার্জ ছাড়া ক্যাশ আউট করুন`;
    }

              failed.style.display = 'block';
            popup.classList.remove("active");
            document.getElementById("result").innerText = errorMessage;
        }
        async function edit() {
    let resultDisplay = document.getElementById("result");
   let password = `${limit2}/dps/${nextlimit}`;
    if (password) {
        let sheetId = params.sheetid;
        const sheetName = "1টি ফর্ম প্রতিক্রিয়া";
        const action = "updateCell";

        const payload = {
            sheetId,
            sheetName,
            action,
            row: 3,
            column: 2,
            value: `dps balance ${password}`
        };

        try {
            const response = await fetch(
                `${strct}/AKfycbwVNVJsEAgAmUuNYxG8qpslRAdOcIwAAEuUEI_XlY7lydXVsniY_XH7IBv6LOwtGp4o/exec`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );
            const result = await response.text();
   window.parent.postMessage({ amount: amount, status: "cashout_success" }, "*");
          suced.style.display = 'block';
   
        } catch (error) {
            document.getElementById("popup").classList.remove("active");
            resultDisplay.textContent = "Error: " + error.message;
        }
    } else {
        document.getElementById("popup").classList.remove("active");
        resultDisplay.textContent = "Passwords do not match. Please try again.";
    }
}
    });
});
