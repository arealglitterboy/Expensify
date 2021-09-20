const sort = {
    byNewest: (e1, e2) => (e2.date - e1.date),
    byOldest: (e1, e2) => (e1.date - e2.date),
    byAmountDescending: (e1, e2) => (e2.amount - e1.amount),
    byAmountAscending: (e1, e2) => (e1.amount - e2.amount),
};

const getSort = (sortBy) => {
    console.log( "-->", sortBy);
    if (Object.keys(sort).includes(sortBy)) {
        return sort[sortBy];
    } else {
        throw new Error('Illegal sort name, ' + sortBy + '.');
    }
};

/**
 * `createIncludes`: Creates a method using Regex to search for a static `needle` in a given string (`haystack`) ignoring case.
 * @param {string} needle unchanging search term
 * @returns {(haystack: string) => (boolean)} method returns true if the haystack includes the needle, false otherwise.
 */
const createIncludes = (needle) => {
    const regExp = new RegExp(needle, 'gi')
    return (haystack = "") => haystack.search(regExp) >= 0;
};

const createDateCompare = (date, before = true) => {
    let method = () => true;

    if (date) {
        let control = new Date(date);
        control.setHours(0, 0, 0, 0);
        method = (before) ? ((comp) => comp <= control) : ((comp) => comp >= control);
    }

    return method;
};

const createFilter = ({ term = '', startDate, endDate } = {}) => {
    const includes = createIncludes(term);
    const isAfterStart = createDateCompare(startDate, false);
    const isBeforeEnd = createDateCompare(endDate, true);

    return ({ description, note, date }) => (isAfterStart(date) && isBeforeEnd(date) && (includes(description) || includes(note)));
}

export default (expenses, filters) => (expenses.filter(createFilter(filters)).sort(getSort(filters.sortBy)));