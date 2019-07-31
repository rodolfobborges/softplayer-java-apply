import { Moment } from 'moment';

export interface IPeople {
  id?: number;
  name?: string;
  sex?: string;
  email?: string;
  birthDate?: Moment;
  birthPlace?: string;
  nationality?: string;
  cpf?: string;
}

export class People implements IPeople {
  constructor(
    public id?: number,
    public name?: string,
    public sex?: string,
    public email?: string,
    public birthDate?: Moment,
    public birthPlace?: string,
    public nationality?: string,
    public cpf?: string
  ) {}
}
