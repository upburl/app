let timerInterval;
let referencecode;
let remainingTime = 0;
// On page load, check for saved code and timer state
window.onload = function () {
  referencecode = localStorage.getItem('referencecode');
  const savedExpiry = localStorage.getItem('expiryTime');
  const savedRemainingTime = localStorage.getItem('remainingTime');
  const currentTime = Date.now();

  if (referencecode && savedExpiry) {
    if (currentTime < savedExpiry) {
      // Restore the timer if it's still valid
      remainingTime = Math.floor((savedExpiry - currentTime) / 1000);
      displayCodeAndTimer(referencecode, remainingTime);
    } else {
      // Timer expired, show timeout message
      displayCodeTimeout(referencecode);
    }
  }
};

function generateCode() {
  // Generate a 4-digit random code
  referencecode = Math.floor(1000 + Math.random() * 9000);

  // Set expiry time for 2 minutes from now
  const expiryTime = Date.now() + 180000; // 2 minutes in milliseconds

  // Save code and expiry time to local storage
  localStorage.setItem('referencecode', referencecode);
  localStorage.setItem('expiryTime', expiryTime);

  // Display the code and timer
  displayCodeAndTimer(referencecode, 180);
  location.reload();
}

function displayCodeAndTimer(referencecode, timeLeft) {
  // Show the code and timer
  document.getElementById('generate-btn').innerHTML = `Reference Code: <p style="color:red">${referencecode}</p>`;
  document.getElementById('code-display').style.display = '';
  document.getElementById('timer').style.display = '';
  document.getElementById('file').style.display = '';

  // Start the timer countdown
  updateTimerDisplay(timeLeft);

  // Clear any previous interval
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      localStorage.setItem('remainingTime', remainingTime); // Save remaining time
      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        displayCodeTimeout(referencecode);
      } else {
        updateTimerDisplay(remainingTime);
      }
    }
  }, 1000);

  // Set remaining time
  remainingTime = timeLeft;
  localStorage.setItem('remainingTime', remainingTime); // Save remaining time
}

function displayCodeTimeout(referencecode) {
  // Display "Code Timeout" and make the button visible
  document.getElementById('timer').textContent =
    'রেফারেন্স কোড মেয়াদ উত্তীর্ণ হয়েছে। আপনি যদি ইতিমধ্যেই টাকা পাঠিয়ে থাকেন এবং তা অ্যাড করতে ব্যর্থ হন তবে এটি শীঘ্রই অফিস থেকে অ্যাড করে দেওয়া হবে।';
  document.getElementById('generate-btn').style.display = 'none';
  document.getElementById('file').style.display = 'none';

  // Set a timeout window of 5 minutes to retain the old code
  const timeoutExpiry = Date.now() + 300000; // 5 minutes in milliseconds
  localStorage.setItem('timeoutExpiry', timeoutExpiry);

  // Clear local storage for the current code and timer
  localStorage.removeItem('referencecode');
  localStorage.removeItem('expiryTime');
  localStorage.removeItem('remainingTime');

}

function updateTimerDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Format timer as "1 min 30 sec"
  document.getElementById('timer').textContent =
    `${minutes > 0 ? minutes + ' min ' : ''}${remainingSeconds} sec এর মধ্যে`;
}
document.getElementById('close').addEventListener('click', function (e) {
  e.preventDefault();
  location.reload(); // Reload the page
});
function triggerShake() {
    const container = document.getElementById('send-money-form');
    let shakeInterval;
    let shakeTime = 0;

    function shake() {
        const randomX = Math.floor(Math.random() * 6) - 3; // Small shake between -3px and 3px for X (left-right)
        container.style.transform = `translateX(${randomX}px)`; // Only translate along the X-axis
        shakeTime += 50; // Shake duration in milliseconds
        if (shakeTime >= 300) { // Shake for 300ms (for a smoother and shorter effect)
            clearInterval(shakeInterval);
            container.style.transform = ''; // Reset the transform property after the shake
        }
    }

    shakeInterval = setInterval(shake, 50); // Start shaking at 50ms intervals
}

const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const output = document.getElementById('output');
const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const loadingPopup = document.getElementById('loadingPopup');
let fetchedDataValue;
let audioPlayed = false;
const audioElement = new Audio('ting.mp3');
const audioElement2 = new Audio('fail.mp3');
audioElement.preload = 'auto';
audioElement.load();
audioElement2.preload = 'auto';
audioElement2.load();

function preprocessImage(imageSrc) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    return new Promise((resolve, reject) => {
img.onload = () => {
    // Original image dimensions
    const originalWidth = img.width;
    const originalHeight = img.height;

    // Calculate cropping dimensions
    const topCrop = originalHeight * 0.16; // 16% of the height
    const bottomCrop = originalHeight * 0.40; // 40% of the height
    const croppedHeight = originalHeight - topCrop - bottomCrop; // Remaining height after cropping

    // Set canvas size to match the cropped area
    canvas.width = originalWidth;
    canvas.height = croppedHeight;

    // Draw the cropped portion of the image
    ctx.drawImage(
        img,
        0, topCrop, // Start cropping from 16% down the image
        originalWidth, croppedHeight, // Use remaining height after removing 40% from the bottom
        0, 0, // Draw on the canvas starting at (0,0)
        originalWidth, croppedHeight // Scale the image to fit the canvas
    );

    // Apply processing only for images with width >= 720px
    if (canvas.width >= 1100) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const grayscale = r * 0.3 + g * 0.59 + b * 0.11;

            // Increase contrast (thresholding)
            const contrast = grayscale > 128 ? 255 : 0;

            data[i] = data[i + 1] = data[i + 2] = contrast; // Apply binarization
        }

        ctx.putImageData(imageData, 0, 0);

        // Optional: Smooth out edges using a filter (like blur) if necessary
        ctx.filter = 'blur(1px)'; // Adjust blur radius as needed
        ctx.drawImage(canvas, 0, 0);
    }

    resolve(canvas.toDataURL()); // Return processed image as base64
};

img.onerror = reject;
img.src = imageSrc; // Set src after attaching onload and onerror
});
}

imageInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            preprocessImage(event.target.result) // Use the preprocessed image
                .then((processedImageSrc) => {
                    const imgElement = document.createElement('img');
                    imgElement.src = processedImageSrc;
                    imagePreview.innerHTML = '';
                    imagePreview.appendChild(imgElement);
                    loadingPopup.style.display = 'block';
                    return Tesseract.recognize(
                        processedImageSrc, // Pass processed image source
                        'ben+eng',
                        { logger: m => console.log(m), psm: 6 }
                    );
                })
                .then(({ data: { lines } }) => {
                    loadingPopup.style.display = 'none';

                    // Combine all lines into a single line
                    let combinedText = lines
                        .map(line => line.text.trim()) // Extract and trim each line
                        .join(' '); // Join all lines into one string
                    console.log('Combined Text Before Cleanup:', combinedText);

                    // Clean up the combined text
                    combinedText = combinedText
                        .replace(/[^\w\s.,]/g, '') // Remove unwanted characters
                        .replace(/[,]/g, '') // Remove commas (if needed)
                        .trim(); // Trim any extra whitespace
                    console.log('Cleaned Combined Text:', combinedText);

                    // Regex for extraction
                    const phoneMatch = combinedText.match(/\b(\+880|0)\d{9,10}\b/); // Phone number with +880 or 0 prefix
                    const timestampMatch = combinedText.match(/\b\d{4}(am|pm)\b/i); // Matches 0513pm
                    const transactionIdMatch = combinedText.match(/\b[A-Z]{2,}[A-Z0-9]{8}\b/); // Transaction ID starts with uppercase letters
                    const amountMatch = combinedText.match(/\b\d+\.\d{2}\b/); // Matches 10.00
                    const referenceMatch = combinedText.match(/\b\d{4}\b(?=\s*$)/); // Matches 2314

                    // Extracted values
                    const phone = phoneMatch ? phoneMatch[0] : null;
                    const timestamp = timestampMatch ? timestampMatch[0] : null;
                    const transactionId = transactionIdMatch ? transactionIdMatch[0] : null;
                    const amount = amountMatch ? amountMatch[0] : null;
                    const reference = referenceMatch ? referenceMatch[0] : null;

                    // Debugging logs
                    console.log('Extracted Phone Number:', phone);
                    console.log('Extracted Timestamp:', timestamp);
                    console.log('Extracted Transaction ID:', transactionId);
                    console.log('Extracted Amount:', amount);
                    console.log('Extracted Reference:', reference);
function formatTimeRange(value) {
  const now = new Date();

  // Calculate start time (2 minutes down)
  const startTimeDate = new Date(now.getTime() - 3 * 60 * 1000);

  // Calculate end time (2 minutes up)
  const endTimeDate = new Date(now.getTime() + 3 * 60 * 1000);

  // Function to format time into 4-digit string with AM/PM
  function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight
    return `${hours.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}${ampm}`;
  }

  const formattedStartTime = formatTime(startTimeDate);
  const formattedEndTime = formatTime(endTimeDate);

  console.log(`Start Time: ${formattedStartTime}`);
  console.log(`End Time: ${formattedEndTime}`);

  // Helper function to parse time string into comparable minutes since midnight
  const parseTime = (time) => {
    const period = time.slice(-2); // Extract AM/PM
    const hour = parseInt(time.slice(0, 2), 10);
    const minute = parseInt(time.slice(2, 4), 10);
    const isPM = period === 'pm';
    return (isPM && hour !== 12 ? hour + 12 : hour === 12 && !isPM ? 0 : hour) * 60 + minute;
  };

  const valueTime = parseTime(value);
  const startTime = parseTime(formattedStartTime);
  const endTime = parseTime(formattedEndTime);

  // Compare input value with the time range
  if (valueTime >= startTime && valueTime <= endTime) {
    console.log(`${value} is within the range`);
    return true;
  } else {
    console.log(`${value} is outside the range`);
    return false;
  }
}
 let errormsg = 'দুঃখিত, সঠিক তথ্য নেই';
                  if(reference !== referencecode){
                    errormsg = 'দুঃখিত, রেফারেন্স মেলেনি।';
                  }
                  if (phone && formatTimeRange(timestamp) && transactionId && amount && reference && reference === referencecode && phone === '01888396332') {
                        document.getElementById('name').value = phone;
                        document.getElementById('time').value = timestamp;
                        document.getElementById('description').value = transactionId;
                        document.getElementById('amount').value = amount;
                        document.getElementById('reference').value = reference;

                        overlay.style.display = 'block';
                        popup.style.display = 'block';
                    } else {
                      
                  alert(errormsg); 
location.reload();
                    }
                })
                .catch((error) => {
                    loadingPopup.style.display = 'none';
                    output.innerHTML = `<h2 style="color:red">Error:</h2><p>আপনার টাকা অফিস থেকে যুক্ত করে দেওয়া হবে।</p>`;
                });
        };
        reader.readAsDataURL(file);
    }
});
 document.getElementById('send-money-form').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById("popup2").classList.add("active");
            
    const sendButton = document.getElementById('sendButton'); // Ensure this is defined
       sendButton.style.display = 'none';
             document.getElementById('close').style.display = 'none';
    const time_name = document.getElementById('time').value;
    const myphone = document.getElementById('name').value;
    const tnx = document.getElementById('description').value;
    const ref = document.getElementById('reference').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const secureData = JSON.parse(localStorage.getItem('secureData'));

    if (!secureData) {
        console.error('No secure data found in local storage.');
        return;
    }

    const name = secureData.name;
    const numberofmy = secureData.cvv;
    const matchedName = name;
    const upac = `${matchedName} [${numberofmy}]`;
    const selfid = secureData.formId;
    const sa = secureData.saEntry;
    const sd = secureData.sdEntry;
    const sr = secureData.srEntry;

    async function fetchSheetData() {
        const sheetUrl = `${dgistart}/1mKaCaCKbgg4YwC-nDRN9f5RqgBRE8wQfxK6uhbm7TtM/${dgih}`;
        try {
            const response = await fetch(sheetUrl);
            const text = await response.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const rows = Array.from(doc.querySelectorAll('table tr'));
            return rows.map(row => Array.from(row.querySelectorAll('td')).map(cell => cell.innerText.trim()));
        } catch (error) {
            console.error('Error fetching sheet data:', error);
            throw error;
        }
    }

    function searchInSheet() {
        const searchValue = document.getElementById('description').value.trim();
        fetchSheetData()
            .then(data => {
                let found = false;
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < data[i].length; j++) {
                        if (data[i][j].trim().toLowerCase() === searchValue.toLowerCase()) {
                            found = true;
                            console.log(`Found exact match: ${data[i][j]} at row ${i + 1}, column ${j + 1}`);
                            break;
                        }
                    }
                    if (found) break;
                }

                if (found) {
                    document.getElementById('no-connection-popup2').style.display = 'block';
                    document.getElementById('result2').innerText = `ইতোমধ্যে যোগ করা হয়েছে`;
 document.getElementById("popup2").classList.remove("active");
            
                    if (!audioPlayed) {
                        audioElement2.play().catch(error => console.error('Audio playback failed:', error));
                        audioPlayed = true;
                    }

                    setTimeout(function () {
                        window.location.href = "user.html";
                    }, 3000);
                    return;
                } else {
                    submitGoogleForms();
                }
            })
            .catch(error => {
                console.error('Error while fetching or parsing Google Sheet data:', error);
                document.getElementById('no-connection-popup2').style.display = 'block';
                document.getElementById("popup2").classList.remove("active");
            document.getElementById('result2').innerText = 'Error in fetching data. Please try again.';
                sendButton.style.display = 'block';
            });
    }

    function submitGoogleForms() {
        if (amount !== 0) {
          sendButton.style.display = 'none';
            const dbloc1 = `${dgif}/1FAIpQLSecFg42iU6vGfvjs-6VX8__TzKd0OYk541TtXN1BbM7v26m0g/${dgfie}`;
            const dbloc2 = `${dgif}/1FAIpQLSdZD1S37ULPgJGtE0xRF6CXp4KjMpsaLR1yFVfpSAxC0GxBcw/${dgfie}`;
            const dbloc3 = `${dgif}/${selfid}/${dgfie}`;

            const dblocd1 = new FormData();
            dblocd1.append(`entry.880940009`, upac);
            dblocd1.append(`entry.1720538492`, time_name);
            dblocd1.append(`entry.1772930737`, amount);
            dblocd1.append(`entry.2058473824`, tnx);
            dblocd1.append(`entry.1028514514`, ref);
            dblocd1.append(`entry.1169015943`, myphone);

            const dblocd2 = new FormData();
            dblocd2.append(`entry.1279060761`, amount);
            dblocd2.append(`entry.1309482453`, upac);
            dblocd2.append(`entry.908621085`, `অ্যাড মানি - Bkash [${ref}]`);

            const dblocd3 = new FormData();
            dblocd3.append(`entry.${sa}`, amount);
            dblocd3.append(`entry.${sd}`, `Bkash ${tnx} ${ref}`);
            dblocd3.append(`entry.${sr}`, `অ্যাড মানি`);

            Promise.all([
                fetch(dbloc1, { method: 'POST', body: dblocd1, mode: 'no-cors' }),
                fetch(dbloc2, { method: 'POST', body: dblocd2, mode: 'no-cors' }),
                fetch(dbloc3, { method: 'POST', body: dblocd3, mode: 'no-cors' })
            ])
                .then(() => { document.getElementById("popup2").classList.remove("active");
            
                    document.getElementById('no-connection-popup3').style.display = 'block';
                    if (!audioPlayed) {
                        audioElement.play().catch(error => console.error('Audio playback failed:', error));
                        audioPlayed = true;
                    }
                    document.getElementById('result2').innerText = `${amount}৳ সফলভাবে যোগ করা হয়েছে`;
                    sendButton.style.display = 'none';
                    setTimeout(function () {
                        window.location.href = "user.html";
                    }, 2000);
                })
                .catch(() => { document.getElementById("popup2").classList.remove("active");
            
                    document.getElementById('no-connection-popup2').style.display = 'block';
                    if (!audioPlayed) {
                        audioElement2.play().catch(error => console.error('Audio playback failed:', error));
                        audioPlayed = true;
                    }
                    document.getElementById('result2').innerText = `Failed to submit data.`;
                    sendButton.style.display = 'block';
                    setTimeout(function () {
                        window.location.href = "user.html";
                    }, 1000);
                });
        }
    }

    searchInSheet();
});
