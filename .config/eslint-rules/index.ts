import { baseRules } from './base'
import { stylisticRules } from './stylistic'
import { typescriptRules } from './typescipt'
import { vueRules } from './vue'

export const eslintRules = {
  ...baseRules,
  ...stylisticRules,
  ...typescriptRules,
  ...vueRules
}
