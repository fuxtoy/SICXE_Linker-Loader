import * as objreader from './objreader.jsx';



export function Pass1(input_string) {
  const ESTAB = {};
  let locctr = 0;
  const input_lines = input_string.split('\n');

  for (let line of input_lines) {
    line = line.trim();

    if (line.startsWith('H')) {
      const program_name = line.substring(1, 7);
      const starting_address = parseInt(line.substring(7), 16);
      locctr = starting_address;
      ESTAB[program_name] = locctr;
    } else if (line.startsWith('D')) {
      const variables = line.substring(1).match(/.{12}/g);
      for (let variable of variables) {
        const name = variable.substring(0, 6).trim();
        const address = parseInt(variable.substring(6), 16);
        ESTAB[name] = locctr + address;
      }
    } else if (line.startsWith('T')) {
      const address = parseInt(line.substring(1, 7), 16);
      const length = parseInt(line.substring(7, 9), 16);
      locctr += length;
    } else if (line.startsWith('M')) {
      const length = parseInt(line.substring(1, 3), 16);
      locctr += length;
    } 
  }

  return ESTAB;
}









