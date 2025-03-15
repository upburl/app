document.addEventListener('DOMContentLoaded', async function () {
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    if (storedPhoneNumber) {
        animateText(storedPhoneNumber, 'phoneNumber');
        const inputgg = document.getElementById('phoneNumber').value.trim();
        if (inputgg.length === 11) {
          document.getElementById('pin').focus();
}
    } else {
        window.location.href = "verify.html";
    }
let audioPlayed = false;
    const audioElement = new Audio('https://bpecd.github.io/data/nyr.mp3');

    // Preload the audio
    audioElement.preload = 'auto';
    audioElement.load();
   
    function playAudio() {
        if (!audioPlayed) {
            audioElement.play().catch(error => console.error('Audio playback failed:', error));
            audioPlayed = true;
        }
    }

    function checkVersionAndUpdate() {
        const versionElement = document.getElementById('version');

        if (versionElement) {
            document.querySelectorAll('button').forEach(button => button.disabled = true);
            document.querySelectorAll('a').forEach(anchor => {
                anchor.style.pointerEvents = 'none';
                anchor.style.color = 'gray';
            });

            alert('App আপডেট করুন');
            const popup = document.getElementById('no-connection-popup2');
            if (popup) popup.style.display = "block";

            const resultElement = document.getElementById('result');
            if (resultElement) resultElement.innerText = 'নতুন version 7 এসেছে';
        }
    }

    checkVersionAndUpdate();

     let realPassword = '';
const passwordField = document.getElementById('pin');
// Restrict input length to 6
passwordField.setAttribute('maxlength', '6');

// Handle masking PIN input
passwordField.addEventListener('input', (event) => {
    const value = event.target.value;

    // Ignore input if length exceeds the limit
    if (value.length > 6) {
        event.target.value = '●'.repeat(realPassword.length);
        return;
    }

    const lastChar = value.charAt(value.length - 1);

    if (lastChar !== '●') {
        realPassword += lastChar;
        setTimeout(() => {
            event.target.value = '●'.repeat(realPassword.length);
        }, 300);
    }
});

// Handle delete (Backspace) key
passwordField.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
        realPassword = ''; // Clear the real password
        event.target.value = ''; // Clear the input field
    }
});
const clearSpan = document.getElementById('phoneNumber');

// Add onclick event listener to the span
clearSpan.addEventListener('click', () => {
    passwordField.value = ''; // Clear the visible input field
    realPassword = ''; // Clear the stored real password
});

// Prevent pasting into the password field
passwordField.addEventListener('paste', (event) => {
    event.preventDefault(); // Block paste action
    alert('Pasting is not allowed in this field.');
});

// Ensure secure keyboard use
passwordField.addEventListener('focus', () => {
    // Use HTML attributes to enforce secure input
    passwordField.setAttribute('inputmode', 'numeric'); // Restrict to numeric input
    passwordField.setAttribute('autocomplete', 'off'); // Disable autocomplete
    passwordField.setAttribute('autocorrect', 'off'); // Disable autocorrect
    passwordField.setAttribute('spellcheck', 'false'); // Disable spell check
});
    // Clear local storage on load
    localStorage.removeItem('secureData');

    function animateText(text, elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.value = '';
            text.split('').forEach((char, index) => {
                setTimeout(() => element.value += char, index * 40);
            });
        }
    }

    
    // Fetch and process CSV data
    const csvUrl = 'https://docs.google.com/spreadsheets/d/1AX5IYcOsV8vCGyAoj1mUi9r_Zd51UbLkudv8uPqSMcI/gviz/tq?tqx=out:csv';

    async function fetchCSV() {
        try {
            document.getElementById("popup").classList.add("active");
            const response = await fetch(csvUrl);
            const csvText = await response.text();

            // Parse CSV
            const rows = csvText.split('\n').filter(row => row.trim() !== '');
            const data = rows.map(row => {
                return row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
                    .map(cell => cell.replace(/^"|"$/g, '').trim());
            });
            return data;
        } catch (error) {
            window.location.href = 'index.html';
            return null;
        }
    }

    function normalizeNumber(number) {
        return number.replace(/[-\s+]/g, '').trim();
    }

    async function matchData() {
        const csvData = await fetchCSV();
        if (!csvData) return false;
        const storedPhoneNumber = document.getElementById('phoneNumber').value;
        const storedPin = localStorage.getItem("pin");
        const storedPin2 = localStorage.getItem("pin2");
        const pinInput = realPassword; // Use the masked PIN

        if (!storedPhoneNumber) {
            window.location.href = "https://upburl.github.io/app/verify.html";
            return false;
        }

        const normalizedInput = normalizeNumber(storedPhoneNumber);

        const matchedRow = csvData.find(row => {
            const phoneNumbers = row[1].split(/[,\s]+/);
            return phoneNumbers.some(num => normalizeNumber(num) === normalizedInput);
        });

        if (matchedRow) {
            
            if ((pinInput === storedPin || pinInput === storedPin2)&& matchedRow[1] === '01850832126' && matchedRow[1] === document.getElementById('phoneNumber').value)  {
                const secureData = {
                    cvv: matchedRow[1],
                    name: matchedRow[2],
                    sheetId: matchedRow[3],
                    formId: matchedRow[4],
                    sdEntry: matchedRow[5],
                    srEntry: matchedRow[6],
                    saEntry: matchedRow[7],
                    img: matchedRow[8],
                    id: matchedRow[11],
                    mymail: matchedRow[9],
                    tbl:Number('0')
                };
                if(matchedRow[11] !== '123'){
                localStorage.setItem('phoneNumber',document.getElementById('phoneNumber').value);
 document.body.classList.add('move-down');
                
   const todayn = new Date().toLocaleDateString();
                    const lastSavedDate = localStorage.getItem('lastSavedDatell');
                    const newCoin = Math.abs(Number(localStorage.getItem('score')) + Number(10));

                    if (lastSavedDate !== todayn) {
                        localStorage.setItem('score', newCoin);
                        localStorage.setItem('lastSavedDatell', todayn);
                    }

                localStorage.setItem('secureData', JSON.stringify(secureData));
                                setTimeout(() => document.getElementById("popup").classList.remove("active"),
window.location.href = 'user.html', 300);
                }else{const popup = document.getElementById('no-connection-popup2');
        if (popup) popup.style.display = 'block';
                      document.getElementById("popup").classList.remove("active");
        const result = document.getElementById('result');
        if (result) result.innerText = 'আপনার একাউন্ট বন্ধ করে দেওয়া হয়েছে (অফিসে যোগাযোগ করুন)';
        const image = document.getElementById('mypic');
        if (image) image.src = 'https://bpecd.github.io/data/lock.gif';
   }
                return true; // Success
            } else {
                handleFailure(matchedRow[1]);
                return false;
            }
        } else {
            handleFailure();
            return false;
        }
    }

    function handleFailure(x) {
                const popup = document.getElementById('no-connection-popup2');
        if (popup) popup.style.display = 'block';
        const result = document.getElementById('result');
        if (result && x !== '01850832126') {
            result.innerText = 'App update করুন';
                                           }
        else{
            result.innerText = 'pin সঠিক নয়';
                                           
        }
        const image = document.getElementById('mypic');
        if (image) image.src = 'https://bpecd.github.io/data/lock.gif';
    }

    // Form submit handler
    document.getElementById('loginForm').addEventListener('submit', async function (event) {
        event.preventDefault();
        const isValid = await matchData();
        if (!isValid) {
            document.getElementById("popup").classList.remove("active");
    
        }
    });

    // Close popup listener
    const closePopup = document.getElementById('close-popup2');
    if (closePopup) {
        closePopup.addEventListener('click', () => {
            document.getElementById('no-connection-popup2').style.display = 'none';
        });
    }
});
