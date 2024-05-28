/**
 * Creates url search parameters string from given array of key:value pairs objects
 * @param {Array} params - array of key:value pairs object
 * @returns {String} - returns string like '?key1=value1&key2=value2... or emty string
 */

const createSearchParamsString = (params) => {
    const searchParams = new URLSearchParams('');

    for (const param of params) {
        if (param.value) {
            searchParams.append(param.key, param.value);
        }
    }

    return searchParams.size > 0 ? `?${searchParams.toString()}` : '';
};

export { createSearchParamsString };
