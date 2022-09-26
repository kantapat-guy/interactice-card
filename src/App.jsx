import { useState } from "react";
import "./App.css";
import thank from './assets/images/icon-complete.svg';

function App() {
  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");

  const [errorName, setErrorName] = useState("");
  const [errorNum, setErrorNum] = useState("");
  const [errorExp, setErrorExp] = useState("");
  const [errorCvc, setErrorCvc] = useState("");

  const [redName, setRedName] = useState("")
  const [redNum, setRedNum] = useState("")
  const [redExp, setRedExp] = useState("")
  const [redCvc, setRedCvc] = useState("")

  const [nextPage, setNextPage] = useState(false);

  const spaceNum = (num) => {
    return `${num.slice(0, 4)}  ${num.slice(4, 8)}  ${num.slice(
      8,
      12
    )}  ${num.slice(12, 16)}`;
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (name === " " || name === "") {
      setRedName("red");
      setErrorName("Please input a name");
    } else {
      setErrorName("");
      setRedName("");
    }

    if (num.length < 16) {
      setErrorNum("Wrong format, numbers only");
      setRedNum("red");
    } else {
      setErrorNum("");
      setRedNum("");
    }

    if (year === "" || month === "") {
      setErrorExp("Can't be blank");
      setRedExp("red");
    } else {
      setErrorExp("");
      setRedExp("");
    }

    if (cvc === "") {
      setErrorCvc("Can't be blank");
      setRedCvc("red");
    } else if (cvc.length < 3) {
      setErrorCvc("Wrong format");
      setRedCvc("red");
    } else {
      setErrorCvc("");
      setRedCvc("");
    }

    if (name!=="" && num.length === 16 && month!=="" && year!=="" && cvc!=="" ) {
      setNextPage(true);
    }
    
  };


  return (
    <div className="App">
      <div className="card-container">
        <div className="frontCard">
          <div className="allCircle">
            <button className="circle1"></button>
            <button className="circle2"></button>
          </div>
          <input
            className="cardNum"
            placeholder="0000  0000  0000  0000"
            value={num !== "" ? spaceNum(num) : "0000  0000  0000  0000"}
            disabled
          />
          <div className="name-exp">
            <input
              className="cardName"
              placeholder="JANE APPLESEED"
              value={name.toLocaleUpperCase()}
              disabled
            />
            <input
              className="cardExp"
              placeholder="00/00"
              value={month !== "" && year !== "" ? `${month}/${year}` : "00/00"}
              disabled
            />
          </div>
        </div>
        <div className="backCard">
          <input className="cardCvc" placeholder="000" value={cvc} disabled />
        </div>
      </div>

      {nextPage ? (
        <div className="thank-container">
          <img src={thank} />
          <h2>THANK YOU!</h2>
          <p>We've added your card details</p>
          <button className="con-btn" onClick={() => setNextPage(false)}>Continue</button>
        </div>
      ) : (
        <div className="form-container">
          <form onSubmit={submitForm}>
            <label className="text-form1">CARDHOLDER NAME</label>
            <input
              className="input-text1"
              style={{ borderColor: redName }}
              type="text"
              placeholder="e.g. Jane Appleseed"
              onChange={(e) => setName(e.target.value)}
            />
            <small>{errorName}</small>
            <label className="text-form1">CARD NUMBER</label>
            <input
              className="input-text1"
              style={{ borderColor: redNum }}
              type="text"
              placeholder="e.g. 1234 5678 9123 0000"
              maxLength="16"
              value={num}
              onChange={(e) => setNum(e.target.value.replace(/\D/, ""))}
            />
            <small>{errorNum}</small>
            <div className="exp-cvc-container">
              <div className="exp">
                <label>EXP. DATE (MM/YY)</label>
                <div>
                  <input
                    className="input-exp"
                    style={{ borderColor: redExp }}
                    type="text"
                    placeholder="MM"
                    maxLength="2"
                    value={month}
                    onChange={(e) => setMonth(e.target.value.replace(/\D/, ""))}
                  />
                  <input
                    className="input-exp2"
                    style={{ borderColor: redExp }}
                    type="text"
                    placeholder="YY"
                    maxLength="2"
                    value={year}
                    onChange={(e) => setYear(e.target.value.replace(/\D/, ""))}
                  />
                </div>
                <small>{errorExp}</small>
              </div>
              <div className="cvc">
                <label>CVC</label>
                <input
                  className="input-cvc"
                  style={{ borderColor: redCvc }}
                  type="text"
                  placeholder="e.g. 123"
                  maxLength="3"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/, ""))}
                />
                <small>{errorCvc}</small>
              </div>
            </div>
            <button className="confirm-btn" type="submit">
              Confirm
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
