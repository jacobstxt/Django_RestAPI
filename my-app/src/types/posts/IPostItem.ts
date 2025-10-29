export interface IPostItem {
    id: number;
    title: string;
    body: string;
    image?: string | null;
    video_url?: string | null;
    topic_name: string;
    created_at: string;
}