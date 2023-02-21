// SuiteScript Global Objects:
const ui = {};
const search = () => {};
const itemIds = 1234;
const currRecordType = "sales";
const currRecordId = 4321;
// The Babel Traverse Module will run through the SuiteScript and detect if any function return statements include a JSX Element. If so, it will convert the JSX into SuiteScript API calls with inferred associations based on nesting as well as utility functions that will assign id's to the API calls removing 10x the verbosity of building a UI in SuiteScript 2.0

// create an IIFE and pass the values you'll need to build you ui
// not sure if we NEED the IIFE.. but if we want to pass outside values inside the Page, those
// this will include the ui Object and any other variables that you need for the Page but also require outside of the Pages scope.
// results returns an array of the column values returned by the search function. The results returned are in the same order at the options.columns object you pass in the search function so

// these 33 lines of JSX will be transpiled into 130+ lines of SuiteScript for 4x reduction in development in an far more readable format.
function Page(ui, search, itemIds) {
  const client = 17164;
  const size = { height: 60, width: 15 };
  return (
    <Form ui={ui} title="Quantity Distribution" client={client} hideNav>
      <FieldGroup label="Main">
        <Field label="Override Box" />
        <Field label="Record Type" def={currRecordType} hidden />
        <Field label="Record Id" def={currRecordId} hidden />
        <Field
          label="Total Quantity"
          type="float"
          display="entry"
          size={size}
          mandatory
        />
      </FieldGroup>
      <Sublist label="Item Sublist" type="list">
        <Field label="Name" type="text" />
        <Field label="Line Key" type="text" hidden />
        <Field label="Ratio Number" type="float" />
        <Field label="Current Qty" type="float" display="entry" mandatory />
        <Field label="New Qty" type="float" display="entry" mandatory />
        <Button label="Reset Button" />
      </Sublist>
      <Button label="Submit Button" />
    </Form>
  );
}

// function Page(ui, search, itemIds) {
//   const client = 17164;
//   const size = { height: 60, width: 15 };
//   const results = search({
//     type: "item",
//     filters: [["internalid", "anyof", itemIds]],
//     columns: ["custitem7", "displayname"],
//   });
//   return (
//     <Form ui={ui} title="Quantity Distribution" client={client} hideNav>
//       <FieldGroup label="Main">
//         <Field label="Override Box" />
//         <Field label="Record Type" def={currRecordType} hidden />
//         <Field label="Record Id" def={currRecordId} hidden />
//         <Field
//           label="Total Quantity"
//           type="float"
//           display="entry"
//           size={size}
//           mandatory
//         />
//       </FieldGroup>
//       <Sublist label="Item Sublist" type="list">
//         <Field label="Name" type="text" value={results.columns[0]} />
//         <Field label="Line Key" type="text" hidden />
//         <Field label="Ratio Number" type="float" value={results.columns[0]} />
//         <Field label="Current Qty" type="float" display="entry" mandatory />
//         <Field label="New Qty" type="float" display="entry" mandatory />
//         <Button label="Reset Button" />
//       </Sublist>
//       <Button label="Submit Button" />
//     </Form>
//   );
// }

// Page(ui: object) <-- only required parameter is the ui Object
