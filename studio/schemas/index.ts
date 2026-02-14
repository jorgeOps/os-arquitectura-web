// Objects
import blockContent from './objects/blockContent'
import localizedString from './objects/localizedString'
import localizedText from './objects/localizedText'
import localizedBlockContent from './objects/localizedBlockContent'

// Documents
import project from './documents/project'
import publication from './documents/publication'
import mediaCoverage from './documents/mediaCoverage'
import award from './documents/award'

// Taxonomy
import category from './taxonomy/category'

export const schemaTypes = [
  // Objects (must be first as they're used by other schemas)
  blockContent,
  localizedString,
  localizedText,
  localizedBlockContent,
  // Documents
  project,
  publication,
  mediaCoverage,
  award,
  // Taxonomy
  category,
]
