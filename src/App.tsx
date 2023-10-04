import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [countdown, setCountdown] = useState(15)
  const [text, setText] = useState("loadding")
  const [check, setCheck] = useState(Array)
  const [TWord, setTWowd] = useState("0")
  const [WPS, setWPS] = useState("0")

  const [massage, setmassage] = useState("")
  const [reStart, setReStart] = useState(true)
  const sleep = (ms: any) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const getRandomText = () => {
    return fetch("http://api.quotable.io/random")
      .then(rep => rep.json())
      .then(data => data.content)
  }
  const randerNew = async () => {
    const quote = await getRandomText()
    setText(quote)
    setCheck(new Array(quote.split("").length).fill(""))
    setCountdown(15)
    setmassage("")
    setReStart(true)
  }
  useEffect(() => {
    randerNew()
  }, [])

  const subText = text.split("")

  const start = async () => {
    let x = 0
    let w = 0
    for (let i = countdown; i > -1; i--) {
      setCountdown(i)
      await sleep(1000)
    }

    check.forEach((data) => {
      data === "true" ? x++ : null
      data != "" ? w++ : null
    })
    revile(x, w)
  }

  const revile = (x: any, w: any) => {
    setTWowd((x * 100 / w).toFixed(1))
    setWPS((w / 15).toFixed(1))
  }


  let correct = true
  const handleMessageChange = async (event: any) => {
    reStart ? (start(), setReStart(false)) : null
    const subRaw = event.target.value.split("")
    subText.forEach((charSpan, index) => {
      const charRaw = subRaw[index]
      charRaw === undefined ? (check[index] = "", correct = false) : (charRaw === charSpan ? check[index] = "true" : (check[index] = "false", correct = false))
    })
    if (correct) randerNew()
  };

  return (
    <>
      <div className='contenner'>
        <div className='count'>
          <p>{countdown}</p>
          <p>Your score!</p>
          <p>{WPS} word per second. correct rate {TWord}%.</p>
        </div>

        <div className='textBox'>
          {subText.map((data: any, index: any) => (
            <span key={index} className={`textEl ${check[index]}`}>{data}</span>
          ))}
        </div>
        <div className='inputTextBox'>
          <textarea id="raw" className='textarea' value={massage} autoFocus onInput={handleMessageChange
          } onChange={e => (setmassage(e.target.value))} />
        </div>

        <div className='reset'>
          <button className='resetB' onClick={randerNew}><p>Restart</p></button>
        </div>

      </div>
    </>
  )
}

export default App
