import React,{useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

const Ingredients = () =>{

  const [userIngrdients, setUserIngrdients]  = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();
  

  const ingredientsAddHandler = ingredients =>{
    setIsLoading(true)
    fetch('https://react-burger-app-ab541.firebaseio.com/orders.json',{
      method : 'POST',
      body : JSON.stringify(ingredients),
      headers : {'Content-Type' : 'application/json'}
    }).then(response =>{
        setIsLoading(false)
        return response.json()
    }).then(resData =>{
      setUserIngrdients(prevIngrdients =>[
        ...prevIngrdients,
        {id:resData.name,...ingredients}
      ])
    })    
    
  }
  // console.log(isLoading)
  const removeIngredientsHandler = ingredientId => {
    setIsLoading(true)
    fetch(`https://react-burger-app-ab541.firebaseio.com/orders/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(response=>{
      setIsLoading(false) 
      setUserIngrdients(prevIngredients =>
        prevIngredients.filter((ingredient) =>
          ingredient.id !== ingredientId))
    }).catch(error =>{
      setIsError(error.message);
      setIsLoading(false);
    })
  }

  const onLoadIngredientsHandler =useCallback(ingredients =>{
    setUserIngrdients(ingredients)
  },[]);

  const clearError =() =>{
    setIsError(null)
  }
  return (
    <div className="App">
      {isError && <ErrorModal onClose = {clearError}>{isError}</ErrorModal>}
      <IngredientForm ingredientsAddHandler = {ingredientsAddHandler} isLoading = {isLoading}/>
      <section>
        <Search onLoadIngredients = {onLoadIngredientsHandler} />
        <IngredientList ingredients={userIngrdients} onRemoveItem = {removeIngredientsHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
