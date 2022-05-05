import React from "react";
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import API from "../api";
import { currentPostIDState } from "../store/posts/atoms";
import {
  getPostQuery,
  getPostQueryByParam,
  getPostsQuery,
} from "../store/posts/selectors";

function PostItem({ post }: any) {
  const setCurrentPostId = useSetRecoilState(currentPostIDState);

  const onSelect = React.useCallback(() => {
    setCurrentPostId(post.id);
  }, [post, setCurrentPostId]);

  const onSelectPrefetching = useRecoilCallback(({ snapshot, set }) => () => {
    snapshot.getLoadable(getPostQueryByParam(post.id));
    set(currentPostIDState, post.id);
  });

  return (
    <li style={{ cursor: "pointer" }} onClick={onSelectPrefetching}>
      {/* onClick={onSelect}> */}
      {post.id}. {post.title}
    </li>
  );
}

function PostList() {
  const postList = useRecoilValue(getPostsQuery);

  return (
    <ul style={{ flex: "1" }}>
      {postList.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
}

function CurrentPost() {
  const setCurrentPostId = useSetRecoilState(currentPostIDState);
  const post = useRecoilValue(getPostQuery);

  const onBack = React.useCallback(() => {
    setCurrentPostId(null);
  }, [setCurrentPostId]);

  return (
    post && (
      <div style={{ cursor: "pointer", flex: "1" }} onClick={onBack}>
        <h1>{post.title}</h1>
        <h3>{post.body}</h3>
      </div>
    )
  );
}

function PreFetchingEX() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <PostList />
      </React.Suspense>
      <React.Suspense fallback={<div>Loading...</div>}>
        <CurrentPost />
      </React.Suspense>
    </div>
  );
}

export default PreFetchingEX;
