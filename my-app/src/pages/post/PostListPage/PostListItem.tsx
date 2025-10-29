import React from "react";
import type {IPostItem} from "../../../types/posts/IPostItem.ts";
import {APP_ENV} from "../../../env";

interface Props {
    post: IPostItem;
}

const PostListItem: React.FC<Props> = ({post}) => {
    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {post.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mt-2">{post.body}</p>

            {post.image && (
                <img
                    src={`${APP_ENV.API_BASE_URL}/images/${post.image}`}
                    alt={post.title}
                    className="rounded-lg mt-3 max-h-64 object-cover"
                />
            )}

            {post.video && (
                <div className="mt-3">
                    <iframe
                        className="w-full h-64 rounded-lg"
                        src={`${APP_ENV.API_BASE_URL}/videos/${post.video}`}
                        title={post.title}
                        allowFullScreen
                    ></iframe>
                </div>
            )}

            <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                <span>🗓 {new Date(post.created_at).toLocaleDateString()}</span>
                <span className="ml-4">📂 {post.topic_name}</span>
            </div>
        </div>
    )
}

export default PostListItem;