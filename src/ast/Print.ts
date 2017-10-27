import { Exp, Stmt } from './ASTNode';
import { State } from '../interpreter/State';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de las asignaciones de valores a variables.
*/
export class Print implements Stmt {

  exp: Exp;

  constructor(exp: Exp) {
    this.exp = exp;
  }

  toString(): string {
    return `Print(${this.exp.toString()})`;
  }

  unparse(): string {
    return `print(${this.exp.unparse()});`;
  }

  evaluate (state: State): State{
    return state;
  }

  optimization(state: State): any{
    return this;
  }
  compileCIL(context: CompilationContext): CompilationContext {
    this.exp.compileCIL(context);
    context.appendInstruction("call void class [mscorlib]System.Console::WriteLine(int32)");
    return context;
  }

  maxStackIL(value: number): number {
    return this.exp.maxStackIL(value);
  }
}
