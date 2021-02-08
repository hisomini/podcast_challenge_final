import { render, waitFor } from "../../../test-utils";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { act, RenderResult } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { ALLPODCASTS_QUERY, Podcasts } from "../podcasts";

describe("<Podcasts />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(async () => {
      mockedClient = createMockClient();
      mockedClient.setRequestHandler(ALLPODCASTS_QUERY, () =>
        Promise.resolve({
          data: {
            getAllPodcastQuery: {
              ok: true,
              error: null,
              podcasts: [
                {
                  id: 1,
                  thumbnailUrl: "test-url",
                  category: "test-category",
                  title: "test-title",
                  description: "test",
                  rating: 5,
                },
              ],
            },
          },
        })
      );
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <Podcasts />
        </ApolloProvider>
      );
    });
  });
  it("renders OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Home | Nuber-podcasts");
    });
  });
  it("renders validation errors", async () => {
    const { debug } = renderResult;
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
});
