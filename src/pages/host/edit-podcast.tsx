import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { useMe } from "../../hooks/useMe";
import {
  updatePodcast,
  updatePodcastVariables,
} from "../../__type_graphql__/updatePodcast";

const EDIT_PODCAST_MUTATION = gql`
  mutation updatePodcast($input: UpdatePodcastInput!) {
    updatePodcast(input: $input) {
      ok
      error
    }
  }
`;
interface IMyPodcastParams {
  id: string;
}
interface IFormProps {
  title?: string;
  rating?: number;
}
export const EditPodcast = () => {
  const { refetch } = useMe();
  const history = useHistory();
  const params = useParams<IMyPodcastParams>();

  const onCompleted = async (data: updatePodcast) => {
    const {
      updatePodcast: { ok },
    } = data;
    console.log(ok);
    if (ok) {
      await refetch();
      history.push("/");
    }
  };

  const [updatePodcast, { loading }] = useMutation<
    updatePodcast,
    updatePodcastVariables
  >(EDIT_PODCAST_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    mode: "onChange",
  });
  const onSubmit = () => {
    const { title, rating } = getValues();
    updatePodcast({
      variables: {
        input: {
          id: +params.id,
          payload: {
            title,
            rating,
          },
        },
      },
    });
  };
  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <h4 className="font-semibold text-2xl mb-3">Edit Podcast</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          ref={register}
          name="title"
          className="focus:outline-none focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors"
          type="title"
          placeholder="title"
        />
        <input
          ref={register}
          name="rating"
          className="focus:outline-none focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colorst"
          type="rating"
          placeholder="rating"
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Save Podcast"
        />
      </form>
    </div>
  );
};
