import './style.css';
import React, {useState} from 'react';
import store from "./store";
import CalcButton from "./component/CalcButton";
import Button from "@mui/material/Button";
import {ExamplesApi} from "./api/api";
import CalcHistoryDisplay from "./component/CalcHistoryDisplay";

const App = () => {
    const [calcHistory, setCalcHistory] = useState([]);
    const [expression, setExpression] = useState([]);
    const handleClick = value => {
        if (isCorrectFirstValueExp(value)) {
            alert("The first input value has to be number or have operator -");
        } else {
            let currentLastValueExp = expression[expression.length-1];
            let calcHistory = expression.join("").concat(value);
            if (lastSymbolsIsOperand(currentLastValueExp, value) && expression.length > 0) {
                expression[expression.length-1] = value;
            } else {
                switch (value) {
                    case "=":
                        calcHistory = handleResult();
                        break;
                    case "Clean up":
                        setExpression([]);
                        calcHistory = "Clean up"
                        break;
                    default:
                        setExpression([...expression, value]);
                }
            }
            handleDataCalcHistory(calcHistory);
        }

    };
    const handleDataCalcHistory = (newData) => {
        if (calcHistory.length > 11) {
            calcHistory.shift();
        }
        setCalcHistory([...calcHistory, newData]);
    }
    const handleResult = exp => {
        const result = (exp === undefined ? expression : exp)
            .join("")
            .split(/(\D)/g)
            .map(value => (value.match(/\d/g) ? parseInt(value, 0) : value))
            .reduce((acc, value, index, array) => {
                switch (value) {
                    case "+":
                        return (acc = acc + array[index + 1]);
                    case "-":
                        return (acc = acc - array[index + 1]);
                    case "*":
                        return (acc = acc * array[index + 1]);
                    case "/":
                        return (acc = acc / array[index + 1]);
                    default:
                        return acc;
                }
            });
        if (exp !== undefined) {
            setExpression([result]);
        }
        return result;
    };
    const isCorrectFirstValueExp = (value) => {
        return expression.length === 0 && isNaN(Number(value)) && value !== '-' && value.length === 1;
    }
    const lastSymbolsIsOperand = (currentValueExp, value) => {
        return isNaN(Number(currentValueExp)) && expression.length > 1 && isNaN(Number(value));
    }
    const handleRequest = () => {
        //Sorry, I already work in VData to didn't have enough time to take in "store reduce", I'll learn it as soon as possible
        setExpression([]);
        const jsonData = ExamplesApi.getExamplesByCount(5)
            .then(data => data.map(item => item += " = " + handleResult(item.split(" "))));
        jsonData.then(data => setCalcHistory([...calcHistory, ...data]))
    }

  return (
      <div className="App">
          <CalcHistoryDisplay calcHistoryItem = {calcHistory}/>
          <div className="calc-container">
              <div className="expression">{expression}</div>
              <div className="panel">
                  {store.buttons.map(item => <CalcButton value = {item.val}
                                                         onClick = {() => handleClick(item.val)}/>)}
              </div>

          </div>

          <Button variant="contained" onClick={() => handleRequest()}>
              Get and resolve examples
          </Button>

      </div>
  );
}

export default App;
