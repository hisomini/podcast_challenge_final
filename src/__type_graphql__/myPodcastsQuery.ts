/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myPodcastsQuery
// ====================================================

export interface myPodcastsQuery_myPodcasts_podcasts_category {
  __typename: "Category";
  name: string;
}

export interface myPodcastsQuery_myPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: myPodcastsQuery_myPodcasts_podcasts_category | null;
  createdAt: any;
}

export interface myPodcastsQuery_myPodcasts {
  __typename: "MyPodcastsOutput";
  ok: boolean;
  podcasts: myPodcastsQuery_myPodcasts_podcasts[];
}

export interface myPodcastsQuery {
  myPodcasts: myPodcastsQuery_myPodcasts;
}
