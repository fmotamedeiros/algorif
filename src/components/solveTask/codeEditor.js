import React, { useContext, useEffect, useState } from 'react';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { Button } from '@mui/material';
import { UpdateContext } from '../../contexts/updateFirebase';
import { SetContext } from '../../contexts/setFirebase';

const MirrorConsole = require("../../../node_modules/codemirror-console/lib/mirror-console");
const editor = new MirrorConsole();

const CodeEditor = (props) => {

  //setShow e SetError são chamados na variável testsPassedPercentage
  const [show, setShow] = useState("")
  const [error, setError] = useState("")
  const [onConsole, setConsole] = useState([])

  const updateContext = useContext(UpdateContext);
  const setContext = useContext(SetContext);
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

  useEffect(() => {
    //Confere se a questão já foi respondida corretamente
    if (show && props?.taskSolved?.[props.nameQuestion]?.[completed] != true) {
      setContext.taskSolved(props.nameQuestion, props.descriptionData.topico, props.descriptionData.difficultQuestion, true)
      
      updateContext.updateScore()
    }
    else if (error && props?.taskSolved?.[props.nameQuestion]?.[props.nameQuestion] != true) {
      setContext.taskSolved(props.nameQuestion, props.descriptionData.topico, props.descriptionData.difficultQuestion, false)
    }
  }, [show, error]);

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
    var testsPassed = "\n var passed = 0"
    const testArray =
      props.descriptionData["test"].map((test) => {
        return (
          `
      var b = ${props.descriptionData.nameFunction}(${test.input}) 

      if(b === ${test.output}){
        passed += 1

      }
      `
        )
      })

    const lengthTests = props.descriptionData.test.length

    var tests = editor.getText("content")

    tests = tests + testsPassed

    testArray.forEach(test => {
      tests = tests + test
    });

    // for (var test of testArray) {
    //   tests = tests + test
    // }

    var testsPassedPercentage = ` 

    // AVISO - talvez em produção isso nao funcione

    var passedPercentage = (passed / ${lengthTests}) * 100 

    if (passedPercentage === 100) {
      setShow(passedPercentage + "%" + " correto")
      setError("")
    } else {
      setError(passedPercentage + "%" + " correto")
      setShow("")
      
    }
    `
    tests += testsPassedPercentage

    try {
      eval(tests)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div id='content'>
        {props.descriptionData.codigo}
      </div>
      <div className='px-4 py-2 flex gap-4 justify-end'>
        <Button variant='outlined' href="#output"
          onClick={outputResult}>Executar</Button>

        <Button variant='outlined'
          onClick={checkQuestion}
          href="#Verificado"> Verificar Resposta
        </Button>

      </div>

      <div id="output"
        className='bg-[#1F2937] border border-gray-700 lg:h-[280px] h-[200px] p-6'>{onConsole.map((item, indice) => (<div key={indice}>{item}</div>))}</div>

      <div id="Verificado">
        {show &&
          <div
            className='flex flex-wrap py-2 gap-2 bg-[#1F2937] my-2 border border-gray-700'>
            {/* <div className='border border-green-600 bg-green-700 p-4 m-2 '></div>
            <div className='border border-red-600 bg-red-700 p-4 m-2'></div>
            <div className='border border-green-600  bg-green-700 p-4 m-2'></div>
            <div className='border border-green-600 bg-green-700 p-4 m-2 '></div>
            <div className='border border-red-600 bg-red-700 p-4 m-2'></div> */}
            <div className='p-2 text-green-600'>{show}</div>
          </div>
        }
        {error &&
          <div
            className='flex flex-wrap py-2 gap-2 bg-[#1F2937] my-2 border border-gray-700'>
            <div className='p-2 text-red-600'>{error}</div>
          </div>
        }
      </div>
    </>

  )
};

export default CodeEditor