import React, {useState, useEffect} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const {onLoadIngredients} = props
  const [enteredFilter, setEnteredFilter] = useState('')

  useEffect(() =>{
    const query = 
                  enteredFilter.length === 0 ? '' :
                  `?orderBy="title"&equalTo="${enteredFilter}"`
    fetch('https://react-burger-app-ab541.firebaseio.com/orders.json'+query)
    .then(response => response.json())
    .then(responseData =>{
      const ingredientsLoaded = []
      for(const ing in responseData){
        ingredientsLoaded.push({
          id: ing,
          title : responseData[ing].title,
          amount : responseData[ing].amount
        })
      }
      onLoadIngredients(ingredientsLoaded);
    })
  },[enteredFilter,onLoadIngredients])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" 
            value = {enteredFilter}
            onChange = {event => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
