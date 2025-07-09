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

    const sectionHandlers = {
      [CV_SECTIONS.EDUCATION]: () => cvService.formatEducation(cvData.education),
      [CV_SECTIONS.CERTIFICATIONS]: () => cvService.formatCertifications(cvData.certifications),
      [CV_SECTIONS.DEVELOPMENT]: () => cvService.formatProjects(cvData.projects),
      [CV_SECTIONS.RESEARCH]: () => cvService.formatProjects(cvData.projects, 'Research'),
      [CV_SECTIONS.COURSES]: () => cvService.formatCertifications(cvData.certifications),
      [CV_SECTIONS.CONTACT]: () => cvService.formatContact(cvData.contact),
      [CV_SECTIONS.ABOUT]: () => {
        const contactContent = cvService.formatContact(cvData.contact);
        const skillsContent = cvService.formatSkills(cvData.skills);
        const experienceContent = cvService.formatExperience(cvData.experience);
        return `${contactContent}\n\n${skillsContent}\n\n${experienceContent}`;
      }
    };

    const handler = sectionHandlers[section];
    if (!handler) return 'Section not found';

    const rawContent = handler();
    return cvService.formatContentForCards(rawContent, section);
  }, [cvData, loading]);

  return {
    cvData,
    loading,
    error,
    getContentForSection
  };
}; 