import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de sumas.
*/
export class Addition implements Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Addition(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} + ${this.rhs.unparse()})`;
  }

  evaluate(state: State): any {
    var l = this.lhs.evaluate(state);
    var r = this.rhs.evaluate(state);
    if ((typeof l != 'boolean') && (typeof r != 'boolean')){
      return l + r;
    }
    else{ throw "Type error"; }
  }

  compileCIL(context: CompilationContext): CompilationContext {
    context = this.lhs.compileCIL(context);
    context = this.rhs.compileCIL(context);
    context.appendInstruction('add');
    return context;
  }

  maxStackIL(value: number): number {
    return Math.max(this.lhs.maxStackIL(value),this.rhs.maxStackIL(value) + 1);
  }
}
