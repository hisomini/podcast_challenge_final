/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PodcastParts
// ====================================================

export interface PodcastParts_category {
  __typename: "Category";
  name: string;
}

export interface PodcastParts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: PodcastParts_category | null;
  createdAt: any;
}
