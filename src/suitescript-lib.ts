export { Form, Field, Sublist, Button, Select };

const Form = {
  add: (ui: object, title: string) => {
    `const ${title} = ${ui}.createForm({
      title: ${title},
    });`;
  },
  props: [
    {
      module: (form: object, path: string) => {
        `${form}.clientScriptModulePath = '${path}';
      `;
      },
    },
    {
      fileId: (form: object, id: number) => {
        `${form}.clientScriptFileId = ${id};
      `;
      },
    },
    { navBar: () => {} },
  ],
};

const Sublist = {
  add: (
    form: object,
    id: string,
    tab: string,
    type: string,
    label?: string
  ) => {
    `const ${label || id} = ${form}.addSublist({
      id: 'custpage_${id}',
      ${label ? `label: ${label}` : `label: ${id}`},
      tab: ${tab}
      type: '${type}',
    })`;
  },
  props: [
    {
      markAll: (sublist: object) => {
        `${sublist}.addMarkAllButtons();
      `;
      },
    },
  ],
};

const Field = {
  add: (
    form: object,
    id: string,
    type: string,
    source: string,
    container: string,
    label?: string
  ) => {
    `const ${label || id} = ${form}.addField({
      id: 'custpage_${id}',
      ${label ? `label: ${label}` : `label: ${id}`},
      type: '${type}',
      source: '${source}',
      container: '${container}'
    })`;
  },
  // props are LOOKED up as they appear in the JSX component
  props: {
    mandatory: (field: object, mandatory: boolean) => {
      if (mandatory)
        `${field}.isMandatory = ${mandatory};
        `;
      else "";
    },

    credential: (
      id: string,
      form: object,
      domain: string | [string],
      scriptIds: string | [string],
      restUser?: boolean,
      container?: string,
      label?: string
    ) => {
      `const ${label || id} = ${form}.addCredentialField({
            id: 'custpage_${id}',
            restrictToDomains: ${domain},
            ${scriptIds ? `restrictToScriptIds : ${scriptIds}` : ""},
            ${restUser ? `restrictToCurrentUser : ${restUser}` : ""},
            ${container ? `container: ${container}` : ""}
     })`;
    },

    def: (field: object, def: string) => {
      if (def)
        `${field}.defaultValue = ${def};
        `;
      else "";
    },

    help: (field: object, help: string) => {
      `${field}.setHelpText({
        help: '${help}'
      })
      `;
    },

    max: (field: object, max: number) => {
      `${field}.maxLength = ${max};
      `;
    },

    padding: () => {},
    layout: () => {},
    display: () => {},
    select: () => {},

    secret: (
      form: object,
      id: string,
      scriptIds: string | [string],
      restUser: boolean,
      label?: string
    ) => {
      `
        const ${label || id} = ${form}.addSecretKeyField({
        id: 'custpage_${id}',
        ${label ? `label: ${label}` : `label: ${id}`},
        restrictToScriptIds: ${scriptIds},
        restrictToCurrentUser: ${restUser || false},
      })
      `;
    },

    // the id of the field:
    totalling: (sublist: object, id: string) => {
      `${sublist}.updateTotallingField({
          id: 'custpage_${id}',
    })`;
    },

    unique: (sublist: object, id: string) => {
      `${sublist}.updateUniqueFieldId({
      id: 'custpage_${id}',
    })`;
    },
  },
};

// Select is a component WITHIN a dropdown Field.
// field is populated ONLY IF Selected has an immediate parent of Field
// Select returns void in SuiteScript
const Select = {
  add: (value: string, text: string, isSelected: boolean, field: object) => {
    `${field}.addSelectOption({
    value : ${value},
    text : ${text},
    isSelected: ${isSelected},
});
`;
  },
};

const Button = {
  add: (form: object, id: string, label: string, func?: string) => {
    ` const ${label || id} = ${form}.addButton({
      id: 'custpage_${id}',
      ${label ? `label: ${label}` : `label: ${id}`},
      ${func ? `func: ${func}` : ""},
    });`;
  },
  props: [
    {
      disabled: (button: object, path: string) => {
        `${button}.clientScriptModulePath = '${path}';
      `;
      },
    },
    {
      hidden: (button: object, id: string) => {
        `${button}.clientScriptFileId = custpage_${id};
      `;
      },
    },
    {
      // can be this
      submit: (form: object, label: string) => {
        `const submitBtn = ${form}.addSubmitButton({
        ${label ? `label: ${label}` : ""},
      })
      `;
      },
    },

    {
      reset: (form: object, label?: string) => {
        `const ${label || "resetBtn"} = ${form}.addResetButton({
        label: ${label || "Reset Button"}
      })
      `;
      },
    },
    {
      refresh: (sublist: object) => {
        `const refreshBtn = ${sublist}.addRefreshButton();
      `;
      },
    },
  ],
};

// creates the Page, whether thats a Form, List or Assistant
const write = (res: object, form: object) => `
    ${res}.writePage({
    pageObject: ${form}
    })  
`;
