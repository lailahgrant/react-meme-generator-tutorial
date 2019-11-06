//import react, dom-to-image-more
import * as React from 'react';

import domtoimage from 'dom-to-image-more';

//import components
import Content from './components/content';
import Form from './components/form';
import Result from './components/result';


//import styles
import './styles/styles.css';


//App component
function App(){

  //create Refs
  let contentContainerRef = React.useRef<HTMLElement | null>(null)
  let resultContainerRef = React.useRef<HTMLElement | null>(null)

  //create useState hooks
  const [images, setImages] = React.useState([])
  const [activeImage, setactiveImage] = React.useState('')
  const [textTop, setTextTop] = React.useState('')
  const [textBottom, setTextBottom] = React.useState('')
  const [isMemeGenerated, setIsMemeGenerated] = React.useState(false)

  //fetch images from https://api.imgflip.com/get_memes
  async function fetchImage() {
    //get memes
    const imgData =await fetch('https://api.imgflip.com/get_memes').then(res => 
    res.json()).catch(err => console.error(err))
    const  {memes} =await imgData.data

    //update imagestate
    await setImages(memes)

    //update activeImage state
    await setactiveImage(memes[0].url)
  }

  //handle input elements
  function handleInputChange(event) {
    if(event.target.name === 'text-top'){
      //update testTop states
      setTextTop(event.target.value)
    }else{
      //update textBottom states
      setTextBottom(event.target.value)
    }
  }

  //choose random images from images fetched from api.imgflip.com 
  function handleImageChange(){
    //choose random image
    const image = images[Math.floor(Math.random() * images.length)]

    //update activeImage state
    setactiveImage(image.url)

  }

  //handle image upload via file input
  function handleImageInputChange(event){
    //udate activeImage state
    setactiveImage(window.URL.createObjectURL(event.target.files[0]))
  }

  //handle meme generation
  function handleMemeGeneration(){
    //remove any existing images
    if(resultContainerRef.current.childNodes.length >0 ){
      resultContainerRef.current.removeChild(resultContainerRef.current.childNodes[0])
    }

    //generate meme image from the content of 'content' div
    domtoimage.toPng(contentContainerRef.current).then((dataUrl: string) => {
      //create new image 
      const img =new Image()

      //use url of the generated image as src
      img.src = dataUrl

      //append new image to DOM
      resultContainerRef.current.appendChild(img)

      //update state for isMemeGenerated
      setIsMemeGenerated(true)

    })

  }

  //handle resetting the meme generator / removing existing pictures
  function handleMemeReset(){
    //remove existing child node inside result container(generated new image)
    resultContainerRef.current.removeChild(resultContainerRef.current.childNodes[0])

    //update state for isMemeGenerated
    setIsMemeGenerated(false)
    
  }

  //fetch images from https://api.imgflip.com/get_memes when app mounts
  React.useEffect( () => {
    //call fetchImage method
    fetchImage()
  },[])


  return(
    <div className="App">

      {/* add Form components */}
      <Form 
      textTop={textTop}
      textBottom={textBottom}
      handleImageInputChange={handleImageInputChange}
      handleImageChange={handleImageChange}
      handleInputChange={handleInputChange}
      handleMemeGeneration={handleMemeGeneration}
      handleMemeReset={handleMemeReset}
      isMemeGenerated={isMemeGenerated}
      />

      {/* add Content component */}
      <Content 
      activeImage={activeImage}
      contentContainerRef={contentContainerRef}
      textBotton={textBottom}
      textTop={textTop}
      />

    {/* add Result component */}
    <Result 
    resultContainerRef={resultContainerRef}
    />

 
    </div>
  )



}

export default App;