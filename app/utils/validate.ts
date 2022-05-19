const ValidateJS = require("validate.js")

const Validate: any = ValidateJS.default ? ValidateJS.default : ValidateJS

Validate.validators.excludes = function custom(value, options, key, attributes) {
  const list = attributes[options.attribute] || []
  if (value && list.includes(value)) {
    return options.message || `${value} is in the list`
  }
}

Validate.validators.tripped = function custom(value, options, key, attributes) {
  if (value && attributes[options.attribute] === true) {
    return options.message || `${options.attribute} is true`
  }
}

export interface ValidationRules {
  [key: string]: Record<string, unknown>
}

export interface ValidationErrors {
  [key: string]: string[]
}

export function validate(rules: ValidationRules, data: Record<string, unknown>): ValidationErrors {
  if (typeof data !== "object") {
    return {} as ValidationErrors
  }
  return Validate(data, rules, { fullMessages: false }) || {}
}
