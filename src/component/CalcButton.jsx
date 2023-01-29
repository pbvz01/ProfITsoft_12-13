import Button from '@mui/material/Button';

const CalcButton = (props) => {
    return (
        <Button variant="contained" value = {props.value} onClick={props.onClick}>
            {props.value}
        </Button>
    );
}

export default CalcButton;