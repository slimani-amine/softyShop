"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFeatures = exports.Keys = exports.concatenateTableAndFields = exports.parenthesesGenerator = exports.extractLongestKeys = exports.pagination = void 0;
const ts_morph_1 = require("ts-morph");
const sqlstring = require("sqlstring");
const exceptions_1 = require("../../core/errors/exceptions");
exports.pagination = {
    page: process.env.PAGE || 1,
    perPage: process.env.PERPAGE || 1,
};
function extractLongestKeys(arr) {
    const sortedKeys = arr.sort((a, b) => b.length - a.length);
    const longestKeys = new Set();
    for (const key of sortedKeys) {
        let longestKey = key;
        let included = false;
        for (const existingKey of longestKeys) {
            if (key.startsWith(existingKey + '.') || key === existingKey) {
                longestKey = key;
                longestKeys.delete(existingKey);
            }
            else if (existingKey.startsWith(key + '.')) {
                included = true;
                break;
            }
        }
        if (!included) {
            longestKeys.add(longestKey);
        }
    }
    return longestKeys;
}
exports.extractLongestKeys = extractLongestKeys;
const parenthesesGenerator = (num) => {
    return ')'.repeat(num);
};
exports.parenthesesGenerator = parenthesesGenerator;
const concatenateTableAndFields = (table, fields) => fields.map((field) => `${table}.${field}`).join();
exports.concatenateTableAndFields = concatenateTableAndFields;
const Keys = (interfaceName) => {
    const project = new ts_morph_1.Project();
    const sourceFile = project.addSourceFileAtPath(`./src/models/${interfaceName}Model.ts`);
    interfaceName = interfaceName.charAt(0).toUpperCase() + interfaceName.slice(1);
    const node = sourceFile.getInterface(interfaceName);
    const allKeysWithTypes = node.getProperties().map((p) => {
        const name = p.getName();
        const typeNode = p.getTypeNode();
        const type = typeNode ? typeNode.getText() : p.getType().getText();
        return [name, type];
    });
    return allKeysWithTypes;
};
exports.Keys = Keys;
class ApiFeatures {
    static generateMetaData(rowsPerPage, currentPage, totalRecords) {
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
    static searchDataParser(searchedData, searchableFields) {
        const parsedData = {};
        const regex = /([^:;]+):([^;]+)/g;
        let match;
        while ((match = regex.exec(searchedData.search)) !== null) {
            const [_, field, value] = match;
            if (!searchableFields[field]) {
                exceptions_1.exceptionService.notFoundException({
                    message: `Filter : "${field}" IS NOT AUTHORIZED`,
                });
            }
            parsedData[field] = value;
        }
        return parsedData;
    }
    static formatIn(columnAlias, column, value, negated) {
        const values = value
            .split(',')
            .map((el) => sqlstring.escape(el.trim()))
            .join(',');
        const operator = negated ? 'NOT IN' : 'IN';
        return `${columnAlias}.${column} ${operator} (${values})`;
    }
    static formatLikeInJoin(columnAlias, column, value) {
        return `${columnAlias}.${column} LIKE CONCAT('%', ${sqlstring.escape(value)}, '%')`;
    }
    static generateSqlCondition(primaryTable, fieldName, operator, value, joinInfo) {
        var _a, _b;
        const joinedFields = fieldName.split('.').slice(-2);
        const [table, column] = joinedFields;
        const columnAlias = (_b = (_a = joinInfo === null || joinInfo === void 0 ? void 0 : joinInfo[table]) === null || _a === void 0 ? void 0 : _a.tableAlias) !== null && _b !== void 0 ? _b : table;
        const formatBetween = (table, column, min, max) => {
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
    static generateJsonObject(tables, joinInfo) {
        var _a, _b;
        let isJsonArray = false;
        const objectProperties = tables.map((table, index) => {
            var _a, _b, _c, _d, _e;
            const tableAlias = (_b = (_a = joinInfo === null || joinInfo === void 0 ? void 0 : joinInfo[table]) === null || _a === void 0 ? void 0 : _a.tableAlias) !== null && _b !== void 0 ? _b : table;
            const properties = (_d = (_c = joinInfo === null || joinInfo === void 0 ? void 0 : joinInfo[table]) === null || _c === void 0 ? void 0 : _c.selectedFields) !== null && _d !== void 0 ? _d : (0, exports.Keys)(table);
            ((_e = joinInfo === null || joinInfo === void 0 ? void 0 : joinInfo[table]) === null || _e === void 0 ? void 0 : _e.foreignConditionField) ? (isJsonArray = true) : isJsonArray;
            let tableFields;
            if (properties.length > 0 && Array.isArray(properties[0])) {
                tableFields = properties
                    .map((field) => {
                    return `"${field[0]}", ${field[1].includes('Date')
                        ? `CONCAT(SUBSTRING(${tableAlias}.${field[0]}, 1, 23), 'Z')`
                        : `${tableAlias}.${field[0]}`} `;
                })
                    .join();
            }
            else {
                tableFields = properties
                    .map((field) => {
                    return `"${field}",${tableAlias}.${field}`;
                })
                    .join();
            }
            return index !== 0 ? `"${table}",JSON_OBJECT(${tableFields}` : tableFields;
        });
        return isJsonArray
            ? `JSON_ARRAYAGG(JSON_OBJECT(${objectProperties.join()}${(0, exports.parenthesesGenerator)(tables.length)}) AS ${tables[0]}`
            : `JSON_OBJECT(${objectProperties.join()}${(0, exports.parenthesesGenerator)(tables.length)} AS ${((_a = joinInfo === null || joinInfo === void 0 ? void 0 : joinInfo[tables[0]]) === null || _a === void 0 ? void 0 : _a.asTableAlias) ? (_b = joinInfo === null || joinInfo === void 0 ? void 0 : joinInfo[tables[0]]) === null || _b === void 0 ? void 0 : _b.tableAlias : tables[0]}`;
    }
    static generateJoinStatement(primaryTable, searchedField, joinInfo, defaultPopulate) {
        const joinTables = searchedField.includes('.')
            ? searchedField.split('.').slice(0, -1)
            : defaultPopulate
                ? [searchedField]
                : [];
        const joinStatements = joinTables.map((table, index) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            const tableAlias = ((_a = joinInfo === null || joinInfo === void 0 ? void 0 : joinInfo[table]) === null || _a === void 0 ? void 0 : _a.tableAlias)
                ? `${table} ${(_b = joinInfo === null || joinInfo === void 0 ? void 0 : joinInfo[table]) === null || _b === void 0 ? void 0 : _b.tableAlias}`
                : table;
            const conditionAlias = (_d = (_c = joinInfo === null || joinInfo === void 0 ? void 0 : joinInfo[table]) === null || _c === void 0 ? void 0 : _c.tableAlias) !== null && _d !== void 0 ? _d : table;
            const foreignTable = index === 0
                ? primaryTable
                : (_f = (_e = joinInfo === null || joinInfo === void 0 ? void 0 : joinInfo[joinTables[index - 1]]) === null || _e === void 0 ? void 0 : _e.tableAlias) !== null && _f !== void 0 ? _f : joinTables[index - 1];
            const conditionField = (_h = (_g = joinInfo === null || joinInfo === void 0 ? void 0 : joinInfo[table]) === null || _g === void 0 ? void 0 : _g.conditionField) !== null && _h !== void 0 ? _h : `${table}Id`;
            const joinType = (_j = joinInfo === null || joinInfo === void 0 ? void 0 : joinInfo.joinType) !== null && _j !== void 0 ? _j : 'LEFT JOIN';
            const foreignConditionField = (_l = (_k = joinInfo === null || joinInfo === void 0 ? void 0 : joinInfo[table]) === null || _k === void 0 ? void 0 : _k.foreignConditionField) !== null && _l !== void 0 ? _l : 'id';
            return `${joinType} ${tableAlias} ON ${conditionAlias}.${foreignConditionField} = ${foreignTable}.${conditionField}`;
        });
        return joinStatements.join(' ');
    }
    static generateSqlStatement(tableName, joinClause, whereSql, filterWhereSql, jsonObject, queryParams, pagination, apiOptions) {
        const deleted = !(apiOptions === null || apiOptions === void 0 ? void 0 : apiOptions.isDeleted)
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
        const toSelectFields = apiOptions.selectedFields && apiOptions.selectedFields.length > 0
            ? (0, exports.concatenateTableAndFields)(tableName, apiOptions.selectedFields)
            : `${tableName}.*`;
        return `SELECT ${toSelectFields}${apiOptions.isPaging ? `, COUNT(1) OVER() as count` : ''}${jsonObj.join() ? `, ${jsonObj.join()}` : ''} FROM ${tableName} ${joins.join(' ')}
         WHERE ${deleted} ${filterWhereSql ? `AND (${filterWhereSql})` : ''} ${whereSql ? `AND (${whereSql})` : ''} ${apiOptions.isGroupedById ? `GROUP BY ${tableName}.id` : ''} ${orderBy ? `ORDER BY ${orderBy} ${sortedBy}` : ''} ${apiOptions.isPaging ? `LIMIT ${pagination.perPage} OFFSET ${offset}` : ''}`;
    }
    static processSearchableField(tableName, value, join, jsonObject, key) {
        const joinStatement = this.generateJoinStatement(tableName, key, value.joinTables, value.defaultPopulate);
        if (joinStatement) {
            join.push(joinStatement);
        }
        const joinedTables = key.split('.').slice(0, -1);
        jsonObject.push(this.generateJsonObject(joinedTables, value.joinTables));
    }
    static orderFields(parsedFields, searchableFields) {
        const joinFields = [];
        for (const [key] of Object.entries(parsedFields)) {
            if (key.includes('.')) {
                joinFields.push(key.split('.').slice(0, -1).join('.'));
            }
        }
        for (const [key, value] of Object.entries(searchableFields)) {
            if (key.includes('.') && value.defaultPopulate) {
                joinFields.push(key.split('.').slice(0, -1).join('.'));
            }
        }
        return joinFields;
    }
    static groupSearchInfo(tableName, parsedData, searchableFields, defaultPopulated = true) {
        const filterWhereClause = [];
        const whereClause = [];
        const joinClause = [];
        const jsonObject = [];
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
            const fieldConditions = this.generateSqlCondition(tableName, key, operator, value, searchableFields[key].joinTables);
            if (fieldConditions) {
                if (filter) {
                    filterWhereClause.push(fieldConditions);
                }
                else {
                    whereClause.push(fieldConditions);
                }
            }
            if (!defaultPopulate && filteredObj.has(key.split('.').slice(0, -1).join('.'))) {
                this.processSearchableField(tableName, searchableFields[key], joinClause, jsonObject, key);
            }
        }
        return { whereClause, joinClause, jsonObject, filterWhereClause };
    }
    static async generateSqlQuery(dbConnection, tableName, queryParams, searchableFields, apiOptions = {}) {
        var _a, _b;
        apiOptions.isDeleted = (_a = apiOptions.isDeleted) !== null && _a !== void 0 ? _a : false;
        apiOptions.isPaging = queryParams.isPaging ? JSON.parse(queryParams.isPaging) : true;
        const parsedData = this.searchDataParser(queryParams, searchableFields);
        const { whereClause, joinClause, jsonObject, filterWhereClause } = this.groupSearchInfo(tableName, parsedData, searchableFields, apiOptions === null || apiOptions === void 0 ? void 0 : apiOptions.defaultPopulate);
        const page = parseInt(queryParams.page, 10) || Number(exports.pagination.page);
        const perPage = parseInt(queryParams.perPage, 10) || Number(exports.pagination.perPage);
        const sqlStatement = this.generateSqlStatement(tableName, joinClause, whereClause.join(` ${(_b = queryParams.searchJoin) !== null && _b !== void 0 ? _b : ' AND '} `), filterWhereClause.join(' AND '), jsonObject, queryParams, {
            page,
            perPage,
        }, apiOptions);
        const rows = await dbConnection.query(sqlStatement);
        const count = rows.length > 0 && apiOptions.isPaging ? rows[0].count : 0;
        const meta = apiOptions.isPaging ? this.generateMetaData(perPage, page, count) : false;
        return { docs: rows, meta };
    }
}
exports.ApiFeatures = ApiFeatures;
//# sourceMappingURL=apiFeatures.util.js.map