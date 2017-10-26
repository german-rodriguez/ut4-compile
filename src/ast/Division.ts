import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de multiplicaciones.
*/
export class Division extends Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    super();
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Division(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} / ${this.rhs.unparse()})`;
  }

  compileCIL(context: CompilationContext): CompilationContext {
    context = this.lhs.compileCIL(context);
    context = this.rhs.compileCIL(context);
    context.appendInstruction('div');
    return context;
  }

  evaluate(state: State): any {
    return this.lhs.evaluateNumber(state) / this.lhs.evaluateNumber(state);
  }
  
  maxStackIL(value: number): number {
    return Math.max(this.lhs.maxStackIL(value),this.rhs.maxStackIL(value) + 1);
  }
}
