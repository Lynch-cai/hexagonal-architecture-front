import { type IArticle } from "@/domain/articles/interfaces/IArticle";

export interface IArticleOutput {
    getArticles(): Promise<IArticle[]>;
    addArticle(articleTitle: string, articleDescription: string): Promise<boolean>;
    removeArticle(articleId: number): Promise<boolean>;
}
