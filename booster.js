const exchangeRate = 100 / 10;

// Elements
const usdtInput = document.getElementById('usdt');
const bnbInput = document.getElementById('bnb');
const submitBtn = document.getElementById('boost'); // Fixed variable reference for submitBtn

// Event listener for auto-calculation
usdtInput.addEventListener('input', function () {
    const usdtValue = parseFloat(usdtInput.value);
    if (!isNaN(usdtValue)) {
        // Update BNB value based on USDT input
        const bnbValue = usdtValue / exchangeRate;
        bnbInput.value = bnbValue.toFixed(2); // 2 decimal places
    } else {
        bnbInput.value = '0'; // Reset BNB if input is invalid
    }
});

// Event listener for Boost button
submitBtn.addEventListener('click', () => {
    const secureData = JSON.parse(localStorage.getItem("secureData"));
    const name = secureData ? secureData.name : 'Guest';
    const coin = parseFloat(bnbInput.value); // Convert to integer by using Math.floor
    const amount = Math.floor(parseFloat(usdtInput.value));
    const msg2 = "$UPBC boost " + coin +" "+name;
    const description = "$UPBC Boost " + coin;
    const surl = secureData.surl;
    const saentry = secureData.saentry;
    const sdentry = secureData.sdentry;
    const oldboost = parseFloat(localStorage.getItem('cash')) || 0; // Initialize oldboost to 0 if it's null
const balanceText = document.getElementById("balance").textContent;
const balance = balanceText.replace(/[^0-9]/g, '');  // This will remove any non-numeric characters.// Check the amount before proceeding
    if (amount >= 2 && amount <= balance) {
        let googleFormsData = [
            {
                url: surl,
                entries: {
                    amount: saentry,
                    description: sdentry
                }
            },
            {
                url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLScRM4q559D7pbsH1RDKiIEguRpg5SwNqnFW4fHuvSohfc7Ftw/formResponse",
                entries: {
                    amount: "entry.1522107311",
                    description: "entry.1449208456"
                }
            }
        ];

        googleFormsData.forEach((form) => {
            const formData = new FormData();
            formData.append(form.entries.amount, form === googleFormsData[0] ? `-${amount}` : amount);
            formData.append(form.entries.description, form === googleFormsData[0] ? description : msg2);

            fetch(form.url, {
                method: 'POST',
                mode: 'no-cors',
                body: new URLSearchParams(formData)
            })
            .then(response => {
                // Update the boost value here
                const newboost = oldboost + coin; // Calculate new boost value
                localStorage.setItem('cash', newboost); // Save new boost to local storage
                document.getElementById('bdtrate').style.color = 'green';
                document.getElementById('bdtrate').style.fontSize = '18px';
                document.getElementById('bdtrate').innerText = `${coin}+ Boost পেয়েছেন 😋`;
                submitBtn.style.display = 'none'; // Correct variable reference
                setTimeout(() => {
                    window.location.href = "taptap.html";
                }, 1500);
            })
            .catch(error => {
                document.getElementById('bdtrate').innerText = `Failed to submit data.`;
                submitBtn.style.display = 'block'; // Correct variable reference
                setTimeout(() => {
                    window.location.href = "taptap.html";
                }, 2000);
            });
        });
    } else {
        document.getElementById('bdtrate').innerText = `কিপটা নাকি? ${amount}৳ কেউ দেয়?😒`;
    }
});

window.addEventListener('load', () => {
    document.getElementById("bdtrate").innerText = "1 BDT = +0.10 Boost"; // Retained the text setting
});

