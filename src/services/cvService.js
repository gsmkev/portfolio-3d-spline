import yaml from 'js-yaml';
import { CV_CONFIG, CV_SECTIONS, MODAL_TITLES } from '../config/cv';

export const cvService = {
  async fetchCV(language = CV_CONFIG.LANGUAGES.EN) {
    try {
      const fileName = language === CV_CONFIG.LANGUAGES.ES ? CV_CONFIG.FILES.ES : CV_CONFIG.FILES.EN;
      const url = `${CV_CONFIG.GIST_BASE_URL}/${fileName}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const yamlText = await response.text();
      return yaml.load(yamlText);
    } catch (error) {
      console.error('Error fetching CV:', error);
      return null;
    }
  },

  formatEducation(education) {
    if (!education || !Array.isArray(education)) {
      return 'No education data available';
    }
    
    return education.map(edu => {
      const period = `${edu.start_date} - ${edu.end_date}`;
      const location = edu.location || '';
      const gpa = edu.gpa ? ` (GPA: ${edu.gpa})` : '';
      
      let highlights = '';
      if (edu.highlights && Array.isArray(edu.highlights)) {
        highlights = '\n• ' + edu.highlights.join('\n• ');
      }
      if (edu.achievements && Array.isArray(edu.achievements)) {
        highlights = '\n• ' + edu.achievements.join('\n• ');
      }
      
      return `🎓 ${edu.institution}\n${edu.degree}${gpa}\n📍 ${location} | 📅 ${period}${highlights}`;
    }).join('\n\n');
  },

  formatCertifications(certifications) {
    if (!certifications || !Array.isArray(certifications)) {
      return 'No certifications data available';
    }
    
    return certifications.map(cert => {
      const date = cert.date || `${cert.valid_from} - ${cert.valid_to}`;
      const credential = cert.credential_id ? `\n🆔 Credential ID: ${cert.credential_id}` : '';
      
      let highlights = '';
      if (cert.highlights && Array.isArray(cert.highlights)) {
        highlights = '\n• ' + cert.highlights.join('\n• ');
      }
      
      return `🏆 ${cert.name}\n🏢 ${cert.issuer}\n📅 ${date}${credential}${highlights}`;
    }).join('\n\n');
  },

  formatExperience(experience) {
    if (!experience || !Array.isArray(experience)) {
      return 'No experience data available';
    }
    
    return experience.map(exp => {
      const period = `${exp.start_date} - ${exp.end_date}`;
      
      let responsibilities = '';
      if (exp.responsibilities && Array.isArray(exp.responsibilities)) {
        responsibilities = '\n• ' + exp.responsibilities.join('\n• ');
      }
      
      return `💼 ${exp.role}\n🏢 ${exp.company}\n📍 ${exp.location} | 📅 ${period}${responsibilities}`;
    }).join('\n\n');
  },

  formatProjects(projects, type = null) {
    if (!projects || !Array.isArray(projects)) {
      return 'No projects data available';
    }
    
    let filteredProjects = projects;
    if (type) {
      filteredProjects = projects.filter(p => p.type === type);
    }
    
    return filteredProjects.map(project => {
      const tech = project.tech && Array.isArray(project.tech) ? `\n🛠️ Tech: ${project.tech.join(', ')}` : '';
      
      let highlights = '';
      if (project.highlights && Array.isArray(project.highlights)) {
        highlights = '\n• ' + project.highlights.join('\n• ');
      }
      
      return `🚀 ${project.name} (${project.type})${tech}${highlights}`;
    }).join('\n\n');
  },

  formatSkills(skills) {
    if (!skills) {
      return 'No skills data available';
    }
    
    const sections = [];
    for (const [category, skillList] of Object.entries(skills)) {
      if (Array.isArray(skillList) && skillList.length > 0) {
        const categoryName = category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        sections.push(`🔧 ${categoryName}:\n• ${skillList.join('\n• ')}`);
      }
    }
    
    return sections.join('\n\n');
  },

  formatContact(contact) {
    if (!contact) {
      return 'No contact data available';
    }
    
    const contactInfo = [];
    if (contact.phone) contactInfo.push(`📞 ${contact.phone}`);
    if (contact.email) contactInfo.push(`📧 ${contact.email}`);
    if (contact.linkedin) contactInfo.push(`💼 ${contact.linkedin}`);
    if (contact.github) contactInfo.push(`🐙 ${contact.github}`);
    
    return contactInfo.join('\n');
  },

  getModalTitle(section) {
    return MODAL_TITLES[section] || 'Información';
  }
}; 