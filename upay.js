let timerInterval;
let referencecode;
let remainingTime = 0; // Tracks the remaining time in seconds

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
    const originalWidth = img.width;
    const originalHeight = img.height;

    // Calculate cropping dimensions
    const topCrop = originalHeight * 0.60; // 60% of the height
    const bottomCrop = originalHeight * 0.15; // 15% of the height
    const croppedHeight = originalHeight - topCrop - bottomCrop; // Remaining height after cropping

    // Set canvas size to match the cropped area
    canvas.width = originalWidth;
    canvas.height = croppedHeight;

    // Draw the cropped portion of the image
    ctx.drawImage(
        img,
        0, topCrop, // Start cropping from 60% down the image
        originalWidth, croppedHeight, // Use remaining height after removing 15% from the bottom
        0, 0, // Draw on the canvas starting at (0,0)
        originalWidth, croppedHeight // Scale the image to fit the canvas
    );

    // Only apply processing for images with width >= 1080px
    if (canvas.width >= 1080) {
        // Reset any existing filter
        ctx.filter = 'blur(1px)'; // Ensure no blur is applied

        // Get image data for sharpening
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Define sharpening kernel
        const kernel = [
            0, -1,  0,
           -1,  5, -1,
            0, -1,  0
        ];

        // Apply sharpening
        const sharpenedData = applyConvolution(imageData, kernel);

        // Put the sharpened data back into the canvas
        ctx.putImageData(sharpenedData, 0, 0);
    }

    // Return processed image as base64
    resolve(canvas.toDataURL());
};

img.onerror = reject;
img.src = imageSrc; // Set src after attaching onload and onerror

// Helper function to apply convolution filters
function applyConvolution(imageData, kernel) {
    const width = imageData.width;
    const height = imageData.height;
    const output = new ImageData(width, height);
    const data = imageData.data;
    const outputData = output.data;

    const kernelSize = Math.sqrt(kernel.length);
    const half = Math.floor(kernelSize / 2);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0;

            for (let ky = -half; ky <= half; ky++) {
                for (let kx = -half; kx <= half; kx++) {
                    const px = Math.min(width - 1, Math.max(0, x + kx));
                    const py = Math.min(height - 1, Math.max(0, y + ky));
                    const offset = (py * width + px) * 4;

                    const weight = kernel[(ky + half) * kernelSize + (kx + half)];
                    r += data[offset] * weight;
                    g += data[offset + 1] * weight;
                    b += data[offset + 2] * weight;
                }
            }

            const index = (y * width + x) * 4;
            outputData[index] = Math.min(255, Math.max(0, r));
            outputData[index + 1] = Math.min(255, Math.max(0, g));
            outputData[index + 2] = Math.min(255, Math.max(0, b));
            outputData[index + 3] = data[index + 3]; // Copy alpha channel
        }
    }

    return output;
}});
}

function applyConvolution(imageData, kernel) {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;
    const output = new Uint8ClampedArray(data);

    const kernelSize = Math.sqrt(kernel.length);
    const halfKernel = Math.floor(kernelSize / 2);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0;

            for (let ky = -halfKernel; ky <= halfKernel; ky++) {
                for (let kx = -halfKernel; kx <= halfKernel; kx++) {
                    const px = Math.min(width - 1, Math.max(0, x + kx));
                    const py = Math.min(height - 1, Math.max(0, y + ky));
                    const offset = (py * width + px) * 4;
                    const weight = kernel[(ky + halfKernel) * kernelSize + (kx + halfKernel)];

                    r += data[offset] * weight;
                    g += data[offset + 1] * weight;
                    b += data[offset + 2] * weight;
                }
            }

            const idx = (y * width + x) * 4;
            output[idx] = Math.min(255, Math.max(0, r));
            output[idx + 1] = Math.min(255, Math.max(0, g));
            output[idx + 2] = Math.min(255, Math.max(0, b));
        }
    }

    return new ImageData(output, width, height);
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
                    const nameMatch = combinedText.match(/\b[A-Z]{2,}\b/); // Matches uppercase text like MANIK
                    const amountAfterNameMatch = combinedText.match(/\b[A-Z]{2,}\s+(\d+\.\d{2})\b/); // Matches 25.00 after MANIK
                    const phoneMatch = combinedText.match(/\b(\+880|0)\d{9,10}\b/); // Phone number with +880 or 0 prefix
                    const transactionIdMatch = combinedText.match(/\b[A-Z0-9]{10}\b/); // Matches 10-character alphanumeric transaction ID
                    const referenceMatch = combinedText.match(/\b\d{4}\b(?=\s*$)/); // Matches 4-digit reference (2341)

                    // Extracted values
                    const name = nameMatch ? nameMatch[0] : null;
                    const amountAfterName = amountAfterNameMatch ? amountAfterNameMatch[1] : null;
                    const phone = phoneMatch ? phoneMatch[0] : null;
                    const transactionId = transactionIdMatch ? transactionIdMatch[0] : null;
                    const reference = referenceMatch ? referenceMatch[0] : null;

                    // Debugging logs
                    console.log('Extracted Name:', name);
                    console.log('Extracted Amount After Name:', amountAfterName);
                    console.log('Extracted Phone Number:', phone);
                    console.log('Extracted Transaction ID:', transactionId);
                    console.log('Extracted Reference:', reference);

                   let errormsg = 'দুঃখিত, সঠিক তথ্য নেই';
                  if(reference !== referencecode ){
                    errormsg = 'দুঃখিত, রেফারেন্স মেলেনি।';
                  } // Populate fields if all matches exist
                    if (amountAfterName && phone === '01888396332' && transactionId && reference === referencecode) {
                        document.getElementById('name').value = name;
                        document.getElementById('amount').value = amountAfterName;
                        document.getElementById('phone').value = phone;
                        document.getElementById('transactionId').value = transactionId;
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
    document.getElementById('close').style.display = 'none';
        sendButton.style.display = 'none';
            
    const time_name = document.getElementById('name').value;
    const myphone = document.getElementById('phone').value;
    const tnx = document.getElementById('transactionId').value;
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
        const searchValue = document.getElementById('transactionId').value.trim();
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

                if (found) { document.getElementById("popup2").classList.remove("active");
            
                    document.getElementById('no-connection-popup2').style.display = 'block';
                    document.getElementById('result2').innerText = `ইতোমধ্যে যোগ করা হয়েছে`;

                    if (!audioPlayed) {
                        audioElement2.play().catch(error => console.error('Audio playback failed:', error));
                        audioPlayed = true;
                    }

                    setTimeout(function () {
                        window.location.href = "user.html";
                    }, 2000);
                    return;
                } else {
                    submitGoogleForms();
                }
            })
            .catch(error => { document.getElementById("popup2").classList.remove("active");
            
                console.error('Error while fetching or parsing Google Sheet data:', error);
                document.getElementById('no-connection-popup2').style.display = 'block';
                document.getElementById('result2').innerText = 'Error in fetching data. Please try again.';
                sendButton.style.display = 'block';
            });
    }

    function submitGoogleForms() {
        if (amount !== 0) {
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
            dblocd2.append(`entry.908621085`, `অ্যাড মানি - Upay ${ref}`);

            const dblocd3 = new FormData();
            dblocd3.append(`entry.${sa}`, amount);
            dblocd3.append(`entry.${sd}`, `Upay ${tnx} ${ref}`);
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
