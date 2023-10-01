import { describe, expect, it, beforeEach } from "vitest";

import { getArticles, addArticle, removeArticle } from "@/domain/articles/articles.domain";
import { ArticlesLocalStorage } from "@/spi/articles/articles.spi";
import { fakesSpiArticles } from "@/spi/articles/fakeSpiArticles";

import { type IArticle as IArticleDomain } from "@/domain/articles/interfaces/IArticle";
import { type IArticle as IArticleApi } from "@/api/articles/interfaces/IArticle";

describe("Articles unit tests", () => {
    const articlesOutput = new ArticlesLocalStorage();

    beforeEach(() => {
        articlesOutput.setArticles([]);
    });

    describe("when user want to get the articles", () => {
        it("should return no article if there's no article", async () => {
            const articles: IArticleDomain[] = await getArticles({ articlesOutput });
            expect(articles).toEqual([]);
        });
        it("should return the articles if there's articles", async () => {
            articlesOutput.setArticles(fakesSpiArticles);
            const articles: IArticleDomain[] = await getArticles({ articlesOutput });
            expect(articles).toEqual(articlesOutput.convertSpiToDomainModel(fakesSpiArticles));
        });
    });

    describe("when user want to add an article", () => {
        it("should return success if it has title and content", async () => {
            const article: IArticleApi = {
                id: -1, // -1 is a fake id it will be replaced by the domain
                title: "Article 1",
                content: "Content 1",
            };
            const isSuccess: Boolean = await addArticle({ articlesOutput, articleTitle: article.title, articleDescription: article.content });
            expect(isSuccess).toEqual(true);
        });
        it("should return success if it has title", async () => {
            const article: IArticleApi = {
                id: -1, // -1 is a fake id it will be replaced by the domain
                title: "Article 1",
                content: "",
            };
            const isSuccess: Boolean = await addArticle({ articlesOutput, articleTitle: article.title, articleDescription: article.content });
            expect(isSuccess).toEqual(true);
        });
        it("should return error if it has not title", async () => {
            const article: IArticleApi = {
                id: -1, // -1 is a fake id it will be replaced by the domain
                title: "",
                content: "Content 1",
            };
            const isSuccess: Boolean = await addArticle({ articlesOutput, articleTitle: article.title, articleDescription: article.content });
            expect(isSuccess).toEqual(false);
        });
    });

    describe("when user want to add an article and get the articles", () => {
        it("should return the articles with the new article", async () => {
            articlesOutput.setArticles(fakesSpiArticles);
            const article: IArticleApi = {
                id: -1, // -1 is a fake id it will be replaced by the domain
                title: "Article 1",
                content: "Content 1",
            };
            await addArticle({ articlesOutput, articleTitle: article.title, articleDescription: article.content });
            const articles: IArticleDomain[] = await getArticles({ articlesOutput });
            expect(articles).toEqual(articlesOutput.convertSpiToDomainModel([...fakesSpiArticles, { id: 3, title: article.title, text: article.content }]));
        });
    });

    describe("when user want to remove an article", () => {
        it("should return success if it has an article id", async () => {
            articlesOutput.setArticles(fakesSpiArticles);
            const articleId: number = 1;
            const isSuccess: Boolean = await removeArticle({ articlesOutput, articleId });
            expect(isSuccess).toEqual(true);
        });
        it("should return error if it has an invalid article id", async () => {
            articlesOutput.setArticles(fakesSpiArticles);
            const articleId: number = -1;
            const isSuccess: Boolean = await removeArticle({ articlesOutput, articleId });
            expect(isSuccess).toEqual(false);
        });
        it("should return error if it didn't found the id", async () => {
            articlesOutput.setArticles(fakesSpiArticles);
            const articleId: number = 3;
            const isSuccess: Boolean = await removeArticle({ articlesOutput, articleId });
            expect(isSuccess).toEqual(false);
        });
    });

    describe("when user want to remove an article and get the articles", () => {
        it("should return the articles without the removed article", async () => {
            // Remove the first article
            articlesOutput.setArticles(fakesSpiArticles);
            const articleId1: number = 1;
            await removeArticle({ articlesOutput, articleId: articleId1 });
            const articles1: IArticleDomain[] = await getArticles({ articlesOutput });
            expect(articles1).toEqual(articlesOutput.convertSpiToDomainModel([fakesSpiArticles[1]]));

            // Remove the second article
            articlesOutput.setArticles(fakesSpiArticles);
            const articleId2: number = 2;
            await removeArticle({ articlesOutput, articleId: articleId2 });
            const articles2: IArticleDomain[] = await getArticles({ articlesOutput });
            expect(articles2).toEqual(articlesOutput.convertSpiToDomainModel([fakesSpiArticles[0]]));
        });
    });
});
