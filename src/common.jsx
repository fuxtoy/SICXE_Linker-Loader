export function hexToString(hexstr, length) {
  hexstr = hexstr.toUpperCase();
  hexstr = hexstr.slice(2);
  let n = length - hexstr.length;
  for (let i = 0; i < n; i++) {
    hexstr = '0' + hexstr;
  }
  return hexstr;
}

export function getDec(hexstr, bits) {
  let intval = parseInt(hexstr, 16);
  if (intval >= Math.pow(2, bits-1)) {
    intval -= Math.pow(2, bits);
  }
  return intval;
}

export function getHex(val, bits) {
  return ((val + (1 << bits)) % (1 << bits)).toString(16);
}

export function testMemoryContent(memorycontent) {
  memorycontent[5] = 'H';
}
