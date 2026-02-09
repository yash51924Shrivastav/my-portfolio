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
        margin: 0,
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
      <div className="space-y-6 text-left">
        <div className="border-b border-gray-300 pb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
            <User size={18} />
            Contact Information
          </h3>
          <div className="text-gray-700 space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-blue-600" />
              <span>{resumeData.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-green-600" />
              <span>{resumeData.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-red-600" />
              <span>{resumeData.location}</span>
            </div>
            {resumeData.linkedin && (
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-semibold text-xs">LinkedIn:</span>
                <span>{resumeData.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        <div className="border-b border-gray-300 pb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            Professional Summary
          </h3>
          <p className="text-gray-700 leading-relaxed text-sm">
            {resumeData.summary}
          </p>
        </div>

        <div className="border-b border-gray-300 pb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Award size={18} />
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Frontend:</h4>
              <p className="text-gray-700">{resumeData.skills.frontend.join(', ')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Backend:</h4>
              <p className="text-gray-700">{resumeData.skills.backend.join(', ')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Databases:</h4>
              <p className="text-gray-700">{resumeData.skills.databases.join(', ')}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Tools:</h4>
              <p className="text-gray-700">{resumeData.skills.tools.join(', ')}</p>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-300 pb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Briefcase size={18} />
            Experience
          </h3>
          <div className="space-y-3">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-blue-500 pl-3">
                <h4 className="font-semibold text-gray-800 text-sm">{exp.title}</h4>
                <p className="text-gray-600 text-xs mb-1">{exp.company} | {exp.period}</p>
                <ul className="list-disc list-inside space-y-0.5">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-xs text-gray-700 leading-snug">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-b border-gray-300 pb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
            <GraduationCap size={18} />
            Education
          </h3>
          <div className="space-y-2">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-green-500 pl-3">
                <h4 className="font-semibold text-gray-800 text-sm">{edu.degree}</h4>
                <p className="text-gray-600 text-xs">{edu.institution} | {edu.period}</p>
              </div>
            ))}
          </div>
        </div>

        {resumeData.certificates && resumeData.certificates.length > 0 && (
          <div className="border-t border-gray-300 pt-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Award size={18} />
              Certificates
            </h3>
            <div className="space-y-2">
              {resumeData.certificates.map((cert, index) => (
                <div key={index} className="border-l-2 border-purple-500 pl-3">
                  <h4 className="font-semibold text-gray-800 text-sm">{cert.name}</h4>
                  <p className="text-gray-600 text-xs">{cert.issuer} | {cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Resume
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            My professional experience and qualifications
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
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
            
            {/* Download Buttons Moved Here */}
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
             <button
                onClick={downloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
                <Download size={18} />
                Generate PDF
            </button>
          </div>

          {/* Resume Content as A4 Paper */}
          {isPreviewMode && (
            <div className="flex justify-center overflow-auto pb-10">
              <div 
                id="resume-content" 
                className="bg-white text-gray-900 shadow-2xl mx-auto p-[10mm] md:p-[15mm]"
                style={{
                  width: '210mm',
                  minHeight: '297mm',
                  maxWidth: '100%',
                }}
              >
                <div className="text-center mb-6">
                  <h1 className="text-3xl font-bold text-gray-800 mb-1">
                    {resumeData.name}
                  </h1>
                  <p className="text-lg text-gray-600">
                    {resumeData.title}
                  </p>
                </div>
                
                {renderResumeContent()}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Resume;