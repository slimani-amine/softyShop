import { DataSource } from 'typeorm';
export interface QueryResult<T> {
    docs: T[];
    meta: MetaData;
}
export interface ApiOptions {
    isDeleted?: boolean;
    isPaging?: boolean;
    selectedFields?: string[];
    defaultPopulate?: boolean;
    isGroupedById?: boolean;
}
export interface JoinInfo {
    selectedFields?: string[];
    conditionField?: string;
    joinType?: string;
    tableAlias?: string;
    foreignTable?: string;
    foreignConditionField?: string;
    asTableAlias?: boolean;
}
export interface MetaData {
    currentPage: number;
    prevPage: number | null;
    nextPage: number | null;
    totalPages: number;
    totalRecords: number;
}
export interface Pagination {
    page: number;
    perPage: number;
}
export interface SearchableFieldValue {
    operator: string;
    defaultPopulate?: boolean;
    joinTables?: Record<string, JoinInfo>;
    filter?: boolean;
}
export declare const pagination: {
    page: string | number;
    perPage: string | number;
};
export declare function extractLongestKeys(arr: string[]): Set<string>;
export declare const parenthesesGenerator: (num: number) => string;
export declare const concatenateTableAndFields: (table: string, fields: string[]) => string;
export declare const Keys: (interfaceName: string) => [string, string][];
export declare abstract class ApiFeatures {
    private static generateMetaData;
    static searchDataParser(searchedData: any, searchableFields: Record<string, SearchableFieldValue>): {
        [key: string]: string;
    };
    private static formatIn;
    private static formatLikeInJoin;
    static generateSqlCondition(primaryTable: string, fieldName: string, operator: string, value: string, joinInfo?: Record<string, JoinInfo>): string;
    private static generateJsonObject;
    static generateJoinStatement(primaryTable: string, searchedField: string, joinInfo?: Record<string, JoinInfo>, defaultPopulate?: boolean): string | undefined;
    static generateSqlStatement(tableName: string, joinClause: string[], whereSql: string, filterWhereSql: string, jsonObject: string[], queryParams: any, pagination: Pagination, apiOptions: ApiOptions): string;
    static processSearchableField(tableName: string, value: SearchableFieldValue, join: string[], jsonObject: string[], key: string): void;
    static orderFields(parsedFields: Record<string, string>, searchableFields: Record<string, SearchableFieldValue>): string[];
    static groupSearchInfo(tableName: string, parsedData: Record<string, string>, searchableFields: Record<string, SearchableFieldValue>, defaultPopulated?: boolean): {
        whereClause: string[];
        joinClause: string[];
        jsonObject: string[];
        filterWhereClause: string[];
    };
    static generateSqlQuery(dbConnection: DataSource, tableName: string, queryParams: Record<string, string>, searchableFields: Record<string, SearchableFieldValue>, apiOptions?: ApiOptions): Promise<any>;
}
