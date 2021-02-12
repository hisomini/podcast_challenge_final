import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Button } from "../../components/button";
import { PODCAST_FRAGMENT } from "../../fragments";
import {
  searchPodcasts,
  searchPodcastsVariables,
} from "../../__type_graphql__/searchPodcasts";

const SEARCH_PODCAST = gql`
  query searchPodcasts($input: SearchPodcastsInput!) {
    searchPodcasts(input: $input) {
      ok
      error
      totalPages
      totalCount
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const [callQuery, { loading, data, called }] = useLazyQuery<
    searchPodcasts,
    searchPodcastsVariables
  >(SEARCH_PODCAST);
  useEffect(() => {
    const [_, titleQuery] = location.search.split("?term=");
    if (!titleQuery) {
      return history.replace("/");
    }
    callQuery({
      variables: {
        input: {
          page: 1,
          titleQuery,
        },
      },
    });
  }, [history, location]);
  console.log(loading, data, called);
  return (
    <div>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      <div className="w-full px-5 xl:px-0 mx-auto max-w-screen-xl mt-4">
        <Link
          to="/"
          className="border-2 border-indigo-400 rounded-full px-5 py-2 w-28 text-blue-400 font-semibold hover:bg-blue-300 hover:text-gray-50 transition-colors"
        >
          ↵ Go Back
        </Link>
        <div className=" mt-8 grid md:grid-cols-2 xl:grid-cols-4 gap-7">
          {data?.searchPodcasts.podcasts?.map((podcast) => (
            <Link
              to={`/podcasts/${podcast.id}`}
              key={podcast.id}
              className="relative group"
            >
              <div className="p-8 border-2 border-indigo-300 rounded-md h-full">
                <h3 className="mt-2 font-medium text-xl border-b text-center pb-2 font-bold text-blue-500">
                  {podcast.title}
                </h3>
                <div className="text-gray-500 text-center pt-2">
                  {podcast.category?.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
