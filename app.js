const algo = 'AES-CBC'
const crypto = window.crypto || window.msCrypto
const vector = new Uint8Array(16)
let tkey
for (let i = 0; i < 16; i++) {
  vector[i] = i
}

const buff2str = (buf) => {
  return String.fromCharCode.apply(null, new Uint16Array(buf))
}

const str2buff = (str) => {
  let buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  let bufView = new Uint16Array(buf)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}

crypto.subtle.generateKey({ name: algo, length: 128 }, true, ["encrypt", "decrypt"])
  .then(key => {
    tkey = key
    return crypto.subtle.encrypt({ name: algo, iv: vector }, key, str2buff('dafuq'))
  })
  .then(encrypted => {
    return crypto.subtle.decrypt({ name: algo, iv: vector }, tkey, Buffer.from(encrypted, 'utf-8')).then(buff2str)
  })
  .then(result => {
    console.log(result)
  })
  .catch(console.error)