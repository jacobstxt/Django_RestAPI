import PostListItem from "./PostListItem.tsx";
import {useGetPostsQuery} from "../../../services/postService.ts";


const PostListPage = () => {
    const {data: posts} = useGetPostsQuery();

    console.log("listPosts...", posts);

    const contentPosts = posts?.map((post) => {
        return (
            <PostListItem key={post.id} post={post} />
        );
    });

    return (
        <div className="max-w-3xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-center mb-6">Пости</h1>

            {contentPosts && contentPosts.length > 0 ? (
                contentPosts
            ) : (
                <p className="text-gray-500 text-center">Немає постів 😔</p>
            )}
        </div>
    )
}
export default PostListPage;