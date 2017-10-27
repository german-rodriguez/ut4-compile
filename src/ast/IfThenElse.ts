import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';
import { TruthValue, Sequence } from './AST';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de las sentencias condicionales.
*/
export class IfThenElse implements Stmt {
  cond: Exp;
  thenBody: Stmt;
  elseBody: Stmt;

  constructor(cond: Exp, thenBody: Stmt, elseBody: Stmt) {
    this.cond = cond;
    this.thenBody = thenBody;
    this.elseBody = elseBody;
  }

  toString(): string {
    return `IfThenElse(${this.cond.toString()}, ${this.thenBody.toString()}, ${this.elseBody.toString()})`;
  }

  unparse(): string {
    return `if ${this.cond.unparse()} then { ${this.thenBody.unparse()} } else { ${this.elseBody.unparse()} }`;
  }

  compileCIL(context: CompilationContext): CompilationContext {
    context = this.cond.compileCIL(context);
    var tagElse = context.getTag();
    var tagDone = context.getTag();
    context.appendInstruction(`brfalse ${tagElse}`)
    context = this.thenBody.compileCIL(context);
    context.appendInstruction(`br ${tagDone}`);
    context.appendInstruction(`${tagElse}:`);
    context = this.elseBody.compileCIL(context);
    context.appendInstruction(`${tagDone}:`);
    return context;
  }

  evaluate(state: State): State {
    if (this.cond.evaluateBoolean(state)){
      state = this.thenBody.evaluate(state);
    } else{
      state = this.elseBody.evaluate(state);
    }
    return state;
  }

  optimization(state: State): any{
    let cond = this.cond.optimization(state);
    let thenBody = this.thenBody.optimization(state);
    let elseBody = this.elseBody.optimization(state);
    if(cond instanceof TruthValue){
      if(cond.value) return thenBody;
      else return elseBody;
    }
    return new IfThenElse(cond,thenBody,elseBody);
  }

  maxStackIL(value: number): number {
    return Math.max(this.cond.maxStackIL(value),this.thenBody.maxStackIL(value),
      this.elseBody.maxStackIL(value));
  }
}
