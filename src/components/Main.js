import React from "react"
export default function Main(){
  const [meme, setMeme] = React.useState({
    topText:"",
    bottomText:"",
    imgUrl:""
  })
  const [memes, setMemes] = React.useState([])

  React.useEffect(() => {
    // make api calls
    fetch("https://api.imgflip.com/get_memes")
    .then(response => response.json())
    .then(memesData => setMemes(memesData.data.memes))
  }, [])

  function generateRandomMeme() {
    const randomNumber = Math.floor(Math.random() * memes.length)
    setMeme(preMeme => ({
      ...preMeme,
      imgUrl: memes[randomNumber].url
    }))
  }

  function handleChange(event){
    const {name, value} = event.target;
    setMeme(preMeme => ({
      ...preMeme,
      [name]: value
    }))
  }

  return (
    <main className="main">
      <div className="top-text-field">
        <input name="topText" type="text" placeholder="Top text here..." onChange={handleChange}/>
      </div>
      <div className="bottom-text-field">
        <input name="bottomText" type="text" placeholder="Bottom text here..." onChange={handleChange}/>
      </div>
      <button className="generate-meme-btn" onClick={generateRandomMeme}>Generate random meme</button>

      {
        meme.imgUrl ? 
                      <div className="meme">
                        <p className="meme-top-text">{meme.topText || "Placeholder"}</p>
                        <img src={meme.imgUrl} alt="meme" />
                        <p className="meme-bottom-text">{meme.bottomText || "Placeholder"}</p>
                      </div> 
                    : <p className="meme-error">Sorry, there is no memes yet!</p>
      }

    </main>
  )
}