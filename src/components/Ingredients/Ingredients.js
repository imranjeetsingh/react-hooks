import React,{useState} from 'react';

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
