import { Loadable, selector, selectorFamily, waitForNone } from "recoil";
import API from "../../api";
import { currentPostIDState } from "./atoms";
import { POST } from "./types";

export const getConcurrentPostsQuery = selector<Loadable<POST>[]>({
  key: "GetConcurrentPostQuery",
  get: ({ get }) => {
    const postList = get(getPostsQuery);
    const posts = get(
      waitForNone(postList.map((post) => getPostQueryByParam(post.id)))
    );

    return posts
      .filter(({ state }) => state === "hasValue")
      .map((post) => post);
  },
});

export const getPostsQuery = selector<POST[]>({
  key: "GetPostsQuery",
  get: async () => {
    const res = await API["posts"].getPosts();

    return res.data;
  },
});

export const getPostQueryByParam = selectorFamily<POST, number>({
  key: "GetPostQueryByParams",
  get: (postId) => async () => {
    const res = await API["posts"].getPost(postId);

    return res.data;
  },
});

export const getPostQuery = selector<POST | null>({
  key: "GetPostQuery",
  get: async ({ get }) => {
    const postId = get(currentPostIDState);

    if (postId) {
      const res = await API["posts"].getPost(postId);

      return res.data;
    } else {
      return null;
    }
  },
});
