import React,{useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import Spinner from '../UI/LoadingIndicator';

const IngredientForm = React.memo(props => {
  
    const [enterdTitle, setEnterTitle] = useState('')
    const [enteredAmount, setEnteredAmount] = useState('')

  const submitHandler = event => {
    event.preventDefault();
    props.ingredientsAddHandler({title:enterdTitle,amount:enteredAmount})
  };
  console.log(props.isLoading)
  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={enterdTitle} 
              onChange ={event => {
                    setEnterTitle(event.target.value)
                    }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={enteredAmount} 
              onChange = {event => {
                setEnteredAmount(event.target.value)
                }}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.isLoading ? <Spinner /> : null}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
