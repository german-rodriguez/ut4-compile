import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { TruthValue } from './AST';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de conjunciones booleanas (AND).
*/
export class Conjunction extends Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    super();
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Conjunction(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} && ${this.rhs.unparse()})`;
  }

  compileCIL(context: CompilationContext): CompilationContext {
    context = this.lhs.compileCIL(context);
    context = this.lhs.compileCIL(context);
    context.appendInstruction('and');
    return context;
  }

  evaluate(state: State): any {
    return this.lhs.evaluateBoolean(state) && this.rhs.evaluateBoolean(state);
  }

  optimization(state: State): any{
    let lhs = this.lhs.optimization(state);
    let rhs = this.rhs.optimization(state);
    if(lhs instanceof TruthValue && rhs instanceof TruthValue) return new TruthValue(lhs.value && rhs.value);
    return new Conjunction(lhs,rhs);
  }

  maxStackIL(value: number): number {
    return Math.max(this.lhs.maxStackIL(value),this.rhs.maxStackIL(value) + 1);
  }
}
