import React from 'react';
import ReactMarkdown from 'react-markdown';
import DOMPurify from 'dompurify';

const sanitizedMarkdown = markdown => {
  const sanitizedHtml = DOMPurify.sanitize(markdown);
  return sanitizedHtml;
};

export default sanitizedMarkdown;
