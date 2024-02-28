export interface IIdAsNumber {
  id: string;
  getIdAsNumber(): number;
}

export class NumberId {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
  getIdAsNumber(): number {
    const result = parseInt(this.id);
    if (isNaN(result)) {
      throw new Error('Id Error');
    }
    return result;
  }
}
