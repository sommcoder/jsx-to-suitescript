const qtyDistForm = ui.createForm({
  title: "qty distribution",
});
qtyDistForm.clientScriptFileId = 17164;
qtyDistForm.addFieldGroup({
  id: "custpage_main_fieldgroup",
  label: "Main",
});
const overrideBox = qtyDistForm.addField({
  id: "custpage_qty_dist_override_box",
  label: "Override Box",
  type: "checkbox",
  container: "custpage_header_fieldgroup",
});
const recordTypeField = qtyDistForm.addField({
  id: "custpage_record_type_hidden",
  label: "recordType",
  type: "text",
  container: "custpage_header_fieldgroup",
});
recordTypeField.updateDisplayType({
  displayType: "hidden",
});
recordTypeField.defaultValue = currRecordType;
const recordIdField = qtyDistForm.addField({
  id: "custpage_record_id_hidden",
  label: "recordId",
  type: "text",
  container: "custpage_header_fieldgroup",
});
recordIdField.updateDisplayType({
  displayType: "hidden",
});
recordIdField.defaultValue = currRecordId;
const totalField = qtyDistForm.addField({
  id: "custpage_total_quantity_field",
  label: "Total Quantity",
  type: "float",
  container: "custpage_header_fieldgroup",
});
totalField.updateDisplayType({
  displayType: "entry",
});
totalField.updateDisplaySize({
  height: 60,
  width: 15,
});
totalField.isMandatory = true;
qtyDistForm.addSubmitButton({
  label: "Submit",
});
const itemSublist = qtyDistForm.addSublist({
  id: "custpage_qty_dist_form_item_sublist",
  label: "Item",
  tab: "item",
  type: "list",
});
const nameField = itemSublist.addField({
  id: "custpage_item_name_field",
  label: "Name",
  type: "text",
});
const lineKeyField = itemSublist.addField({
  id: "custpage_line_key_field",
  label: "Line Key",
  type: "text",
});
lineKeyField.updateDisplayType({
  displayType: "hidden",
});
const distRatioField = itemSublist.addField({
  id: "custpage_qty_distribution_field",
  label: "Ratio Number",
  type: "float",
});
const currItemTotalsField = itemSublist.addField({
  id: "custpage_curr_item_totals",
  label: "current qty",
  type: "float",
});
currItemTotalsField.updateDisplayType({
  displayType: "entry",
});
currItemTotalsField.isMandatory = true;
const newItemTotalsField = itemSublist.addField({
  id: "custpage_new_item_totals",
  label: "new qty",
  type: "float",
});
newItemTotalsField.isMandatory = true;
newItemTotalsField.updateDisplayType({
  displayType: "entry",
});
let i = 0;
search
  .create({
    type: "item",
    filters: [["internalid", "anyof", itemIds]],
    columns: ["custitem7", "displayname"],
  })
  .run()
  .each((result) => {
    log.debug({
      title: 'results"',
      details: result,
    });
    itemSublist.setSublistValue({
      id: "custpage_item_name_field",
      line: i,
      value: result.getValue({
        name: "displayname",
      }),
    });
    itemSublist.setSublistValue({
      id: "custpage_qty_distribution_field",
      line: i,
      value: result.getValue({
        name: "custitem7",
      }),
    });
    i++;
    return true;
  });
if (overrideBox === "T") {
  distRatioField.updateDisplayType({
    displayType: "entry",
  });
}
context.response.writePage({
  pageObject: qtyDistForm,
});

// search API call:
// will need to traverse the AST to detect how many AND Which JSXElements have a value attrtibute.
// For every field in a Sublist we call .setSublistValue()
// for every field in a Form we call .setField()
`let i = 0;
search
  .create(${{
    type: "item",
    filters: [["internalid", "anyof", itemIds]],
    columns: [column1, column2],
  }})
  .run()
  .each((result) => {
    ${sublist}.setSublistValue({
      id: "${fieldId}",
      line: i,
      value: result.getValue({
        name: "${column1}",
      }),
    });
    i++;
    return true;
  });`;
