import React, { useEffect, useState } from 'react';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { Button } from '@mui/material';

const MirrorConsole = require("../../../node_modules/codemirror-console/lib/mirror-console");
const editor = new MirrorConsole();

const CodeEditor = (props) => {
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)
  const [onConsole, setConsole] = useState([])


  var codeMirror = editor.editor;

  codeMirror.setOption("lineNumbers", true);
  codeMirror.setOption("autoCloseTags", true);
  codeMirror.setOption("autoCloseBrackets", true);
  codeMirror.setOption('theme', 'dracula')
  codeMirror.setSize("100%", 520)


  function init() {
    try {
      editor.setText(content.textContent);
      editor.swapWithElement(document.getElementById("content"))
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    init();
  }, []);


  const outputResult = () => {
    var consoleWritten = [];
    var consoleMock = {
      log: function (arg) {
        consoleWritten.push(arg)// <- uma lista que adiciona os logs que o usuario colocar, ela é resetada toda vez que ele clicar no botao
        setConsole(consoleWritten)
      }
    }
    editor.runInContext({ console: consoleMock }, function (error, result) {
      if (error) {
        console.error(error);
      }
    })
  };

  const checkQuestion = () => {
    const teste = 
    `var b = ${props.descriptionData.nameFunction}(${props.descriptionData.test.entradas}) 

    if(b === ${props.descriptionData.test.saida}){
      console.log("correto")
      setShow(true)
      setError(false)
    } else {
      Error("Deu ruim")
      setShow(false)
      setError(true)
    }
    `
    console.log(editor.getText("content"))
    
    try {
      console.log(eval(`${editor.getText("content")} ${teste} `))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div id='content'>
        {props.descriptionData.codigo}
        {props.descriptionData.descricaoDetalhada}
      </div>
      <div className='px-4 py-2 flex gap-4 justify-end'>
        <Button variant='outlined'
          onClick={outputResult}>Executar</Button>

        <Button variant='outlined'
          onClick={checkQuestion}
          href="#Verificado"> Verificar Resposta
        </Button>
      </div>

      <div id="output"
        className='bg-[#1F2937] border border-gray-700 lg:h-[280px] h-[200px] p-6'>{onConsole.map((item, indice) => (<div key={indice}>{item}</div>))}</div>

      <div id="Verificado">
        {show && !error &&
          <div
            className='flex flex-wrap py-2 gap-2 bg-[#1F2937] my-2 border border-gray-700'>
            {/* <div className='border border-green-600 bg-green-700 p-4 m-2 '></div>
            <div className='border border-red-600 bg-red-700 p-4 m-2'></div>
            <div className='border border-green-600  bg-green-700 p-4 m-2'></div>
            <div className='border border-green-600 bg-green-700 p-4 m-2 '></div>
            <div className='border border-red-600 bg-red-700 p-4 m-2'></div> */}
            <div className='p-2 text-green-600'>Questão Respondida com Sucesso</div>
          </div>
        }
        {!show && error &&
          <div
          className='flex flex-wrap py-2 gap-2 bg-[#1F2937] my-2 border border-gray-700'>
          <div className='p-2 text-red-600'>Questão Respondida Incorretamente</div>
        </div>
        }
      </div>
    </>

  )
};

export default CodeEditor