import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { PODCAST_FRAGMENT } from "../../fragments";

const MY_PODCASTS = gql`
  query myPodcastsQuery {
    myPodcasts {
      ok
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const Home_Host = () => {
  const { data } = useQuery(MY_PODCASTS);
  return (
    <div>
      <Helmet>
        <title>Home_Host | Nuber-podcasts</title>
      </Helmet>
      <div className="w-full  px-5 xl:px-0 mx-auto max-w-screen-xl">
        <div className=" w-full grid md:grid-cols-2 xl:grid-cols-4 gap-7">
          {data?.myPodcasts.podcasts?.map((podcast: any) => (
            <Link
              to={`/podcasts/${podcast.id}`}
              key={podcast.id}
              className="relative group"
            >
              <div className="p-8 border-2 border-indigo-300 rounded-md h-full">
                {/* <div
                style={{ backgroundImage: `url(${podcast.thumbnailUrl})` }}
                className="bg-cover w-32 h-32 m-auto rounded-md"
              ></div> */}
                <h3 className="mt-2 font-medium text-xl border-b text-center pb-2 font-bold text-indigo-400">
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
