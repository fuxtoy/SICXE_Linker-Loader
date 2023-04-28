import './App.css'
import React, { useState, useEffect } from 'react';
import {Pass1} from './Pass1.jsx';
import {Pass2} from './Pass2.jsx';

export default function App() {
  const [instruction, setInstruction] = useState("");

  // Call this function when the component mounts
  useEffect(() => {
    writeInstruction();
  }, []);  

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

  function writeOutput() {
    let ESTAB = Pass1(content);
    console.log(ESTAB);

    let outputString = Object.entries(ESTAB).map(([name, address]) => `${name}: ${"0x" + address.toString(16).toUpperCase().padStart(6, "0")}`).join('\n');

    document.getElementById("output2").value = outputString;
    document.getElementById("output4").value = Pass2(content,ESTAB);
  }

  function writeInstruction() {
    const instruction = "Step1. input file\nStep2. print";
    setInstruction(instruction);
    document.getElementById("output3").value = instruction;
  }

  return (
    <div className="intro">
      <h1 className="title">SIC/XE Linker & Loader</h1>
      <div className="flex-container">
        <div className="flex-column">
          <input 
            id="input" type="file" accept=".obj,.txt" 
            onChange={(e) => handleFileChosen(e.target.files[0])}
          />
          <button className="button" onClick={writeOutput}>PASS</button>
          <textarea id="output3" type="text" disabled={true} className="output3">{instruction}</textarea>
        </div>

        <textarea id="output1" type="text" disabled={true} className="textbox"></textarea>
        <textarea id="output2" type="text" disabled={true} className="textbox"></textarea>
      </div>
      <br/>
      <div className="flex-container">
        <textarea id="output4" type="text" disabled={true} className="textbox_big"></textarea>  
      </div>
    </div>
  );
}
