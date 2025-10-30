import { useEffect, useReducer, useState } from "react";

const initialState = { cars: [], filtered: [] };

function reducer(state, action) {
    switch (action.type) {
        case "SET_CARS":
            return { ...state, cars: action.payload, filtered: action.payload };
        case "FILTER_PRICE":
            return {
                ...state,
                filtered: state.cars.filter((c) => c.price <= action.payload),
            };
        default:
            return state;
    }
}

export default function CarList() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [price, setPrice] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001/Cars")
            .then((res) => res.json())
            .then((data) =>
                dispatch({ type: "SET_CARS", payload: data })
            );
    }, []);

    return (
        <div className="container mt-5">
            <h3>Car List</h3>

            <div className="input-group mb-3">
                <input
                    className="form-control"
                    placeholder="Enter max price..."
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button
                    className="btn btn-outline-primary"
                    onClick={() =>
                        dispatch({ type: "FILTER_PRICE", payload: Number(price) })
                    }
                >
                    Search
                </button>
            </div>

            <div className="row">
                {state.filtered.map((car) => (
                    <div key={car.id} className="col-md-3 mb-3">
                        <div className="card">
                            <img
                                src={car.image}
                                className="card-img-top"
                                alt={car.make}
                            />
                            <div className="card-body">
                                <h5>
                                    {car.make} {car.model}
                                </h5>
                                <p>
                                    {car.year} - ${car.price}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
