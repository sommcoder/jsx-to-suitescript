"use strict";
// add utility functions here
// 1) convert label argument to id format
// iterate through
// will need to convert id props & Form title into camelCase before passing it into the components function.
const convertLabel = (id, str) => {
    id.split("_").forEach((str, i) => {
        if (i > 0)
            str = str[0].toUpperCase() + str.slice(1);
    });
    return str;
};
