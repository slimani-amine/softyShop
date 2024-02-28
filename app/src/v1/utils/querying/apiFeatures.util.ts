import { Project } from 'ts-morph';
import * as sqlstring from 'sqlstring';
import { exceptionService } from '../../core/errors/exceptions';
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
export const pagination = {
  page: process.env.PAGE || 1,
  perPage: process.env.PERPAGE || 1,
};
export function extractLongestKeys(arr: string[]): Set<string> {
  const sortedKeys = arr.sort((a, b) => b.length - a.length);
  // Example sortedKeys =[ "model.brand.rentableType","model.rentableType.brand","model.brand","model"]
  const longestKeys = new Set<string>();

  for (const key of sortedKeys) {
    let longestKey = key;
    let included = false;
    for (const existingKey of longestKeys) {
      if (key.startsWith(existingKey + '.') || key === existingKey) {
        longestKey = key;
        longestKeys.delete(existingKey);
      } else if (existingKey.startsWith(key + '.')) {
        included = true;
        break;
      }
    }

    if (!included) {
      longestKeys.add(longestKey);
    }
  }
  // Example longestKeys = ["model.brand.rentableType","model.rentableType.brand"]
  return longestKeys;
}
export const parenthesesGenerator = (num: number): string => {
  return ')'.repeat(num);
};
export const concatenateTableAndFields = (table: string, fields: string[]): string =>
  fields.map((field) => `${table}.${field}`).join();

export const Keys = (interfaceName: string): [string, string][] => {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(`./src/models/${interfaceName}Model.ts`);
  interfaceName = interfaceName.charAt(0).toUpperCase() + interfaceName.slice(1);

  const node = sourceFile.getInterface(interfaceName)!;

  const allKeysWithTypes = node.getProperties().map((p) => {
    const name = p.getName();
    const typeNode = p.getTypeNode();
    const type = typeNode ? typeNode.getText() : p.getType().getText();
    return [name, type] as [string, string];
  });

  return allKeysWithTypes;
};

export abstract class ApiFeatures {
  /**
     Generates metadata about the current page of records in a paginated query result set.
     *
     * @param rowsPerPage The number of rows per page.
     * @param currentPage The current page number.
     * @param totalRecords The total number of records in the result set.
     */
  private static generateMetaData(
    rowsPerPage: number,
    currentPage: number,
    totalRecords: number,
  ): MetaData {
    const totalPages = Math.ceil(Number(totalRecords) / rowsPerPage);
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    return {
      currentPage,
      prevPage,
      nextPage,
      totalPages,
      totalRecords: Number(totalRecords),
    };
  }

  /**
     Parses searched data into key-value pairs based on a regex pattern.
     @param searchedData The searched data containing fields and values.
     @param searchableFields The fields that can be searched.
     @throws {NotFoundError} If a field is not permitted to be searched.
     @returns An object containing key-value pairs of the searched data.
     */
  public static searchDataParser(
    searchedData: any,
    searchableFields: Record<string, SearchableFieldValue>,
  ): {
    [key: string]: string;
  } {
    const parsedData: { [key: string]: string } = {};
    const regex = /([^:;]+):([^;]+)/g;

    let match;
    while ((match = regex.exec(searchedData.search)) !== null) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, field, value] = match;
      if (!searchableFields[field]) {
        exceptionService.notFoundException({
          message: `Filter : "${field}" IS NOT AUTHORIZED`,
        });
      }
      parsedData[field] = value;
    }

    return parsedData;
  }

  private static formatIn(
    columnAlias: string,
    column: string,
    value: string,
    negated: boolean,
  ): string {
    const values = value
      .split(',')
      .map((el) => sqlstring.escape(el.trim()))
      .join(',');
    const operator = negated ? 'NOT IN' : 'IN';
    return `${columnAlias}.${column} ${operator} (${values})`;
  }

  private static formatLikeInJoin(columnAlias: string, column: string, value: string): string {
    return `${columnAlias}.${column} LIKE CONCAT('%', ${sqlstring.escape(value)}, '%')`;
  }

  /**
   * Generates an SQL condition based on the provided parameters.
   * @param primaryTable The primary table name.
   * @param fieldName The name of the field to compare.
   * @param operator The comparison operator.
   * @param value The value to compare against.
   * @returns An SQL condition string.
   */

  public static generateSqlCondition(
    primaryTable: string,
    fieldName: string,
    operator: string,
    value: string,
    joinInfo?: Record<string, JoinInfo>,
  ): string {
    const joinedFields = fieldName.split('.').slice(-2);
    const [table, column] = joinedFields;
    const columnAlias = joinInfo?.[table]?.tableAlias ?? table;
    const formatBetween = (table: string, column: string, min: string, max: string): string => {
      return `${table}.${column} BETWEEN ${min} AND ${max}`;
    };

    switch (operator) {
      case 'injoin':
        return this.formatIn(columnAlias, column, value, false);
      case 'notinjoin':
        return this.formatIn(columnAlias, column, value, true);
      case 'likeinjoin':
        return this.formatLikeInJoin(columnAlias, column, value);
      case 'eqinjoin':
        return `${columnAlias}.${column} = '${value}'`;
      case 'nullinjoin':
        return `${columnAlias}.${column} IS NULL`;
      case 'in':
        return this.formatIn(primaryTable, fieldName, value, false);
      case 'between':
        const [min, max] = value.split(',').map((val) => sqlstring.escape(val.trim()));
        return formatBetween(primaryTable, fieldName, min, max);
      case 'betweeninjoin':
        const [minVal, maxVal] = value.split(',').map((val) => sqlstring.escape(val.trim()));
        return formatBetween(columnAlias, column, minVal, maxVal);
      case 'gte':
        return `${primaryTable}.${fieldName} >= ${sqlstring.escape(value)}`;
      case 'gt':
        return `${primaryTable}.${fieldName} > ${sqlstring.escape(value)}`;
      case 'lte':
        return `${primaryTable}.${fieldName} <= ${sqlstring.escape(value)}`;
      case 'lt':
        return `${primaryTable}.${fieldName} < ${sqlstring.escape(value)}`;
      case 'diff':
        return `${primaryTable}.${fieldName} <> ${sqlstring.escape(value)}`;
      case 'eq':
        return `${primaryTable}.${fieldName} = ${sqlstring.escape(value)}`;
      case 'null':
        return `${primaryTable}.${fieldName} IS NULL`;
      default:
        return `${primaryTable}.${fieldName} LIKE ${sqlstring.escape('%' + value + '%')}`;
    }
  }

  /**
   * @param tables an array containing the names of the tables being processed.
   * @param searchableField An object of the tables information.
   * @returns A string.
   */

  private static generateJsonObject(tables: string[], joinInfo?: Record<string, JoinInfo>): string {
    let isJsonArray = false;
    // ==> loop through tables array and generate a JSON object for each table
    const objectProperties = tables.map((table: string, index: number) => {
      const tableAlias = joinInfo?.[table]?.tableAlias ?? table;
      const properties = joinInfo?.[table]?.selectedFields ?? Keys(table);
      joinInfo?.[table]?.foreignConditionField ? (isJsonArray = true) : isJsonArray;

      // Check the type of the first element in the properties array to decide how to process it
      let tableFields: string;

      if (properties.length > 0 && Array.isArray(properties[0])) {
        // Handle the case where properties is an array of arrays
        tableFields = properties
          .map((field: string | string[]) => {
            return `"${field[0]}", ${
              field[1].includes('Date')
                ? `CONCAT(SUBSTRING(${tableAlias}.${field[0]}, 1, 23), 'Z')`
                : `${tableAlias}.${field[0]}`
            } `;
          })
          .join();
      } else {
        // Handle the case where properties is an array of strings
        tableFields = properties
          .map((field: string | string[]) => {
            return `"${field}",${tableAlias}.${field}`;
          })
          .join();
      }

      // ==> JSON_OBJECT("id",rentableType.id,"name",rentableType.name,"description",rentableType.description) AS rentableType
      return index !== 0 ? `"${table}",JSON_OBJECT(${tableFields}` : tableFields;
    });
    // combine the JSON objects into one JSON object using the table name as the key and the JSON object as the value except for the first table in the array
    return isJsonArray
      ? `JSON_ARRAYAGG(JSON_OBJECT(${objectProperties.join()}${parenthesesGenerator(
          tables.length,
        )}) AS ${tables[0]}`
      : `JSON_OBJECT(${objectProperties.join()}${parenthesesGenerator(tables.length)} AS ${
          joinInfo?.[tables[0]]?.asTableAlias ? joinInfo?.[tables[0]]?.tableAlias : tables[0]
        }`;
    // ==> JSON_OBJECT("id",class.id,"name",class.name,"description",class.description,"rentableType",JSON_OBJECT("id",rentableType.id,"name",rentableType.name,"description",rentableType.description,"model",JSON_OBJECT("id",model.id,"name",model.name,"description",model.description))) AS class
  }

  /**
   * Generate a join statement string based on the given searched field and join tables info.
   * @param primaryTable The name of the table to query.
   * @param searchedField A string containing the searched field.
   * @param joinInfo An object containing the join tables.
   * @returns A join statement string.
   */

  public static generateJoinStatement(
    primaryTable: string,
    searchedField: string,
    joinInfo?: Record<string, JoinInfo>,
    defaultPopulate?: boolean,
  ): string | undefined {
    // Split the searched field on dots to identify the necessary join tables. If the searched field does not contain dots but the `defaultPopulate` is true, the searched field is used as a single join table.

    const joinTables: string[] = searchedField.includes('.')
      ? searchedField.split('.').slice(0, -1)
      : defaultPopulate
        ? [searchedField]
        : [];
    const joinStatements = joinTables.map((table: string, index: number) => {
      // Generate a join statement for each join table, using the table alias and join condition provided in the `joinInfo` object, or defaults to using the table name and "id" field.

      const tableAlias = joinInfo?.[table]?.tableAlias
        ? `${table} ${joinInfo?.[table]?.tableAlias}`
        : table;
      const conditionAlias = joinInfo?.[table]?.tableAlias ?? table;
      const foreignTable =
        index === 0
          ? primaryTable
          : joinInfo?.[joinTables[index - 1]]?.tableAlias ?? joinTables[index - 1];
      const conditionField = joinInfo?.[table]?.conditionField ?? `${table}Id`;
      const joinType = joinInfo?.joinType ?? 'LEFT JOIN';
      const foreignConditionField = joinInfo?.[table]?.foreignConditionField ?? 'id';

      // Concatenate join statements as a single string, with the specified join type, or defaults to a "LEFT JOIN" if not specified.

      return `${joinType} ${tableAlias} ON ${conditionAlias}.${foreignConditionField} = ${foreignTable}.${conditionField}`;
    });

    return joinStatements.join(' ');
  }

  public static generateSqlStatement(
    tableName: string,
    joinClause: string[],
    whereSql: string,
    filterWhereSql: string,
    jsonObject: string[],
    queryParams: any,
    pagination: Pagination,
    apiOptions: ApiOptions,
  ) {
    const deleted = !apiOptions?.isDeleted
      ? `${tableName}.deletedAt IS NULL`
      : `${tableName}.deletedAt IS NOT NULL`;

    const joins = [...new Set(joinClause)];
    const jsonObj = [...new Set(jsonObject)];

    const orderBy = queryParams.orderBy
      ? queryParams.orderBy.includes('.')
        ? queryParams.orderBy
        : `${tableName}.${queryParams.orderBy}`
      : '';
    const sortedBy = queryParams.sortedBy || 'ASC';
    const offset = (pagination.page - 1) * pagination.perPage;
    const toSelectFields =
      apiOptions.selectedFields && apiOptions.selectedFields.length > 0
        ? concatenateTableAndFields(tableName, apiOptions.selectedFields)
        : `${tableName}.*`;

    return `SELECT ${toSelectFields}${apiOptions.isPaging ? `, COUNT(1) OVER() as count` : ''}${
      jsonObj.join() ? `, ${jsonObj.join()}` : ''
    } FROM ${tableName} ${joins.join(' ')}
         WHERE ${deleted} ${filterWhereSql ? `AND (${filterWhereSql})` : ''} ${
           whereSql ? `AND (${whereSql})` : ''
         } ${apiOptions.isGroupedById ? `GROUP BY ${tableName}.id` : ''} ${
           orderBy ? `ORDER BY ${orderBy} ${sortedBy}` : ''
         } ${apiOptions.isPaging ? `LIMIT ${pagination.perPage} OFFSET ${offset}` : ''}`;
  }

  /**
   * Processes a searchable field.
   *
   * @param tableName The name of the table being queried.
   * @param searchableFields An object containing the searchable fields and their configurations.
   * @param join An array of join statements that will be added to the query.
   * @param jsonObject An array of JSON objects strings that will be used to generate the query's SELECT statement.
   * @param key The name of the searchable field being processed.
   */
  public static processSearchableField(
    tableName: string,
    value: SearchableFieldValue,
    join: string[],
    jsonObject: string[],
    key: string,
  ) {
    const joinStatement = this.generateJoinStatement(
      tableName,
      key,
      value.joinTables,
      value.defaultPopulate,
    );
    if (joinStatement) {
      join.push(joinStatement);
    }
    const joinedTables = key.split('.').slice(0, -1);
    jsonObject.push(this.generateJsonObject(joinedTables, value.joinTables));
  }

  public static orderFields(
    parsedFields: Record<string, string>,
    searchableFields: Record<string, SearchableFieldValue>,
  ): string[] {
    const joinFields = [];
    for (const [key] of Object.entries(parsedFields)) {
      // If the searchedField contains a dot, add the table name to the joinFields array.
      if (key.includes('.')) {
        joinFields.push(key.split('.').slice(0, -1).join('.'));
      }
    }
    for (const [key, value] of Object.entries(searchableFields)) {
      // If the searchableField contains a dot and has the defaultPopulate property set to true, add the table name to the joinFields array.
      if (key.includes('.') && value.defaultPopulate) {
        joinFields.push(key.split('.').slice(0, -1).join('.'));
      }
    }
    return joinFields;
  }

  public static groupSearchInfo(
    tableName: string,
    parsedData: Record<string, string>,
    searchableFields: Record<string, SearchableFieldValue>,
    defaultPopulated: boolean = true,
  ) {
    const filterWhereClause: string[] = [];
    const whereClause: string[] = [];
    const joinClause: string[] = [];
    const jsonObject: string[] = [];
    const joinFields = this.orderFields(parsedData, searchableFields);
    const filteredObj = extractLongestKeys(joinFields);
    if (defaultPopulated) {
      for (const [key, value] of Object.entries(searchableFields)) {
        if (value.defaultPopulate) {
          filteredObj.has(key.split('.').slice(0, -1).join('.')) &&
            this.processSearchableField(tableName, value, joinClause, jsonObject, key);
        }
      }
    }

    for (const [key, value] of Object.entries(parsedData)) {
      const { operator, defaultPopulate, filter } = searchableFields[key];
      const fieldConditions = this.generateSqlCondition(
        tableName,
        key,
        operator,
        value,
        searchableFields[key].joinTables,
      );

      if (fieldConditions) {
        if (filter) {
          filterWhereClause.push(fieldConditions);
        } else {
          whereClause.push(fieldConditions);
        }
      }

      if (!defaultPopulate && filteredObj.has(key.split('.').slice(0, -1).join('.'))) {
        this.processSearchableField(tableName, searchableFields[key], joinClause, jsonObject, key);
      }
    }
    return { whereClause, joinClause, jsonObject, filterWhereClause };
  }

  /**
   * Generate a SQL query string based on the given search data and searchable fields.
   * @param tableName The name of the table to query.
   * @param queryParams A string containing the search criteria.
   * @param searchableFields An object containing the searchable fields and their configurations.
   * @returns A SQL query string.
   */

  public static async generateSqlQuery(
    dbConnection: DataSource,
    tableName: string,
    queryParams: Record<string, string>,
    searchableFields: Record<string, SearchableFieldValue>,
    apiOptions: ApiOptions = {},
  ): Promise<any> {
    apiOptions.isDeleted = apiOptions.isDeleted ?? false;
    apiOptions.isPaging = queryParams.isPaging ? JSON.parse(queryParams.isPaging) : true;
    const parsedData = this.searchDataParser(queryParams, searchableFields);
    const { whereClause, joinClause, jsonObject, filterWhereClause } = this.groupSearchInfo(
      tableName,
      parsedData,
      searchableFields,
      apiOptions?.defaultPopulate,
    );
    const page = parseInt(queryParams.page, 10) || Number(pagination.page);
    const perPage = parseInt(queryParams.perPage, 10) || Number(pagination.perPage);
    const sqlStatement = this.generateSqlStatement(
      tableName,
      joinClause,
      whereClause.join(` ${queryParams.searchJoin ?? ' AND '} `),
      filterWhereClause.join(' AND '),
      jsonObject,
      queryParams,
      {
        page,
        perPage,
      },
      apiOptions,
    );
    const rows: any = await dbConnection.query(sqlStatement);
    const count = rows.length > 0 && apiOptions.isPaging ? rows[0].count : 0;
    const meta = apiOptions.isPaging ? this.generateMetaData(perPage, page, count) : false;
    return { docs: rows, meta };
  }
}
