// add utility functions here
// 1) convert label argument to id format

// iterate through
// will need to convert id props & Form title into camelCase before passing it into the components function.

export const constructId = (
  label: string,
  el: string,
  parent: string,
  container?: string
): string => {
  // label is the only thing that the user would manually input. The other inputs are inferred by the structure of the JSX.
  if (!label) {
    throw new Error(
      `label is required and was undefined, please provide a string as the value for the 'label' property on the elemetnt: ${el}, located in parent: ${parent} `
    );
  }
  if (label.match(/^[a-zA-Z0-9]*$/)) {
    const labelStr = label.split(" ").join("_");
    const id = `custpage_${labelStr}_${el}${
      container ? "_" + container : "_" + parent
    }`.toLowerCase();
    return id;
  } else
    throw new Error(
      `ERROR: The element ${el} contains non-alphanumeric characters in its label proprty: ${label}`
    );
};

console.log(constructId("Override Box", "Field", "Form", "Header"));
console.log(constructId("Override Box", "Field", "Sublist"));
console.log(constructId("Override Box", "Field", "Form"));

/*
 
rules:
- if Label contains the name of what the element is, don't includ that part of the string in the constuction of the id.
 
*/

// this function will check against the field type rules of SuiteScript
// and throw the appropriate error during transpilation!!

// We can create this LATER!

// export const checkValidType () => {

// }

/*
 
The DATETIME field type is not supported with addField methods, you must specify DATETIMETZ.

The FILE field type is available only for Suitelets and will appear on the main tab of the Suitelet page. FILE fields cannot be added to tabs, subtabs, sublists, or field groups and are not allowed on existing pages. It is not supported with List.addColumn(options).

The INLINEHTML field type should be considered as a 'write-only' type of field used to add a field on a form.

The IMAGE field type is available only for fields that appear on lists, staticlist sublists or forms.

Radio buttons that are inside one container are exclusive. The method addField on form has an optional parameter container. For an example, see FieldGroup.label.

The RADIO field type is not supported with Sublist.addField(options).

The DATETIME, FILE, HELP, INLINEHTML, LABEL, LONGTEXT, MULTISELECT, RADIO and RICHTEXT field types are not supported with Sublist.addField(options).

The CHECKBOX, DATETIME, DATETIMETZ, FILE, HELP, INLINEHTML, LABEL, MULTISELECT, SELECT, and RADIO field types are not supported with Sublist.addField(options).
 
*/
