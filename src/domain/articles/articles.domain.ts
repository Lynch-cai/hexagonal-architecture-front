import { type IArticle } from "@/domain/articles/interfaces/IArticle";
import { type IArticleOutput } from "@/domain/articles/interfaces/IArticleOutput";

export const getArticles = async ({ articlesOutput }: { articlesOutput: IArticleOutput }): Promise<IArticle[]> => {
    try {
        return await articlesOutput.getArticles();
    } catch (error: any) {
        throw new Error(error);
    }
};

export const addArticle = async ({ articlesOutput, articleTitle, articleDescription }: { articlesOutput: IArticleOutput; articleTitle: string; articleDescription: string }): Promise<boolean> => {
    try {
        return await articlesOutput.addArticle(articleTitle, articleDescription);
    } catch (error: any) {
        throw new Error(error);
    }
};

export const removeArticle = async ({ articlesOutput, articleId }: { articlesOutput: IArticleOutput; articleId: number }): Promise<boolean> => {
    try {
        return await articlesOutput.removeArticle(articleId);
    } catch (error: any) {
        throw new Error(error);
    }
};
