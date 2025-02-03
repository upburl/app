window.addEventListener('load', () => {
    const score = localStorage.getItem('score') ? parseFloat(localStorage.getItem('score')) : 0;
    usdtInput.value = score;
    const bnbValue = score / exchangeRate;
    bnbInputvalue = Math.floor(bnbValue);
    bnbInput.value = Math.min(bnbInputvalue, 10);
    document.getElementById("bdtrate").innerText = "1000 coin = 5 টাকা";
});

const score = localStorage.getItem('score') ? parseFloat(localStorage.getItem('score')) : 0;
const vvl = score;
const exchangeRate = 200;

const usdtInput = document.getElementById('usdt');
const bnbInput = document.getElementById('bnb');
const submitBtn = document.getElementById('boost');

usdtInput.addEventListener('input', function () {
    const usdtValue = parseFloat(usdtInput.value);
    if (!isNaN(usdtValue)) {
        const bnbValue = usdtValue / exchangeRate;
        bnbInput.value = Math.floor(bnbValue);
    } else {
        bnbInput.value = '0';
    }
});

submitBtn.addEventListener('click', () => {
    // Show popup and disable the button
    document.getElementById("popup").classList.add("active");
    submitBtn.style.display = 'block';
    submitBtn.style.opacity = '0.5';
    submitBtn.innerText = 'wait....';
    submitBtn.disabled = true;

    // Retrieve secure data from local storage
    const secureData = JSON.parse(localStorage.getItem("secureData")) || {};
    const name = secureData.name || 'Guest';
    const id = secureData.cvv;
    const amount = Math.floor(parseFloat(bnbInput.value));
    const coin = parseFloat(usdtInput.value);
    const msg2 = "$UP Point Redeem";
    const description = id;
    const selfid = secureData.formId;
    const sa = secureData.saEntry;
    const sd = secureData.sdEntry;
    const sr = secureData.srEntry;

    if (amount >= 1 && amount <= fetchedDataValue && numberofmy !== accountNumber) {
        // Form data and URLs
        const dbloc1 = `${dgif}/1FAIpQLSeAaYuHwbZbWmfrOdyBLu7OPILeg0VEIKSYX9G6q_34WI8zlQ/${dgfie}`;
        const dbloc2 = `${dgif}/${selfid}/${dgfie}`;
        const dbloc3 = `${dgif}/1FAIpQLSdZD1S37ULPgJGtE0xRF6CXp4KjMpsaLR1yFVfpSAxC0GxBcw/${dgfie}`;

        const dblocd1 = new FormData();
        dblocd1.append('entry.231028774', `-${amount}`);
        dblocd1.append('entry.455097421', `${name} [${id}]`);
        dblocd1.append('entry.759987358', `UP Point Bonus ${coin}`);

        const dblocd2 = new FormData();
        dblocd2.append(`entry.${sa}`, `${amount}`);
        dblocd2.append(`entry.${sd}`, `Total point ${coin}`);
        dblocd2.append(`entry.${sr}`, msg2);

        const dblocd3 = new FormData();
        dblocd3.append('entry.1279060761', amount);
        dblocd3.append('entry.1309482453', `${name} [${id}]`);
        dblocd3.append('entry.908621085', `UP Point Bonus ${coin}`);

        // Promise.all for fetch requests
        Promise.all([
            fetch(dbloc1, { method: 'POST', body: dblocd1, mode: 'no-cors' }),
            fetch(dbloc2, { method: 'POST', body: dblocd2, mode: 'no-cors' }),
            fetch(dbloc3, { method: 'POST', body: dblocd3, mode: 'no-cors' })
        ])
        .then(() => {
            localStorage.removeItem('score');
            localStorage.removeItem('cash');

            const bdtrate = document.getElementById('bdtrate');
            bdtrate.style.color = 'green';
            bdtrate.style.fontSize = '20px';
            bdtrate.style.fontWeight = 'bold';
            bdtrate.innerText = `${amount}৳ পেয়েছেন 😋`;

            document.getElementById("popup").classList.remove("active");
            submitBtn.style.display = 'none';

            setTimeout(() => {
                window.location.href = "user.html";
            }, 1500);
        })
        .catch(() => {
            const bdtrate = document.getElementById('bdtrate');
            bdtrate.innerText = 'Failed to submit data.';

            submitBtn.style.display = 'block';
            setTimeout(() => {
                window.location.href = "taptap.html";
            }, 2000);
        });
    } else {
        // Handle invalid amount
        document.getElementById("popup").classList.remove("active");
        const bdtrate = document.getElementById('bdtrate');
        bdtrate.innerText = `৫ টাকার কম নিতে পারবেন না`;

        submitBtn.style.opacity = '1';
        submitBtn.innerText = 'Cash';
        submitBtn.disabled = false;
    }
});
