import React,{useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () =>{

  const [userIngrdients, setUserIngrdients]  = useState([]);

  

  const ingredientsAddHandler = ingredients =>{
    fetch('https://react-burger-app-ab541.firebaseio.com/orders.json',{
      method : 'POST',
      body : JSON.stringify(ingredients),
      headers : {'Content-Type' : 'application/json'}
    }).then(response =>{
        return response.json()
    }).then(resData =>{
      setUserIngrdients(prevIngrdients =>[
        ...prevIngrdients,
        {id:resData.name,...ingredients}
      ])
    })    
    
  }

  const removeIngredientsHandler = ingredientId =>{
        setUserIngrdients(prevIngredients=> 
            prevIngredients.filter((ingredient)=>
            ingredient.id !== ingredientId))
  }

  const onLoadIngredientsHandler =useCallback(ingredients =>{
    setUserIngrdients(ingredients)
  },[]);

  return (
    <div className="App">
      <IngredientForm ingredientsAddHandler = {ingredientsAddHandler}/>
      <section>
        <Search onLoadIngredients = {onLoadIngredientsHandler} />
        <IngredientList ingredients={userIngrdients} onRemoveItem = {removeIngredientsHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
