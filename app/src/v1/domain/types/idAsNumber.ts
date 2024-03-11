export interface IIdAsNumber {
  id: string;
  getIdAsNumber(): string;
}

export class NumberId {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
  getIdAsNumber(): string {
    const result = this.id;
    if (!result) {
      throw new Error("Id Error");
    }
    return result;
  }
}
