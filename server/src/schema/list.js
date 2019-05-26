import { gql } from 'apollo-server-express';

export default gql`
  enum Language {
    en
    ar
  }

  type ListItem {
    id: ID!
    name: String
    link: String
    description: String
    mainLanguages: [Language]
    tranlationLanguages: [Language]
    createdAt: Date
    updatedAt: Date
    creator: User
  }

  type List {
    id: ID!
    name: String
    description: String
    coverPhoto: String
    createdAt: Date
    updatedAt: Date
    items: [ListItem]
    creator: User
    maintainers: [User]
  }

  input ListInput {
    id: Int
  }

  input ListsInput { # TODO: THIS SHOULD BE SEARCHABLE
    creatorID: Int
  }

  input CreateListInput {
    name: String
    description: String
    coverPhoto: String
  }

  input EditListInput {
    listID: Int
    name: String
    description: String
    coverPhoto: String
  }

  input DeleteListInput {
    listID: Int
  }

  input CreateListItemInput {
    listID: Int
    name: String
    link: String
    description: String
    mainLanguages: [Language]
    tranlationLanguages: [Language]
  }
  input EditListItemInput {
    id: Int
    name: String
    link: String
    description: String
    mainLanguages: [Language]
    tranlationLanguages: [Language]
  }

  input AddItemToListInput {
    listID: Int
    listItemID: Int
  }

  input ChangeItemOrderInput {
    listID: Int
    listItemID: Int
    newOrder: Int
  }

  input RemoveItemFromListInput {
    listID: Int
    listItemID: Int
  }

  extend type Query {
    list(input: ListInput): List
    lists: [List]
  }

  extend type Mutation {
    createList(input: CreateListInput): List
    editList(input: EditListInput): List
    deleteList(input: DeleteListInput): Int
    createListItem(input: CreateListItemInput): ListItem
    editListItem(input: EditListItemInput): ListItem
    addItemToList(input: AddItemToListInput): List
    changeItemOrder(input: ChangeItemOrderInput): List
    removeItemFromList(input: RemoveItemFromListInput): List
  }
`;