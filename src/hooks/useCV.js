import { useState, useEffect, useCallback } from 'react';
import { cvService } from '../services/cvService';
import { CV_SECTIONS } from '../config/cv';

export const useCV = (language) => {
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCV = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cvService.fetchCV(language);
      setCvData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    loadCV();
  }, [loadCV]);

  const getContentForSection = useCallback((section) => {
    if (loading || !cvData) {
      return loading ? 'Loading...' : 'No data available';
    }

    switch (section) {
      case CV_SECTIONS.EDUCATION:
        return cvService.formatEducation(cvData.education);
      case CV_SECTIONS.CERTIFICATIONS:
        return cvService.formatCertifications(cvData.certifications);
      case CV_SECTIONS.DEVELOPMENT:
        return cvService.formatProjects(cvData.projects);
      case CV_SECTIONS.RESEARCH:
        return cvService.formatProjects(cvData.projects, 'Research');
      case CV_SECTIONS.COURSES:
        return cvService.formatCertifications(cvData.certifications);
      case CV_SECTIONS.CONTACT:
        return cvService.formatContact(cvData.contact);
      case CV_SECTIONS.ABOUT:
        return `${cvService.formatContact(cvData.contact)}\n\n${cvService.formatSkills(cvData.skills)}\n\n${cvService.formatExperience(cvData.experience)}`;
      default:
        return 'Section not found';
    }
  }, [cvData, loading]);

  return {
    cvData,
    loading,
    error,
    getContentForSection
  };
}; 