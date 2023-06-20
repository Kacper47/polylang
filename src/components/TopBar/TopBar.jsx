import React, {useState} from "react";
import "./TopBar.css";
import { Configuration, OpenAIApi } from "openai";
import APIKEY from "../../assets/APIKEY";

const TopBar = () => {
    
    

    // async function runCompletion(){
    //     const completion = await openai.createCompletion({
    //         model: "text-davinci-002",
    //         prompt: "Napisz po przecinku 10 najpopularniejszych słówek po niemieku z działu zdrowie",
    //     })
    //     setAnswer(completion.data.choices[0].text);
    // }

    

    const runCompletion2 = () => {
        openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Wypisz mi w kolumne 20 najpopularniejszych słówek w języku norweskim z tłumaczeniem"}]
        })
        .then(res => {
           setAnswer2(res.data.choices[0].message.content) 
        })
    }

    

    return(
            <div className="topBar">
                <div className="titleBox">
                    <h1>PolyLang</h1>
                </div>
                {/* <ul>
                    <li>Ucz się</li>
                    <li>Tłumacz AI</li>
                </ul> */}
            </div>
    )
}

export default TopBar;