const shiftAmount = 3;

function dgi(ghftedtxet) {
  let dghftsedtxet = '';
  for (let i = 0; i < ghftedtxet.length; i++) {
    const char = ghftedtxet[i];
    let dghftsedCharCode = char.charCodeAt(0) - shiftAmount;
    
    if (char >= 'a' && char <= 'z') {
      if (dghftsedCharCode < 97) dghftsedCharCode += 26;  // Wrap around lowercase letters
    } else if (char >= 'A' && char <= 'Z') {
      if (dghftsedCharCode < 65) dghftsedCharCode += 26;  // Wrap around uppercase letters
    }
    
    dghftsedtxet += String.fromCharCode(dghftsedCharCode);
  }
  return dghftsedtxet;
}
const dgis = "kwwsv=22grfv1jrrjoh1frp2vsuhdgvkhhwv2g";
 const dgistart= dgi(dgis);
const dgiff ="kwwsv=22grfv1jrrjoh1frp2irupv2g2h";
const dgif = dgi(dgiff);
const dgife ="irupUhvsrqvh";
const dgfie =dgi(dgife);
const dgiht = "kwpoylhz";
const dgih = dgi(dgiht);