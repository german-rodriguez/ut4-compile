import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { Numeral, TruthValue } from './AST';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de usos de variable en expresiones.
*/
export class Variable extends Exp {
  id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  toString(): string {
    return `Variable(${this.id})`;
  }

  unparse(): string {
    return this.id;
  }

  evaluate(state: State): any {
    return state.get(this.id);
  }

  optimization(state: State): any{
      let v = state.get(this.id);
      if(typeof v == 'number') return new Numeral(v);
      if(typeof v == 'boolean') return new TruthValue(v);
      return this;
  }

  compileCIL(context: CompilationContext): CompilationContext {
    var n = context.getVar(this.id);
    if (n != -1){
      context.appendInstruction(`ldloc ${n.toString(16)}`);
    }
    else{
      throw "La variable no esta definida.";
    }
    return context;
  }

  maxStackIL(value: number): number {
    return value + 1;
  }
}
