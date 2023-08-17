import gql from "graphql-tag";

export const getCollection = gql`
  query getCollection {
    accounts(first: 5) {
      id
      punksOwned {
        id
      }
      bought {
        id
      }
    }
    punks(first: 5) {
      id
      transferedTo {
        id
      }
      assignedTo {
        id
      }
      purchasedBy {
        id
      }
    }
  }
`;