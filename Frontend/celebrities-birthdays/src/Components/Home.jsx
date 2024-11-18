import React, { useState, useRef, useEffect } from "react";
import Flame from "./Flame";

function Home(){
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const nameInputRef = useRef(null);
    const birthdayInputRef = useRef(null);

    useEffect(() => {
    // Focus the input field when the component mounts
        nameInputRef.current.focus();
    }, []);
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleBirthdayChange = (e) => {
        setBirthday(e.target.value);
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        setName(name);
    };
    return(
        <div className="w-screen h-screen p-6 bg-pastel-blue">
            <div className="w-full h-full min-h-fit border-4 border-white rounded-3xl text-white">
                <h1 className="flex justify-center">
                    Welcome
                </h1>
                <form onSubmit={handleSubmit} className="text-center">
                    <input
                    type="text"
                    id="name"
                    ref={nameInputRef}
                    value={name}
                    onChange={handleNameChange}
                    className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="What's your name?"
                    />
                    <button
                    type="submit"
                    className="mt-4 px-4 py-2 "
                    >
                        Go →
                    </button>
                </form>
                <p>Hey {name}!</p>
                <form onSubmit={handleSubmit} className="text-center">
                    <input
                    ref={birthdayInputRef}
                    type="date"
                    placeholder="Enter your birthday"
                    value={birthday}
                    onChange={handleBirthdayChange}
                    className="p-3 border border-gray-300 text-gray-500 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                    type="submit"
                    className="mt-4 px-4 py-2 "
                    >
                        Go →
                    </button>
                </form>
                <div className="mt-4">
                    <div className="flex justify-center mb-[-3.2rem] pl-3">
                        <Flame />
                    </div>
                    <img
                    src="/birthday-cake.png" // Replace with your image URL
                    alt="Birthday Cake"
                    className="w-80 h-80 mx-auto my-6"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home