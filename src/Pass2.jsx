export function Pass2(objectCode, ESTAB) {
  let address = 0;
  let programLength = 0;
  let output = "";
  let currentControlSection = "";

  for (const line of objectCode.split("\n")) {
    const recordType = line[0];
    switch (recordType) {
      case "H": {
        const programName = line.substring(1, 7).trim();
        const startingAddress = parseInt(line.substring(7, 13), 16);
        programLength = parseInt(line.substring(13, 19), 16);
        currentControlSection = programName;
        output += `Control Section Information:\n`;
        output += `Program Name: ${programName}\n`;
        output += `Starting Address: ${startingAddress.toString(16).toUpperCase().padStart(6, "0")}\n`;
        output += `Program Length: ${programLength.toString(16).toUpperCase().padStart(6, "0")}\n\n`;
        address = startingAddress;
        break;
      }
      case "D": {
        const symbolList = line.substring(1).trim().match(/.{1,12}/g) || [];
        output += `Symbol Table:\n`;
        for (const symbol of symbolList) {
          const symbolName = symbol.substring(0, 6).trim();
          const symbolAddress = parseInt(symbol.substring(6), 16) + address;
          ESTAB[symbolName] = symbolAddress;
          output += `${symbolName.padEnd(10)} ${symbolAddress.toString(16).toUpperCase().padStart(6, "0")}\n`;
        }
        output += `\n`;
        break;
      }
      case "R": {
        const symbolList = line.substring(1).trim().match(/.{1,6}/g) || [];
        output += `Relocation Table:\n`;
        for (const symbol of symbolList) {
          const symbolName = symbol.trim();
          ESTAB[symbolName] += address;
          output += `${symbolName.padEnd(10)} ${ESTAB[symbolName].toString(16).toUpperCase().padStart(6, "0")}\n`;
        }
        output += `\n`;
        break;
      }
      case "T": {
        const dataLength = parseInt(line.substring(1, 3), 16);
        const startAddress = parseInt(line.substring(3, 9), 16) + address;
        const data = line.substring(9).match(/.{1,2}/g) || [];
        output += `Object Code:\n`;
        output += `${startAddress.toString(16).toUpperCase().padStart(6, "0")}  `;
        for (let i = 0; i < dataLength; i++) {
          const byte = parseInt(data[i], 16);
          output += byte.toString(16).toUpperCase().padStart(2, "0") + " ";
        }
        output += `\n\n`;
        address = startAddress + dataLength;
        break;
      }
      case "M": {
        const startAddress = parseInt(line.substring(1, 7), 16) + address;
        const flags = line.substring(7, 8);
        const symbolName = line.substring(8, 14).trim();
        const symbolAddress = ESTAB[symbolName];
        let value = parseInt(line.substring(14), 16);
        if (value > 0x7FFFFF) {
          value |= ~0x7FFFFF;
        }
        if (flags === "+") {
          value += symbolAddress;
        } else {
          value -= symbolAddress;
        }
        const newValue = value.toString(16).toUpperCase().padStart(6, "0");
        output += `${startAddress.toString(16).toUpperCase().padStart(6, "0")} ${line.substring(1, 7)} ${flags}${symbolName} ${newValue}\n`;
        address = startAddress + 3;
        break;
      }
      case "E": {
        const startingAddress = parseInt(line.substring(1), 16);
        output += `End Record:\n`;
        output += `Control Section ${currentControlSection} ends at address ${address.toString(16).toUpperCase().padStart(6, "0")}\n\n`;
        output += `Program Execution starts at address ${startingAddress.toString(16).toUpperCase().padStart(6, "0")}\n\n`;
        break;
      }
      default:
        break;
    }
  }

  output += `External Symbol Table:\n`;
  for (const symbolName in ESTAB) {
    output += `${symbolName.padEnd(10)} ${ESTAB[symbolName].toString(16)}\n`;
  }
  return output;
}
     
