import { error } from "@sveltejs/kit";
import { fetchJson } from "../../../lib/util/agent";
import { compile } from "mdsvex";
import type { Article, Comment } from "../../../lib/types";



export async function load({ fetch, params, depends }) {
    depends('comments:refresh-comments');
    try {
        const {data} = await fetchJson(`Article/${params.slug}`, fetch);
        const article: Article = data;
        let comments: Comment[] = article.comments;

        // filter out replies
        if(comments){
            comments = comments.filter((c) => c.parentCommentId == null);
        }

        const parsedHtml = await compile(article.content);

        if (parsedHtml) {
            article.content = parsedHtml.code;
        } else {
            article.content = "Parsed Error";
        }
        return { article, comments };
    } catch (e) {
        throw error(404, (e as Error).message);
    }
}