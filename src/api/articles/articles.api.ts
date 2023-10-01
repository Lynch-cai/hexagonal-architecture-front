import { type IArticle as IArticleApi } from "@/api/articles/interfaces/IArticle";
import { type IArticle as IArticleDomain } from "@/domain/articles/interfaces/IArticle";
import { getArticles as getArticlesDomain, addArticle as addArticleDomain, removeArticle as removeArticleDomain } from "@/domain/articles/articles.domain";
import { outputs } from "@/config/articles/output.config";

export const convertDomainToApiModel = (articlesDomain: IArticleDomain[]): IArticleApi[] => {
    const articles = articlesDomain.map((articleDomain: IArticleDomain) => ({
        id: articleDomain.id,
        title: articleDomain.title,
        content: articleDomain.description,
    }));
    return articles;
};

export const getArticles = async (): Promise<IArticleApi[]> => {
    const articlesDomain: IArticleDomain[] = await getArticlesDomain({
        articlesOutput: outputs.articlesOutput,
    });
    const articles = convertDomainToApiModel(articlesDomain);
    return articles;
};

export const addArticle = async (articleTitle: string, articleDescription: string): Promise<boolean> => {
    const isComplete: boolean = await addArticleDomain({
        articlesOutput: outputs.articlesOutput,
        articleTitle,
        articleDescription,
    });
    return isComplete;
};

export const removeArticle = async (articleId: number): Promise<boolean> => {
    const isComplete: boolean = await removeArticleDomain({
        articlesOutput: outputs.articlesOutput,
        articleId,
    });
    return isComplete;
};
