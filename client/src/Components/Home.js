import React, { useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import exts from 'code-example/ext.json';
import Select from 'react-select'
import options from '../languages.json'
const Home = () => {
	const [code, setCode] = useState(
`private String name;
private Boolean calvitie;

public Personne() {
	this.name = "Rémi";
	this.calvitie = true;
}`);
	const [language, setLanguage] = useState({'value':"java",'label':'java'});
	const [expiration, setExpiration] = useState('N');
	const [url, setUrl] = useState(null);
	
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
			"language":language.value
		}
		if(expiration_date.getTime() !== (new Date(0)).getTime()) {
			request.expiration = expiration_date;
		}
		fetch('/futurebin', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(request)
		})
		.then(res => res.json())
		.then(data => {
			setUrl(data.code);
		})
		.catch(error => console.log(error));
	}

	let resultDiv = ''
	if(url != null) {
		resultDiv = <div className='resultBar' onClick={() => navigator.clipboard.writeText(url)}>
			✅ Votre url a partager est : <a href={url}>{url}</a>
		</div>
	}  

	return (
		<>
			<div style={{
						margin: '10px 10vh 10px 10vw'
					}}>
				<Select options={options} value={language}
					onChange={(evn) => setLanguage(evn)}
					/>
			</div>
			<CodeEditor
				value={code}
				language={language.value}
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
				<div style={{margin: '10px 10px 10px 10vw'}}>
					<label htmlFor='expiration'>Suppression automatique : </label>
					<select value={expiration} onChange={(event) => setExpiration(event.target.value)} name='expiration'>
						<option value='N'>Jamais</option>
						<option value='10M'>10 minutes</option>
						<option value='1H'>1 heure</option>
						<option value='1D'>1 jour</option>
						<option value='1W'>1 semaine</option>
						<option value='2W'>2 semaines</option>
					</select>
				</div>
				<button onClick={handleClick}>
					Créer
				</button>
			</div>
			{resultDiv}
		</>
	);
}
export default Home
