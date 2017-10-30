import * as readlineSync from "readline-sync";

import { Parser } from "nearley";

import { tokens } from "./parser/Tokens";
import { MyLexer } from "./parser/Lexer"
import { ParserRules, ParserStart } from "./parser/Grammar";

import { ASTNode, Stmt } from './ast/AST';
import { State } from './interpreter/State';

import { CompilationContext } from './compileCIL/CompilationContext';


console.log("While :: REPL");

var context = new CompilationContext();
var state = new State();

while (true) {
  const lexer = new MyLexer(tokens);
  const parser = new Parser(ParserRules, ParserStart, { lexer });

  const input = readlineSync.question('> ');

  try {
    // Parse user input
    parser.feed(input);
    // Print result
    const nodes: Stmt[] = parser.results;

    switch (nodes.length) {
      case 0: {
        console.log("Parse failed!!");
        break;
      }
      case 1: {
        const node = nodes[0];
        const maxStack = node.maxStackIL(0);
        var aux = node.optimization(state);
        context = aux.compileCIL(context);
        var str = context.getCIL(maxStack)
        console.log(str);

        var fs = require('fs');
        fs.writeFileSync("res.il", str, function(err) {
        if(err) {
          return console.log(err);
        }
        console.log("The file was saved!");
});
        break;
      }
      default: {
        console.log("Warning!! Grammar is ambiguous, multiple parse results.\n");
        nodes.map((node) => console.log(node.toString()));
        break;
      }
    }

  } catch(parseError) {
    console.log(parseError);
  }
}
