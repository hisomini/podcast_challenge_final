import { gql, useMutation, useQuery } from "@apollo/client";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory, useParams } from "react-router-dom";
import { PODCAST_FRAGMENT } from "../../fragments";
import { useMe } from "../../hooks/useMe";
import {
  deletePodcast,
  deletePodcastVariables,
} from "../../__type_graphql__/deletePodcast";
import {
  myPodcast,
  myPodcastVariables,
} from "../../__type_graphql__/myPodcast";

const MY_PODCAST = gql`
  query myPodcast($input: MyPodcastInput!) {
    myPodcast(input: $input) {
      ok
      error
      podcast {
        ...PodcastParts
        reviews {
          title
          text
        }
        episodes {
          title
          createdAt
        }
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

const DELETE_PODCAST = gql`
  mutation deletePodcast($input: PodcastSearchInput!) {
    deletePodcast(input: $input) {
      ok
      error
    }
  }
`;

interface IMyPodcastParams {
  id: string;
}

export const Home_Detail_Host = () => {
  const { data: userData, refetch } = useMe();
  const params = useParams<IMyPodcastParams>();
  const history = useHistory();
  const onCompleted = async (data: deletePodcast) => {
    const {
      deletePodcast: { ok },
    } = data;
    if (ok && userData) {
      await refetch();
      window.location.replace("/");
    }
  };
  const [deletePodcastMutation] = useMutation<
    deletePodcast,
    deletePodcastVariables
  >(DELETE_PODCAST, {
    onCompleted,
  });
  const { data, loading, error } = useQuery<myPodcast, myPodcastVariables>(
    MY_PODCAST,
    {
      variables: {
        input: {
          id: +params.id,
        },
      },
    }
  );
  const onButtonClick = () => {
    deletePodcastMutation({
      variables: {
        input: {
          id: +params.id,
        },
      },
    });
  };
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <div className="w-full px-5 xl:px-0 mx-auto max-w-screen-xl ">
      <Helmet>
        <title>Episode List | Nuber-podcasts</title>
      </Helmet>
      <div className="flex my-8 ">
        <div className="  w-full flex flex-col mx-6 justify-center md:px-16  border-2 border-blue-200 p-4 ">
          <div className=" flex w-full justify-between">
            <h1 className="text-indigo-400 font-semibold text-3xl mr-4">
              {data?.myPodcast.podcast?.title}
            </h1>
            <div className="mt-2 ">
              <Link
                to={`/edit-podcast/${data.myPodcast.podcast?.id}`}
                key={data.myPodcast.podcast?.id}
                className="relative group"
              >
                <button>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-2xl text-indigo-400 mr-6 "
                  />
                </button>
              </Link>
              <button onClick={onButtonClick}>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="text-2xl text-indigo-400 "
                />
              </button>
            </div>
          </div>
          <h2 className="py-3 text-gray-500 text-xl font-light">
            {data?.myPodcast.podcast?.category?.name}
          </h2>
          <h2 className="pb-3 text-gray-500 text-xl font-light">
            {data?.myPodcast.podcast?.createdAt}
            {data?.myPodcast.podcast?.reviews?.map((review) => (
              <div>
                <h2>{review.title}</h2>
                <h2>{review.text}</h2>
              </div>
            ))}
          </h2>
          <Link
            to="/"
            className="border-2 border-blue-200 rounded-full px-5 py-2 w-32 text-indigo-400 font-semibold hover:bg-blue-400 hover:text-gray-50 transition-colors"
          >
            ↵ Go Back
          </Link>
        </div>
      </div>
      <div className="grid gap-8 grid-cols-3 mx-6">
        {data?.myPodcast.podcast?.episodes?.map((episode) => (
          <div className="w-full border-2 border-blue-400   md:px-16  p-4 mb-4">
            <h2 className="font-semibold font-lg">{episode.title}</h2>
            <h2 className="font-semibold font-lg">{episode.createdAt}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
