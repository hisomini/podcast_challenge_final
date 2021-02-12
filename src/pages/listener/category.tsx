import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import {
  getPodcastByCategory,
  getPodcastByCategoryVariables,
} from "../../__type_graphql__/getPodcastByCategory";
import { Podcasts } from "./podcasts";

const GET_PODCAST_BYCATEGORY = gql`
  query getPodcastByCategory($input: CategoryInput!) {
    getPodcastByCategory(input: $input) {
      ok
      error
      podcast {
        title
        createdAt
      }
    }
  }
`;

interface ICategoryParams {
  name: string;
}

export const Category = () => {
  const params = useParams<ICategoryParams>();
  const { loading, data, error } = useQuery<
    getPodcastByCategory,
    getPodcastByCategoryVariables
  >(GET_PODCAST_BYCATEGORY, {
    variables: {
      input: {
        name: params.name,
      },
    },
  });
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <div>
      <Helmet>
        <title>Podcast by Category | Podcast</title>
      </Helmet>
      <div>
        {data.getPodcastByCategory.podcast?.map((one) => (
          <div className="p-8 border-2 border-indigo-300 rounded-md h-full mx-6 mt-4">
            <h3 className="mt-2 font-medium text-xl border-b text-center pb-2 font-bold text-blue-500">
              {one.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};
