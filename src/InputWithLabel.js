import React from "react";

const InputWithLabel = (props) => {

    const inputRef = React.useRef(null);
    React.useEffect(() => {
        inputRef.current.focus();
    })

        return(
    <>
        <label htmlFor="todoTitle">{props.children}</label>
        <input 
            id="todoTitle" 
            type="text" 
            name="title" 
            value={props.todoTitle} 
            onChange={props.onChange}
            ref={inputRef}
            />
    </>
    );
}


export default InputWithLabel;