import React, { useEffect, useState } from 'react';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { Button } from '@mui/material';

const CodeEditor = () => {
  const [show, setShow] = useState(false)
  
  var MirrorConsole = require("../../../node_modules/codemirror-console/lib/mirror-console");
  var editor = new MirrorConsole();
  var codeMirror = editor.editor;

  codeMirror.setOption("lineNumbers", true);
  codeMirror.setOption("autoCloseTags", true);
  codeMirror.setOption("autoCloseBrackets", true);
  codeMirror.setOption('theme', 'dracula')
  codeMirror.setSize("100%", 520)
  

  async function init() {
    try {
      editor.swapWithElement(document.getElementById("content"))
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
        init();
  });


const outputResult = () => {
  var consoleMock = {
    log: function (arg) {
      function line(text) {
        var div = document.createElement("div");
        div.appendChild(document.createTextNode(text));
        return div;
      }
      document.getElementById("output").appendChild(line(arg));
    }
  }
  editor.runInContext({ console: consoleMock }, function (error, result) {
    if (error) {
      console.error(error);
    }
  })
};

  return (
    <>
      <div id='content'></div>
      <div className='px-4 py-2 flex gap-4 justify-end'> 
        <Button variant='outlined'
          onClick={outputResult}>Executar</Button>

        <Button variant='outlined'
          onClick={() => setShow((v) => !v)} 
          href="#Verificado"> Verificar Resposta
        </Button>
      </div>

      <div id="output" 
        className='bg-[#1F2937] border border-gray-700 lg:h-[280px] h-[200px] p-6'></div>

      <div id="Verificado">
      {show && 
        <div
          className='flex flex-wrap py-2 gap-2 bg-[#1F2937] my-2 border border-gray-700'>
          <div className='border border-green-600 bg-green-700 p-4 m-2 '></div>
          <div className='border border-red-600 bg-red-700 p-4 m-2'></div>
          <div className='border border-green-600  bg-green-700 p-4 m-2'></div>
          <div className='border border-green-600 bg-green-700 p-4 m-2 '></div>
          <div className='border border-red-600 bg-red-700 p-4 m-2'></div>
        </div>
      }
      </div>
    </>

  )
};

export default CodeEditor