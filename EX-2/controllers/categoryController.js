import { categories } from '../models/categoryModel.js';
import { articles } from '../models/articleModel.js';

let nextId = Math.max(...categories.map(c => c.id)) + 1;

export const getAllCategories = (req, res) => {
    res.status(200).json({
        success: true,
        data: categories,
        count: categories.length
    });
};

export const getCategoryById = (req, res) => {
    const id = parseInt(req.params.id);
    const category = categories.find(c => c.id === id);
    
    if (!category) {
        return res.status(404).json({
            success: false,
            message: 'Category not found'
        });
    }
    
    res.status(200).json({
        success: true,
        data: category
    });
};

export const createCategory = (req, res) => {
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({
            success: false,
            message: 'Please provide category name'
        });
    }
    
    const existingCategory = categories.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (existingCategory) {
        return res.status(409).json({
            success: false,
            message: 'Category name already exists'
        });
    }
    
    const newCategory = {
        id: nextId++,
        name
    };
    
    categories.push(newCategory);
    
    res.status(201).json({
        success: true,
        data: newCategory
    });
};

export const updateCategory = (req, res) => {
    const id = parseInt(req.params.id);
    const categoryIndex = categories.findIndex(c => c.id === id);
    
    if (categoryIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Category not found'
        });
    }
    
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({
            success: false,
            message: 'Please provide category name'
        });
    }
    
    const existingCategory = categories.find(c => c.name.toLowerCase() === name.toLowerCase() && c.id !== id);
    if (existingCategory) {
        return res.status(409).json({
            success: false,
            message: 'Category name already exists'
        });
    }
    
    categories[categoryIndex].name = name;
    
    res.status(200).json({
        success: true,
        data: categories[categoryIndex]
    });
};

// Delete category
export const deleteCategory = (req, res) => {
    const id = parseInt(req.params.id);
    const categoryIndex = categories.findIndex(c => c.id === id);
    
    if (categoryIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Category not found'
        });
    }
    
    const deletedCategory = categories.splice(categoryIndex, 1)[0];
    
    res.status(200).json({
        success: true,
        message: 'Category deleted successfully',
        data: deletedCategory
    });
};

export const getArticlesByCategory = (req, res) => {
    const id = parseInt(req.params.id);
    const category = categories.find(c => c.id === id);
    
    if (!category) {
        return res.status(404).json({
            success: false,
            message: 'Category not found'
        });
    }
    
    const categoryArticles = articles.filter(a => a.categoryId === id);
    
    res.status(200).json({
        success: true,
        data: {
            category,
            articles: categoryArticles,
            count: categoryArticles.length
        }
    });
};