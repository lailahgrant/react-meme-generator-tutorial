import React from 'react';

//interfaces for result component
interface ResultInterface {
    resultContainerRef : React.RefObject<any>
}

//result component
const Result =(props:ResultInterface) =>{
    return(
        <div ref={props.resultContainerRef} className="result" ></div>
    )
}

export default Result;