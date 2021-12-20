import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

const Futurebin = () => {

    let { code } = useParams();
	const [text, setText] = useState();
	const [expiration, setExpiration] = useState();
	const [language, setLanguage] = useState();


    useEffect(() => {
        fetch("http://localhost:3000/futurebin/" + code)
        .then(response => response.json())
        .then(data => {
            setText(data.text);
        });
    });

    return (
        <div>
            {code}
        </div>
    )
}

export default Futurebin
