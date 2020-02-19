import { ADD, REMOVE } from "../actions/types";


// defualt value is empty array []
const Cities = (state = [], action) => {
    switch (action.type) {
        case ADD:
            // add city to the existing array
            return state = [...state, action.city];
        case REMOVE:
            // remove city from the array
            return state = state.filter(city => city !== action.city);
        default:
            return state;
    }
}

export default Cities;

// x = [1,2,3,4,5]
// y = 6

// z = [...x, y] == [1,2,3,4,5,6]

