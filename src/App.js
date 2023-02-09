import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
// import { data } from './mock/data'
import './App.css';

import { convertMS } from './utils/utils'


// COMPONENTS
import Headline from './components/Headline';



import { data } from './mock/data'
import InputRow from './components/InputRow';
const lesDonnees = data

function nombreDeJours(ms){
    return Math.floor(ms / (24 * 60 * 60 * 1000))
}


const lePremierJour = new Date('02-01-2023')
const aujourdui = new Date()

const randint = Math.abs(Math.floor(Math.sin(nombreDeJours(aujourdui - lePremierJour)*10) * 10))
const verb = {...lesDonnees[randint], day: nombreDeJours(aujourdui - lePremierJour) + 1}



function App() {
  const inputRefs = useRef([]);
  const [data, setData] = useState(verb)
  const [now, setNow] = useState()
  const [showModal, setShowModal] = useState(false)
  const [aujourdhui, seAujourdhui] = useState(new Date())
  const [verbes, setVerbs] = useState()
  const [temps, setTemps] = useState()
  const [verifierStatus, setVerifierStatus] = useState(false)
  const [reponse, setReponse] = useState({})
  const [bonneReponse, setBonneReponse] = useState()
  const [corrections, setCorrections] = useState([])
  const [total, setTotal] = useState(0)
  const [pronomes, setPronomes] = useState([])

  let demain = new Date(aujourdhui)
  demain.setDate(aujourdhui.getDate() + 1)
  demain.setHours(0,0,0)

  function verifierLaReponse(reponse, bonneReponse){
    const corrections = {}
    let total = 0
    Object.keys(reponse).forEach(key => {
      if(reponse[key] == bonneReponse[key]){
        corrections[key] = true
        total += 1
      }else{
        corrections[key] = false
      }
    })

    setTotal(total)
    setCorrections(corrections)
    setVerifierStatus(true)
    localStorage.setItem('verbos', JSON.stringify({corrections, reponse, day: data.day}))

  }

  useEffect(()=>{
    const interval = setInterval(()=>setNow(new Date()),1000)
    return () => clearInterval(interval);
  },[])


  useEffect(()=>{
    if(data){
      setPronomes(Object.keys(data?.bonneReponse))
      setVerbs(data.verb)
      setTemps(data.temps)
      setBonneReponse(data.bonneReponse)
      let localStorageHistory = localStorage.getItem('verbos', corrections)
      if(localStorageHistory && data.day == JSON.parse(localStorageHistory).day){
        setCorrections(JSON.parse(localStorageHistory).corrections)
        setReponse(JSON.parse(localStorageHistory).reponse)
        setVerifierStatus(true)
        const reponse = data.bonneReponse
        const bonneReponse = JSON.parse(localStorageHistory).reponse
  
        let total = 0
        Object.keys(JSON.parse(localStorageHistory).reponse).forEach(key => {
          console.log()
          if(reponse[key] == bonneReponse[key]){
            total += 1
          }
        })
        setTotal(total)
      }
    }
  },[data])

  const handleChange = (i) => {
    inputRefs.current[i + 1].focus();
  };

  return (
    <div className="App">
      <Headline verbes={verbes} temps={temps} />
          <div className="input-group">
            {[...Array(6)].map((elem,idx) => <InputRow 
              pronomes={pronomes}
              reponse={reponse}
              verifierStatus={verifierStatus}
              corrections={corrections}
              setReponse={setReponse}
              personne={idx}
            />)}
 
            <div className="input-row">
              <button disabled={verifierStatus} 
              onClick={(e)=>{
                verifierLaReponse(reponse, bonneReponse)
                setShowModal(true)
                }}>Vérifier</button>
                
            </div>
            <div className="input-row">
              <button onClick={(e)=>setShowModal(true)}>Statistique</button>
              </div>
            </div>

      <div className="modal" style={{display: !showModal? 'none': 'block'}}>
          <div className="modal-content">
               <span className="close" onClick={(e)=>setShowModal(false)}>&times;</span>
              <p>{total} bonnes réponses</p>
              <div>Prochain verbe dans... {convertMS((demain - now))} </div>
          </div>
      </div>
      <footer>Fabriqué avec amour à Recife par MangueByte</footer>

    {/* <div>
      <input type="text" style={{height: 25, width:25}} maxlength="1" ref={(el) => (inputRefs.current[0] = el)} onChange={() => handleChange(0)} />
      <input type="text" style={{height: 25, width:25}} ref={(el) => (inputRefs.current[1] = el)} onChange={() => handleChange(1)}/>
      <input type="text" style={{height: 25, width:25}}ref={(el) => (inputRefs.current[2] = el)} onChange={() => handleChange(2)} />
      <input type="text" style={{height: 25, width:25}} ref={(el) => (inputRefs.current[3] = el)} onChange={() => handleChange(3)}/>
      <input type="text" style={{height: 25, width:25}} ref={(el) => (inputRefs.current[4] = el)} onChange={() => handleChange(4)}/>
    </div> */}
    </div>
  );
}

export default App;
