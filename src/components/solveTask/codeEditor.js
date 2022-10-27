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
      editorRef.current.setSize("100%",450)

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


  const handleClick = () => {
    //  "message" stores input field value
    setUpdated(output);
  };

  return (
    <>
      <textarea id='realtimeEditor'></textarea>
      <div className='px-4 py-2 flex gap-4 justify-end'>
        <Button variant='outlined' 
          onClick={handleClick}>Executar</Button>
        <Button variant='outlined'>Verificar Resposta</Button> 
      </div>
      <div className='bg-[#1F2937] border border-gray-700 h-40 p-6' >{updated}</div>
      <div className='lg:flex lg:justify-between p-[2%]'>
        <div className='bg-[#1F2937] p-[10%] border border-green-700 m-5 lg:m-0'>1° TESTE</div>
        <div className='bg-[#1F2937] p-[10%] border border-red-700 m-5 lg:m-0'>2° TESTE</div>
        <div className='bg-[#1F2937] p-[10%] border border-green-700 m-5 lg:m-0'>3° TESTE</div>
      </div>
    </>
  )
};

export default CodeEditor