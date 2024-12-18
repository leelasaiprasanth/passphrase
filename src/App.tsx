import { useEffect, useState } from 'react'
import './App.css'

const words = [
  "tampers", "cheetah", "obscures", "bullying", "Mutable", "Virus", "tenderly", "taipei", "emplace",
  "anchored", "Tampers", "snafu", "Aldrich", "homed", "quadric", "washy", "Unreal", "Gobbles",
  "rim's", "Anew", "Epithets", "ratty", "World", "said", "found", "Cavity", "debater", "seducer",
  "Seizing", "Stabs"
]

function App() {
  const [numWords, setNumWords] = useState(3)
  const [minLength, setMinLength] = useState(1)
  const [maxLength, setMaxLength] = useState(8)
  const [randomCapitalization, setRandomCapitalization] = useState(true)
  const [numberLength, setNumberLength] = useState(2)
  const [generatedPassphrases, setGeneratedPassphrases] = useState<string[]>([])

  const generatePassphrase = () => {
    let passphrase = []
    for (let i = 0; i < numWords; i++) {
      let word = words[Math.floor(Math.random() * words.length)]
      while (word.length < minLength || word.length > maxLength) {
        word = words[Math.floor(Math.random() * words.length)]
      }
      if (randomCapitalization && Math.random() > 0.5) {
        word = word.charAt(0).toUpperCase() + word.slice(1)
      }
      passphrase.push(word)
      if (i < numWords - 1) {
        passphrase.push(Math.floor(Math.random() * (10 ** numberLength)).toString().padStart(numberLength, '0'))
      }
    }
    return passphrase.join('')
  }

  const generateMultiplePassphrases = () => {
    const newPassphrases = Array(10).fill(null).map(() => generatePassphrase())
    setGeneratedPassphrases(newPassphrases)
  }

  useEffect(() => {
    generateMultiplePassphrases()
  }, [numWords, minLength, maxLength, randomCapitalization, numberLength])

  return (
    <>
      <h1>Secure Passphrase Generator</h1>
      <div className="container">
        <div className="info">
          <h2>Adjust values:</h2>
          {/* Code goes here */}
          <div className='adjust'>
            <label htmlFor="numWords">Number of words: <span id="numWordsValue">{numWords}</span></label>
            <input
              type="range"
              id="numWords"
              min="1"
              max="10"
              step="1"
              value={numWords}
              onChange={(e) => setNumWords(Number(e.target.value))}
            />
          </div>

          <div className='adjust'>
            <label htmlFor="minLength">Minimum word length: <span id="minLengthValue">{minLength}</span> characters</label>
            <input
              type="range"
              id="minLength"
              min="1"
              max="8"
              step="1"
              value={minLength}
              onChange={(e) => setMinLength(Number(e.target.value))}
            />
          </div>

          <div className='adjust'>
            <label htmlFor="maxLength">Maximum word length: <span id="maxLengthValue">{maxLength}</span> characters</label>
            <input
              type="range"
              id="maxLength"
              min="1"
              max="8"
              step="1"
              value={maxLength}
              onChange={(e) => setMaxLength(Number(e.target.value))}
            />
          </div>

          <div className='adjust'>
            <input
              type="checkbox"
              id="randomCapitalization"
              checked={randomCapitalization}
              onChange={(e) => setRandomCapitalization(e.target.checked)}
            />
            <label htmlFor="randomCapitalization">Random capitalization</label>
          </div>

          <div className='adjust'>
            <label htmlFor="numberLength">Length of numbers between words: <span id="numberLengthValue">{numberLength}</span> digits</label>
            <input
              type="range"
              id="numberLength"
              min="1"
              max="4"
              step="1"
              value={numberLength}
              onChange={(e) => setNumberLength(Number(e.target.value))}
            />
          </div>
          <button onClick={generateMultiplePassphrases}>Regenerate Passphrases</button>
        </div>
        <div className="output">
          <h2>Generated Passphrases:</h2>
          <div className="outputString">
            {generatedPassphrases.map((passphrase, index) => (
              <div key={index} className="outputStrings">
                {passphrase}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
