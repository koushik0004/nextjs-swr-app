import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import CreatePost from "@components/CreatePost";
import PostCard from "@components/PostCard";
import Loader from "@components/Loader";
import { IPost } from "@libs/types";

export default function Home() {
  // const { data: posts, error } = useSWR<IPost[]>(
  //   "/posts?_sort=createdAt&_order=desc"
  // );

  const PAGE_SIZE = 3;
  const getKey = (pageIndex: number, pervPageData: any) => {
    if (pervPageData && pervPageData.length < 3) {
      return null;
    }
    return `/posts?_order=desc&_sort=createdAt&_page=${
      pageIndex + 1
    }&_limit=${PAGE_SIZE}`;
  };

  const {
    data: paginatedPosts,
    error: paginatedPostsErr,
    isValidating,
    mutate,
    size,
    setSize,
  } = useSWRInfinite(getKey);
  console.log({ paginatedPosts, isValidating, size });

  const posts = paginatedPosts?.flat() ?? null;
  const isReachedAtLast =
    paginatedPosts &&
    paginatedPosts[paginatedPosts.length - 1]?.length < PAGE_SIZE;

  // const isLoadingPosts =

  return (
    <div>
      <h4>useSWR Hook ⛳ 🍜</h4>
      <CreatePost />

      <h4>Posts</h4>
      {paginatedPostsErr && <p className="text-center">Something went wrong</p>}
      {!posts && <Loader />}
      {posts && posts.map((post, indx) => <PostCard key={indx} data={post} />)}
      {posts && isValidating && <Loader />}
      {!isReachedAtLast && (
        <div className="mx-auto w-50">
          <button
            onClick={() => setSize(size + 1)}
            className="btn btn-outline-warning mx-auto"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
