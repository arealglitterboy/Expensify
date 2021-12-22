const defaultState = {
    categories: [],
    term: '',
    sortBy: 'byNewest'
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_CONTACTS_CATEGORIES':
            return { ...state, categories: [...action.categories] };

        case 'SET_CONTACTS_FILTER_TERM':
            return { ...state, term: action.term };

        case 'SORT_CONTACTS_BY_NEWEST':
            return { ...state, sortBy: 'byNewest' }
        case 'SORT_CONTACTS_BY_OLDEST':
            return { ...state, sortBy: 'byOldest' };
        case 'SORT_CONTACTS_BY_NAME_DESCENDING':
            return { ...state, sortBy: 'byNameDescending' };
        case 'SORT_CONTACTS_BY_NAME_ASCENDING':
            return { ...state, sortBy: 'byNameAscending' };
            
        default:
            return state;
    }
};