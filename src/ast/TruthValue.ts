import { Exp } from './ASTNode';
import { State } from '../interpreter/State';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de valores de verdad (cierto o falso).
*/
export class TruthValue extends Exp {

  value: boolean;

  constructor(value: boolean) {
    super();
    this.value = value;
  }

  toString(): string {
    return `TruthValue(${this.value})`;
  }

  unparse(): string {
    return this.value ? "true" : "false";
  }

  evaluate(state: State): any {
    return this.value;
  }

  compileCIL(context: CompilationContext): CompilationContext {
    if(this.value) context.appendInstruction('ldc.i4.1');
    else context.appendInstruction('ldc.i4.0');
    return context;
  }

  maxStackIL(value: number): number {
    return value + 1;
  }
}
