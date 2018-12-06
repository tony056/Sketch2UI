import gql from 'graphql-tag';

export default gql`
  query listFrames {
    listFrames {
      items {
        frameId
        userId
        createdAt
        lowLevelComps
        highLevelComps
      }
    }
  }
`
