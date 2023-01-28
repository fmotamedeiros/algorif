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

const CodeEditor = ({ descriptionData, nameQuestion, taskSolved }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [solved, setSolved] = useState(false);
  const [verificationTask, setVerificationTask] = useState(false);
  const [onConsole, setConsole] = useState([]);
  const [testResults, setTestResults] = useState([]);
  
  const updateContext = useContext(UpdateContext);
  const setContext = useContext(SetContext);
  const codeMirror = editor.editor;

  useEffect(() => {
    codeMirror.setOption("lineNumbers", true);
    codeMirror.setOption("autoCloseTags", true);
    codeMirror.setOption("autoCloseBrackets", true);
    codeMirror.setOption('theme', 'dracula');
    codeMirror.setSize("100%", 520);
    try {
      editor.setText(content.textContent);
      editor.swapWithElement(document.getElementById("content"));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    //Confere se a questão já foi respondida corretamente
    if (!solved) {
      const isCompleted = taskSolved[nameQuestion]?.["completed"];
      if (show && !isCompleted) {
        setSolved(true);
        setContext.taskSolved(nameQuestion, descriptionData.topico, descriptionData.difficultQuestion, true);
        updateContext.updateScore();
      } else if (error && !isCompleted) {
        setContext.taskSolved(nameQuestion, descriptionData.topico, descriptionData.difficultQuestion, false);
      }
    }
  }, [verificationTask]);

  const outputResult = () => {
    let consoleWritten = [];
    var consoleMock = {
      log: (arg) => {
        consoleWritten.push(arg);
        setConsole(consoleWritten);
      },
    };
    editor.runInContext({ console: consoleMock }, (error, result) => {
      if (error) {
        console.error(error);
      }
    });
  };

  const checkQuestion = () => {
    setVerificationTask(!verificationTask);

    let testsPassed = "\n let passedTests = []"
    let passed = "\n let passed = true"

    const testArray = descriptionData["test"].map((test) => {
      return (
        `
      var b = main(${test.input}); 
      if(b === ${test.output}){
        passedTests.push(true) 
      } else {
        passed = false
        passedTests.push(false) 
      }
      setTestResults(passedTests)
      `
      )
    });

    var tests = editor.getText("content");

    tests = tests + testsPassed + passed

    testArray.forEach(test => {
      tests = tests + test
    });

    var testsPassedPercentage = ` 
    // AVISO - talvez em produção isso nao funcione

    if (passed === true) {
      setShow(true)
    } else {
      setError(true)
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
        {descriptionData.codigo}
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
        {show || error ? (
          <div
            className='flex flex-wrap py-2 gap-2 bg-[#1F2937] my-2 border border-gray-700'>
            {testResults.map((result, index) => (
              <div key={index} className={`${result ? 'border-green-600 bg-green-700' : 'border-red-600 bg-red-700'} border p-4 m-2 `} />
            ))}
          </div>
        ) : null}
      </div>
    </>

  )
};

export default CodeEditor