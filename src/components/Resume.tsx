import React, { useState, useEffect } from 'react';
import { Download, Eye, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';
import html2pdf from 'html2pdf.js';

interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  summary: string;
  skills: {
    frontend: string[];
    backend: string[];
    databases: string[];
    tools: string[];
  };
  experience: Array<{
    title: string;
    company: string;
    period: string;
    achievements: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    period: string;
  }>;
  certificates?: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
}

interface ResumeProps {
  resumeData: ResumeData;
}

const Resume: React.FC<ResumeProps> = ({ resumeData }) => {
  const [isPreviewMode, setIsPreviewMode] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [docUrl, setDocUrl] = useState<string | null>(null);

  useEffect(() => {
    const pdfPath = '/yash-shrivastav.pdf';
    const docxPath = '/yash-shrivastav.docx';
    const docPath = '/yash-shrivastav.doc';

    const checkFile = async (url: string) => {
      try {
        const res = await fetch(url, { method: 'HEAD' });
        return res.ok;
      } catch {
        return false;
      }
    };

    (async () => {
      if (await checkFile(pdfPath)) {
        setPdfUrl(pdfPath);
      }
      if (await checkFile(docxPath)) {
        setDocUrl(docxPath);
      } else if (await checkFile(docPath)) {
        setDocUrl(docPath);
      }
    })();
  }, []);

  const downloadPDF = async () => {
    setIsDownloading(true);
    try {
      const element = document.getElementById('resume-content');
      if (!element) return;

      const opt = {
        margin: 10,
        filename: `${resumeData.name.replace(/\s+/g, '_')}_Resume.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(resumeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.name.replace(/\s+/g, '_')}_Resume.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderResumeContent = () => {
    return (
      <div className="space-y-8">
        <div className="border-b border-gray-300 pb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <User size={20} />
            Contact Information
          </h3>
          <div className="text-gray-700 dark:text-gray-300 space-y-2">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-blue-600" />
              <span>{resumeData.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-green-600" />
              <span>{resumeData.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-red-600" />
              <span>{resumeData.location}</span>
            </div>
            {resumeData.linkedin && (
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-semibold">LinkedIn:</span>
                <span>{resumeData.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        <div className="border-b border-gray-300 pb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Professional Summary
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {resumeData.summary}
          </p>
        </div>

        <div className="border-b border-gray-300 pb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Award size={20} />
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Frontend:</h4>
              <p className="text-gray-700 dark:text-gray-300">{resumeData.skills.frontend.join(', ')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Backend:</h4>
              <p className="text-gray-700 dark:text-gray-300">{resumeData.skills.backend.join(', ')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Databases:</h4>
              <p className="text-gray-700 dark:text-gray-300">{resumeData.skills.databases.join(', ')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Tools:</h4>
              <p className="text-gray-700 dark:text-gray-300">{resumeData.skills.tools.join(', ')}</p>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-300 pb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Briefcase size={20} />
            Experience
          </h3>
          <div className="space-y-4">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800 dark:text-white">{exp.title}</h4>
                <p className="text-gray-600 dark:text-gray-400">{exp.company} | {exp.period}</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-sm text-gray-700 dark:text-gray-300">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <GraduationCap size={20} />
            Education
          </h3>
          <div className="space-y-3">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-800 dark:text-white">{edu.degree}</h4>
                <p className="text-gray-600 dark:text-gray-400">{edu.institution} | {edu.period}</p>
              </div>
            ))}
          </div>
        </div>

        {resumeData.certificates && resumeData.certificates.length > 0 && (
          <div className="border-t border-gray-300 pt-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Award size={20} />
              Certificates
            </h3>
            <div className="space-y-3">
              {resumeData.certificates.map((cert, index) => (
                <div key={index} className="border-l-2 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white">{cert.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{cert.issuer} | {cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Resume
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            My professional experience and qualifications
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-4">
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isPreviewMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Eye size={18} />
                {isPreviewMode ? 'Hide Preview' : 'Show Preview'}
              </button>
            </div>
          </div>

          {/* Resume Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {isPreviewMode && (
              <div id="resume-content" className="p-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {resumeData.name}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {resumeData.title}
                  </p>
                </div>
                
                {renderResumeContent()}

                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Downloads
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {pdfUrl && (
                      <a
                        href={pdfUrl}
                        download
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Download size={18} />
                        PDF
                      </a>
                    )}
                    {docUrl && (
                      <a
                        href={docUrl}
                        download
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <Download size={18} />
                        DOC
                      </a>
                    )}
                    {/* Removed JSON and Export to PDF buttons as requested */}
                  </div>
                </div>
              </div>
            )}
            
            {!isPreviewMode && (
              <div className="p-8 text-center">
                <div className="mb-6">
                  <Eye size={64} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    Resume Preview Hidden
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Click "Show Preview" to view the resume, or download it directly.
                  </p>
                </div>
              </div>
            )}
          </div>


        </div>
      </div>
    </section>
  );
};

export default Resume;
