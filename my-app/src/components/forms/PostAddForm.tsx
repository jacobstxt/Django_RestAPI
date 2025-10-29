import React, { useState } from "react";
import { useCreatePostMutation } from "../../services/postService";
import InputField from "../inputs/InputField.tsx";
import ImagesUploader from "../uploaders/ImagesUploader.tsx";
import type {UploadFile} from "antd";
import {useGetTopicsQuery} from "../../services/topicService.ts";
import {FileUpload, type FileUploadSelectEvent} from "primereact/fileupload";
import {useNavigate} from "react-router";



const PostAddForm: React.FC = () => {
    const [createPost, { isLoading }] = useCreatePostMutation();
    const { data: topics, isLoading: topicsLoading } = useGetTopicsQuery();
    const  navigate = useNavigate();


    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [imageError, setImageError] = useState(false);
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const [formValues, setFormValues] = useState({
        title: "",
        body: "",
        topic_id: "",
        user_id: 1,
    });

    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const validationChange = (isValid: boolean, fieldKey: string) => {
        if (isValid && errors.includes(fieldKey)) {
            setErrors(errors.filter((x) => x !== fieldKey));
        } else if (!isValid && !errors.includes(fieldKey)) {
            setErrors((state) => [...state, fieldKey]);
        }
    };

    const onVideoSelect = (e: FileUploadSelectEvent) => {
        if (e.files && e.files.length > 0) {
            const file = e.files[0] as File;
            // Додаткова перевірка формату
            if (!file.type.startsWith("video/")) {
                alert("❌ Можна завантажувати тільки відео-файли!");
                return;
            }
            setVideoFile(file);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("title", formValues.title);
            formData.append("body", formValues.body);
            formData.append("topic_id", String(formValues.topic_id));
            formData.append("user_id", "1"); // або твій поточний user id
            formData.append("video_url", "");

            if (fileList.length > 0 && fileList[0].originFileObj) {
                formData.append("image", fileList[0].originFileObj as File);
            }

            if (videoFile) {
                formData.append("video", videoFile);  // або “video” — залежно що ти завантажуєш
            }

            await createPost(formData).unwrap();

            navigate('/');
            setFormValues({ title: "", body: "", topic_id: "", user_id: 1 });
        } catch (err: any) {
            console.error(err);
            alert("❌ Помилка при створенні поста!");
        }
    };



    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300"
        >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center">
                Створення поста
            </h2>

            <InputField
                label="Заголовок"
                name="title"
                placeholder="Введіть заголовок..."
                value={formValues.title}
                onChange={handleChange}
                onValidationChange={validationChange}
                rules={[{ rule: "required", message: "Заголовок обов’язковий" }]}
            />

            <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Опис
                </label>
                <textarea
                    name="body"
                    value={formValues.body}
                    onChange={handleChange}
                    placeholder="Напишіть щось цікаве..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                    rows={4}
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Тема
                </label>
                {topicsLoading ? (
                    <p className="text-gray-500 dark:text-gray-400">Завантаження тем...</p>
                ) : (
                    <select
                        name="topic_id"
                        value={formValues.topic_id}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="">Оберіть тему</option>
                        {topics?.map((topic) => (
                            <option key={topic.id} value={topic.id}>
                                {topic.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <div className="w-full text-center">
                <ImagesUploader
                    fileList={fileList}
                    setFileList={setFileList}
                    imageError={imageError}
                    setImageError={setImageError}
                />
                {imageError && <p className="text-red-500 text-sm mt-1">Image is required</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Завантажити відео
                </label>
                <FileUpload
                    name="file"
                    accept="video/*"
                    customUpload
                    uploadHandler={() => {}}
                    onSelect={onVideoSelect}
                    chooseLabel="Оберіть відео"
                    cancelLabel="Скасувати"
                    uploadLabel="Завантажити"
                    maxFileSize={100 * 1024 * 1024} // 100MB
                    className="w-full dark:bg-gray-800 dark:text-gray-100"
                />
                {videoFile && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        🎬 {videoFile.name}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-500"
            >
                {isLoading ? "Створюємо..." : "Створити пост"}
            </button>
        </form>
    );
};

export default PostAddForm;
