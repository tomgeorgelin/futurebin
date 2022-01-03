import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import CodeEditor from '@uiw/react-textarea-code-editor';

const Futurebin = () => {

    let { code } = useParams();
	const [text, setText] = useState();
	const [expiration, setExpiration] = useState();
	const [language, setLanguage] = useState();


    useEffect(() => {
        fetch("/get-futurebin/" + code)
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            setText(data.text);
            setLanguage(data.language);
        });
    });

    return (
        <div>
            <CodeEditor 
                disabled
				value={text}
				language={language}
				padding={15}
				className='editor'
				style={{
					width:'80vw',
					margin:'auto',
					borderRadius:'15px',
					fontSize: 12,
					backgroundColor: '#ededed',
					fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
				}}
			/>
        </div>
    )
}

export default Futurebin
