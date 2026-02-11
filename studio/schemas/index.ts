// Objects
import blockContent from './objects/blockContent'
import localizedString from './objects/localizedString'
import localizedText from './objects/localizedText'
import localizedBlockContent from './objects/localizedBlockContent'

// Documents
import author from './documents/author'
import project from './documents/project'
import post from './documents/post'

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
  // Taxonomy
  category,
  postCategory,
]
