import React, {useState} from "react";
import './ResultPhrases.css'

const ResultPhrases = ({isPhrasesOpen, phrasesHTML}) => {
    <ul>
        {phrasesHTML.map(item => 
            isPhrasesOpen ? <li>{item}</li>
            : null
            )
        } 
    </ul>
}

export default ResultPhrases;