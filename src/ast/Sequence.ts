import { Stmt } from './ASTNode';
import { State } from '../interpreter/State';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de las secuencias de sentencias.
*/
export class Sequence implements Stmt {

  statements: [Stmt];

  constructor(statements: [Stmt]) {
    this.statements = statements;
  }

  toString(): string {
    const statements = this.statements
      .filter((stmt) => (stmt !== undefined))
      .map((stmt) => (stmt.toString()))
      .join(", ");
    return `Sequence(${statements})`
  }

  unparse(): string {
    const statements = this.statements
      .filter((stmt) => (stmt !== undefined))
      .map((stmt) => (stmt.toString()))
      .join(" ");
    return `{ ${statements} }`
  }

  evaluate(state: State): State {
    for(var i = 0; i<this.statements.length; i++){
      state = this.statements[i].evaluate(state);
    }
    return state;
  }

  compileCIL(context: CompilationContext): CompilationContext {
    for(var i=0;i<this.statements.length;i++){
      context = this.statements[i].compileCIL(context);
    }
    return context;
  }

  maxStackIL(value: number): number {
    return Math.max.apply(this,
      this.statements.map((x) => (x.maxStackIL(value)))
    );
  }
}
