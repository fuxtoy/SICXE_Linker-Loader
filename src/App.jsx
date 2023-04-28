import './App.css'
import React, { useState } from 'react';
import {Pass1} from './Pass1.jsx';
import {Pass2} from './Pass2.jsx';
import * as common from './common.jsx';
export default function App() {
  
  const [content, setContent] = useState('');
  const [sym, setSYM] = useState('');
  const [proglen, setProglen] = useState('');
  const handleFileRead = (e) => {
    const content = e.target.result;
    setContent((prevContent) => prevContent + "\n" + content);
    document.getElementById("output1").value += "\n" + content;
    console.log('file content',  content);
  };
  const handleFileChosen = (file) => {
    const fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };
function writeoutput() {
  let ESTAB = Pass1(content);
  console.log(ESTAB);
  
  let outputString = Object.entries(ESTAB).map(([name, address]) => `${name}: ${"0x" + address.toString(16).toUpperCase().padStart(6, "0")}`).join('\n');
  
  //document.getElementById("output4").value = Pass2(content, ESTAB);
  document.getElementById("output2").value = outputString;
  document.getElementById("output4").value = Pass2(content,ESTAB);
}
function write_instruction(){
  document.getElementById("output3").value = "123";
}






  return (
    <div class = "intro">
      <h1 class = "title">SIC/XE Linker & Loader</h1>
      <div class = "flex-container">
        <div class = "flex-column">
          <input 
            id="input" type="file" accept=".obj,.txt" 
            onChange={(e) => handleFileChosen(e.target.files[0])}>
          </input>
          <button class = "button" onClick={writeoutput}
            >PASS</button>
          <textarea id="output3" type="text" disabled={true} class ="output3">{write_instruction}</textarea>


        </div>

        <textarea id="output1" type="text" disabled={true} class = "textbox"></textarea>
        <textarea id="output2" type="text" disabled={true} class = "textbox"></textarea>
      </div>
      <br/>
      <div class = "flex-container">
        <textarea id="output4" type="text" disabled={true} class = "textbox_big"></textarea>  
      </div>

    </div>
  )
}
