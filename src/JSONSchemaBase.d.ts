//#region JSONSchema Base

/*
 * Modification of JSON Schema version 7 From @types/json-schema
 * Removes properties currently illegal in configuration schemas
 */

/**
 * Primitive type
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1.1
 */
export declare type JSONSchemaTypeName =
    | 'string'
    | 'number'
    | 'integer'
    | 'boolean'
    | 'object'
    | 'array'
    | 'null';

/**
 * Primitive type
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1.1
 */
export declare type JSONSchemaType =
    | string
    | number
    | boolean
    | JSONSchemaArray
    | JSONSchemaObject
    | null;

// Workaround for infinite type recursion
export declare interface JSONSchemaObject {
    [key: string]: JSONSchemaType;
}

// Workaround for infinite type recursion
// https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128553540
export declare interface JSONSchemaArray extends Array<JSONSchemaType> {}
/**
 * Meta schema
 *
 * Recommended values:
 * - 'http://json-schema.org/schema#'
 * - 'http://json-schema.org/hyper-schema#'
 * - 'http://json-schema.org/draft-07/schema#'
 * - 'http://json-schema.org/draft-07/hyper-schema#'
 *
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-5
 */
export type JSONSchemaVersion = string;

/**
 * JSON Schema v7
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01
 */
export type JSONSchemaDefinition = JSONSchema | boolean;

export interface JSONSchema {
    // $schema?: JSONSchemaVersion;
    // $comment?: string;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1
     */
    type?: JSONSchemaTypeName | JSONSchemaTypeName[];
    enum?: JSONSchemaType[];
    const?: JSONSchemaType;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.2
     */
    multipleOf?: number;
    maximum?: number;
    exclusiveMaximum?: number;
    minimum?: number;
    exclusiveMinimum?: number;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.3
     */
    maxLength?: number;
    minLength?: number;
    pattern?: string;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.4
     */
    items?: JSONSchemaDefinition | JSONSchemaDefinition[];
    additionalItems?: JSONSchemaDefinition;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    contains?: JSONSchema;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.5
     */
    maxProperties?: number;
    minProperties?: number;
    required?: string[];
    properties?: {
        [key: string]: JSONSchemaDefinition;
    };
    patternProperties?: {
        [key: string]: JSONSchemaDefinition;
    };
    additionalProperties?: JSONSchemaDefinition;
    dependencies?: {
        [key: string]: JSONSchemaDefinition | string[];
    };
    propertyNames?: JSONSchemaDefinition;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.6
     */
    if?: JSONSchemaDefinition;
    then?: JSONSchemaDefinition;
    else?: JSONSchemaDefinition;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.7
     */
    allOf?: JSONSchemaDefinition[];
    anyOf?: JSONSchemaDefinition[];
    oneOf?: JSONSchemaDefinition[];
    not?: JSONSchemaDefinition;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-7
     */
    format?: string;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-8
     */
    contentMediaType?: string;
    contentEncoding?: string;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-9
     */
    // definitions?: {
    //     [key: string]: JSONSchemaDefinition;
    // };

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-10
     */
    title?: string;
    description?: string;
    default?: JSONSchemaType;
    readOnly?: boolean;
    writeOnly?: boolean;
    examples?: JSONSchemaType;
}
 
//#endregion JSONSchema Base