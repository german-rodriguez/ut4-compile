import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { TruthValue } from './AST';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de conjunciones booleanas (AND).
*/
export class Disjunction extends Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    super();
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Disjunction(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} || ${this.rhs.unparse()})`;
  }

  evaluate(state: State): any {
    return this.lhs.evaluateBoolean(state) || this.rhs.evaluateBoolean(state);
  }

  compileCIL(context: CompilationContext): CompilationContext {
    context = this.lhs.compileCIL(context);
    context = this.lhs.compileCIL(context);
    context.appendInstruction('or');
    return context;
  }

  optimization(state: State): any{
    let lhs = this.lhs.optimization(state);
    let rhs = this.rhs.optimization(state);
    if(lhs instanceof TruthValue && rhs instanceof TruthValue) return new TruthValue(lhs.value || rhs.value);
    return new Disjunction(lhs,rhs);
  }
  maxStackIL(value: number): number {
    return Math.max(this.lhs.maxStackIL(value),this.rhs.maxStackIL(value) + 1);
  }
}
