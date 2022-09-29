import React, { useEffect, useRef, useState } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const CodeEditor = () => {
  const [output, setOutput] = useState()
  const editorRef = useRef(null)
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

  return (
    <>
      <textarea id='realtimeEditor'></textarea>
      <div>{output}</div>
    </>
  )
};

export default CodeEditor