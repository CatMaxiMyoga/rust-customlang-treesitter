/**
 * @file Customlang grammar for tree-sitter
 * @author Maxi Myoga
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

/**
 * @param {RuleOrLiteral} sep
 * @param {RuleOrLiteral} rule
 */
function sepBy(sep, rule) {
  return optional(seq(rule, repeat(seq(sep, rule))));
}

module.exports = grammar({
  name: "maxi_customlang",

  extras: ($) => [/\s/, $.comment],
  word: ($) => $.identifier,

  rules: {
    source_file: ($) => repeat($.statement),

    comment: (_) => seq("/*", repeat(/[^*]|\*+[^*/]/), "*/"),

    statement: ($) =>
      choice(
        $.variable_declaration,
        $.assignment,
        $.function_declaration,
        $.class_declaration,
        $.return_statement,
        $.if_statement,
        $.while_statement,
        $.expression_statement,
      ),

    expression: ($) =>
      choice(
        $.binary_expression,
        $.unary_expression,
        $.call_expression,
        $.member_expression,
        $.literal,
        $.identifier,
        $.parenthesized_expression,
      ),

    identifier: (_) => /[a-zA-Z_][a-zA-Z0-9_]*/,

    literal: ($) => choice($.string, $.int, $.float, $.boolean),

    string: ($) => seq('"', repeat(choice($.escape_sequence, /[^"\\]/)), '"'),
    escape_sequence: (_) =>
      /\\([ntrbf0va]|u\{[a-fA-F0-9]+\}|x[0-7][a-fA-F0-9]|.)/,
    int: (_) => /\d+/,
    float: (_) => /\d*\.\d+/,
    boolean: (_) => choice("true", "false"),

    variable_declaration: ($) =>
      seq(
        field("type", $.identifier),
        field("name", $.identifier),
        optional(seq("=", field("value", $.expression))),
        ";",
      ),

    assignment: ($) =>
      seq(
        field("assignee", choice($.identifier, $.member_expression)),
        "=",
        field("value", $.expression),
        ";",
      ),

    parenthesized_expression: ($) => seq("(", $.expression, ")"),

    unary_expression: ($) =>
      prec.right(7, seq(field("operator", "!"), $.expression)),

    binary_expression: ($) =>
      choice(
        prec.left(1, seq($.expression, field("operator", "||"), $.expression)),
        prec.left(2, seq($.expression, field("operator", "&&"), $.expression)),
        prec.left(
          3,
          seq(
            $.expression,
            field("operator", choice("==", "!=")),
            $.expression,
          ),
        ),
        prec.left(
          4,
          seq(
            $.expression,
            field("operator", choice("<", ">", "<=", ">=")),
            $.expression,
          ),
        ),
        prec.left(
          5,
          seq($.expression, field("operator", choice("+", "-")), $.expression),
        ),
        prec.left(
          6,
          seq($.expression, field("operator", choice("*", "/")), $.expression),
        ),
      ),

    call_expression: ($) =>
      prec.left(
        seq(
          field("callee", $.expression),
          "(",
          sepBy(",", field("arguments", $.expression)),
          ")",
        ),
      ),

    member_expression: ($) =>
      prec.left(
        seq(
          field("object", $.expression),
          ".",
          field("property", $.identifier),
        ),
      ),

    expression_statement: ($) => seq($.expression, ";"),

    return_statement: ($) => seq("return", $.expression, ";"),

    if_statement: ($) =>
      seq(
        "if",
        "(",
        field("condition", $.expression),
        ")",
        $.block,
        repeat(seq("else", "if", "(", $.expression, ")", $.block)),
        optional(seq("else", $.block)),
      ),

    while_statement: ($) =>
      seq("while", "(", field("condition", $.expression), ")", $.block),

    block: ($) => seq("{", repeat($.statement), "}"),

    function_declaration: ($) =>
      seq(
        field("return_type", $.identifier),
        field("name", $.identifier),
        $.parameter_list,
        $.block,
      ),

    parameter_list: ($) =>
      seq(
        "(",
        optional(
          sepBy(
            ",",
            seq(field("type", $.identifier), field("name", $.identifier)),
          ),
        ),
        ")",
      ),

    class_declaration: ($) =>
      seq(
        "class",
        field("name", $.identifier),
        "{",
        repeat(
          choice(
            $.field_declaration,
            $.constructor_declaration,
            $.method_declaration,
          ),
        ),
        "}",
      ),

    field_declaration: ($) =>
      seq(
        optional("static"),
        field("type", $.identifier),
        field("name", $.identifier),
        ";",
      ),

    method_declaration: ($) =>
      prec(
        1,
        seq(
          optional("static"),
          field("return_type", $.identifier),
          field("name", $.identifier),
          $.parameter_list,
          $.block,
        ),
      ),

    constructor_declaration: ($) =>
      prec(
        2,
        seq(
          "static",
          "Self",
          field("class_name", $.identifier),
          $.parameter_list,
          $.block,
        ),
      ),
  },
});
