import './../style.css';
const CalcHistoryDisplay = (props) => {

    const rendCalcHistory = (items) => {
        return items.map(item => {
            return <div>{item}</div>
        })
    }

    return (
        <div className="calc-history-container">
            {rendCalcHistory(props.calcHistoryItem)}
        </div>

    );
}

export default CalcHistoryDisplay;