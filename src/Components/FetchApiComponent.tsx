// react component using function

import React, { useState } from "react";
import ShowDataComponent from "./ShowDataComponent";
import WithLoading from "./WithLoading";
import WithCheckingStatus from "./WithCheckingStatus";

const FetchApiComponent = () => {
    
    interface CheckState {
        isCorrect: boolean;
        errorText?: string;
    }

    const [fetchState, setFetchState] = useState<CheckState>({ isCorrect: true });
    const [isLoading, setIsLoading] = useState(true);
    const [catFact, setFact] = useState("");

    const ShowDataComponentWithLoadingAndCheckingStatus = WithCheckingStatus(WithLoading(ShowDataComponent));
    

    const getCatFact = async () => {
        setIsLoading(true);
        //определяем рандомную (от 1 до 34) страницу
        const randomPage = Math.floor(Math.random() * 34) + 1;
        try {
            const response = await fetch(`https://catfact.ninja/facts?page=`+randomPage.toString());
            if (response.status > 199 && response.status < 300) {
                //меняем статус
                setFetchState({isCorrect:true});
                const objJson = await response.json();
                const factsLength = objJson.data.length;
                const randomFactNumber = Math.floor(Math.random() * (factsLength));
                const catFact = objJson.data[randomFactNumber].fact;
                //устанавливаем факт
                setFact(catFact);
                //скрываем HOC loading
                setIsLoading(false);
            } else  {
                //меняем статус и показываем HOC Error
                setFetchState({isCorrect:false, errorText:`Некорректный код ответа: {response.status}`});
            }
        }catch (e: any) {
            console.log(e.message);
            //меняем статус и показываем HOC Error
            setFetchState({isCorrect:false, errorText:e.message});
        }
    }
    
    return (
        <>
            <h1>Факты о котах</h1>
            <button onClick={getCatFact}>Отобразить факт о котах</button>
            <ShowDataComponentWithLoadingAndCheckingStatus responseIsCorrect={fetchState.isCorrect} errorText={fetchState.errorText} isLoading={isLoading} text={catFact}/>
        </>
    );
};

export default FetchApiComponent; //export the component