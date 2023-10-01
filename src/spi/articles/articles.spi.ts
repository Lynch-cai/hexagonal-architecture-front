import { type IArticle as IArticleSpi } from "@/spi/articles/interfaces/IArticle";
import { type IArticle as IArticleDomain } from "@/domain/articles/interfaces/IArticle";
import { type IArticleOutput } from "@/domain/articles/interfaces/IArticleOutput";

export class ArticlesLocalStorage implements IArticleOutput {
    convertSpiToDomainModel(articleSpi: IArticleSpi[]): IArticleDomain[] {
        return articleSpi.map((articleSpi: IArticleSpi) => ({
            id: articleSpi.id,
            title: articleSpi.title,
            description: articleSpi.text,
        }));
    }

    async getArticles(): Promise<IArticleDomain[]> {
        const articles: string | null = localStorage.getItem("articles");
        return Promise.resolve(articles ? this.convertSpiToDomainModel(JSON.parse(articles)) : []);
    }

    async addArticle(articleTitle: string, articleText: string): Promise<boolean> {
        if (!articleTitle) return false;

        const articles: string | null = localStorage.getItem("articles");
        if (articles) {
            const articlesParsed: IArticleSpi[] = JSON.parse(articles);
            if (articlesParsed.length) {
                const newArticle: IArticleSpi = {
                    id: articlesParsed[articlesParsed.length - 1].id + 1,
                    title: articleTitle,
                    text: articleText,
                };
                localStorage.setItem("articles", JSON.stringify([...articlesParsed, newArticle]));
                return true;
            }
        }
        const newArticle: IArticleSpi = {
            id: 1,
            title: articleTitle,
            text: articleText,
        };
        localStorage.setItem("articles", JSON.stringify([newArticle]));
        return true;
    }

    async removeArticle(articleId: number): Promise<boolean> {
        if (articleId < 0) return false;

        const articles: string | null = localStorage.getItem("articles");
        if (articles) {
            const articlesParsed: IArticleSpi[] = JSON.parse(articles);
            if (articlesParsed) {
                const removedIndex = articlesParsed.findIndex((article) => article.id === articleId);
                if (removedIndex < 0) return false;
                const newArticles = articlesParsed.slice(0, removedIndex).concat(articlesParsed.slice(removedIndex + 1, articlesParsed.length));
                localStorage.setItem("articles", JSON.stringify(newArticles));
                return true;
            }
            localStorage.setItem("articles", "[]");
            return true;
        }
        return false;
    }

    setArticles(articles: IArticleSpi[]): boolean {
        try {
            localStorage.setItem("articles", JSON.stringify(articles));
            return true;
        } catch (error) {
            return false;
        }
    }
}
