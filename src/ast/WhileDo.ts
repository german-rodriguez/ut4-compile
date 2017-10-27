import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';
import { TruthValue, Sequence } from './AST';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de las iteraciones while-do.
*/
export class WhileDo implements Stmt {
  cond: Exp;
  body: Stmt;

  constructor(cond: Exp, body: Stmt) {
    this.cond = cond;
    this.body = body;
  }

  toString(): string {
    return `WhileDo(${this.cond.toString()}, ${this.body.toString()})`;
  }

  unparse(): string {
    return `while ${this.cond.unparse()} do { ${this.body.unparse()} }`;
  }

  evaluate(state: State): State {
    while(this.cond.evaluateBoolean(state)){
      state = this.body.evaluate(state);
    }
    return state;
  }

  optimization(state: State): any{
    let cond = this.cond.optimization(state);
    let body = this.body.optimization(state);
    if(cond instanceof TruthValue && !cond.value){
      return new Sequence([] as [Stmt]);
    }
    return new WhileDo(cond,body);
  }
  compileCIL(context: CompilationContext): CompilationContext {
    var tagStart = context.getTag();
    var tagCond = context.getTag();
    context.appendInstruction(`br ${tagCond}`);
    context.appendInstruction(`${tagStart}:`);
    context = this.body.compileCIL(context);
    context.appendInstruction(`${tagCond}:`);
    context = this.cond.compileCIL(context);
    context.appendInstruction(`brtrue ${tagStart}`);
    return context;
  }

  maxStackIL(value: number): number {
    return Math.max(this.cond.maxStackIL(value),this.body.maxStackIL(value));
  }
}
