//import react
import * as React from 'react';

//interfaces for content component
interface ContentInterface {
    activeImage: string;
    contentContainerRef : React.RefObject<any>;
    textBotton : string;
    textTop : string;
}

//content component
const Content = (props: ContentInterface) => {
    return(
        <div className="content" ref={props.contentContainerRef}>

            {/* image preview */}
            <img src={props.activeImage} alt="Meme" />

            {/* text top */}
            <h1>{props.textTop}</h1>

            {/* text bottom */}
            <h2>{props.textBotton}</h2>

        </div>
    )
}

export default Content;