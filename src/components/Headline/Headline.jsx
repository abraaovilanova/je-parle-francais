import './Headline.css'

export default ({verbes, temps}) => {
    return (
        <div className="title">
          <h2>Conjugaison du verbe <span style={{color: '#4285f4'}}>{verbes}</span> au <span style={{color: '#4285f4'}}>{temps}</span></h2> 
        </div>
    )
}