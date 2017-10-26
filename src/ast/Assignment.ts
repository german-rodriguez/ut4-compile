import { Exp, Stmt } from './ASTNode';
import { CompilationContext } from '../compileCIL/CompilationContext';

/**
  Representación de las asignaciones de valores a variables.
*/
export class Assignment implements Stmt {

  id: string;
  exp: Exp;

  constructor(id: string, exp: Exp) {
    this.id = id;
    this.exp = exp;
  }

  toString(): string {
    return `Assignment(${this.id}, ${this.exp.toString()})`;
  }

  unparse(): string {
    return `${this.id} = ${this.exp.unparse()}`;
  }

  evaluate(state: State): State {
    state.set(this.id,this.exp.evaluate(state));
    return state;
  }
  
  compileCIL(context: CompilationContext): CompilationContext {
    context = this.exp.compileCIL(context);
    var str = '';
    var n = context.getVar(this.id);
    if(n != -1){
      str = `stloc ${n.toString(16)}`;
    } else {
      str = `stloc ${context.addVar(this.id,'int32')}`;
    }
    context.appendInstruction(str);
    return context;
  }

  maxStackIL(value: number): number {
    return this.exp.maxStackIL(value);
  }
}
