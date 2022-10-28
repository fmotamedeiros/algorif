import React, { useEffect, useRef, useState } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { Button } from '@mui/material';

const CodeEditor = () => {
  const [output, setOutput] = useState()
  const editorRef = useRef(null)
  const [updated, setUpdated] = useState(output);
  const [show, setShow] = useState(false)

  

  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById('realtimeEditor'), 
        {
        mode: {name: 'javascript', json: true },
        theme: 'dracula',
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      });
      editorRef.current.setSize("100%",550)

      editorRef.current.on('change', (instance, changes) => {
        const code = instance.getValue();
        try {
          setOutput(eval(code))
        } catch (error) {
          console.log(error)
        }

      });

    }
    init();
  }, []);

  const outputResult = () => {
    setUpdated(output);
  };

  return (
    <>
      <textarea id='realtimeEditor'></textarea>
      <div className='px-4 py-2 flex gap-4 justify-end'>
        <Button variant='outlined' 
          onClick={outputResult}>Executar</Button>
        <Button variant='outlined' 
          onClick={() => setShow((v) => !v)}>Verificar Resposta</Button> 
      </div>
      <div className='bg-[#1F2937] border border-gray-700 lg:h-[260px] h-[200px] p-6' >{updated}</div>
      {show && 
        <div className='flex flex-wrap py-2 gap-2 bg-[#1F2937] my-2 border border-gray-700'>
          <div className='border border-green-600 bg-green-700 p-4 m-2 '></div>
          <div className='border border-red-600 bg-red-700 p-4 m-2'></div>
          <div className='border border-green-600  bg-green-700 p-4 m-2'></div>
          <div className='border border-green-600 bg-green-700 p-4 m-2 '></div>
          <div className='border border-red-600 bg-red-700 p-4 m-2'></div>
          <div className='border border-green-600 bg-green-700 p-4 m-2'></div>
          <div className='border border-green-600 bg-green-700 p-4 m-2 '></div>
          <div className='border border-green-600 bg-green-700 p-4 m-2 '></div>
          <div className='border border-red-600 bg-red-700 p-4 m-2'></div>
          <div className='border border-green-600  bg-green-700 p-4 m-2'></div>
          <div className='border border-green-600 bg-green-700 p-4 m-2 '></div>
          <div className='border border-red-600 bg-red-700 p-4 m-2'></div>
          <div className='border border-green-600 bg-green-700 p-4 m-2'></div>
          <div className='border border-green-600 bg-green-700 p-4 m-2 '></div>
        </div>
      }
    </>
    
  )
};

export default CodeEditor