document.getElementById("scanButton").addEventListener("click", async function () {
    let e = new ZXing.BrowserQRCodeReader(),
        t = document.getElementById("video"),
        a = await navigator.mediaDevices.enumerateDevices(),
        i;

    a.length > 0 && (i = a[0].deviceId);
    a.forEach((e) => {
        if ("videoinput" === e.kind && e.label && e.label.length > 0 && e.label.toLowerCase().indexOf("back") >= 0) {
            i = e.deviceId;
        }
    });

    let c = async (a) => {
        try {
            let i = await navigator.mediaDevices.getUserMedia(a);
            t.srcObject = i;
            t.style.display = "block";

            await e.decodeOnceFromVideoDevice(void 0, "video")
                .then((e) => {
                    i.getTracks().forEach((e) => e.stop());
                    t.style.display = "none";

                    if (e.text.startsWith("sadnan.html?")) {
                        window.location.href = e.text; // Redirect to sadnan.html
                    } else if (e.text.startsWith("pay.html?")) {
                        const his = e.text;
                        
                        const payur = localStorage.getItem("payur");
const urldatap =`${his}&${payur}`;
                        const queryStringss = urldatap.split('?')[1];
                        localStorage.setItem("payurl",queryStringss);// Redirect with payur
                  window.location.href = 'fontawesome.html';
                          } else {
                        alert("QR code সঠিক নয়"); // Invalid QR code alert
                    }
                })
                .catch((e) => {
                    console.error("Error decoding QR Code: ", e);
                    i.getTracks().forEach((e) => e.stop());
                    t.style.display = "none";
                });
        } catch (c) {
            console.error("Error accessing camera: ", c);
            return false;
        }
    };

    (await c({ video: { deviceId: { exact: i } } })) || (await c({ video: { facingMode: { exact: "environment" } } }));
});

setTimeout(() => {
    document.getElementById("popup").classList.remove("active");
}, 1000);
