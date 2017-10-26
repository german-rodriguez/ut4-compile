export class State {

  vars: Map<string, any>;

  constructor() {
    this.vars = new Map<string, any>();
  }

  toString(): string {
    return `{ ${Array.from(this.vars.entries()).map(([key, value]) => (`${key} = ${value}`)).join("; ")} }`;
  }

  get(id: string): any {
    return this.vars.get(id);
  }

  set(id: string, value: any) {
    this.vars.set(id, value);
  }
}
