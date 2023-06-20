import React, {useState} from "react";
import "./App.css"
import countries from "./assets/countries";
import APIKEY from "./assets/APIKEY";
import { Configuration, OpenAIApi } from "openai";
import TopBar from "./components/TopBar/TopBar";
import MainPhoto from './components/MainPhoto/MainPhoto'
import CentreInfo from "./components/CentreInfo/CentreInfo";
import SectionCreation from "./components/SectionCreation/SectionCreation";
import Game from "./components/Game/Game"

const App = () => {

    const [langValue, setLangValue] = useState('angielski');
    const [langIcon, setLangIcon] = useState('https://flagcdn.com/gb.svg');
    const [isStatesOpen, setStatesOpen] = useState(false);
    const [filteredCountries, setFilteredCountries] = useState(countries)

    const [inputValue, setInputValue] = useState("");
    const [typeValue, setTypeValue] = useState("");
    const [freqValue, setFreqValue] = useState("");
    const [rangeValue, setRangeValue] = useState(10);


    let indexes = [];
    let phrases = [];

    let compactPhrases = [];
    let [isPhrasesOpen, setPhrasesOpen] = useState(false);

    const [myContent, setContent] = useState()
    const [myPhrases, setPhrases] = useState([]);
    const [myCompactPhrases, setCompactPhrases] = useState([
        { word: 'doctor', trans: 'lekarz' },
        { word: 'nurse', trans: 'pielęgniarka' },
        { word: 'patient', trans: 'pacjent' },
        { word: 'hospital', trans: 'szpital' },
        { word: 'surgery', trans: 'operacja' },
        { word: 'medicine', trans: 'lekarstwo' },
        { word: 'emergency', trans: 'nagły wypadek' },
        { word: 'appointment', trans: 'wizyta (umówiona)' },
        { word: 'diagnosis', trans: 'diagnoza' },
        { word: 'treatment', trans: 'leczenie' }
    ]);


    const onChangeLang = (e) => {
        setLangValue(e.target.value);
        setLangIcon('')
        setStatesOpen(true);

        setFilteredCountries(
            countries.filter(item => 
                item.name.includes(e.target.value)
        ));

        console.log(filteredCountries);

        if(!e.target.value){
            setFilteredCountries(countries);
        }
        
    }

    const closeList = (name, link) => {
        setStatesOpen(false);
        setLangValue(name);
        setLangIcon(link);
    }

    const openai = new OpenAIApi(new Configuration({
        apiKey: APIKEY,
    }));

    const runCompletion = (language, amount, frequency, type, context) => {
        //Generowanie słówek
        openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `Bez żadnych komentarzy,cyfr i zmian linijki wypisz ${amount} ${frequency} ${type} w języku ${language} z działu ${context}, każdy wyraz oddzielony przecinkiem, następnie po ostatnim wypisz ich same polskie tłumaczenia również wszystkie po przecinku zaczynając od przecinka`}]
        })
        .then(res => {
            for(let i=0; i<=(res.data.choices[0].message.content.length); i++) {
                if((res.data.choices[0].message.content[i]) == ','){
                    indexes.push(i);
                }
                else if((res.data.choices[0].message.content[i]) == '\n'){
                    indexes.push(i-1);
                }
            }
            
            phrases.push((res.data.choices[0].message.content).substring(0, indexes[0]));

            for(let j=1; j<=(indexes.length); j++){
                phrases.push(res.data.choices[0].message.content.substring(indexes[j-1]+2, indexes[j]))
            }
    
            setContent(res.data.choices[0].message.content);
            setPhrases(phrases);
            setPhrasesOpen(true);
            console.log(phrases);

            for(let m=0; m<(phrases.length/2); m++){
                compactPhrases.push({word: phrases[m], trans: phrases[(phrases.length/2)+m]})
            }
            setCompactPhrases(compactPhrases);
            console.log(myCompactPhrases);
        })
    }    



    const [isGame, setGame] = useState(false);
    const [isQuiz, setQuiz] = useState(true);

    const startGame = () => {
        setGame(true);
    }

    const createText = () => {
        
    }


    return (
       <>
            <MainPhoto/>   
            <TopBar/>
            {isGame 
             ? <>
                <Game
                    isQuiz={isQuiz}
                    setGame={setGame}
                />
               </>
            : <>
                <CentreInfo/>
                <SectionCreation
                    countries={countries}
                    filteredCountries={filteredCountries}
                    langValue={langValue}
                    langIcon={langIcon}
                    isStatesOpen={isStatesOpen}
                    setStatesOpen={setStatesOpen}
                    closeList={closeList}

                    inputValue={inputValue}
                    typeValue={typeValue}
                    freqValue={freqValue}
                    rangeValue={rangeValue}

                    onChangeLang={onChangeLang}
                    setInputValue={setInputValue}
                    setTypeValue={setTypeValue}
                    setFreqValue={setFreqValue}
                    setRangeValue={setRangeValue}

                    runChat={runCompletion}
                    isPhrasesOpen={isPhrasesOpen}
                    setPhrasesOpen={setPhrasesOpen}
                    myPhrases={myPhrases}
                    myCompactPhrases={myCompactPhrases}
                    startGame={startGame}
                    setQuiz={setQuiz}
                />
              </>
            }   
        </>
        
    )
}

export default App;