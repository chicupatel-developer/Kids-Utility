import { useState, useEffect  } from "react";
import { grocery_items } from "./grocery-items";
import './grocery-style.css';

export default function MyGrocery() {
    const [checkedState, setCheckedState] = useState(
        new Array(grocery_items.length).fill(false)
    ); 
   
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
                <ul className="groceryListHeaderDetails">
                    <li>
                        Do Check To Add Item To Your Grocery List
                    </li>
                    <li>
                        Undo Check To Remove Item (Or) Bought Item From Your Grocery List
                    </li>                    
                </ul>
            </div>


            <div className="col-sm-6">
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

            <div className="col-sm-6">
                <h3>Freeze</h3>
                <ul className="grocery-list">
                    {grocery_items.map(({ name, cat }, index) => {
                        return (
                            <span key={index}>
                                {
                                    cat == "Freeze" && (
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