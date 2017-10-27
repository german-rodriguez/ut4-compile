import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { Numeral } from './AST';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de sumas.
*/
export class Multiplication extends Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    super();
    this.lhs = lhs;
    this.rhs = rhs;
  }

  toString(): string {
    return `Multiplication(${this.lhs.toString()}, ${this.rhs.toString()})`;
  }

  unparse(): string {
    return `(${this.lhs.unparse()} * ${this.rhs.unparse()})`;
  }

  compileCIL(context: CompilationContext): CompilationContext {
    context = this.lhs.compileCIL(context);
    context = this.rhs.compileCIL(context);
    context.appendInstruction('mul');
    return context;
  }

  evaluate(state: State): any{
    return this.lhs.evaluateNumber(state) * this.rhs.evaluateNumber(state);
  }

  optimization(state: State): any{
    let lhs = this.lhs.optimization(state);
    let rhs = this.rhs.optimization(state);
    if(lhs instanceof Numeral){
      if(rhs instanceof Numeral) return new Numeral(lhs.value * rhs.value);
      if(lhs.value == 0) return new Numeral(0);
    }else{
      if(rhs instanceof Numeral){
        if(rhs.value == 0) return new Numeral(0);
      }
    }
    return new Multiplication(lhs,rhs);
  }

  maxStackIL(value: number): number {
    return Math.max(this.lhs.maxStackIL(value),this.rhs.maxStackIL(value) + 1);
  }
}
