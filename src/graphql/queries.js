import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query repositories {
    repositories {
      edges {
        node {
          id,
          fullName,
          ratingAverage,
          reviewCount,
          stargazersCount,
          forksCount,
          ownerAvatarUrl,
          description,
          language,
        }
      }
    }
  }
`;

export const AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
    }
  }
`;