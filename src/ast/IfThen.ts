import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de las sentencias condicionales.
*/
export class IfThen implements Stmt {
  cond: Exp;
  thenBody: Stmt;

  constructor(cond: Exp, thenBody: Stmt) {
    this.cond = cond;
    this.thenBody = thenBody;
  }

  toString(): string {
    return `IfThen(${this.cond.toString()}, ${this.thenBody.toString()})`;
  }

  unparse(): string {
    return `if ${this.cond.unparse()} then { ${this.thenBody.unparse()} }`;
  }

  compileCIL(context: CompilationContext): CompilationContext {
    context = this.cond.compileCIL(context);
    var tag = context.getTag();
    context.appendInstruction(`brfalse ${tag}`);
    context = this.thenBody.compileCIL(context);
    context.appendInstruction(`${tag}:`)
    return context;
  }

  evaluate(state: State): State {
    if (this.cond.evaluateBoolean(state)){
      state = this.thenBody.evaluate(state);
    }
    return state;
  }
  
  maxStackIL(value: number): number {
    return Math.max(this.cond.maxStackIL(value),this.thenBody.maxStackIL(value));
  }
}
