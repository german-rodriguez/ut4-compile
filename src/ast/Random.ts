import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de sumas.
*/
export class Random extends Exp {

  constructor() {
    super();
  }

  toString(): string {
    return `Random()`;
  }

  unparse(): string {
    return `random(;`;
  }

  evaluate(state: State): State{
    return state;
  }

  optimization(state: State): any{
    return this;
  }

  compileCIL(context: CompilationContext): CompilationContext {
    let rnd = Math.floor((Math.random()*100)+1);
    context.appendInstruction(`ldc.i4 0x${rnd.toString(16)}`);
    return context;
  }

  maxStackIL(value: number): number {
    return value + 1;
  }
}
