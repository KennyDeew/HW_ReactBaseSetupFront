// react component using function

import React, { useState } from "react";
import ShowDataComponent from "./ShowDataComponent";

const FetchApiComponent = () => {
    const [fetchIsCorrect, setCheckResult] = useState(true);
    const [catFact, SetFact] = useState("");

    const getCatFact = async () => {
        const randomPage = Math.floor(Math.random() * 34) + 1;
        try {
            const response = await fetch(`https://catfact.ninja/facts?page=`+randomPage.toString());
            if (response.status > 199 && response.status < 300) {
                setCheckResult(true);
                const objJson = await response.json();
                const factsLength = objJson.data.length;
                const randomFactNumber = Math.floor(Math.random() * (factsLength)) + 1;
                const catFact = objJson.data[randomFactNumber].fact;
                SetFact(catFact);
            } else  {
                setCheckResult(false);
            }
        }catch (e: any) {
            console.log(e.message);
            setCheckResult(false);
        }
    }
    
    return (
        <>
            <h1>Факты о котах</h1>
            <button onClick={getCatFact}>Отобразить факт о котах</button>
            <ShowDataComponent text={catFact}/>
        </>
    );
};

export default FetchApiComponent; //export the component