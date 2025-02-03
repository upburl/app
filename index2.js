
// Define the card mapping
function triggerShake() {
      const container = document.getElementById('loginForm');
      let shakeInterval;
      let shakeTime = 0;
      
      // Function to create the soft left-right shake effect
      function shake() {
        const randomX = Math.floor(Math.random() * 6) - 3; // Small shake between -3px and 3px for X (left-right)
        
        container.style.transform = `translateX(${randomX}px)`; // Only translate along the X-axis
        
        shakeTime += 50; // Shake duration in milliseconds
        if (shakeTime >= 300) { // Shake for 300ms (for a smoother and shorter effect)
          clearInterval(shakeInterval);
          container.style.transform = ''; // Reset the transform property after the shake
        }
      }

      // Start shaking at 50ms intervals
      shakeInterval = setInterval(shake, 50);
}
const cardMapping = { 
    243: "6001 0000 7890", 
    143: "6001 0000 3241", 
    789: "6001 0000 5678",
      678: "6001 0000 9876",
    567: "6001 0000 8765", 
    267: "6001 0000 8934", 
    375: "6001 0000 1365", 
    643: "6002 0000 1327", 
    743: "6002 0000 6521", 
    896: "6003 0000 4572",
410: "6003 0000 5287", 
    203: "6003 0000 1478", 
    152: "6003 0000 6348", 
    745: "6003 0000 2983", 
    549: "6002 0000 7621"
};

// Update card number input based on CVV input
let cvvElement = document.getElementById("cvv"),
    cardNumberElement = document.getElementById("card-number");

cvvElement.addEventListener("input", () => {
    let cvvValue = cvvElement.value;
    cardNumberElement.value = cardMapping[cvvValue] || "600* 0000 ****";
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.body.classList.add('move-down');
   
    const phoneNumber = document.getElementById('cvv').value;
    const pin = document.getElementById('password').value;
            let audioPlayed = false;
const audioElement = new Audio('fail.mp3');

// Preload the audio
audioElement.preload = 'auto';
audioElement.load();
    const failed = document.getElementById('no-connection-popup2');


  const accountDetails = [
        { phoneNumber: '243', pin: '369369', url: 'carduser.html', historylink: 'https://docs.google.com/spreadsheets/d/1MlPp7zpJWnXb7XdImIcrgUNWWqFNidOCGF1rBKG7Xjg/gviz/tq?gid=1236981988', surl: 'https://docs.google.com/forms/d/e/1FAIpQLSfNAWSxevXYMOE8HlhzfouKHf5canb-c4QR0GSa_vE-T_LYAA/formResponse', saentry: 'entry.1522107311', sdentry: 'entry.1449208456', tbl: 1, qurl: 'https://docs.google.com/spreadsheets/u/0/d/1MlPp7zpJWnXb7XdImIcrgUNWWqFNidOCGF1rBKG7Xjg/htmlview', ifurl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQqz7TOt6SXxJzRQiaASvhL_jdSCdy_OsR7bFtaU9jj68HGM-9eRDZoKwk5sjnc_TBQKMk5esR75Cdm/pubchart?oid=288232094&amp;format=interactive', name: 'Moral Adnan', img: 'https://nfcard.github.io/login/Ratulimg.jpg' },
        { phoneNumber: '678', pin: 'ritu678', url: 'carduser.html',name:'Mst Ritu',img:'https://nfcard.github.io/login/Rituimg.jpg', ifurl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQqz7TOt6SXxJzRQiaASvhL_jdSCdy_OsR7bFtaU9jj68HGM-9eRDZoKwk5sjnc_TBQKMk5esR75Cdm/pubchart?oid=477226985&amp;format=interactive',  tbl: 2,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSdiZVekoO867RZ4Ep4fyS7QYBczYNo28eIANzzFr51VuuD2lA/formResponse',  saentry: 'entry.1273386060',  sdentry: 'entry.928300410',  historylink: 'https://docs.google.com/spreadsheets/d/1MlPp7zpJWnXb7XdImIcrgUNWWqFNidOCGF1rBKG7Xjg/gviz/tq?gid=1956663367',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/1MlPp7zpJWnXb7XdImIcrgUNWWqFNidOCGF1rBKG7Xjg/htmlview' },
        { phoneNumber: '143', pin: 'sadik4u3', url: 'carduser.html' ,name:'Sadik Hasan',img:'https://nfcard.github.io/login/Sadikimg.jpg', tbl: 5,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSeRN1fDSrzXRhvT4PCW5_DyDhaZj-bYjkMtogsGznLGu_Y9_w/formResponse',  saentry: 'entry.388106005',  sdentry: 'entry.478936436',  historylink: 'https://docs.google.com/spreadsheets/d/1MlPp7zpJWnXb7XdImIcrgUNWWqFNidOCGF1rBKG7Xjg/gviz/tq?gid=859777819',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/1MlPp7zpJWnXb7XdImIcrgUNWWqFNidOCGF1rBKG7Xjg/htmlview'},
        { phoneNumber: '567', pin: 'taj567', url: 'carduser.html' , name:'Md Tajul Mulk',img:'https://nfcard.github.io/login/Tajimg.jpg', ifurl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQqz7TOt6SXxJzRQiaASvhL_jdSCdy_OsR7bFtaU9jj68HGM-9eRDZoKwk5sjnc_TBQKMk5esR75Cdm/pubchart?oid=2026528402&amp;format=interactive',  tbl: 3,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLScRGGayY33j_5k8TzL7f_O-DlU9P6gfAMNPA4xxjTcrwpHblQ/formResponse',  saentry: 'entry.366857651',  sdentry: 'entry.2048423254',  historylink: 'https://docs.google.com/spreadsheets/d/1MlPp7zpJWnXb7XdImIcrgUNWWqFNidOCGF1rBKG7Xjg/gviz/tq?gid=396292196',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/1MlPp7zpJWnXb7XdImIcrgUNWWqFNidOCGF1rBKG7Xjg/htmlview'},
        { phoneNumber: '789', pin: 'rifat789', url: 'carduser.html' ,name:'Md Rifat',img:'https://nfcard.github.io/login/Rifatimg.jpg',ifurl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQqz7TOt6SXxJzRQiaASvhL_jdSCdy_OsR7bFtaU9jj68HGM-9eRDZoKwk5sjnc_TBQKMk5esR75Cdm/pubchart?oid=1165459337&amp;format=interactive',  tbl: 4,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSdwibAx-kNF8WUJMtkLovi5v7CvD8b331qg8cuIXxQgvBY3fQ/formResponse',  saentry: 'entry.571402887',  sdentry: 'entry.885732113',  historylink: 'https://docs.google.com/spreadsheets/d/1MlPp7zpJWnXb7XdImIcrgUNWWqFNidOCGF1rBKG7Xjg/gviz/tq?gid=269875807',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/1MlPp7zpJWnXb7XdImIcrgUNWWqFNidOCGF1rBKG7Xjg/htmlview' },
        { phoneNumber: '375', pin: '007', url: 'carduser.html',name:'Jubayer Ahmed',img:'https://nfcard.github.io/login/Jubayerimg.jpeg', tbl: 2,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSez19H6vm8kLmvRV33WPadkuscVBjjvku0pIeZKNSO7gpV-hA/formResponse',  saentry: 'entry.1522107311',  sdentry: 'entry.1449208456',  historylink: 'https://docs.google.com/spreadsheets/d/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/gviz/tq?gid=8875538',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/htmlview' ,ifurl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTkkgXsISNZYZJNpNPhPNZvGFPVFJ3nUOE8B8wpHykgLryt9BmDTiBakKp7KbL0M6gdLqZvwUYxQ1YY/pubchart?oid=1716654532&amp;format=interactive' },
        { phoneNumber: '267', pin: '161', url: 'carduser.html', name:'Md Ruhul Amin',img:'https://nfcard.github.io/login/Ruhulimg.jpeg', tbl: 3,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLScuAspEw6MJNhkI8tPYKCHZhRfS6F3n15EElqu73AzMqjBhSA/formResponse',  saentry: 'entry.1522107311',  sdentry: 'entry.1449208456',  historylink: 'https://docs.google.com/spreadsheets/d/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/gviz/tq?gid=1327727360',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/htmlview' ,ifurl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTkkgXsISNZYZJNpNPhPNZvGFPVFJ3nUOE8B8wpHykgLryt9BmDTiBakKp7KbL0M6gdLqZvwUYxQ1YY/pubchart?oid=981166977&amp;format=interactive' },
        { phoneNumber: '743', pin: 'arafat10', url: 'carduser.html' ,name:'Md Arafat',img:'uplogo.png',tbl: 4,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSdpFVGyWcmC6PGs8wbFU9IihzUT1olphC-D-mdOVaJjQvNs1Q/formResponse',  saentry: 'entry.1522107311',  sdentry: 'entry.1449208456',  historylink: 'https://docs.google.com/spreadsheets/d/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/gviz/tq?gid=768616049',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/htmlview' ,ifurl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTkkgXsISNZYZJNpNPhPNZvGFPVFJ3nUOE8B8wpHykgLryt9BmDTiBakKp7KbL0M6gdLqZvwUYxQ1YY/pubchart?oid=659329981&amp;format=interactive' },
        { phoneNumber: '643', pin: 'shorna643', url: 'carduser.html' ,name:'Mst Shorna',img:'uplogo.png',tbl: 1,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSdcI8OW5HEFDIE4Vm_94aEoyrqejw18j3oGr0SXbnlveitjgw/formResponse',  saentry: 'entry.1522107311',  sdentry: 'entry.1449208456',  historylink: 'https://docs.google.com/spreadsheets/d/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/gviz/tq?gid=1574723758',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/htmlview' ,ifurl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTkkgXsISNZYZJNpNPhPNZvGFPVFJ3nUOE8B8wpHykgLryt9BmDTiBakKp7KbL0M6gdLqZvwUYxQ1YY/pubchart?oid=323216964&amp;format=interactive' },
        { phoneNumber: '896', pin: '896', url: 'carduser.html' ,name:'Habib Store',img:'https://nfcard.github.io/login/habib.jpg',tbl: 5,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSfeGLi1AvyzGFbLFsZO1cBE6b6yvAVMx8xxZtyuME4P2efMQQ/formResponse',  saentry: 'entry.1522107311',  sdentry: 'entry.1449208456',  historylink: 'https://docs.google.com/spreadsheets/d/14-IqnFf2n_9KFJ40CHg84cfL0Nn3GdM8z31WhJ_89H4/gviz/tq?gid=1858443137',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/14-IqnFf2n_9KFJ40CHg84cfL0Nn3GdM8z31WhJ_89H4/htmlview' },
 { phoneNumber: '410', pin: '123', url: 'carduser.html' ,name:'name',img:'uplogo.png',tbl: 4,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSdJJPZtlXFcRYGCIhViDUDuDiSEbtgEiq-lg0TB5Q0yjMHstw/formResponse',  saentry: 'entry.1522107311',  sdentry: 'entry.1449208456',  historylink: 'https://docs.google.com/spreadsheets/d/14-IqnFf2n_9KFJ40CHg84cfL0Nn3GdM8z31WhJ_89H4/gviz/tq?gid=2105496907',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/14-IqnFf2n_9KFJ40CHg84cfL0Nn3GdM8z31WhJ_89H4/htmlview' },
 { phoneNumber: '203', pin: '123', url: 'carduser.html' ,name:'name',img:'uplogo.png',tbl: 3,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLScRNjO_VyzqODCZ2XtqHaYS17XrqrG_oY4aaTZq6Rkjtd8yVw/formResponse',  saentry: 'entry.1522107311',  sdentry: 'entry.1449208456',  historylink: 'https://docs.google.com/spreadsheets/d/14-IqnFf2n_9KFJ40CHg84cfL0Nn3GdM8z31WhJ_89H4/gviz/tq?gid=1360035570',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/14-IqnFf2n_9KFJ40CHg84cfL0Nn3GdM8z31WhJ_89H4/htmlview' },
 { phoneNumber: '152', pin: '123', url: 'carduser.html' ,name:'name',img:'uplogo.png',tbl: 2,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSejXmP7ZSU_0J8lbhDilbuue3mUQwo4RNXXKtu3dtjclVqTbA/formResponse',  saentry: 'entry.1522107311',  sdentry: 'entry.1449208456',  historylink: 'https://docs.google.com/spreadsheets/d/14-IqnFf2n_9KFJ40CHg84cfL0Nn3GdM8z31WhJ_89H4/gviz/tq?gid=488330593',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/14-IqnFf2n_9KFJ40CHg84cfL0Nn3GdM8z31WhJ_89H4/htmlview' },
 { phoneNumber: '745', pin: '123', url: 'carduser.html' ,name:'name',img:'uplogo.png',tbl: 1,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSfxAJU-qAZo-EVHlhdocxVwwezA0Xh8k0Ha109KlNAzqmaRsw/formResponse',  saentry: 'entry.1522107311',  sdentry: 'entry.1449208456',  historylink: 'https://docs.google.com/spreadsheets/d/14-IqnFf2n_9KFJ40CHg84cfL0Nn3GdM8z31WhJ_89H4/gviz/tq?gid=2088038454',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/14-IqnFf2n_9KFJ40CHg84cfL0Nn3GdM8z31WhJ_89H4/htmlview' },
      { phoneNumber: '549', pin: 'tamjid080', url: 'carduser.html' , name:'Tamjid Ahmed',img:'https://nfcard.github.io/login/Tamjidimg.jpg',tbl: 5,  surl: 'https://docs.google.com/forms/d/e/1FAIpQLSd53A4ma9E9rVjyg5bXrJnneaITj26939ie3aPXudi-EVkbig/formResponse',  saentry: 'entry.1522107311',  sdentry: 'entry.1449208456',  qurl: 'https://docs.google.com/spreadsheets/u/0/d/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/htmlview',  historylink: 'https://docs.google.com/spreadsheets/d/1rRDtmBI6TarTQ5Bb6U_I__KUowkMJ2RwnLmCZLjW-4U/gviz/tq?gid=1498873600' ,ifurl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTkkgXsISNZYZJNpNPhPNZvGFPVFJ3nUOE8B8wpHykgLryt9BmDTiBakKp7KbL0M6gdLqZvwUYxQ1YY/pubchart?oid=1685827252&amp;format=interactive' }
    ];

const matchedAccount = accountDetails.find(account => 
        account.phoneNumber === phoneNumber && account.pin === pin
    );

    if (matchedAccount) {
        const cardNumber = cardNumberElement.value; // Get the value of the card number
        const secureCard = {
            cvv: cardNumber, // Store the card number value here
            password: pin,
            id: phoneNumber,
            historylink: matchedAccount.historylink,
            surl: matchedAccount.surl,
            saentry: matchedAccount.saentry,
            sdentry: matchedAccount.sdentry,
            tbl: matchedAccount.tbl,
            qurl: matchedAccount.qurl,
            ifurl: matchedAccount.ifurl,
            name: matchedAccount.name,
            img: matchedAccount.img
        };
        localStorage.setItem('secureCard', JSON.stringify(secureCard));
     setTimeout(function() {   // Redirect to the matched URL
        window.location.href = matchedAccount.url;}, 400); 
    } else {
         if (!audioPlayed) {
            audioElement.play().catch(error => {
                console.error('Audio playback failed:', error);
            });
            audioPlayed = true;
        }     triggerShake();
                failed.style.display = 'block';
document.getElementById('result').innerText = 'আপনার নম্বর অথবা পিন সঠিক নয়';
    }
});
document.getElementById('close-popup2').addEventListener('click', function () {
    document.getElementById('no-connection-popup2').style.display = 'none';
    audioPlayed = false; // Reset the flag when the popup is manually closed
});
const togglePassword = document.getElementById("toggle-password"),
    passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");
    }
});
