export type Tag = {
    id: number;
    title: string;
}

export type Category = {
    id: number;
    title: string;
}

export type Article = {
    id: string;
    title: string;
    content: string;
    category: Category;
    articleTags: Tag[];
    createdAt: Date | null;
    updatedAt: Date | null;
    isDraft: boolean;
    comments: Comment[];
}

export type Comment = {
    id: string;
    content: string;
    createdAt: Date | null;
    commenterUsername: string;
    commenterEmail: string;
    parentCommentId: string;
    replyToArticleId: string;
    replies: Comment[];
}

export type Project = {
    id: number;
    title: string;
    description: string;
    link: string;
    cover: string;
}

export type AboutPage = {
    id: number;
    content: string;
    isAboutSite: boolean;
}

export type Fetch = (
    input: RequestInfo | URL,
    init?: RequestInit
) => Promise<Response>