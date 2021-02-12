/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPodcastByCategory
// ====================================================

export interface getPodcastByCategory_getPodcastByCategory_podcast {
  __typename: "Podcast";
  title: string;
  createdAt: any;
}

export interface getPodcastByCategory_getPodcastByCategory {
  __typename: "CategoryOutput";
  ok: boolean;
  error: string | null;
  podcast: getPodcastByCategory_getPodcastByCategory_podcast[] | null;
}

export interface getPodcastByCategory {
  getPodcastByCategory: getPodcastByCategory_getPodcastByCategory;
}

export interface getPodcastByCategoryVariables {
  input: CategoryInput;
}
