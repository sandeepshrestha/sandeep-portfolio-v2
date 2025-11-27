import { PORTFOLIO_DATA, CONVERSATIONAL_PHRASES } from '../data/portfolioData';

export const getRandomResponse = (category) => {
  const phrases = CONVERSATIONAL_PHRASES[category];
  return phrases[Math.floor(Math.random() * phrases.length)];
};

export const generateResponse = (query) => {
  const responses = [];

  // Greetings
  if (query.match(/\b(hi|hello|hey|greetings|sup)\b/)) {
    responses.push({ type: 'text', content: getRandomResponse('greeting') });
    return responses;
  }

  // Data Queries
  if (query.includes('experience') || query.includes('work') || query.includes('job') || query.includes('history')) {
    responses.push({ type: 'text', content: getRandomResponse('experience') });
    responses.push({ type: 'experience', content: PORTFOLIO_DATA.experience });
    return responses;
  }
  if (query.includes('skill') || query.includes('stack') || query.includes('tech')) {
    responses.push({ type: 'text', content: getRandomResponse('skills') });
    responses.push({ type: 'skills', content: PORTFOLIO_DATA.skills });
    return responses;
  }
  if (query.includes('project') || query.includes('build') || query.includes('portfolio')) {
    responses.push({ type: 'text', content: getRandomResponse('projects') });
    responses.push({ type: 'projects', content: PORTFOLIO_DATA.projects });
    return responses;
  }
  if (query.includes('contact') || query.includes('email') || query.includes('reach')) {
    responses.push({ type: 'text', content: getRandomResponse('contact') });
    responses.push({ type: 'contact', content: PORTFOLIO_DATA.contact });
    return responses;
  }
  if (query.includes('about') || query.includes('who') || query.includes('sandeep')) {
    responses.push({ type: 'text', content: getRandomResponse('about') });
    responses.push({ type: 'about', content: PORTFOLIO_DATA.about });
    return responses;
  }
  
  // Default / Unknown
  responses.push({
    type: 'text',
    content: getRandomResponse('unknown')
  });
  return responses;
};
