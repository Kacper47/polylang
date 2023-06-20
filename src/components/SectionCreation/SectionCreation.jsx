import React, {useState} from "react";
import "./SectionCreation.css";
import {AiTwotoneSound} from 'react-icons/ai'
import {FaBeer} from 'react-icons/fa';
import soundIcon from '../../assets/img/sound.png'
import quiz from '../../assets/img/quiz.png'
import text from '../../assets/img/text.png'


const SectionCreation = ({countries, filteredCountries, langValue, langIcon, isStatesOpen, setStatesOpen, closeList, inputValue, typeValue, freqValue, rangeValue, 
                         onChangeLang, setInputValue, setTypeValue, setFreqValue, setRangeValue,
                        runChat, isPhrasesOpen, setPhrasesOpen, myPhrases ,myCompactPhrases, startGame, setQuiz}) => 
    {
        
       
        const sound = (item) => {
            speechSynthesis.speak(new SpeechSynthesisUtterance(item))
        }

    return(
        <div className="sectionCreation">

        <h1><FaBeer/></h1>
        <h1>Znajdź swój bank słówek/zwrotów</h1>

        <div className="searchLangBox">   
            <span>
                <img src={langIcon} width="25"/>
            </span>
            <input className="lang" value={langValue} onChange={(e) =>  {onChangeLang(e)}}/>\
            <ul>
                {filteredCountries.slice(0,5).map(({name, link}) =>
                    isStatesOpen ? 
                    <li onClick={() => {closeList(name, link)}}>
                        <img src={link} width="25" height="25"/>
                        <p>{name}</p>
                    </li> : null
                )
                }
            </ul>
        </div>
        
            <div className="sectionSetup">
                <div className="searchBox">
                    <span>Kontekst (sytuacja, miejsce, dział słownictwa)</span>
                    <input type="text" placeholder="np. wizyta w restauracji, złamana ręka" className="textSubject" onChange={(e) => setInputValue(e.target.value)}/>
                </div>
                
    
                <div className="radioBox typeBox"> 
                        <input type="radio" id="radio1" className="radioElement" value="Słówka" name="type" onChange={(e) => {setTypeValue(e.target.value)}}/>
                        <label for="radio1" className="labelType">Słówka</label>
                    
                        <input type="radio" id="radio2" className="radioElement" value="Zwroty" name="type" onChange={(e) => {setTypeValue(e.target.value)}}/>
                        <label for="radio2" className="labelType">Zwroty</label>
                </div>

                <div className="radioBox"> 
                        <input type="radio" id="radioA" className="radioElement" value="Najpopularniejsze" name="freq" onChange={(e) => {setFreqValue(e.target.value)}}/>
                        <label id="labelA" className="labelFreq" for="radioA">Najpopularniejsze</label>
                    
                        <input type="radio" id="radioB" className="radioElement" value="Mało znane" name="freq" onChange={(e) => {setFreqValue(e.target.value)}}/>
                        <label id="labelB" className="labelFreq" for="radioB">Mało znane</label>

                        <input type="radio" id="radioC" className="radioElement" value="Losowe" name="freq" onChange={(e) => {setFreqValue(e.target.value)}}/>
                        <label id="labelC" className="labelFreq" for="radioC">Losowe</label>
                </div>

                <div className="rangeField">
                    <div>
                        <span>{rangeValue}</span>
                    </div>
                    <div className="rangeBox">
                        <div className="limitValue">2</div>
                            <input type="range" min="2" max="20" value={rangeValue} onChange={(e) => setRangeValue(e.target.value)} className="rangeAmount"/>
                        <div className="limitValue">20</div>
                    </div>
                </div>
            </div> 

            <button onClick={() => {setPhrasesOpen(true)}} className="find">Znajdź</button>
            <ul className="listPhrases">
                {isPhrasesOpen ? 
                myCompactPhrases.map((item, i) => 
                     
                        <li>
                            <p>
                                <img src={soundIcon} onClick={() => {sound(item.word)}}/> 
                                {i+1}. {item.word} - 
                            </p>
                            <p className="translations">
                                 {item.trans}
                                <img src={soundIcon} onClick={() => {sound(item.trans)}}/> 
                            </p>
                                
                        </li>
                ) 
                : null} 
            </ul>
                
                {isPhrasesOpen 
                    ?  (<div className="waitingBox">
                        <h2>Ucz się</h2>
                        <div className="waitingBuforBox">   
                            <div onClick={() => {startGame(); setQuiz(true)}} className="waitingBlock">
                                <p>Quiz (ABC)</p><img src={quiz}/>
                            </div> 
                            <div onClick={() => {startGame(); setQuiz(false)}} className="waitingBlock">
                             <p>Tekst ze słowami</p><img src={text}/>
                            </div> 
                        </div>
                      </div>)
                    : null
                }
            </div>
    )

    
}

export default SectionCreation;