document.addEventListener("DOMContentLoaded", function () {
    let audioPlayed = false;
       const audioElementnn = new Audio('fail.mp3');

 const audioElementn = new Audio('nyr.mp3');

                   
document.getElementById("popup2").classList.add("active");
        
 document.getElementById('loanbtn').disabled = true;
    audioElementn.preload = 'auto';
   audioElementnn.preload = 'auto';

    audioElementnn.load();

     audioElementn.load();
    function playnyr(){
         if (!audioPlayed) {
                audioElementn.play().catch(error => {
                    console.error('Audio playback failed:', error);
                });
                audioPlayed = true;
            }
           
    }
 function playn(){
         if (!audioPlayed) {

                audioElementnn.play().catch(error => {

                    console.error('Audio playback failed:', error);

                });

                audioPlayed = true;

            }

           
    }

 
 // Create and inject the parent popup div if it doesn't exist
let popup = document.getElementById('popup');
if (!popup) {
    popup = document.createElement('div');
    popup.id = 'popup';
    document.body.appendChild(popup); // Append the popup div to the body
}

// Create and inject the popup-content div inside the popup div
let popupContent = document.getElementById('popup-content');
if (!popupContent) {
    popupContent = document.createElement('div');
    popupContent.id = 'popup-content';
    popup.appendChild(popupContent); // Append popup-content inside popup
}

// Inject required CSS dynamically
const style = document.createElement('style');
style.textContent = `
    #popup-content {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 50%;
      pointer-events: none;
      z-index: 999;
  }

  .confetti {
      position: absolute;
      opacity: 0.9;
      animation: fall 4s ease-out forwards;
      pointer-events: none;
      z-index: 999;
  }

  .circle {
      border-radius: 50%;
  }

  .triangle {
      width: 0;
      height: 0;
      background-color: transparent;
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }

  @keyframes fall {
      0% {
          transform: translateY(-10%) scale(1);
          opacity: 1;
      }
      80% {
          transform: translateY(50vh) scale(0.7);
          opacity: 0.8;
      }
      100% {
          transform: translateY(50vh) scale(0);
          opacity: 0;
      }
  }
`;
document.head.appendChild(style); // Append styles to the head

// Confetti creation logic
const container = document.getElementById('popup-content');
const colors = ['red', 'yellow', 'blue', 'green', 'purple', 'orange', 'pink'];

function createConfetti() {
    const confetti = document.createElement('div');
    const type = Math.floor(Math.random() * 3); // Random shape type

    if (type === 0) {
        confetti.classList.add('confetti', 'circle');
    } else if (type === 1) {
        confetti.classList.add('confetti', 'triangle');
    } else {
        confetti.classList.add('confetti'); // Square
    }

    // Random size, position, and color
    const size = Math.random() * 1.5 ; // Size between 0.5rem and 2rem
    confetti.style.width = `${size}rem`;
    confetti.style.height = `${size}rem`;
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = `${Math.random() * 1 + 2}s`; // 2-4 seconds duration

    container.appendChild(confetti);

    // Remove confetti after animation ends
    setTimeout(() => {
        confetti.remove();
    }, 4000);
}

// Generate confetti at intervals
const confettiInterval = setInterval(createConfetti, 80);
    
let e = JSON.parse(localStorage.getItem("secureData"));
if (!e) {
    window.location.href = "index1.html";
    return;
}

const sheetUrlf = `${dgistart}/${e.sheetId}/${dgih}`;

let t = Number('0');

async function fetchData(t, n, l, r, o) {
    try {
        // Caching the fetch request to avoid repeated fetching
        if (!window.cachedData) {
            let response = await fetch(sheetUrlf),
                text = await response.text(),
                parser = new DOMParser(),
                doc = parser.parseFromString(text, "text/html");
            window.cachedData = doc.querySelectorAll("table");
        }

        let tables = window.cachedData;
        if (tables.length <= t) throw Error(`Sheet index ${t} out of bounds`);

        let rows = tables[t].rows;
        if (rows.length <= n) throw Error(`Row index ${n} out of bounds`);

        let cells = rows[n].cells;
        if (cells.length <= l) throw Error(`Cell index ${l} out of bounds`);

        let cellContent = cells[l].innerText || cells[l].textContent;
        const trimmedContent = cellContent.trim();

        // Extract and display only the numeric part for 4x2 (balance3)
        if (r === "balance3") {
            const numericValue = parseFloat(trimmedContent.match(/\d+/)?.[0] || "0");
            document.getElementById(r).innerText = numericValue;
            return;
        }

        if (r === "balance4") {
            const match = trimmedContent.match(/-?\d+(\.\d+)?/); // Extract numeric value, including negative or decimal numbers
            const maxValue = match ? parseFloat(match[0]) : 0; // Convert to number or set 0 if no match
            if (maxValue > 0) {
            document.getElementById("balance4").innerText =`${maxValue} টাকা বোনাস পেয়েছেন। Claim করুন দ্রুত।`;
                document.getElementById("popup").classList.add("active");
                }
            return;
        }

        if (o) {
            // Using document fragment for more efficient DOM manipulation
            let fragment = document.createDocumentFragment();
            trimmedContent.split("").forEach((char, index) => {
                let span = document.createElement("span");
                span.textContent = char === " " ? "\xa0" : char;
                span.classList.add(o);
                span.style.animationDelay = `${0.1 * index}s`;
                fragment.appendChild(span);
            });
            let element = document.getElementById(r);
            element.innerHTML = "";
            element.appendChild(fragment);
        } else {
            document.getElementById(r).innerText = trimmedContent;
        }

        // Check the balance2 value and update its color based on date
        if (r === "balance2") {
            let today = new Date();

            // Parse the balance2 value to extract the date range
            let match = trimmedContent.match(/(\d{1,2})-(\d{1,2}) (\w+) (\d{4})/);
            if (match) {
                let expiryElementt = document.getElementById("dps");
                if (expiryElementt) {
                    expiryElementt.style.display = '';
                }
                let dayStart = parseInt(match[1], 10);
                let dayEnd = parseInt(match[2], 10);
                let month = match[3];
                let year = parseInt(match[4], 10);

                // Construct start and end dates
                let startDate = new Date(`${month} ${dayStart}, ${year}`);
                let endDate = new Date(`${month} ${dayEnd}, ${year}`);

                // Check the current date against the range
                if (today > startDate && today < endDate) {
                    document.getElementById(r).style.color = "green";
                } else if (today > endDate) {
                    document.getElementById(r).style.color = "red"; // After endDate
                    document.getElementById("balance4").innerText =
                        'অনুগ্রহ পূর্বক আপনার একাউন্টে টাকা রাখুন । ডিপিএস এ টাকা জমা হয়নি।';
                    playn();
                    document.getElementById("popup").classList.add("active");
                }
            } else {
                const expiryElementt = document.getElementById("dps");
                if (expiryElementt) {
                    expiryElementt.style.display = 'none';
                }
            }
        }
    } catch (error) {
        console.error(error);
    }
}

// Example calls
async function l() {
    try {
        let e = await fetch(`${dgistart}/1VvKwtRmRSLy-eLCQfeCDeN6xT_vv-Gw5CsXbjcwcpxw/${dgih}`),
            t = await e.text(),
            n = new DOMParser(),
            l = n.parseFromString(t, "text/html"),
            r = l.querySelector("table").rows[1].cells[10],
            o = r.innerText || r.textContent;
        document.getElementById("balance4").innerText = o.trim();
    } catch (a) {
        console.error(a);
    }
}

Promise.all([
  fetchData(t, 3, 4, "balance1", "letter"),
  fetchData(t, 3, 3, "balance2", "letter-wave"),
  fetchData(0, 4, 2, "balance3", "letter"),
  fetchData(t, 4, 3, "balance4", "letter"),
       efff(),xyz()
]).then(() => {
  a();
}).catch(error => {
  console.error("Error in fetching data:", error);
});function efff() {
    let t = JSON.parse(localStorage.getItem("secureData"));
    let imgElement = document.getElementById("mypic");

    if (t) {
        document.getElementById("name").innerText = t.name;
        document.getElementById("mob").innerText = t.cvv;

        let db;

        // Open or create IndexedDB database
        let request = indexedDB.open("ImageDB", 1);

        request.onupgradeneeded = function (event) {
            db = event.target.result;
            if (!db.objectStoreNames.contains("images")) {
                db.createObjectStore("images", { keyPath: "id" });
            }
        };

        request.onsuccess = function (event) {
            db = event.target.result;
            checkAndLoadImage();
        };

        request.onerror = function (event) {
            console.error("Error opening IndexedDB:", event.target.error);
        };

        function checkAndLoadImage() {
            let savedImgUrl = localStorage.getItem("savedImageUrl");

            if (t.img === "not added") {
                imgElement.src = "who.png";
            } else if (savedImgUrl === t.img) {
                loadImageFromIndexedDB();
            } else {
                localStorage.setItem("savedImageUrl", t.img);
                saveImageToIndexedDB(t.img);
                imgElement.src = t.img;
            }
        }

        function saveImageToIndexedDB(imageUrl) {
            if (imageUrl === "not added") return;

            fetch(imageUrl)
                .then((response) => response.blob())
                .then((blob) => {
                    let reader = new FileReader();
                    reader.onload = function () {
                        let transaction = db.transaction(["images"], "readwrite");
                        let store = transaction.objectStore("images");
                        store.put({ id: "savedImage", data: reader.result });
                    };
                    reader.readAsDataURL(blob);
                })
                .catch((error) => console.error("Error fetching image:", error));
        }

        function loadImageFromIndexedDB() {
            let transaction = db.transaction(["images"], "readonly");
            let store = transaction.objectStore("images");
            let request = store.get("savedImage");

            request.onsuccess = function () {
                if (request.result) {
                    imgElement.src = request.result.data;
                } else {
                    imgElement.src = "who.png";
                }
            };

            request.onerror = function () {
                console.error("Error loading image from IndexedDB");
            };
        }

        // Create popup elements
        const popupOverlay = document.createElement("div");
        const popupImage = document.createElement("img");

        // Set styles for popup overlay
        popupOverlay.style.position = "fixed";
        popupOverlay.style.top = "0";
        popupOverlay.style.left = "0";
        popupOverlay.style.width = "100%";
        popupOverlay.style.height = "100%";
        popupOverlay.style.background = "rgba(0, 0, 0, 0.5)";
        popupOverlay.style.backdropFilter = "blur(2px)";
        popupOverlay.style.webkitBackdropFilter = "blur(2px)";
        popupOverlay.style.display = "none";
        popupOverlay.style.justifyContent = "center";
        popupOverlay.style.alignItems = "center";
        popupOverlay.style.zIndex = "1000";

        // Set styles for popup image
        popupImage.style.maxWidth = "90%";
        popupImage.style.maxHeight = "90%";
        popupImage.style.borderRadius = "10px";
        popupImage.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.5)";

        popupOverlay.appendChild(popupImage);
        document.body.appendChild(popupOverlay);

        imgElement.addEventListener("click", function () {
            let transaction = db.transaction(["images"], "readonly");
            let store = transaction.objectStore("images");
            let request = store.get("savedImage");

            request.onsuccess = function () {
                if (request.result) {
                    popupImage.src = request.result.data;
                    popupOverlay.style.display = "flex";
                }
            };
        });

        popupOverlay.addEventListener("click", function (e) {
            if (e.target === popupOverlay) {
                popupOverlay.style.display = "none";
            }
        });
    } else {
        window.location.href = "index1.html";
    }
}

   let r = "sheetCellValue";
    function o() {
    }

    async function a() {
        try {
            let e = await fetch(`${dgistart}/1VvKwtRmRSLy-eLCQfeCDeN6xT_vv-Gw5CsXbjcwcpxw/${dgih}`),
                t = await e.text(),
                n = new DOMParser(),
                l = n.parseFromString(t, "text/html"),
                o = l.querySelector("table tbody tr:first-child td:nth-child(6)").innerText;
            let a = localStorage.getItem(r);
                o !== a && (localStorage.setItem(r, o), localStorage.removeItem("popupShown")),
                "true" !== localStorage.getItem("popupShown") && (console.log("Showing popup"),setTimeout(() => {
    clearInterval(confettiInterval);
  }, 3000),l(), playnyr()
   ,document.getElementById("popup").classList.add("active"));
        } catch (i) {
        }
    }
// Add the current state to the history stack
window.history.pushState(null, null, window.location.href);

// Listen for the popstate event (triggered by the back button)
window.addEventListener('popstate', function (event) {
    // Show a confirmation dialog
    const confirmation = confirm("আপনি কি লগ-আউট করতে চান? Do you want to logout?");
    if (confirmation) {
        // Allow the back navigation by removing the event listener
        window.removeEventListener('popstate', arguments.callee);
        localStorage.removeItem("secureData");
        document.getElementById("mypic").src = 'lock.gif';
             setTimeout(function() {
               window.location.href = "index1.html";
    }, 1000);
    } else {
        // Push the state back to prevent navigation
        window.history.pushState(null, null, window.location.href);
    }
});

    document.getElementById("clearButton").addEventListener("click", function e() {
        localStorage.removeItem("secureData");
        document.getElementById("mypic").src = 'lock.gif';
             setTimeout(function() {
               window.location.href = "index1.html";
    }, 1000);
    });
     function xyz() {
               setTimeout(() => {
                   
    document.getElementById("popup2").classList.remove("active");
 }, 500);
};
  

const ex = JSON.parse(localStorage.getItem("secureData"));
    
  // Universal user data
const user = {
    sheetid:ex.sheetId ,
    formid: ex.formId,
    sa: ex.saEntry,
    sd: ex.sdEntry,
    sr: ex.srEntry,
    name: ex.name,
    id: ex.cvv
};
    localStorage.setItem('payur',`sheetid=${user.sheetid}&formid=${user.formid}&sa=${user.sa}&sd=${user.sd}&sr=${user.sr}&name=${encodeURIComponent(user.name)}&id=${user.id}`);
// Event listener for the "cashout" button
document.getElementById("cashout").addEventListener("click", function () {
    const now = new Date();
    const currentHour = now.getHours();
     if (currentHour >= 10 && currentHour <= 22) {
        window.location.href = `bootstrap.html`;
    } else {
        window.location.href = "sorry.html";
    }
});

// Event listener for the "dension" button
document.getElementById("dension").addEventListener("click", function () {
     window.location.href = `minJs.html`;
});

// Event listener for the "qrbtn" button
document.getElementById("qrbtn").addEventListener("click", function () {
    window.location.href = `qrscan.html`;
});
});
