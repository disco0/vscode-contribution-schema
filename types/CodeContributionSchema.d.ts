import { JSONSchema, JSONSchemaType, JSONSchemaTypeName } from './JSONSchemaBase';
declare type ItemOrItems<T> = T | T[];
export declare type RestrictedSchemaDefintion = Omit<JSONSchema, '$ref' | '$schema' | '$id' | 'definitions'>;
export { RestrictedSchemaDefintion as JSONSchema };
export declare const ConfigurationSettingScopes: {
    /**
     * Settings that apply to all instances of VS Code and can only be configured in user settings.
     */
    application: string;
    /**
     * Machine specific settings that can be set in user or remote settings. For example, an installation path which shouldn't be shared across machines.
     */
    machine: string;
    /**
     * Machine specific settings that can be overridden by workspace or folder settings.
     */
    'machine-overridable': string;
    /**
     * Windows (instance) specific settings which can be configured in user, workspace, or remote settings.
     */
    window: string;
    /**
     * Resource settings, which apply to files and folders, and can be configured in all settings levels, even folder settings.
     */
    resource: string;
    /**
     * Resource settings that can be overridable at a language level.
     */
    'language-overridable': string;
};
export declare type Keys<T extends {
    [key: string]: string;
}> = keyof T;
export declare type ConfigurationSettingScope = Keys<typeof ConfigurationSettingScopes>;
export declare type ConfigurationSettingSchema = Omit<RestrictedSchemaDefintion, 'type'> & {
    /**
     * Your `description` appears after the title and before the input field, except for booleans, where the description is used as the label for the checkbox.
     *
     * ```json
     * {
     *   "gitMagic.blame.heatmap.enabled": {
     *     "description": "Specifies whether to provide a heatmap indicator in the gutter blame annotations"
     *   }
     * }
     * ```
     */
    description?: string;
    /**
     * If you use `markdownDescription` instead of `description`, your setting description will be rendered as Markdown in the settings UI.
     *
     * ```json
     * {
     *   "gitMagic.blame.dateFormat": {
     *     "markdownDescription": "Specifies how to format absolute dates (e.g. using the `${date}` token) in gutter blame annotations. See the [Moment.js docs](https://momentjs.com/docs/#/displaying/format/) for valid formats"
     *   }
     * }
     * ```
     */
    markdownDescription?: string;
    /**
     * Entries of type `number`, `string`, `boolean` can be edited directly in the Settings UI.
     * ```json
     * {
     *   "gitMagic.views.pageItemLimit": {
     *     "type": "number",
     *     "default": 20,
     *     "markdownDescription": "Specifies the number of items to show in each page when paginating a view list. Use 0 to specify no limit"
     *   }
     * }
     * ```
     * For `boolean` entries, the `description` (or `markdownDescription`) will be used as the label for the checkbox.
     * ```json
     * {
     *   "gitMagic.blame.compact": {
     *     "type": "boolean",
     *     "description": "Specifies whether to compact (deduplicate) matching adjacent gutter blame annotations"
     *   }
     * }
     * ```
     * Other types, such as `object` and `array`, aren't exposed directly in the settings UI, and can only be modified by editing the JSON directly. Instead of controls for editing them, users will see a link to `Edit in settings.json` as shown in the screenshot above.
     */
    type?: ItemOrItems<JSONSchemaTypeName>;
    /**
     * If you provide an array of items under the `enum` property, the settings UI will render a dropdown menu.
     * ![settings UI screenshot of dropdown](images/contribution-points/settings-ui-enum.png)
     * You can also provide an `enumDescriptions` property, or use `markdownEnumDescriptions`
     * and your descriptions will be rendered as markdown.
     */
    enum?: JSONSchemaType[];
    /**
     * Provides descriptive text rendered at the bottom of the enum dropdown:
     * ```json
     * {
     *   "gitMagic.blame.heatmap.location": {
     *     "type": "string",
     *     "default": "right",
     *     "enum": ["left", "right"],
     *     "enumDescriptions": [
     *       "Adds a heatmap indicator on the left edge of the gutter blame annotations",
     *       "Adds a heatmap indicator on the right edge of the gutter blame annotations"
     *     ]
     *   }
     * }
     * ```
     * You can also use `markdownEnumDescriptions`, and your descriptions will be rendered as markdown.
     */
    enumDescriptions?: string[];
    /**
     * Provides descriptive text rendered at the bottom of the enum dropdown:
     * ``` json
     * {
     *   "rangeBehavior": {
     *     "type": "number",
     *     "default": 3,
     *     "enum": [1, 2, 3, 4],
     *     "markdownEnumDescriptions": [
     *       "__ClosedClosed:__ The decoration's range will not widen when edits occur at the start of end.",
     *       "__ClosedOpen:__ The decoration's range will widen when edits occur at the end, but not at the start.",
     *       "__OpenClosed:__ The decoration's range will widen when edits occur at the start, but not at the end.",
     *       "__OpenOpen:__ The decoration's range will widen when edits occur at the start or end."
     *     ],
     *     "description": "Customize the growing behavior of the decoration when edits occur at the edges of the decoration's range."
     *   },
     * }
     * ```
     */
    markdownEnumDescriptions?: string[];
    /**
     * If you set `deprecationMessage`, or `markdownDeprecationMessage`, the setting will get a warning underline with your specified message. It won't show up in the settings UI unless it is configured by the user. If you set `markdownDeprecationMessage`, the markdown will not be rendered in the setting hover or the problems view. If you set both properties, `deprecationMessage` will be shown in the hover and the problems view, and `markdownDeprecationMessage` will be rendered as markdown in the settings UI.
     * Example:
     * ```json
     * {
     *   "json.colorDecorators.enable": {
     *     "type": "boolean",
     *     "description": "Enables or disables color decorators",
     *     "markdownDeprecationMessage": "**Deprecated**: Please use `#editor.colorDecorators#` instead.",
     *     "deprecationMessage": "Deprecated: Please use editor.colorDecorators instead."
     *   }
     * }
     * ```
     */
    depreciationMessage?: string;
    /**
     * If you set `deprecationMessage`, or `markdownDeprecationMessage`, the setting will get a warning underline with your specified message. It won't show up in the settings UI unless it is configured by the user. If you set `markdownDeprecationMessage`, the markdown will not be rendered in the setting hover or the problems view. If you set both properties, `deprecationMessage` will be shown in the hover and the problems view, and `markdownDeprecationMessage` will be rendered as markdown in the settings UI.
     * Example:
     * ```json
     * {
     *   "json.colorDecorators.enable": {
     *     "type": "boolean",
     *     "description": "Enables or disables color decorators",
     *     "markdownDeprecationMessage": "**Deprecated**: Please use `#editor.colorDecorators#` instead.",
     *     "deprecationMessage": "Deprecated: Please use editor.colorDecorators instead."
     *   }
     * }
     * ```
     */
    markdownDeprecationMessage?: string;
    /**
     * Tailored error message displayed when a pattern does not match.
     */
    patternErrorMessage?: string;
    /**
     * Configuration scopes determine when a setting is available to the user
     * through the Settings editor and whether the setting is applicable. If no
     * `scope` is declared, the default is `window`.
     */
    scope?: ConfigurationSettingScope;
};
/**
 * Configuration keys are defined using a superset of [JSONSchema](https://json-schema.org/understanding-json-schema/reference/index.html).
 */
export declare type ConfigurationSchema = JSONSchema & {
    /**
     * The `title` 1️⃣️ is the main heading that will be used for your configuration section. Normally you will only have one section for your extension.
     *
     * ```json
     * {
     *   "configuration": {
     *     "title": "GitMagic"
     *   }
     * }
     * ```
     *
     * The title should be the exact name of your extension. Words like "Extension", "Configuration", and "Settings" are redundant.
     *
     * - ✔ `"title": "GitMagic"`
     * - ❌ `"title": "GitMagic Extension"`
     * - ❌ `"title": "GitMagic Configuration"`
     * - ❌ `"title": "GitMagic Extension Configuration Settings"`
     */
    title?: string;
    /**
     * The `properties` 2️⃣ in your configuration will be a dictionary of configuration properties.
     *
     * In the Settings UI, your configuration key will be used to namespace and construct a title. Capital letters in your key are used to indicate word breaks. For example, if your key is `gitMagic.blame.dateFormat`, the generated title for the setting will look like this:
     */
    properties?: {
        [key: string]: ConfigurationSettingSchema;
    };
};
//# sourceMappingURL=CodeContributionSchema.d.ts.map