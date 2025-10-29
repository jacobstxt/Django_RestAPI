import React from "react";
import PostAddForm from "../../../components/forms/PostAddForm.tsx";


const PostAddPage: React.FC = () => {
    return (
        <div className="p-[20px] min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div
                style={{
                    maxWidth: 800,
                    width: "100%",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
            >
                <div className="bg-white dark:bg-gray-900 p-8">
                    <PostAddForm />
                </div>
            </div>
        </div>
    );
};

export default PostAddPage;