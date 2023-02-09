export default ({pronomes, reponse, verifierStatus, corrections, setReponse, personne}) => {
    return (
        <div className="input-row">
              <label className="form-label" htmlFor={pronomes[personne]}>{pronomes[personne]}</label> 
              <input 
                disabled={verifierStatus} 
                id={pronomes[0]}
                className={corrections[pronomes[personne]] ? "disbled-green": "disbled-red"}
                type="text" 
                value={reponse[pronomes[personne]]} 
                onChange={(e)=>setReponse({...reponse, [pronomes[personne]]: e.target.value.toLowerCase()})} />
        </div>
    )
}