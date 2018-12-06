import gql from 'graphql-tag';

export default gql`
  subscription NewFrameSub {
    subscribeToNewFrame(userId: "admin") {
      frameId
      lowLevelComps
      highLevelComps
    }
  }
`
