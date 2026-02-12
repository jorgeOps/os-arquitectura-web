// Objects
import blockContent from './objects/blockContent'
import localizedString from './objects/localizedString'
import localizedText from './objects/localizedText'
import localizedBlockContent from './objects/localizedBlockContent'

// Documents
import author from './documents/author'
import project from './documents/project'
import post from './documents/post'
import publication from './documents/publication'
import mediaCoverage from './documents/mediaCoverage'
import award from './documents/award'

// Taxonomy
import category from './taxonomy/category'
import postCategory from './taxonomy/postCategory'

export const schemaTypes = [
  // Objects (must be first as they're used by other schemas)
  blockContent,
  localizedString,
  localizedText,
  localizedBlockContent,
  // Documents
  author,
  project,
  post,
  publication,
  mediaCoverage,
  award,
  // Taxonomy
  category,
  postCategory,
]
