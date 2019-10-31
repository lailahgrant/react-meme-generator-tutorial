//import react
import * as React from 'react';

//interface for form component
interface FormInterface {
    isMemeGenerated: boolean;
    textBottom: string;
    textTop : string;
    handleImageChange : () => void;
    handleImageInputChange :(event: React.ChangeEvent) => void;
    handleInputChange : (event: React.ChangeEvent) => void;
    handleMemeGeneration : () => void;
    handleMemeReset : () => void;
}

//form component

const Form = (props : FormInterface) => {

    return(
        <div className="form">
            
            <div className="form_inputs">  
            
            {/* input for the text at the top */}
            <input 
            name="text-top"
            placeholder="Text Top"
            type="text"
            value={props.textTop}
            onChange={props.handleInputChange}
            />

            {/* input for the text at the bottom */}
            <input 
            name="text-bottom"
            placeholder="Text Bottom"
            type="text"
            value={props.textBottom}
            onChange={props.handleInputChange}
            />

            </div>

            <div className="form_buttons">

            {/* button to load random images from api.imgflip.com */}
            <button
            className="btn btn-primary"
            type="button"
            onClick={props.handleImageChange}
            >
                Change Image
            </button>

            {/* button to load image from local computer */}
            <label
            className="btn btn-primary"
            htmlFor="fileInput"
            >
                Load Image
                <input 
                id="fileInput"
                name="fileInput"
                type="file"
                accept=".jpeg, .jpg, .png"
                onChange={props.handleImageInputChange} hidden
                />
            </label>

            {/* button to generate png image of the  meme  */}
            <button
            className="btn btn-primary"
            type="button"
            onClick={props.handleMemeGeneration}
            >
                Generate Meme
            </button>

            {/* button to remove the meme image from the DOM */}
            {props.isMemeGenerated && <button
            className="btn btn-danger"
            type="button"
            onClick={props.handleMemeReset}
            >
                Reset
            </button>}

            </div>

        </div>
    )

}

export default Form;