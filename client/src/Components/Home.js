import React, { useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import exts from 'code-example/ext.json';

const Home = () => {
	const [code, setCode] = useState();
	const [language, setLanguage] = useState('Texte');
	const [expiration, setExpiration] = useState('N');
	
	const handleClick = () => {
		let expiration_date = new Date();
		switch (expiration) {
			case '10M':
				expiration_date.setDate(expiration_date.getMinutes() + 10);
				break;
			case '1H':
				expiration_date.setDate(expiration_date.getHours() + 1);
				break;
			case '1D':
				expiration_date.setDate(expiration_date.getDay() + 1);
				break;
			case '1W':
				expiration_date.setDate(expiration_date.getDay() + 7);
				break;
			case '2W':
				expiration_date.setDate(expiration_date.getDay() + 14);
				break;	
			default:
				expiration_date = new Date(0);
				break;
		}
		let request = {
			"code":code,
			"language":language
		}
		if(expiration_date.getTime() !== (new Date(0)).getTime()) {
			request.expiration = expiration_date;
		}
		fetch('http://localhost:3000/api', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(request)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
		})
		.catch(error => console.log(error));
	}

	return (
		<>
			<select 
				value={language} 
				onChange={(evn) => setLanguage(evn.target.value)}
				style={{
					
				}}
				>
				{exts.map((keyName, idx) => {
					if (/^diff/.test(keyName)) return <option key='' value=''> Texte </option>;
					return (
						<option key={idx} value={keyName}>
						Language: {keyName}
						</option>
					);
				})}
			</select>
			<CodeEditor
				value={code}
				language={language}
				placeholder='Coller votre texte ici.'
				onChange={(evn) => setCode(evn.target.value)}
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
			<div id='create-bar'>
				<select value={expiration} onChange={(event) => setExpiration(event.target.value)}>
					<option value='N'>Jamais</option>
					<option value='10M'>10 minutes</option>
					<option value='1H'>1 heure</option>
					<option value='1D'>1 jour</option>
					<option value='1W'>1 semaine</option>
					<option value='2W'>2 semaines</option>
				</select>
				<button 
					onClick={handleClick}
					stlye={{
						
					}}>
					Créer
				</button>
			</div>
		</>
	);
}
export default Home
