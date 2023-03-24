import {useState, useEffect} from "react";

export default function Meme(){
    const[formData, setFormData] = useState({
        topText: '',
        bottomText: '',
        randomImage: 'http://i.imgflip.com/1bij.jpg'
    })
    const[memes, setAllMemes] = useState([])

    useEffect(()=> {
        fetch('https://api.imgflip.com/get_memes')
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    }, [])

    function handleChange(e){
        const {name, value} = e.target
        setFormData(prev => {
            return {
                ...prev,
            [name] : value
         }
        })
    }
    function getRandomImage(){
        const meme = memes
        const randomMeme = Math.floor(Math.random() * meme.length)
        const url = meme[randomMeme].url
        setFormData(prev=>{
            return{
                ...prev,
                randomImage: url
            }
        })
    }
    return(
        <div>
            <div className="form">
                <input 
                type="text"
                name= 'topText'
                value={formData.topText} 
                onChange= {handleChange}
                className='input'/>
                <input 
                type="text"
                name= 'bottomText'
                value={formData.bottomText} 
                onChange= {handleChange}
                className='input'/>
                <button 
                className="btn"
                onClick={getRandomImage}
                    >Get a new meme image 🖼</button>
            </div>

            <div className="meme">
                <img src={formData.randomImage} alt="random meme image" className="meme-img"/>
                <h2 className="meme-text top">{formData.topText}</h2>
                <h2 className="meme-text bottom">{formData.bottomText}</h2>
            </div>
        </div>
    )
}