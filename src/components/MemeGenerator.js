import React from "react"

//Call to Meme Api and store Data

class MemeGenerator extends React.Component{
    constructor(){
        super()
        this.state = {
            topText : "" , 
            bottomText : "" ,
            randomImg : "http://i.imgflip.com/1bij.jpg" ,
            allMemeImgs : []
        }
        this.handleChange = this.handleChange.bind(this)
        this.randomMeme = this.randomMeme.bind(this)
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            this.setState({
                allMemeImgs : response.data.memes
            })
            console.log(this.state)
        })
    }

    handleChange(event){
        const { name , value } = event.target
        console.log(name , value)
        this.setState({
            [name] : value
        })
    }

    randomMeme(event){
        // get random id from 0 to 99
        event.preventDefault()
        const item = Math.floor(Math.random() * 100)
        const meme = this.state.allMemeImgs[item].url
        this.setState({
            randomImg : meme
        })
        // grab url of the said id
        // set randomImg state to particular url
    }

    render(){
        return (
            <div>
                <form onSubmit={this.randomMeme}>

                    <input type="text" placeholder="Top Text" name="topText" value={this.state.topText} onChange={this.handleChange} />
                    <input type="text" placeholder="Bottom Text" name="bottomText" value={this.state.bottomText} onChange={this.handleChange} />

                    <button>Gen</button>
                </form>
                <div>
                    <img src={this.state.randomImg} alt="Meme" />
                    <h2 id="top-text">{this.state.topText}</h2>
                    <h2 id="bottom-text">{this.state.bottomText}</h2>
                </div>
                <h1> {this.state.topText} {this.state.bottomText} </h1>
            </div>
        )
    }
}

export default MemeGenerator