import express from 'express';
import { profileData, skillsData, projectsData, blogsData, resumeData, ContactMessage } from '../data';

const router = express.Router();

// Get profile data
router.get('/profile', (req, res) => {
  res.json(profileData);
});

// Get skills data
router.get('/skills', (req, res) => {
  res.json(skillsData);
});

// Get projects data
router.get('/projects', (req, res) => {
  res.json(projectsData);
});

// Get single project by ID
router.get('/projects/:id', (req, res) => {
  const project = projectsData.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

// Get blogs data
router.get('/blogs', (req, res) => {
  res.json(blogsData);
});

// Get resume data
router.get('/resume-data', (req, res) => {
  res.json(resumeData);
});

// Contact form submission
router.post('/contact', (req, res) => {
  const { name, email, subject, message }: ContactMessage = req.body;
  
  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  // In a real application, you would send an email here
  // For now, we'll just log the message and return success
  console.log('Contact form submission:', { name, email, subject, message });
  
  res.json({ success: true, message: 'Message sent successfully!' });
});

export default router;