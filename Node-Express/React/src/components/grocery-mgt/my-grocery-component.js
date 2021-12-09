import { useState, useEffect  } from "react";
import { grocery_items } from "./grocery-items";
import './grocery-style.css';

import { FaPlusCircle } from "react-icons/fa";

export default function MyGrocery() {
    const [checkedState, setCheckedState] = useState(
        new Array(grocery_items.length).fill(false)
    ); 
   
    const [isDisabled, setIsDisabled] = useState(true);
    const [cat, setCat] = useState('');
    const [itemName, setItemName] = useState('');

    useEffect(() => {
        var myGrocery = JSON.parse(localStorage.getItem('myGrocery') || "[]");
        if (myGrocery.length == 0) {
            console.log("empty");
            const updatedCheckedState = checkedState.map((item, index) =>
                false
            );
            setCheckedState(updatedCheckedState);
            localStorage.setItem("myGrocery", JSON.stringify(updatedCheckedState));
        }
        else {
            console.log("loading");
            setCheckedState(myGrocery);
        }

    }, []);

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);  

        localStorage.setItem("myGrocery", JSON.stringify(updatedCheckedState));
    };

    const getCategories = () => {
        return ["Fruit", "Frozen", "Vegitables", "Bakery", "Others"];
    }

    let categoryList = getCategories().length > 0
        && getCategories().map((item, i) => {
            return (
                <option key={i} value={item} >
                    {item}
                </option>
            )
        }, this);

    const onChangeCategory = (event) => {
        console.log(event.target.value);

        if (event.target.value == '' || event.target.value == null) {
            // disable new grocery list item textbox
            setIsDisabled(true);
            setItemName('');
            setCat('');
            return;
        }
        setIsDisabled(false);
        setCat(event.target.value);
    }

    const onChangeItemName = (event) => {
        console.log(event.target.value);
        if (event.target.value == '' || event.target.value == null)
            return;
        else {
            setItemName(event.target.value);
        }
    }

    const addNewItem = () => {
        
        if (cat === '' || itemName === '') {
            console.log('Error : Item Name is Empty!')
            return;
        }
        console.log(cat + ' : ' + itemName);
        
        // add cat and itemName to grocery-items.js file

    }
    
    return (
        <div className="row">

            <div >
                <div className="row">
                    <div className="col-sm-4">
                    </div>
                    <div className="col-sm-4">
                        <div className="groceryListHeader">
                            <h3>Grocery List</h3>
                        </div>
                    </div>
                    <div className="col-sm-4">
                    </div>
                </div>                              
                <p></p>
                <div className="groceryListHeaderDetails">
                    <ul >
                        <li>
                            Do Check To Add Item To Your Grocery List
                        </li>
                        <li>
                            Undo Check To Remove Item (Or) Bought Item From Your Grocery List
                        </li>
                    </ul>
                    <hr />
                    <p></p>
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="addNewListItem">
                                <form>
                                    <select
                                        className={"form-control"}
                                        style={{ width: 300, height: 40, borderColor: 'green', borderWidth: 3, color: 'blue' }}
                                        id="cat"
                                        value={cat}
                                        onChange={onChangeCategory}
                                        name="cat">
                                        <option value=''>
                                            ---select category---
                                        </option>
                                        {categoryList}
                                    </select>
                                    <p></p>
                                    <span className="form-group">
                                        <input
                                            type="text"
                                            placeholder="Item Name"
                                            style={{ width: 300, height: 40, borderColor: 'green', borderWidth: 3, color: 'blue' }}
                                            className={"form-control"}
                                            id="itemName"
                                            value={itemName}
                                            name="itemName"
                                            onChange={onChangeItemName}
                                            disabled={isDisabled}
                                        />
                                    </span>
                                </form>
                            </div>
                        </div>
                        <div className="col-sm-4 verticalCenter">
                            <button className="btn btn-block "
                                onClick={addNewItem}>
                                <FaPlusCircle style={{ color: 'green', fontSize: '50px' }} />
                                <i className="fas fa-camera fa-lg"></i>
                            </button>
                        </div>
                    </div>
                             
                </div>
            </div>
            <p></p>


            <div className="col-sm-4">
                <h3>Fruits</h3>
                <ul className="grocery-list">
                    {grocery_items.map(({ name, cat }, index) => {
                        return (
                            <span key={index}>
                                {
                                    cat == "Fruit" && (
                                        <span>
                                            <li key={index}>
                                                <span className="grocery-list-item">
                                                    <span>
                                                        <input
                                                            type="checkbox"
                                                            id={`custom-checkbox-${index}`}
                                                            name={name}
                                                            value={name}
                                                            checked={checkedState[index]}
                                                            onChange={() => handleOnChange(index)}
                                                        />&nbsp;
                                                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                                    </span>
                                                </span>
                                            </li>
                                        </span>
                                    )
                                }

                            </span>
                        );
                    })}
                </ul>
                <h3>Frozen</h3>
                <ul className="grocery-list">
                    {grocery_items.map(({ name, cat }, index) => {
                        return (
                            <span key={index}>
                                {
                                    cat == "Frozen" && (
                                        <span>
                                            <li key={index}>
                                                <span className="grocery-list-item">
                                                    <span>
                                                        <input
                                                            type="checkbox"
                                                            id={`custom-checkbox-${index}`}
                                                            name={name}
                                                            value={name}
                                                            checked={checkedState[index]}
                                                            onChange={() => handleOnChange(index)}
                                                        />&nbsp;
                                                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                                    </span>
                                                </span>
                                            </li>
                                        </span>
                                    )
                                }

                            </span>
                        );
                    })}
                </ul>
            </div>

            <div className="col-sm-4">              
                <h3>Vegitables</h3>
                <ul className="grocery-list">
                    {grocery_items.map(({ name, cat }, index) => {
                        return (
                            <span key={index}>
                                {
                                    cat == "Vegitables" && (
                                        <span>
                                            <li key={index}>
                                                <span className="grocery-list-item">
                                                    <span>
                                                        <input
                                                            type="checkbox"
                                                            id={`custom-checkbox-${index}`}
                                                            name={name}
                                                            value={name}
                                                            checked={checkedState[index]}
                                                            onChange={() => handleOnChange(index)}
                                                        />&nbsp;
                                                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                                    </span>
                                                </span>
                                            </li>
                                        </span>
                                    )
                                }

                            </span>
                        );
                    })}
                </ul>
                <h3>Bakery</h3>
                <ul className="grocery-list">
                    {grocery_items.map(({ name, cat }, index) => {
                        return (
                            <span key={index}>
                                {
                                    cat == "Bakery" && (
                                        <span>
                                            <li key={index}>
                                                <span className="grocery-list-item">
                                                    <span>
                                                        <input
                                                            type="checkbox"
                                                            id={`custom-checkbox-${index}`}
                                                            name={name}
                                                            value={name}
                                                            checked={checkedState[index]}
                                                            onChange={() => handleOnChange(index)}
                                                        />&nbsp;
                                                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                                    </span>
                                                </span>
                                            </li>
                                        </span>
                                    )
                                }

                            </span>
                        );
                    })}
                </ul>
                       
            </div>

            <div className="col-sm-4">
                <h3>Others</h3>
                <ul className="grocery-list">
                    {grocery_items.map(({ name, cat }, index) => {
                        return (
                            <span key={index}>
                                {
                                    cat == "Others" && (
                                        <span>
                                            <li key={index}>
                                                <span className="grocery-list-item">
                                                    <span>
                                                        <input
                                                            type="checkbox"
                                                            id={`custom-checkbox-${index}`}
                                                            name={name}
                                                            value={name}
                                                            checked={checkedState[index]}
                                                            onChange={() => handleOnChange(index)}
                                                        />&nbsp;
                                                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                                    </span>
                                                </span>
                                            </li>
                                        </span>
                                    )
                                }

                            </span>
                        );
                    })}
                </ul>
            </div>

            
        

        
            
        </div>
    );
}