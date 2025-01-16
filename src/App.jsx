import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numallowed, setnumallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [pass, setpass] = useState("");

  const passref = useRef(null);
  const passgen = useCallback(() => {
    let password = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numallowed) {
      str += "1234567890";
    }
    if (charallowed) {
      str += "!@#$%^&*()-_=+[{]}|;:,.<>/?";
    }
    for (let i = 1; i <= length; i++) {
      password += str.charAt(Math.floor(Math.random() * str.length));
    }

    setpass(password);
  }, [length, numallowed, charallowed]);
  const copypasswordtoclip = useCallback(() => {
    passref.current.select();
    window.navigator.clipboard.writeText(pass);
  }, [pass]);

  useEffect(() => {
    passgen();
  }, [length, numallowed, charallowed, passgen]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-6 my-8 text-orange-700 bg-gray-700">
        <h1 className="text-center text-white text-2xl mb-5">
          Password Generator
        </h1>

        {/* Password input and copy button */}
        <div className="flex shadow rounded-lg overflow-hidden mb-6">
          <input
            type="text"
            value={pass}
            className="outline-none w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-l-lg"
            placeholder="Password"
            readOnly
            ref={passref}
          />
          <button
            className="outline-none bg-blue-700 text-white px-4 py-2 rounded-r-lg"
            onClick={copypasswordtoclip}
          >
            Copy
          </button>
        </div>

        {/* Password length slider */}
        <div className="flex items-center justify-between text-sm gap-x-1 mb-5">
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            className="cursor-pointer w-4/6"
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label className="text-orange-600 text-xl">Length: {length}</label>
        </div>

        {/* Checkboxes for options */}
        <div className="flex items-center gap-x-6">
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={numallowed}
              id="numinp"
              onChange={() => setnumallowed((prev) => !prev)}
              className="w-6 h-6 accent-orange-600"
            />
            <label className="text-orange-600 text-xl" htmlFor="numinp">
              Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={charallowed}
              id="charinp"
              onChange={() => setcharallowed((prev) => !prev)}
              className="w-6 h-6 accent-orange-600"
            />
            <label className="text-orange-600 text-xl" htmlFor="charinp">
              Special Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
