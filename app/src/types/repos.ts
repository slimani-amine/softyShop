import { FindOperator as FindOperatorOrm } from 'typeorm';

export type WhereType<T> = Partial<{ [key in keyof T]: string }>;
export type RelationsType<T> = Partial<{
  [key in keyof T]: boolean | Partial<RelationsType<T>>;
}>;
export enum PossibleOrders {
  'DESC' = 'DESC',
  'ASC' = 'ASC',
}
export type PossibleRelations = {
  projects: boolean;
  resetPasswords: boolean;
};
export type OrderType<T> = Partial<{
  [key in keyof T]: PossibleOrders;
}>;
export type FindOptionsSelect<Entity> = {
  [P in keyof Entity]?: P extends 'toString'
    ? unknown
    : FindOptionsSelectProperty<NonNullable<Entity[P]>>;
};

export type FindOptionsSelectProperty<Property> = Property extends Promise<infer I>
  ? FindOptionsSelectProperty<I> | boolean
  : Property extends Array<infer I>
    ? FindOptionsSelectProperty<I> | boolean
    : Property extends string
      ? boolean
      : Property extends number
        ? boolean
        : Property extends boolean
          ? boolean
          : Property extends Buffer
            ? boolean
            : Property extends Date
              ? boolean
              : Property extends object
                ? FindOptionsSelect<Property>
                : boolean;
export type FindOptionsSelectByString<Entity> = (keyof Entity)[];
export type FindOptionsWhere<Entity> = {
  [P in keyof Entity]?: P extends 'toString'
    ? unknown
    : FindOptionsWhereProperty<NonNullable<Entity[P]>>;
};
export type WhereEntityOptions<Entity> = FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[];
export type FindOptionsWhereProperty<
  PropertyToBeNarrowed,
  Property = PropertyToBeNarrowed,
> = PropertyToBeNarrowed extends Promise<infer I>
  ? FindOptionsWhereProperty<NonNullable<I>>
  : PropertyToBeNarrowed extends Array<infer I>
    ? FindOptionsWhereProperty<NonNullable<I>>
    : PropertyToBeNarrowed extends Buffer
      ? Property | FindOperator<Property>
      : PropertyToBeNarrowed extends Date
        ? Property | FindOperator<Property>
        : PropertyToBeNarrowed extends string
          ? Property | FindOperator<Property>
          : PropertyToBeNarrowed extends number
            ? Property | FindOperator<Property>
            : PropertyToBeNarrowed extends boolean
              ? Property | FindOperator<Property>
              : PropertyToBeNarrowed extends object
                ?
                    | FindOptionsWhere<Property>
                    | FindOptionsWhere<Property>[]
                    | EqualOperator<Property>
                    | FindOperator<any>
                    | boolean
                : Property | FindOperator<Property>;

export type FindOptionsWherePropertyNoObject<PropertyToBeNarrowed> =
  PropertyToBeNarrowed extends Promise<infer I>
    ? FindOptionsWhereProperty<NonNullable<I>>
    : PropertyToBeNarrowed extends Array<infer I>
      ? FindOptionsWhereProperty<NonNullable<I>>
      : PropertyToBeNarrowed extends infer I
        ? I
        : never;

export type FindOptionsRelations<Entity> = {
  [P in keyof Entity]?: P extends 'toString'
    ? unknown
    : FindOptionsRelationsProperty<NonNullable<Entity[P]>>;
};
export type FindOptionsRelationsProperty<Property> = Property extends Promise<infer I>
  ? FindOptionsRelationsProperty<NonNullable<I>> | boolean
  : Property extends Array<infer I>
    ? FindOptionsRelationsProperty<NonNullable<I>> | boolean
    : Property extends string
      ? never
      : Property extends number
        ? never
        : Property extends boolean
          ? never
          : Property extends Buffer
            ? never
            : Property extends Date
              ? never
              : Property extends object
                ? FindOptionsRelations<Property> | boolean
                : boolean;
export type FindOptionsOrder<Entity> = {
  [P in keyof Entity]?: P extends 'toString'
    ? unknown
    : FindOptionsOrderProperty<NonNullable<Entity[P]>>;
};
export type FindOptionsOrderValue =
  | 'ASC'
  | 'DESC'
  | 'asc'
  | 'desc'
  | 1
  | -1
  | {
      direction?: 'asc' | 'desc' | 'ASC' | 'DESC';
      nulls?: 'first' | 'last' | 'FIRST' | 'LAST';
    };

export type FindOptionsOrderProperty<Property> = Property extends Promise<infer I>
  ? FindOptionsOrderProperty<NonNullable<I>>
  : Property extends Array<infer I>
    ? FindOptionsOrderProperty<NonNullable<I>>
    : Property extends string
      ? FindOptionsOrderValue
      : Property extends number
        ? FindOptionsOrderValue
        : Property extends boolean
          ? FindOptionsOrderValue
          : Property extends Buffer
            ? FindOptionsOrderValue
            : Property extends Date
              ? FindOptionsOrderValue
              : Property extends object
                ? FindOptionsOrder<Property> | FindOptionsOrderValue
                : FindOptionsOrderValue;

export type findManyType<Entity> = {
  select?: FindOptionsSelect<Entity> | FindOptionsSelectByString<Entity>;
  where?: FindOptionsWhere<Entity>[] | FindOptionsWhere<Entity>;
  relations?: FindOptionsRelations<Entity>;
  order?: FindOptionsOrder<Entity>;
  take?: number;
  skip?: number;
};
export interface ObjectLiteral {
  [key: string]: any;
}

export type QueryDeepPartialEntity<T> = _QueryDeepPartialEntity<
  ObjectLiteral extends T ? unknown : T
>;
type _QueryDeepPartialEntity<T> = {
  [P in keyof T]?:
    | (T[P] extends Array<infer U>
        ? Array<_QueryDeepPartialEntity<U>>
        : T[P] extends ReadonlyArray<infer U>
          ? ReadonlyArray<_QueryDeepPartialEntity<U>>
          : _QueryDeepPartialEntity<T[P]>)
    | (() => string);
};
export type QueryPartialEntity<T> = {
  [P in keyof T]?: T[P] | (() => string);
};
export type PartialEntityUpdate<T> = {
  [P in keyof T]?: T[P] extends (...any) => any ? never : T[P] extends object ? never : T[P];
};

/**
 * Find Operator used in Find Conditions.
 */
export class FindOperator<T> extends FindOperatorOrm<T> {}
export type FindOperatorType =
  | 'not'
  | 'lessThan'
  | 'lessThanOrEqual'
  | 'moreThan'
  | 'moreThanOrEqual'
  | 'equal'
  | 'between'
  | 'in'
  | 'any'
  | 'isNull'
  | 'ilike'
  | 'like'
  | 'raw'
  | 'arrayContains'
  | 'arrayContainedBy'
  | 'arrayOverlap'
  | 'and'
  | 'jsonContains';
export interface ValueTransformer {
  /**
   * Used to marshal data when writing to the database.
   */
  to(value: any): any;
  /**
   * Used to unmarshal data when reading from the database.
   */
  from(value: any): any;
}
export declare class EqualOperator<T> extends FindOperator<T> {
  readonly '@instanceof': symbol;
  constructor(value: T | FindOperator<T>);
}
