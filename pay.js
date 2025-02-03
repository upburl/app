emailjs.init("dnubinfz9VQV8L-Li");
const inputs = document.querySelectorAll('.form-header input, .form-group input');
const sendButton = document.getElementById('send-button');
document.querySelector('.no-connection-popup').style.zIndex = '1001';
sendButton.style.display = 'none';
inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            sendButton.classList.add('active');
        } else {
            sendButton.classList.remove('active');
        }
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

const abcdhhsUrl = `${dgistart}/1AX5IYcOsV8vCGyAoj1mUi9r_Zd51UbLkudv8uPqSMcI/gviz/tq?tqx=out:csv`;

let profiles = {}; // This will hold the phone number -> image URL mapping

// Fetch and parse the abcdhhs file
async function fetchabcdhhs() {
    try {
        const response = await fetch(abcdhhsUrl);
        const abcdhhsText = await response.text();

        // Parse abcdhhs into rows and columns
        const rows = abcdhhsText.split('\n').filter(row => row.trim() !== '');
        const data = rows.map(row => {
            return row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
                .map(cell => cell.replace(/^"|"$/g, '').trim());
        });

        // Map the phone number (column 1) to the image URL (column 9)
        profiles = data.reduce((acc, row) => {
            const phoneNumber = row[1]; // Column 1 is phone number
            const frmId = row[4];        // Form ID
            const sdEntry = row[5];      // SD Entry
            const srEntry = row[6];      // SR Entry
            const saEntry = row[7]; 
            const xname = row[2];        // Example: SA Entry
            const imageUrl = row[8]; 
const xmail = row[9];            // Column 9 is the image URL

            // Store the data if phone number and image URL exist
            if (phoneNumber && imageUrl) {
                acc[phoneNumber] = { frmId, sdEntry, srEntry, saEntry,xmail, xname, imageUrl,phoneNumber };
            }

            return acc;
        }, {});
    } catch (error) {
    }
}

// Update the profile picture and fields based on the entered phone number
function updateProfile(phonenumber) {
    const profilePic = document.getElementById('profilePic');

    // Check if the phone number is exactly 11 digits
    if (phonenumber.length === 11 && !isNaN(phonenumber)) {
        // Check if the phone number exists in profiles
        if (profiles[phonenumber]) {
            const { frmId, sdEntry, srEntry, saEntry,xmail, xname, imageUrl, phoneNumber } = profiles[phonenumber];
if(imageUrl !== 'not added'){  // Update the profile picture and form fields
            profilePic.src = imageUrl;} else {
             profilePic.src = 'Logoup.jpg';
         }
            profilePic.src = imageUrl;
            
            // Update the profile picture and form fields
            document.getElementById('formid').value = frmId || 'N/A';
            document.getElementById('acname').innerText = xname || 'N/A';
            document.getElementById('sde').value = sdEntry || 'N/A';
            document.getElementById('sre').value = srEntry || 'N/A';
            document.getElementById('sae').value = saEntry || 'N/A';
            document.getElementById('phoneNumber').value = phoneNumber;
        sendButton.style.display = '';
            document.getElementById('acmail').value = xmail;
        } else {
           profilePic.src = 'user.jpg';
             // Default if no profile is found for the phone number
            document.getElementById('formid').value = 'N/A';
            document.getElementById('sde').value = 'N/A';
            document.getElementById('sre').value = 'N/A';
            document.getElementById('sae').value = 'N/A';
      sendButton.style.display = 'none';
        }
    } else {
        profilePic.src = 'user.jpg';
            // Default if input is invalid or empty
        document.getElementById('formid').value = 'N/A';
        document.getElementById('sde').value = 'N/A';
        document.getElementById('sre').value = 'N/A';
        document.getElementById('sae').value = 'N/A';
        sendButton.style.display = 'none';
    }
}


window.onload = async function () {
    await fetchabcdhhs(); // Wait for data fetching

    // Extract query parameters using the custom function
    const params = getQueryParams();

    // Check if the 'name' parameter exists in the query
    if (params.payit) {
        let nameValue = params.payit.trim();
let phoneNumberof;        // Get and trim the 'name' value
        const numberInput = document.getElementById('acname').innerText; // Get the input field
        if (numberInput) {
            if (nameValue === "Habib Store"){
                phoneNumberof ="01850832126";
            } else{
                phoneNumberof = nameValue;
            }
            updateProfile(phoneNumberof); // Execute the profile update logic
        } else {
        }
    } else {
    }
};

document.addEventListener("DOMContentLoaded", function() {document.getElementById("popup").classList.add("active");
    let fetchedDataValue; // Global variable to store fetched data
// Function to manually parse query parameters from the URL

    function fetchData() {
        const secureData = JSON.parse(localStorage.getItem('secureData'));
        const tbl = Number('0');
const params = getQueryParams();
        
const sheetId = params.sheetid;
        const url= `${dgistart}/${sheetId}/${dgih}`;
        fetch(url)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const htmlDoc = parser.parseFromString(data, 'text/html');
                const tables = htmlDoc.querySelectorAll('table');

                if (tbl >= tables.length) {
                    return;
                }

                const cellElement = tables[tbl].rows[3].cells[4]; // Fetching data from the specified table, row 4, column 2
                const cellText = cellElement.innerText || cellElement.textContent;
                fetchedDataValue = parseFloat(cellText.trim()); // Corrected here
                animateText(`${cellText} ৳`, 'balance', 'letter');document.getElementById("popup").classList.remove("active");
            })
           .catch((error) => {
            console.error("Error fetching data:", error);
            document.getElementById("popup").classList.remove("active");
        });
    }
        

    function animateText(text, elementId, className) {
        const element = document.getElementById(elementId);
        element.innerHTML = ''; // Clear any existing content

        text.split('').forEach((char, index) => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
            letterSpan.classList.add(className);
            letterSpan.style.animationDelay = `${index * 0.1}s`;
            element.appendChild(letterSpan);
        });
    }

    fetchData();

    document.getElementById('send-money-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Change the button state to show sending
    const sendButton = document.getElementById('send-button');
    sendButton.style.opacity = '0.5';
    sendButton.innerText = 'Sending......';
    sendButton.disabled = true;
    document.getElementById("popup").classList.add("active");

    // Audio handling
    let audioPlayed = false;
    const audioElement = new Audio('ting.mp3');
    const audioElement2 = new Audio('fail.mp3');
    audioElement.preload = 'auto';
    audioElement.load();
    audioElement2.preload = 'auto';
    audioElement2.load();
const params = getQueryParams();

    // Form data
    const hisid = document.getElementById('formid').value;
    const hisd = document.getElementById('sde').value;
    const hisr = document.getElementById('sre').value;
    const hisa = document.getElementById('sae').value;
const acmailis =document.getElementById('acmail').value;
    const accountNumber = document.getElementById('phoneNumber').value;
    const acname = document.getElementById('acname').textContent;
    const accountNumber2 = `${acname} [${accountNumber}]`;
    const amount = parseFloat(document.getElementById('amount').value); // Ensure amount is a number
    const amount2 = `-${amount}`;
    
    const secureData = JSON.parse(localStorage.getItem('secureData'));
    const name = params.name;
        const numberofmy = params.id;
        const matchedName = name;
    const updatedDescription = `${matchedName} [${numberofmy}]`;
    const selfid = params.formid;
    const sa = params.sa;
    const sd = params.sd;
    const sr = params.sr;
    const sa2 = document.getElementById('sa2').value;
    const sd2 = document.getElementById('sd2').value;
    const sr2 = document.getElementById('sr2').value;
    const reason1 = 'পেমেন্ট রিসিভড';
    const reason2 = 'পেমেন্ট';
    const suced = document.getElementById('no-connection-popup3');
    const failed = document.getElementById('no-connection-popup2');

    let dbData = [];

    if (amount >= 1 && amount <= fetchedDataValue && numberofmy !== accountNumber) {
        document.getElementById('backButton').style.display = 'none';
        const dbloc1 = `${dgif}/${hisid}/${dgfie}`;
        const dbloc2 = `${dgif}/${selfid}/${dgfie}`;
        const dbloc3 = `${dgif}/1FAIpQLSdZD1S37ULPgJGtE0xRF6CXp4KjMpsaLR1yFVfpSAxC0GxBcw/${dgfie}`;

        const dblocd1 = new FormData();
        dblocd1.append(`entry.${hisa}`, amount);
        dblocd1.append(`entry.${hisd}`, updatedDescription);
        dblocd1.append(`entry.${hisr}`, reason1);

        const dblocd2 = new FormData();
        dblocd2.append(`entry.${sa}`, amount2);
        dblocd2.append(`entry.${sd}`, accountNumber2);
        dblocd2.append(`entry.${sr}`, reason2);

        const dblocd3 = new FormData();
        dblocd3.append(`entry.${sa2}`, '0');
        dblocd3.append(`entry.${sd2}`, `[${amount2}bdt] payf ${updatedDescription}`);
        dblocd3.append(`entry.${sr2}`, `payt ${accountNumber2}`);

        // Promise.all for the fetch requests
        Promise.all([
            fetch(dbloc1, { method: 'POST', body: dblocd1, mode: 'no-cors' }),
            fetch(dbloc2, { method: 'POST', body: dblocd2, mode: 'no-cors' }),
            fetch(dbloc3, { method: 'POST', body: dblocd3, mode: 'no-cors' })
        ])
        .then(() => {
            setTimeout(function () {
               
            window.parent.postMessage({ amount: amount, status: "pay_success" }, "*");
          }, 4000);
            suced.style.display = 'block';

            // Send email using emailjs
            emailjs.send("service_g55k84c", "template_v7ksvaj", {
                to_email: acmailis,
                to_name: acname,
                from_name: accountNumber2,
                message: `প্রিয় স্যার/ম্যাডাম, A/C নাম ${name} নাম্বার [${id}], ${amount} টাকা পেমেন্ট করেছে। টাকা বের করতে অ্যাপ এ ক্যাশ আউট ব্যবহার করুন।`
            })
            .then(() => {
              setTimeout(function () {
             window.parent.postMessage({ amount: amount, status: "pay_success" }, "*");
          }, 500); // If email sent successfully
               sendButton.style.display = 'none';
     document.getElementById("popup").classList.remove("active");
                suced.style.display = 'block';
            })
            .catch((error) => {
                document.getElementById("popup").classList.remove("active");
                failed.style.display = 'block';
                audioElement2.play();
            });

            // Redirect after a delay
        })
        .catch(error => {
            // In case of fetch error
            document.getElementById("popup").classList.remove("active");
            failed.style.display = 'block';
            audioElement2.play();
        });
    } else {
    let errorMessage = `🚫 নম্বর ভুল হয়েছে`;
    document.getElementById('send-button').style.opacity = '1';
    document.getElementById('send-button').innerHTML = '<i class="fa-duotone fa-solid fa-paper-plane"></i>';
    document.getElementById('send-button').disabled = false;
    document.getElementById("popup").classList.remove("active");

    if (amount < 1) {
        errorMessage = ` সর্বনিম্ন 1 টাকা পাঠাতে পারবেন `;
    }

    if (amount > fetchedDataValue) {
        errorMessage = ` পর্যাপ্ত ব্যালেন্স নেই`;
    }

    if (accountNumber === numberofmy) {
        errorMessage = ` নিজের নম্বর গ্রহণ যগ্য নয়`;
    } document.getElementById('result2').innerText = errorMessage;
     document.getElementById("popup").classList.remove("active");
        failed.style.display = 'block';
        audioElement2.play();
    }
});
});
