import React,{useState} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () =>{

  const [userIngrdients, setUserIngrdients]  = useState([]);

  const ingredientsAddHandler = ingredients =>{
    setUserIngrdients(prevIngrdients =>[
      ...prevIngrdients,
      {id:Math.random().toString(),...ingredients}
    ])
  }

  return (
    <div className="App">
      <IngredientForm ingredientsAddHandler = {ingredientsAddHandler}/>
      <section>
        <Search />
        <IngredientList ingredients={userIngrdients} onRemoveItem = {()=>{}} />
      </section>
    </div>
  );
}

export default Ingredients;
