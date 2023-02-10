# This is a custom Babel Plugin designed to allow Babel to transpile JSX and HTML into NetSuite readable SuiteScript 2.0.

# You're able to create API calls from the ui/serverWidget module that would normally require 100+ lines of code in only 20 lines of JSX, greatly speeding up development time and readability.

# you can also add a Babel Watch and as changes are made to your JSX file

# Nested components such as a <Field> within a <Sublist> is transpiled to be a CHILD of the Sublist in this example and therefore options.container is assigned to the id prop of the parent component.

# id props are not required, they are auto-generated based on the label/title prop you provide

# as with standard JSX, camelCase is required, SuiteScript components are Capitalized, standard HTML is NOT.

# you can create a custom HTML field within a <Field type="HTML"> and the HTML will be the value associated with the
