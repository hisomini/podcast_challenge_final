import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import {
  createPodcastMutation,
  createPodcastMutationVariables,
} from "../../__type_graphql__/createPodcastMutation";

export const CREATE_PODCAST_MUTATION = gql`
  mutation createPodcastMutation($createinput: CreatePodcastInput!) {
    createPodcast(input: $createinput) {
      ok
      error
    }
  }
`;

interface ICreateForm {
  title: string;
  categoryName: string;
}

export const CreatePodcast = () => {
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
  } = useForm<ICreateForm>({
    mode: "onChange",
  });

  const onCompleted = (data: createPodcastMutation) => {
    const {
      createPodcast: { ok },
    } = data;

    // if (ok && token) {
    //   localStorage.setItem(LS_TOKEN, token);
    //   authTokenVar(token);
    //   isLoggedInVar(true);
    // }
  };
  // }
  const [createpodcastMutation, { loading, data }] = useMutation<
    createPodcastMutation,
    createPodcastMutationVariables
  >(CREATE_PODCAST_MUTATION, {
    onCompleted,
  });

  const _submit = () => {
    if (!loading) createpodcastMutation();
  };
  const onSubmit = () => {
    if (!loading) {
      const { title, categoryName } = getValues();
      createpodcastMutation({
        variables: {
          createinput: {
            title,
            categoryName,
          },
        },
      });
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col items-center mt-52">
      <Helmet>
        <title>New Podcast | Nuber Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">New Podcast</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          className="focus:outline-none focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors"
          type="text"
          name="title"
          placeholder="title"
          ref={register({ required: "title is required." })}
        />
        <input
          className="focus:outline-none focus:border-gray-500 p-3 border-2  text-lg border-gray-200 transition-colors"
          type="text"
          name="categoryName"
          placeholder="Category Name"
          ref={register({ required: "Category Name is required." })}
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Create Restaurant"
        />
        {data?.createPodcast.error && (
          <FormError errorMessage={data.createPodcast.error} />
        )}
      </form>
    </div>
  );
};
