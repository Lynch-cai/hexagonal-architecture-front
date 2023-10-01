<script lang="ts">
import { type IArticle } from "@/api/articles/interfaces/IArticle";
import { getArticles, addArticle, removeArticle } from "@/api/articles/articles.api";
import Button from "@/application/components/Button.vue";

export default {
    components: { Button },
    data() {
        return {
            articles: [] as IArticle[],
            articleTitle: "" as IArticle["title"],
            articleContent: "" as IArticle["content"],
        };
    },
    async mounted() {
        this.articles = await getArticles();
    },
    methods: {
        async addArticle(articleTitle: IArticle["title"], articleContent: IArticle["content"]) {
            await addArticle(articleTitle, articleContent);
            this.articles = await getArticles();
        },
        async removeArticle(articleId: IArticle["id"]) {
            await removeArticle(articleId);
            this.articles = await getArticles();
        },
        clearInputs() {
            this.articleTitle = "";
            this.articleContent = "";
        },
    },
};
</script>

<template>
    <div class="list-article-container">
        <div class="add-article-container">
            <h2 class="add-article-title">Ajouter un article</h2>
            <div class="input-container">
                <label class="label" for="article-title">Titre de l'article</label>
                <input class="input" id="article-title" v-model="articleTitle" type="text" placeholder="Veuillez donner un titre à votre article" />
            </div>
            <div class="input-container">
                <label class="label" for="article-content">Contenu de l'article</label>
                <textarea class="textarea" id="article-content" v-model="articleContent" type="text" placeholder="Veuillez entrer le contenu de l'article"></textarea>
            </div>
            <Button
                type="primary"
                @click="
                    addArticle(articleTitle, articleContent);
                    clearInputs();
                "
            >
                Ajouter un article
            </Button>
        </div>

        <div class="articles-container">
            <ul>
                <li v-for="article in articles" :key="article.id">
                    <div class="article-container">
                        <div class="article-body">
                            <h2 class="article-title">{{ article.title }}</h2>
                            <p class="article-content">{{ article.content }}</p>
                        </div>
                        <Button type="error" @click.prevent="removeArticle(article.id)">Supprimer cet article</Button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
