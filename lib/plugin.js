// Babel:
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
// import * as t from "@babel/types";

// Project:
// import * as ss from "./ss-library.js";
// import * as util from "./util";
import * as code from "../test3.js"; // what's the best way to get this code that we want to transpile???

// create the AST:
const ast = parser.parse(code, {
  sourceType: "module",
  plugins: ["jsx"], // enables JSX syntax as a parser plugin
});
console.log(ast);
// will likely have to use path.inList to handle list.map()
// we don't need to define types because we're using Babel's native JSX plugin

// traverse the AST:
traverse(ast, {
  name: "jsx-to-suitescript",
  visitor: {
    ReturnStatement(path) {
      console.log("return:", path.node.argument.openingElement.name.name);

      const isJSX = path.node.argument.openingElement;
      console.log(isJSX);

      if (!isJSX) path.skip();

      const pageType = path.node.argument.openingElement.name.name;

      console.log(pageType);
    },
    JSXElement(path) {
      console.log(path.get("children"));
      const { node } = path;
      console.log(node);
      const componentName = node.openingElement.name.name;
      const propsArr = node.openingElement.attributes;
      const children = node.children;
      console.log("children", children);
      const propsObj = {};
    },
  },
});

generate(ast, {}, code);
