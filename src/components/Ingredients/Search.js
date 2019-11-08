import React, {useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const {onLoadIngredients} = props
  const [enteredFilter, setEnteredFilter] = useState('')
  const inputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0 ? '' :
            `?orderBy="title"&equalTo="${enteredFilter}"`
        fetch('https://react-burger-app-ab541.firebaseio.com/orders.json' + query)
          .then(response => response.json())
          .then(responseData => {
            const ingredientsLoaded = []
            for (const ing in responseData) {
              ingredientsLoaded.push({
                id: ing,
                title: responseData[ing].title,
                amount: responseData[ing].amount
              })
            }
            onLoadIngredients(ingredientsLoaded);
          })
      }

    }, 500)

  }, [enteredFilter, onLoadIngredients,inputRef])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text"
            ref ={inputRef} 
            value = {enteredFilter}
            onChange = {event => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
