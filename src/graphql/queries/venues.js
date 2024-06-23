export const VENUE_CATEGORIES = `
 query GetVenueCategories {
    venueCategories {
      id
      name
    }
  }
`;

export const VENUES_BY_CATEGORY_ID = `
  query GetVenuesByCategoryId($id: String!, $first: Int!, $after: String) {
      venuesByCategoryId(
      input: { categoryId: $id }
      first: $first
      after: $after
    ) {
      totalCount
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
