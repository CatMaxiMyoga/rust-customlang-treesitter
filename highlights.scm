"if" @keyword.conditional
"else" @keyword.conditional
"while" @keyword.repeat
"return" @keyword.return
"class" @keyword
"static" @keyword.modifier
"Self" @keyword.type

"," @punctuation.delimiter
"." @punctuation.delimiter
";" @punctuation.delimiter

"(" @punctuation.bracket
")" @punctuation.bracket
"{" @punctuation.bracket
"}" @punctuation.bracket

(comment) @comment

(variable_declaration name: (identifier) @variable)
(assignment assignee: (identifier) @variable)
(field_declaration name: (identifier) @variable.member)
(parameter_list name: (identifier) @variable.parameter)

(function_declaration name: (identifier) @function)
(method_declaration name: (identifier) @function.method)
(constructor_declaration class_name: (identifier) @constructor)

(class_declaration name: (identifier) @type)

(variable_declaration type: (identifier) @type)
(field_declaration type: (identifier) @type)
(parameter_list type: (identifier) @type)
(function_declaration return_type: (identifier) @type)
(method_declaration return_type: (identifier) @type)

((identifier) @variable.builtin
  (#eq? @variable.builtin "self")
  (#has-ancestor? @variable.builtin method_declaration constructor_declaration))

(variable_declaration
  type: (identifier) @type.builtin
  (#any-of? @type.builtin "string" "int" "float" "bool"))
(field_declaration
  type: (identifier) @type.builtin
  (#any-of? @type.builtin "string" "int" "float" "bool"))
(field_declaration
  type: (identifier) @keyword.type
  (#eq? @keyword.type "Self"))
(function_declaration
  return_type: (identifier) @type.builtin
  (#any-of? @type.builtin "string" "int" "float" "bool" "void"))
(method_declaration
  return_type: (identifier) @type.builtin
  (#any-of? @type.builtin "string" "int" "float" "bool" "void"))
(method_declaration
  return_type: (identifier) @keyword.type
  (#eq? @keyword.type "Self"))
(parameter_list
  type: (identifier) @type.builtin
  (#any-of? @type.builtin "string" "int" "float" "bool"))

(call_expression callee: (expression) @function.call)
(call_expression
  callee: (expression) @function.builtin
  (#any-of? @function.builtin
    "print"
    "println"
    "boolToString"
    "intToString"
    "floatToString"
    "stringToBool"
    "intToBool"
    "floatToBool"
    "stringToInt"
    "boolToInt"
    "floatToInt"
    "stringToFloat"
    "boolToFloat"
    "intToFloat"
  ))
(call_expression
  callee: (expression) @constructor
  (#match? @constructor "new$"))

; (identifier) @variable

(string) @string
(string (escape_sequence) @string.escape)

(int) @number
(float) @number.float
(boolean) @boolean

(binary_expression operator: "+" @operator)
(binary_expression operator: "-" @operator)
(binary_expression operator: "*" @operator)
(binary_expression operator: "/" @operator)
(binary_expression operator: "&&" @operator)
(binary_expression operator: "||" @operator)
(binary_expression operator: "==" @operator)
(binary_expression operator: "!=" @operator)
(binary_expression operator: "<" @operator)
(binary_expression operator: ">" @operator)
(binary_expression operator: "<=" @operator)
(binary_expression operator: ">=" @operator)

(unary_expression operator: "!" @operator)
