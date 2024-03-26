import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";
import logo from "D:/web development/react/passwordGenerator/src/assets/logo.svg";

function App() {
  const [length, setLength] = useState(0);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  };
//
  return (
    <div className="w-full max-w-md mx-auto rounded-lg px-4 py-3 my-8  text-yellow-300 shadow-2xl shadow-slate-900 bg-clip-padding backdrop-filter bg-white bg-opacity-10 backdrop-blur-md">
      <h1 className="py-2 text-lg">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          id="length"
          value={password}
          //
          className=" bg-white bg-opacity-10 hover:bg-opacity-20 transition duration-500 shadow-inner shadow-slate-600/90 rounded-md p-3 outline-none w-full py-1 px-3 text-white"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          className="px-3 py-2 shadow-md shadow-slate-600/70 w-5/12 bg-opacity-30 hover:bg-opacity-40 transition duration-500 bg-white rounded-md "
          onClick={() => copyToClipboard(password)}
        >
          copy
        </button>
      </div>
      <div className="flex gap-x-1">
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          className="cursor-pointer"
          onChange={(e) => setLength(e.target.value)}
        />
        <label htmlFor="length">Length: {length}</label>
      </div>
      <div className="flex gap-x-1">
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          onChange={() => setNumberAllowed((prev) => !prev)}
        />
        <label htmlFor="numbers">Numbers</label>
      </div>
      <div className="flex gap-x-1">
        <input
          type="checkbox"
          defaultChecked={charAllowed}
          onChange={() => setCharAllowed((prev) => !prev)}
        />
        <label htmlFor="character">Characters</label>
      </div>
      <button className="mx-auto flex justify-center px-3 py-2 shadow-md shadow-slate-600/70 w-5/12 bg-opacity-30 hover:bg-opacity-40 transition duration-500 bg-white rounded-md" onClick={generatePassword}>
        <img src={logo} alt="reload" />
      </button>
    </div>
  );
}

export default App;
