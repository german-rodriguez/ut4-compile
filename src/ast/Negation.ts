import { Exp } from './ASTNode';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de las negaciones de expresiones booleanas.
*/
export class Negation implements Exp {

  exp: Exp;

  constructor(exp: Exp) {
    this.exp = exp;
  }

  toString(): string {
    return `Negation(${this.exp.toString()})`;
  }

  unparse(): string {
    return `(!${this.exp.unparse()})`;
  }

  compileCIL(context: CompilationContext): CompilationContext {
    return undefined;
  }

  maxStackIL(value: number): number {
    return value;
  }
}
