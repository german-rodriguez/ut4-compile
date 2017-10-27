import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de constantes numéricas o numerales.
*/
export class Numeral extends Exp {

  value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }

  toString(): string {
    return `Numeral(${this.value})`;
  }

  unparse(): string {
    return `${this.value}`;
  }

  compileCIL(context: CompilationContext): CompilationContext {
    var str = `ldc.i4 0x${this.value.toString(16)}`;
    context.appendInstruction(str);
    return context;
  }

  evaluate(state: State): any{
    return this.value;
  }

  optimization(state: State): any{
    return this;
  }
  
  maxStackIL(value: number): number {
    return value + 1;
  }
}
