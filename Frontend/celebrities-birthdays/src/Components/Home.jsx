import React, { useState, useRef, useEffect } from "react";
import Flame from "./Flame";

function Home(){
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [message, setMessage] = useState("");
    const [counter, setCounter] = useState(0);
    const handleNameChange = (e) => {setName(e.target.value);};
    const handleBirthdayChange = (e) => {setBirthday(e.target.value);};
    const handleNameSubmit = (e) => {
        e.preventDefault();
        if (name){
            setCounter((prevCounter) => prevCounter + 1);
        }
        setName(name);
    };
    const handleBirthdaySubmit = (e) => {
        e.preventDefault();
        if (birthday){
            setCounter((prevCounter) => prevCounter + 1);
            checkBirthday(birthday);
        }
        setBirthday(birthday);
    };
    const checkBirthday = (enteredBirthday) => {
        const today = new Date();
        const birthdayDate = new Date(enteredBirthday);

        if (
          today.getDate() === birthdayDate.getDate() &&
          today.getMonth() === birthdayDate.getMonth()
        ) {
          setMessage(`🎉 Happy Birthday, ${name}! You've officially leveled up today! Time for cake, presents, and the greatest birthday song ever—sung by YOU! 🎂🎈`);
        } else {
          setMessage(`🥳 Uh-oh! It's not your birthday today, but hey, you're still pretty awesome! We can’t all be born on the best day, but we’ll pretend it’s your birthday anyway! 🎉🎂`);
        }
      };
    return(
        <div className="w-screen h-screen p-6 bg-pastel-blue">
            <div className="w-full h-full min-h-fit min-w-fit border-4 border-white rounded-3xl text-white px-2">
                {counter == 0 &&
                <div className="h-32">
                    <h1 className="flex justify-center font-eczar font-semibold text-5xl text-dark-blue mt-10 mb-[-0.75rem] ">
                        Welcome
                    </h1>
                    <form onSubmit={handleNameSubmit} className="text-center">
                        <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        className="py-2 pl-4 pr-12 ml-12 text-gray-600 rounded-full border border-gray-400 focus:outline-none shadow-md"
                        placeholder="What's your first name?"
                        />
                        <button
                        type="submit"
                        className="mt-4 px-4 py-2">
                            Go →
                        </button>
                    </form>
                </div>
                }
                {counter == 1 &&
                <div>
                    <p>Hey {name}!</p>
                    <form onSubmit={handleBirthdaySubmit} className="text-center">
                        <input
                        type="date"
                        placeholder="Enter your birthday"
                        value={birthday}
                        onChange={handleBirthdayChange}
                        className="p-3 border border-gray-300 text-gray-500 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                        type="submit"
                        className="mt-4 px-4 py-2 "
                        >
                            Go →
                        </button>
                    </form>
                </div>
                }
                {counter == 2 &&
                <div>
                    {message}
                </div>
                }
                <div className="mt-4">
                    <div className="flex justify-center mb-[-3.2rem] pl-3">
                        <Flame />
                    </div>
                    <img
                    src="/birthday-cake.png" // Replace with your image URL
                    alt="Birthday Cake"
                    className="w-80 h-80 mx-auto my-6 drop-shadow-md"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home