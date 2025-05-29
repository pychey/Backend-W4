import { journalists } from '../models/journalistModel.js';
import { articles } from '../models/articleModel.js';

let nextId = Math.max(...journalists.map(j => j.id)) + 1;

export const getAllJournalists = (req, res) => {
    res.status(200).json({
        success: true,
        data: journalists,
        count: journalists.length
    });
};

export const getJournalistById = (req, res) => {
    const id = parseInt(req.params.id);
    const journalist = journalists.find(j => j.id === id);
    
    if (!journalist) {
        return res.status(404).json({
            success: false,
            message: 'Journalist not found'
        });
    }
    
    res.status(200).json({
        success: true,
        data: journalist
    });
};

export const createJournalist = (req, res) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: 'Please provide name and email'
        });
    }
    
    const existingJournalist = journalists.find(j => j.email === email);
    if (existingJournalist) {
        return res.status(409).json({
            success: false,
            message: 'Email already exists'
        });
    }
    
    const newJournalist = {
        id: nextId++,
        name,
        email
    };
    
    journalists.push(newJournalist);
    
    res.status(201).json({
        success: true,
        data: newJournalist
    });
};

export const updateJournalist = (req, res) => {
    const id = parseInt(req.params.id);
    const journalistIndex = journalists.findIndex(j => j.id === id);
    
    if (journalistIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Journalist not found'
        });
    }
    
    const { name, email } = req.body;
    
    if (email) {
        const existingJournalist = journalists.find(j => j.email === email && j.id !== id);
        if (existingJournalist) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists'
            });
        }
    }
    
    if (name) journalists[journalistIndex].name = name;
    if (email) journalists[journalistIndex].email = email;
    
    res.status(200).json({
        success: true,
        data: journalists[journalistIndex]
    });
};

export const deleteJournalist = (req, res) => {
    const id = parseInt(req.params.id);
    const journalistIndex = journalists.findIndex(j => j.id === id);
    
    if (journalistIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Journalist not found'
        });
    }
    
    const deletedJournalist = journalists.splice(journalistIndex, 1)[0];
    
    res.status(200).json({
        success: true,
        message: 'Journalist deleted successfully',
        data: deletedJournalist
    });
};

export const getArticlesByJournalist = (req, res) => {
    const id = parseInt(req.params.id);
    const journalist = journalists.find(j => j.id === id);
    
    if (!journalist) {
        return res.status(404).json({
            success: false,
            message: 'Journalist not found'
        });
    }
    
    const journalistArticles = articles.filter(a => a.journalistId === id);
    
    res.status(200).json({
        success: true,
        data: {
            journalist,
            articles: journalistArticles,
            count: journalistArticles.length
        }
    });
};