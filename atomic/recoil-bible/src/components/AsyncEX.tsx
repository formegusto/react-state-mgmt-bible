import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
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

  return (
    <li style={{ cursor: "pointer" }} onClick={onSelect}>
      {post.id}. {post.title}
    </li>
  );
}

function PostList() {
  const postList = useRecoilValue(getPostsQuery);

  return (
    <ul>
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
      <div style={{ cursor: "pointer" }} onClick={onBack}>
        <h1>{post.title}</h1>
        <h3>{post.body}</h3>
      </div>
    )
  );
}

type StaticProps = {
  postId: number;
};
function StaticPost({ postId }: StaticProps) {
  const post = useRecoilValue(getPostQueryByParam(postId));

  return (
    <div style={{ cursor: "pointer" }}>
      <h1>{post.title}</h1>
      <h3>{post.body}</h3>
    </div>
  );
}

function AsyncEX() {
  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <StaticPost postId={1} />
      </React.Suspense>
      <React.Suspense fallback={<div>Loading...</div>}>
        <PostList />
      </React.Suspense>
      <hr />
      <React.Suspense fallback={<div>Loading...</div>}>
        <CurrentPost />
      </React.Suspense>
    </div>
  );
}

export default AsyncEX;
