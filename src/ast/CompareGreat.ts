import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { Numeral, TruthValue } from './AST';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de las comparaciones por menor o igual.
*/
export class CompareGreat extends Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    super();
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `CompareGreat(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} > ${this.rhs.unparse()})`;
  }

  compileCIL(context: CompilationContext): CompilationContext {
    context = this.lhs.compileCIL(context);
    context = this.rhs.compileCIL(context);
    context.appendInstruction('cgt');
    return context;
  }

  evaluate(state: State): any {
    return this.lhs.evaluateNumber(state) > this.rhs.evaluateNumber(state);
  }

  optimization(state: State): any{
    let lhs = this.lhs.optimization(state);
    let rhs = this.rhs.optimization(state);
    if(lhs instanceof Numeral && rhs instanceof Numeral) return new TruthValue(lhs.value > rhs.value);
    return new CompareGreat(lhs,rhs);
  }

  maxStackIL(value: number): number {
    return Math.max(this.lhs.maxStackIL(value),this.rhs.maxStackIL(value) + 1);
  }
}
