import React, { useState } from 'react';

export default function Registrer (){
    const [name, setName] = useState("");
    const [password, setPass] = useState("");
    const [telephone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const changeName = (event:{
        target: {
            value: string
        }
    }) => {
        setName(event.target.value);
    };
    
    return (
        <div>
            <form>
                <label htmlFor="name">name:</label>
                <input id="name" value={name} onChange={changeName} />
            </form>
        </div>
    );
}