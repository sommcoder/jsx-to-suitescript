// Babel:
import traverse from "@babel/traverse";
import parser from "@babel/parser";
import generate from "@babel/generator";
import * as t from "@babel/types";

// Node:
import fs from "fs";
import path from "path";

// Project:
import * as ss from "./suitescript-lib.js";
import * as util from "./util";
import * as code from "../test"; // what's the best way to get this code that we want to transpile???

// create the AST:
const ast = parser.parse(code, {
  sourceType: "module",
  plugins: ["jsx"], // Babel internal plugin
});

// will likely have to use path.inList to handle list.map()

// we don't need to define types because we're using Babel's native JSX plugin

// traverse the AST:
traverse(ast, {
  name: "jsx-to-suitescript",
  visitor: {
    ReturnStatement(path) {
      console.log("return:", path.node.argument.openingElement.name.name);
      const pageType = path.node.argument.openingElement.name.name;
      page.type = pageType;
      console.log(page);
    },
    JSXOpeningElement(path) {
      console.log("opening el:", path.node.name.name);
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

      // PROPS:
      if (node.openingElement.attributes.length > 0) {
        propsArr.forEach((el) => {
          if (!propsObj[el.name.name]) {
            if (typeof el.value == "object" && el.value !== null) {
              propsObj[el.name.name] = el.value.value;
            } else {
              propsObj[el.name.name] = el.value || true;
            }
          } else
            throw new Error(
              "JSX components cannot have two different props of the same name"
            );
        });
      }
      console.log(componentName);
      console.log("propsObj", propsObj);
      // CHILDREN:
      console.log("path", path);
      console.log("node:", node);
      console.log(path.parent.type);
      const parent = path.parent.type;

      // POPULATE

      const template = `SS.createComponent(${componentName}, ${propsObj}, ${
        parent !== "JSXElement" ? "" : node.children
      })`;
      console.log(template);
      /*
    if (node.children.length > 0) {
      componentArguments.push(node.children);
    }
        console.log(componentArguments);
*/

      /*
          children.forEach((el) => {
          console.log('el:', el);
          const attrObj = {};
            const component = '';
     
        path.node.name.name = `SS.createComponent(${component}, ${attrObj}, ${path})`;
        });
        */
    },
    JSXClosingElement(path) {
      console.log(path);
      path.node.name = "";
    },
  },
});

generate(ast, {}, code);
