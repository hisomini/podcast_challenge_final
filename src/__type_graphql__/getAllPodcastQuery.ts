/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllPodcastQuery
// ====================================================

export interface getAllPodcastQuery_getAllPodcasts_podcasts_category {
  __typename: "Category";
  name: string;
}

export interface getAllPodcastQuery_getAllPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: getAllPodcastQuery_getAllPodcasts_podcasts_category | null;
  createdAt: any;
}

export interface getAllPodcastQuery_getAllPodcasts {
  __typename: "GetAllPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: getAllPodcastQuery_getAllPodcasts_podcasts[] | null;
}

export interface getAllPodcastQuery_allCategories_categories {
  __typename: "Category";
  name: string;
}

export interface getAllPodcastQuery_allCategories {
  __typename: "AllCategoriesOutput";
  error: string | null;
  ok: boolean;
  categories: getAllPodcastQuery_allCategories_categories[] | null;
}

export interface getAllPodcastQuery {
  getAllPodcasts: getAllPodcastQuery_getAllPodcasts;
  allCategories: getAllPodcastQuery_allCategories;
}
