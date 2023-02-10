const write = (res, form) => `
    ${res}.writePage({
    pageObject: ${form}
    })  
`;

console.log("write:", write("response", 123));
