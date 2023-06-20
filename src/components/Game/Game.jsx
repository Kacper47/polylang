import React, {useState} from "react";
import './Game.css'

const Game = ({isQuiz, setGame}) => {

    
    
    return(
        <div class="mainBox">
            <button onClick={() => {setGame(false)}} className="backButton">Wróć</button>
            {isQuiz
                ? <>
                    <h2>1/10</h2>
                    <div className="questionBox">
                        <p>Nurse</p>
                    </div>
            
                    <div className="allAnswerBox">
                        <div className="answerBox">
                            <button>Pielęgniarka</button>
                            <button>Nosze</button>
                        </div>

                        <div className="answerBox">
                            <button>Szpital</button>
                            <button>Oddział położny</button>
                        </div>
                    </div>
                </>
            :   <div className="textBox">
                    <p>The DOCTOR examined the PATIENT thoroughly and discussed the DIAGNOSIS. The NURSE administered the prescribed MEDICINE and ensured the patient's comfort. The HOSPITAL prepared the patient for SURGERY and scheduled an APPOINTMENT. In case of an EMERGENCY, the hospital has a dedicated team ready to respond. The TREATMENT plan was carefully tailored to address the patient's specific needs. The doctor and nurse worked together to provide the best possible care. The hospital's priority is to ensure that every patient receives timely and effective medical attention.</p>
                </div>

            }
        </div>
    )
}
export default Game;