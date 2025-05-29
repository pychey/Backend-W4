import { articles } from '../models/articleModel.js';

let nextId = Math.max(...articles.map(a => a.id)) + 1;

export const getAllArticles = (req, res) => {
    res.status(200).json({
        success: true,
        data: articles,
        count: articles.length
    });
};

export const getArticleById = (req, res) => {
    const id = parseInt(req.params.id);
    const article = articles.find(a => a.id === id);
    
    if (!article) {
        return res.status(404).json({
            success: false,
            message: 'Article not found'
        });
    }
    
    res.status(200).json({
        success: true,
        data: article
    });
};

export const createArticle = (req, res) => {
    const { title, content, journalistId, categoryId } = req.body;
    
    if (!title || !content || !journalistId || !categoryId) {
        return res.status(400).json({
            success: false,
            message: 'Please provide title, content, journalistId, and categoryId'
        });
    }
    
    const newArticle = {
        id: nextId++,
        title,
        content,
        journalistId: parseInt(journalistId),
        categoryId: parseInt(categoryId)
    };
    
    articles.push(newArticle);
    
    res.status(201).json({
        success: true,
        data: newArticle
    });
};

export const updateArticle = (req, res) => {
    const id = parseInt(req.params.id);
    const articleIndex = articles.findIndex(a => a.id === id);
    
    if (articleIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Article not found'
        });
    }
    
    const { title, content, journalistId, categoryId } = req.body;
    
    if (title) articles[articleIndex].title = title;
    if (content) articles[articleIndex].content = content;
    if (journalistId) articles[articleIndex].journalistId = parseInt(journalistId);
    if (categoryId) articles[articleIndex].categoryId = parseInt(categoryId);
    
    res.status(200).json({
        success: true,
        data: articles[articleIndex]
    });
};

export const deleteArticle = (req, res) => {
    const id = parseInt(req.params.id);
    const articleIndex = articles.findIndex(a => a.id === id);
    
    if (articleIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Article not found'
        });
    }
    
    const deletedArticle = articles.splice(articleIndex, 1)[0];
    
    res.status(200).json({
        success: true,
        message: 'Article deleted successfully',
        data: deletedArticle
    });
};