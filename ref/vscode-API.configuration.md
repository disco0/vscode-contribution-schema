---
# DO NOT TOUCH — Managed by doc writer
ContentId: 2F27A240-8E36-4CC2-973C-9A1D8069F83F
DateApproved: 6/10/2020

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: To extend Visual Studio Code, your extension (plug-in) declares which of the various Contribution Points it is using in its package.json Extension Manifest file.
---

# Contribution Points

**Contribution Points** are a set of JSON declarations that you make in the `contributes` field of the `package.json` [Extension Manifest](/api/references/extension-manifest). Your extension registers **Contribution Points** to extend various functionalities within Visual Studio Code. Here is a list of all available **Contribution Points**:

- [`configuration`](/api/references/contribution-points#contributes.configuration)
- [`configurationDefaults`](/api/references/contribution-points#contributes.configurationDefaults)
- [`commands`](/api/references/contribution-points#contributes.commands)
- [`menus`](/api/references/contribution-points#contributes.menus)
- [`keybindings`](/api/references/contribution-points#contributes.keybindings)
- [`languages`](/api/references/contribution-points#contributes.languages)
- [`debuggers`](/api/references/contribution-points#contributes.debuggers)
- [`breakpoints`](/api/references/contribution-points#contributes.breakpoints)
- [`grammars`](/api/references/contribution-points#contributes.grammars)
- [`themes`](/api/references/contribution-points#contributes.themes)
- [`iconThemes`](/api/references/contribution-points#contributes.iconThemes)
- [`productIconThemes`](/api/references/contribution-points#contributes.productIconThemes)
- [`snippets`](/api/references/contribution-points#contributes.snippets)
- [`jsonValidation`](/api/references/contribution-points#contributes.jsonValidation)
- [`views`](/api/references/contribution-points#contributes.views)
- [`viewsContainers`](/api/references/contribution-points#contributes.viewsContainers)
- [`problemMatchers`](/api/references/contribution-points#contributes.problemMatchers)
- [`problemPatterns`](/api/references/contribution-points#contributes.problemPatterns)
- [`taskDefinitions`](/api/references/contribution-points#contributes.taskDefinitions)
- [`colors`](/api/references/contribution-points#contributes.colors)
- [`typescriptServerPlugins`](/api/references/contribution-points#contributes.typescriptServerPlugins)
- [`resourceLabelFormatters`](/api/references/contribution-points#contributes.resourceLabelFormatters)

## contributes.configuration

Contribute configuration keys that will be exposed to the user. The user will be able to set these configuration options as User Settings or as Workspace Settings, either by using the Settings UI or by editing the JSON settings file directly.

### Configuration example

```json
{
  "contributes": {
    "configuration": {
      "title": "TypeScript",
      "properties": {
        "typescript.useCodeSnippetsOnMethodSuggest": {
          "type": "boolean",
          "default": false,
          "description": "Complete functions with their parameter signature."
        },
        "typescript.tsdk": {
          "type": ["string", "null"],
          "default": null,
          "description": "Specifies the folder path containing the tsserver and lib*.d.ts files to use."
        }
      }
    }
  }
}
```

![configuration extension point example](images/contribution-points/configuration.png)

You can read these values from your extension using `vscode.workspace.getConfiguration('myExtension')`.

### Configuration schema

Your configuration entry is used both to provide intellisense when editing your settings in the JSON editor, and to define the way they appear in the settings UI.

![settings UI screenshot with numbers](images/contribution-points/settings-ui.png)

**title**

The `title` 1️⃣️ is the main heading that will be used for your configuration section. Normally you will only have one section for your extension.

```json
{
  "configuration": {
    "title": "GitMagic"
  }
}
```

The title should be the exact name of your extension. Words like "Extension", "Configuration", and "Settings" are redundant.

- ✔ `"title": "GitMagic"`
- ❌ `"title": "GitMagic Extension"`
- ❌ `"title": "GitMagic Configuration"`
- ❌ `"title": "GitMagic Extension Configuration Settings"`

**properties**

The `properties` 2️⃣ in your configuration will be a dictionary of configuration properties.

In the Settings UI, your configuration key will be used to namespace and construct a title. Capital letters in your key are used to indicate word breaks. For example, if your key is `gitMagic.blame.dateFormat`, the generated title for the setting will look like this:

> Blame: **Date Format**

Entries will be grouped according to the hierarchy established in your keys. So for example, these entries

```
gitMagic.blame.dateFormat
gitMagic.blame.format
gitMagic.blame.heatMap.enabled
gitMagic.blame.heatMap.location
```

will appear in a single group like this:

> Blame: **Date Format**
>
> Blame: **Format**
>
> Blame › Heatmap: **Enabled**
>
> Blame › Heatmap: **Location**

Otherwise, properties appear in alphabetical order (**not** the order in which they're listed in the manifest).

### Configuration property schema

Configuration keys are defined using a superset of [JSON
Schema](https://json-schema.org/understanding-json-schema/reference/index.html).

**description** / **markdownDescription**

Your `description` 3️⃣ appears after the title and before the input field, except for booleans, where the description is used as the label for the checkbox. 6️⃣

```json
{
  "gitMagic.blame.heatmap.enabled": {
    "description": "Specifies whether to provide a heatmap indicator in the gutter blame annotations"
  }
}
```

If you use `markdownDescription` instead of `description`, your setting description will be rendered as Markdown in the settings UI.

```json
{
  "gitMagic.blame.dateFormat": {
    "markdownDescription": "Specifies how to format absolute dates (e.g. using the `${date}` token) in gutter blame annotations. See the [Moment.js docs](https://momentjs.com/docs/#/displaying/format/) for valid formats"
  }
}
```

**type**

Entries of type `number` 4️⃣ , `string` 5️⃣ , `boolean` 6️⃣ can be edited directly in the Settings UI.

```json
{
  "gitMagic.views.pageItemLimit": {
    "type": "number",
    "default": 20,
    "markdownDescription": "Specifies the number of items to show in each page when paginating a view list. Use 0 to specify no limit"
  }
}
```

For `boolean` entries, the `description` (or `markdownDescription`) will be used as the label for the checkbox.

```json
{
  "gitMagic.blame.compact": {
    "type": "boolean",
    "description": "Specifies whether to compact (deduplicate) matching adjacent gutter blame annotations"
  }
}
```

Other types, such as `object` and `array`, aren't exposed directly in the settings UI, and can only be modified by editing the JSON directly. Instead of controls for editing them, users will see a link to `Edit in settings.json` as shown in the screenshot above. 8️⃣

**enum** / **enumDescriptions**

If you provide an array of items under the `enum` 7️⃣ property, the settings UI will render a dropdown menu.

![settings UI screenshot of dropdown](images/contribution-points/settings-ui-enum.png)

You can also provide an `enumDescriptions` property, which provides descriptive text rendered at the bottom of the dropdown:

```json
{
  "gitMagic.blame.heatmap.location": {
    "type": "string",
    "default": "right",
    "enum": ["left", "right"],
    "enumDescriptions": [
      "Adds a heatmap indicator on the left edge of the gutter blame annotations",
      "Adds a heatmap indicator on the right edge of the gutter blame annotations"
    ]
  }
}
```

You can also use `markdownEnumDescriptions`, and your descriptions will be rendered as markdown.

**deprecationMessage** / **markdownDeprecationMessage**

If you set `deprecationMessage`, or `markdownDeprecationMessage`, the setting will get a warning underline with your specified message. It won't show up in the settings UI unless it is configured by the user. If you set `markdownDeprecationMessage`, the markdown will not be rendered in the setting hover or the problems view. If you set both properties, `deprecationMessage` will be shown in the hover and the problems view, and `markdownDeprecationMessage` will be rendered as markdown in the settings UI.

Example:

```json
{
  "json.colorDecorators.enable": {
    "type": "boolean",
    "description": "Enables or disables color decorators",
    "markdownDeprecationMessage": "**Deprecated**: Please use `#editor.colorDecorators#` instead.",
    "deprecationMessage": "Deprecated: Please use editor.colorDecorators instead."
  }
}
```

**Other JSON Schema properties**

You can use any of the validation JSON Schema properties to describe other constraints on configuration values:

- `default` for defining the default value of a property
- `minimum` and `maximum` for restricting numeric values
- `maxLength`, `minLength` for restricting string length
- `pattern` for restricting strings to a given regular expression
- `patternErrorMessage` for giving a tailored error message when a pattern does not match.
- `format` for restricting strings to well-known formats, such as `date`, `time`, `ipv4`, `email`,
  and `uri`
- `maxItems`, `minItems` for restricting array length

**Unsupported JSON Schema properties**

Note supported in the configuration section are:

- `$ref` and `definition`: The configuration schemas needs to be self-contained and can not make assumptions how the aggregated settings JSON schema document looks like.


For more details on these and other features, see the [JSON Schema Reference](https://json-schema.org/understanding-json-schema/reference/index.html).

**scope**

A configuration setting can have one of the following possible scopes:

- `application` - Settings that apply to all instances of VS Code and can only be configured in user settings.
- `machine` - Machine specific settings that can be set in user or remote settings. For example, an installation path which shouldn't be shared across machines.
- `machine-overridable` - Machine specific settings that can be overridden by workspace or folder settings.
- `window` - Windows (instance) specific settings which can be configured in user, workspace, or remote settings.
- `resource` - Resource settings, which apply to files and folders, and can be configured in all settings levels, even folder settings.
- `language-overridable` - Resource settings that can be overridable at a language level.

Configuration scopes determine when a setting is available to the user through the Settings editor and whether the setting is applicable. If no `scope` is declared, the default is `window`.

Below are example configuration scopes from the built-in Git extension:

```json
{
  "contributes": {
    "configuration": {
      "title": "Git",
      "properties": {
        "git.alwaysSignOff": {
          "type": "boolean",
          "scope": "resource",
          "default": false,
          "description": "%config.alwaysSignOff%"
        },
        "git.ignoredRepositories": {
          "type": "array",
          "default": [],
          "scope": "window",
          "description": "%config.ignoredRepositories%"
        }
      }
    }
  }
}
```

You can see that `git.alwaysSignOff` has `resource` scope and can be set per user, workspace, or folder, while the ignored repositories list with `window` scope applies more globally for the VS Code window or workspace (which might be multi-root).

**Linking to settings**

You can insert a link to another setting, which will be rendered as a clickable link in the settings UI, by using this special syntax in the markdown-type properties: ``` `#target.setting.id#` ```. This will work in `markdownDescription`, `markdownEnumDescriptions`, and `markdownDeprecationMessage`. Example:

```json
  "files.autoSaveDelay": {
    "markdownDescription": "Controls the delay in ms after which a dirty editor is saved automatically. Only applies when `#files.autoSave#` is set to `afterDelay`.",
    // ...
  }
```

In the settings UI, this is rendered as:

![setting link example](images/contribution-points/setting-link.png)


## contributes.configurationDefaults

Contribute default language-specific editor configurations. This will override default editor configurations for the provided language.

The following example contributes default editor configurations for the `markdown` language:

### Configuration default example

```json
{
  "contributes": {
    "configurationDefaults": {
      "[markdown]": {
        "editor.wordWrap": "on",
        "editor.quickSuggestions": false
      }
    }
  }
}
```
