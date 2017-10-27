import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { TruthValue } from './AST';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de las negaciones de expresiones booleanas.
*/
export class Negation extends Exp {

  exp: Exp;

  constructor(exp: Exp) {
    super();
    this.exp = exp;
  }

  toString(): string {
    return `Negation(${this.exp.toString()})`;
  }

  unparse(): string {
    return `(!${this.exp.unparse()})`;
  }

  compileCIL(context: CompilationContext): CompilationContext {
    context = this.exp.compileCIL(context);
    context.appendInstruction('neg');
    return context;
  }

  evaluate(state: State){
    return !this.exp.evaluate(state);
  }

  optimization(state: State): any{
      let exp = this.exp.optimization(state);
      if(exp instanceof TruthValue) return new TruthValue(!exp.value);
      return new Negation(exp);
  }

  maxStackIL(value: number): number {
    return this.exp.maxStackIL(value);
  }
}
