import { Exp } from './ASTNode';
import { Numeral } from './AST';
import { State } from '../interpreter/State';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de sumas.
*/
export class Addition extends Exp {

  lhs: Exp;
  rhs: Exp;

  constructor(lhs: Exp, rhs: Exp) {
    super();
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

  optimization(state: State): any{
    let lhs = this.lhs.optimization(state);
    let rhs = this.rhs.optimization(state);
    if(lhs instanceof Numeral){
      if(rhs instanceof Numeral) return new Numeral(lhs.value + rhs.value);
      if(lhs.value == 0) return rhs;
    }else{
      if(rhs instanceof Numeral){
        if(rhs.value == 0) return lhs;
      }
    }
    return new Addition(lhs,rhs);
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
