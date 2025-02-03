let isSubmitting = false;
function createFormAndSheet() {
  // Prevent multiple executions by disabling the trigger (if event-based)
  const popupElement = document.getElementById("popup");
 
  popupElement.classList.remove("active");

  const formCreatedKey = 'formCreated'; // Key to track form creation
  const formDataKey = 'formData';       // Key to store fetched form data

  // Check if the form has already been created
  if (localStorage.getItem(formCreatedKey)) {
    // Retrieve the stored data from localStorage
    const storedData = JSON.parse(localStorage.getItem(formDataKey));
    displayResult(storedData); // Use the local data to display the result
  } else {
    // Proceed to create the form and fetch data
    fetch(`${strct}/AKfycbwWjamGlkMhsTUvkE50Rs0gE16S9vivqh7rbp9iaBCqPnAfZUPns7sb_KFegM5pUuS7Ig/exec`)
      .then(response => response.json())
      .then(data => {
        displayResult(data); // Display the fetched data

        // Save the form creation flag and fetched data to localStorage
        localStorage.setItem(formCreatedKey, 'true');
        localStorage.setItem(formDataKey, JSON.stringify(data));
      })
      .catch(error => console.error("Error:", error));
  }
}

// Ensure the function is called only once if triggered by an event
document.addEventListener("DOMContentLoaded", () => {
  createFormAndSheet();
});



function displayResult(result) {
  const formUrl = result.formUrl.replace(/\/edit.*/, '/viewform');
  const sheetUrl = result.sheetUrl.replace(/\/edit.*/, '/');

   document.getElementById("formurl").value = formUrl;
  document.getElementById("sheeturl").value = sheetUrl;

  setTimeout(function () {
   calculate2();

    setTimeout(function () {
   extractDataFromURL();},1000);

    

  },1000);
}
async function extractDataFromURL() {
    const url = document.getElementById('formurl').value.trim();

    if (!url) {
       document.getElementById("popup").classList.remove("active");
    return;
    }

    // Update iframe source
    const iframe = document.getElementById('urlFrame');
    iframe.src = url;

    try {
        const response = await fetch(url, { cache: 'no-store' }); // Avoid cached responses
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const content = await response.text();
        extractFBData(content);
    } catch (error) {
        displayMessage(`Error fetching URL: ${error.message}`, 'error');
    document.getElementById("popup").classList.remove("active");
   }
}

function displayMessage(message, type) {
    const output = document.getElementById('output');
    output.textContent = message;
    output.style.color = type === 'error' ? 'red' : type === 'success' ? 'green' : 'black';
}

function extractFBData(content) {
    const match = content.match(/FB_PUBLIC_LOAD_DATA_ = (.+?);<\/script>/);
    if (match) {
        const jsonData = JSON.parse(match[1]);
        const extractedValues = [
            jsonData[1][1][0][4][0][0],
            jsonData[1][1][1][4][0][0],
            jsonData[1][1][2][4][0][0]
        ];
      const idMatch = content.match(/"e\/(1F[\w\-]+)"/);
        if (idMatch) {
            const extractedID = idMatch[1]; // This will be your ID, e.g., '1FAIpQLSexjJ-Zc0pYZi50JWgl_F7xYPvVSrk8iEG1lrYgw_cobT5JDw'
          document.getElementById('formid').value = extractedID;
}
        const extractedDataDiv = document.getElementById('extractedData');
        document.getElementById("sd").value = extractedValues[0]; // Corrected interpolation
        document.getElementById("sr").value = extractedValues[1]; // Corrected interpolation
        document.getElementById("sa").value = extractedValues[2]; // Corrected interpolation

    } else {
        document.getElementById("result1").textContent = 'Failed to fetch data!';
      document.getElementById("popup").classList.remove("active");
   
    }
}

async function calculate2(e = null) {
    if (e) {
        e.preventDefault(); // Prevent default action if triggered by a button
    }
 
    const sheetUrl = document.getElementById('sheeturl').value;

   
    const idRegexSheet = /\/d\/([a-zA-Z0-9_-]+)/;

    const sheetIdMatch = sheetUrl.match(idRegexSheet);

    
    const sheetId = sheetIdMatch ? sheetIdMatch[1] : "Not found";

    
    document.getElementById('sheetid').value = sheetId;

     };

 
  const phoneinlcl = localStorage.getItem('phoneNumberx');
  document.getElementById("phone").value = phoneinlcl;
 
document.getElementById('btn-register').addEventListener('click', function(e) { 
    e.preventDefault(); 
   document.getElementById("popup").classList.add("active");
    document.getElementById('btn-register').disabled = true;
  document.getElementById('btn-register').style.display = 'none';              
   const inputss = document.querySelectorAll('input'); // Select all input elements
      inputss.forEach(inputs => {
        inputs.setAttribute('readonly', true);
inputs.style.opacity ='0.5'    ; 
inputs.style.backgroundColor = '#ccc'    ;    // Set the readonly attribute
      });
const registerButtonx = document.getElementById('btnhide');
     
    const checkAndUpdate = () => {
document.getElementById("popup").classList.add("active");
    document.getElementById('btn-register').disabled = true;
  document.getElementById('btn-register').style.display = 'none';              
  
        const inputField = document.getElementById('sa');

        const xyz = inputField.value; // Get the value of the input field

    
 const inputField2 = document.getElementById('ind');

        const xyz2 = inputField2.value; // Get the value of the input field

    
   
        if (xyz && xyz2 && xyz !== '' && xyz2 !=='') {

         
setTimeout(function () {
         
  submitdata();
         
},1000);
           } else {

            

        }

    

        // Retry the check after 500ms to continuously monitor the input value

        setTimeout(checkAndUpdate, 4000);

    };

    

    // Initial call to check and update

    checkAndUpdate();

function submitdata() {
  document.getElementById("popup").classList.add("active");
   document.getElementById('btn-register').disabled = true;
   document.getElementById('btn-register').style.display = 'none';              
   
    if (isSubmitting) 
  {return;}else{ // Prevent duplicate submissions
    isSubmitting = true;}

    // Form field values
    const name = document.getElementById('name').value;
    const land = document.getElementById('land').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const sheetId = document.getElementById('sheetid').value;
    const formId = document.getElementById('formid').value;
    const sd = document.getElementById('sd').value;
    const sr = document.getElementById('sr').value;
    const sa = document.getElementById('sa').value;
    const pin = document.getElementById('ind').value;

    // Formulas
    const ts = `${name} ${phone}`;
    const rst = 'dps date';
    const cst = '0';

    // URLs
    const formUrl1 = `${dgif}/1FAIpQLSeVUsPhx2PplV7q9G5rkkGTbAH3yRDDwiDAESPlJyj258HXPA/${dgfie}`;
    const formUrl2 = `${dgif}/${formId}/${dgfie}`;
    const formUrl3 = `${dgif}/1FAIpQLSdyP6ftRKmGI8etUJmb1CmNFy6IDQ7QO7mkC8N6RqdxPaXT3A/${dgfie}`;
    // FormData objects
    const formData2 = new FormData();
    formData2.append(`entry.${sd}`, ts);
    formData2.append(`entry.${sr}`, rst);
    formData2.append(`entry.${sa}`, cst);
    const formData1 = new FormData();
    formData1.append(`entry.1872556489`, name);
    formData1.append(`entry.1409391654`, land);
    formData1.append(`entry.459622576`, phone);
    formData1.append(`entry.1255894170`, email);
    formData1.append(`entry.490645122`, 'not added');
    formData1.append(`entry.1742050287`, sheetId);
    formData1.append(`entry.574806676`, formId);
    formData1.append(`entry.336052520`, sd);
    formData1.append(`entry.1338662947`, sr);
    formData1.append(`entry.662172123`, sa);

    const formData4 = new FormData();
    formData4.append(`entry.2040908255`, phone);
    formData4.append(`entry.1122259669`, pin);
    formData4.append(`entry.375326296`, email);

      Promise.all([
        fetch(formUrl3, { method: 'POST', body: formData4, mode: 'no-cors' }),
        fetch(formUrl1, { method: 'POST', body: formData1, mode: 'no-cors' }),
        fetch(formUrl2, { method: 'POST', body: formData2, mode: 'no-cors' })
    ])
    .then(() => {
      localStorage.setItem('phoneNumber',phone);
       const registerButton = document.getElementById('registerButton');
        if (registerButton) {
            registerButton.style.display = 'none';
        }
         // Delay before the next form submission
        setTimeout(() => {
            const formData3 = new FormData();
            formData3.append(`entry.${sd}`, "dps balance 0");
            formData3.append(`entry.${sr}`, "bonus value 0");
            formData3.append(`entry.${sa}`, '0');
            fetch(formUrl2, { method: 'POST', body: formData3, mode: 'no-cors' })
                .then(() => {
                   localStorage.removeItem('formCreated');
localStorage.removeItem('formData');
                setTimeout(function () {
           editsum();
   }, 3000);  
                })
                .catch(error => {
                    document.getElementById('result1').innerText = 'Error: ' + error.message;
                });
        }, 1000);
    })
    .catch(error => {
        document.getElementById('result1').innerText = 'Error: ' + error.message;
    });
}
  async function editsum() {
    const password2 = document.getElementById('sheetsum').value;
    const sheetId = document.getElementById('sheetid').value;
    const sheetName = '1টি ফর্ম প্রতিক্রিয়া';
    const action = 'updateCell';

    const payload = {
        sheetId,
        sheetName,
        action,
        row: 2,
        column: 4,
        value: password2
    };

    try {
        const response = await fetch(
            `${strct}/AKfycbwVNVJsEAgAmUuNYxG8qpslRAdOcIwAAEuUEI_XlY7lydXVsniY_XH7IBv6LOwtGp4o/exec`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            }
        );
        const result = await response.text();
      document.getElementById("popup").classList.remove("active");
        document.querySelector('.registration-container').style.backgroundColor = '#f8f0fc';
        document.getElementById('regi').innerHTML = `<img style="max-width:300px; max-height:300px; margin:10px" src="bdone.gif"><br><h3>Successful</h3>`;
const todayn = new Date().toLocaleDateString();
                    const lastSavedDate = localStorage.getItem('lastSavedDatell');
                    const newCoin = Math.abs(Number(localStorage.getItem('score')) + Number(250));

                    if (lastSavedDate !== todayn) {
                        localStorage.setItem('score', newCoin);
                        localStorage.setItem('lastSavedDatell', todayn);
                    }

        // Ensure the 'registerButton' is defined and refers to the correct element
             setTimeout(function () {
               window.location.href = 'index.html'; // Optionally, show an error message to the user
   }, 1000);
    } catch (error) {
       setTimeout(function () {
            window.location.href = 'sorry.html'; // Optionally, show an error message to the user
   }, 1000); }
}
        
});
