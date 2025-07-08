<<<<<<< HEAD
import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Mail, Phone, MapPin, Linkedin, Globe, User, X } from 'lucide-react';
import { SKILL_LIST } from '../skillList.js';
import jsPDF from 'jspdf';
=======
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import {
  Download,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Plus,
  Trash2,
  Save,
} from "lucide-react";
>>>>>>> a205ab74a15fbee82adccf6f40bb245a98b484f3

const ResumeBuilder = () => {
  const { user } = useAuth();
  const [resumeData, setResumeData] = useState({
<<<<<<< HEAD
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
    experience: [
      { title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' }
    ],
    education: [
      { degree: '', school: '', location: '', graduationDate: '', gpa: '' }
    ],
    skills: [],
    projects: [
      { name: '', description: '', technologies: '', link: '' }
=======
    personalInfo: {
      fullName: user?.name || "",
      email: user?.email || "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
    },
    summary: "",
    experience: [
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        school: "",
        location: "",
        graduationDate: "",
        gpa: "",
      },
    ],
    skills: [""],
    projects: [
      {
        name: "",
        description: "",
        technologies: "",
        link: "",
      },
>>>>>>> a205ab74a15fbee82adccf6f40bb245a98b484f3
    ],
    achievements: [""],
  });

<<<<<<< HEAD
  // Handlers for updating fields
  const updateField = (field, value) => setResumeData(prev => ({ ...prev, [field]: value }));
  const updateArrayField = (section, idx, field, value) => {
    setResumeData(prev => {
      const arr = [...prev[section]];
      arr[idx][field] = value;
      return { ...prev, [section]: arr };
    });
  };
  const updateArraySimple = (section, idx, value) => {
    setResumeData(prev => {
      const arr = [...prev[section]];
      arr[idx] = value;
      return { ...prev, [section]: arr };
    });
  };
  const addArrayItem = (section, template) => {
    setResumeData(prev => ({ ...prev, [section]: [...prev[section], template] }));
  };
  const removeArrayItem = (section, idx) => {
    setResumeData(prev => {
      const arr = [...prev[section]];
      arr.splice(idx, 1);
      return { ...prev, [section]: arr };
    });
  };

  // Form submit (save to backend)
  const [submitStatus, setSubmitStatus] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    // Prepare data for saving: filter out empty skills
    const dataToSave = {
      ...resumeData,
      skills: resumeData.skills.filter(Boolean)
    };
    // Generate PDF (two-column layout)
    const doc = new jsPDF();
    // Margins and column positions
    const leftX = 20, rightX = 115, colWidth = 75, lineHeight = 8;
    let y = 20;
    // Header: Resume and Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('RESUME', 105, y, { align: 'center' });
    y += 12;
    doc.setFontSize(28);
    doc.text(resumeData.fullName || 'Your Name', 105, y, { align: 'center' });
    y += 10;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.setDrawColor(180);
    doc.line(20, y, 190, y); // horizontal line
    y += 6;
    // --- Left Column ---
    let leftY = y;
    // Contact
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('CONTACT', leftX, leftY);
    leftY += lineHeight + 2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    if (resumeData.phone) { doc.text(`${resumeData.phone}`, leftX, leftY); leftY += lineHeight + 2; }
    if (resumeData.email) { doc.text(`${resumeData.email}`, leftX, leftY); leftY += lineHeight + 2; }
    if (resumeData.location) { doc.text(`${resumeData.location}`, leftX, leftY); leftY += lineHeight + 2; }
    if (resumeData.linkedin) { doc.text(`${resumeData.linkedin}`, leftX, leftY); leftY += lineHeight + 2; }
    if (resumeData.website) { doc.text(`${resumeData.website}`, leftX, leftY); leftY += lineHeight + 2; }
    leftY += 8;
    // Education
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('EDUCATION', leftX, leftY);
    leftY += lineHeight + 2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    resumeData.education.forEach(edu => {
      if (edu.degree || edu.school) {
        doc.text(`• ${edu.degree || ''}${edu.degree && edu.school ? ', ' : ''}${edu.school || ''}`, leftX, leftY);
        leftY += lineHeight + 2;
=======
  const [activeSection, setActiveSection] = useState("personalInfo");

  const sections = [
    { id: "personalInfo", label: "Personal Info", icon: User },
    { id: "summary", label: "Summary", icon: FileText },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Award },
    { id: "projects", label: "Projects", icon: FileText },
    { id: "achievements", label: "Achievements", icon: Award },
  ];

  const updateField = (section, field, value, index = null) => {
    setResumeData((prev) => {
      const newData = { ...prev };
      if (index !== null) {
        newData[section][index][field] = value;
      } else if (Array.isArray(newData[section])) {
        const newArray = [...newData[section]];
        newArray[index || 0] = value;
        newData[section] = newArray;
      } else if (typeof newData[section] === "object") {
        newData[section][field] = value;
      } else {
        newData[section] = value;
>>>>>>> a205ab74a15fbee82adccf6f40bb245a98b484f3
      }
    });
<<<<<<< HEAD
    leftY += 8;
    // Skills
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('SKILLS', leftX, leftY);
    leftY += lineHeight + 2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    const skills = resumeData.skills.filter(Boolean);
    let currentLeftX = leftX;
    let currentLeftY = leftY;
    for (let i = 0; i < skills.length; i++) {
      doc.text(`• ${skills[i]}`, currentLeftX, currentLeftY);
      currentLeftY += lineHeight + 1;
      if (currentLeftY > 270) { currentLeftY = y; currentLeftX += 40; } // wrap if too long
    }
    leftY = currentLeftY + 8;
    // --- Right Column ---
    let rightY = y;
    // Projects
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('PROJECTS', rightX, rightY);
    rightY += lineHeight + 2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    resumeData.projects.forEach(proj => {
      if (proj.name) {
        doc.setFont('helvetica', 'bold');
        doc.text(proj.name, rightX, rightY);
        rightY += lineHeight + 1;
        doc.setFont('helvetica', 'normal');
=======
  };

  const addArrayItem = (section) => {
    setResumeData((prev) => {
      const newData = { ...prev };
      if (section === "experience") {
        newData[section].push({
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        });
      } else if (section === "education") {
        newData[section].push({
          degree: "",
          school: "",
          location: "",
          graduationDate: "",
          gpa: "",
        });
      } else if (section === "projects") {
        newData[section].push({
          name: "",
          description: "",
          technologies: "",
          link: "",
        });
      } else {
        newData[section].push("");
>>>>>>> a205ab74a15fbee82adccf6f40bb245a98b484f3
      }
      if (proj.description) {
        const lines = doc.splitTextToSize(proj.description, colWidth);
        lines.forEach(line => { doc.text(line, rightX, rightY); rightY += lineHeight + 1; });
      }
      if (proj.technologies) {
        doc.text(`Tech: ${proj.technologies}`, rightX, rightY); rightY += lineHeight + 1;
      }
      if (proj.link) {
        doc.text(proj.link, rightX, rightY); rightY += lineHeight + 1;
      }
      rightY += 6;
    });
<<<<<<< HEAD
    // Achievements
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('ACHIEVEMENTS', rightX, rightY);
    rightY += lineHeight + 2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    resumeData.achievements.filter(Boolean).forEach(ach => {
      doc.text(`• ${ach}`, rightX, rightY);
      rightY += lineHeight + 1;
    });
    // Download PDF
    doc.save(`${resumeData.fullName || 'resume'}.pdf`);
    // Save JSON as before
    try {
      const response = await fetch('/api/save-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      });
      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    }
  };

  // For dynamic project editing
  const [editableProjectIdx, setEditableProjectIdx] = useState(resumeData.projects.length - 1);
  // Remove achievement editing state

  // Update editable project index when a new project is added
  React.useEffect(() => {
    setEditableProjectIdx(resumeData.projects.length - 1);
  }, [resumeData.projects.length]);

  // For skills autocomplete
  const [skillInput, setSkillInput] = useState('');
  const skillInputRef = useRef(null);
  const filteredSkillOptions = SKILL_LIST.filter(
    s =>
      s.toLowerCase().includes(skillInput.toLowerCase()) &&
      !resumeData.skills.includes(s)
  ).slice(0, 8);

  const handleSkillInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = skillInput.trim();
      if (filteredSkillOptions.length > 0 && trimmed.toLowerCase() === filteredSkillOptions[0].toLowerCase()) {
        addSkill(filteredSkillOptions[0]);
      } else if (trimmed && !resumeData.skills.includes(trimmed)) {
        addSkill(trimmed);
      }
    }
  };
  const addSkill = (skill) => {
    setResumeData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    setSkillInput('');
    skillInputRef.current?.focus();
  };
  const removeSkill = (idx) => {
    setResumeData(prev => {
      const arr = [...prev.skills];
      arr.splice(idx, 1);
      return { ...prev, skills: arr };
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Resume Builder Questionnaire</h1>
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Personal Info */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <User className="text-blue-500 w-7 h-7" />
              <input type="text" className="input-xl" placeholder="Full Name" value={resumeData.fullName} onChange={e => updateField('fullName', e.target.value)} />
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-blue-500 w-7 h-7" />
              <input type="email" className="input-xl" placeholder="Email" value={resumeData.email} onChange={e => updateField('email', e.target.value)} />
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-blue-500 w-7 h-7" />
              <input type="tel" className="input-xl" placeholder="Phone" value={resumeData.phone} onChange={e => updateField('phone', e.target.value)} />
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-blue-500 w-7 h-7" />
              <input type="text" className="input-xl" placeholder="Location" value={resumeData.location} onChange={e => updateField('location', e.target.value)} />
            </div>
            <div className="flex items-center gap-3">
              <Linkedin className="text-blue-500 w-7 h-7" />
              <input type="url" className="input-xl" placeholder="LinkedIn" value={resumeData.linkedin} onChange={e => updateField('linkedin', e.target.value)} />
            </div>
            <div className="flex items-center gap-3">
              <Globe className="text-blue-500 w-7 h-7" />
              <input type="url" className="input-xl" placeholder="Website" value={resumeData.website} onChange={e => updateField('website', e.target.value)} />
=======
  };

  const removeArrayItem = (section, index) => {
    setResumeData((prev) => {
      const newData = { ...prev };
      newData[section].splice(index, 1);
      return newData;
    });
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">
        Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={resumeData.personalInfo.fullName}
            onChange={(e) =>
              updateField("personalInfo", "fullName", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={resumeData.personalInfo.email}
            onChange={(e) =>
              updateField("personalInfo", "email", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={resumeData.personalInfo.phone}
            onChange={(e) =>
              updateField("personalInfo", "phone", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={resumeData.personalInfo.location}
            onChange={(e) =>
              updateField("personalInfo", "location", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn
          </label>
          <input
            type="url"
            value={resumeData.personalInfo.linkedin}
            onChange={(e) =>
              updateField("personalInfo", "linkedin", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <input
            type="url"
            value={resumeData.personalInfo.website}
            onChange={(e) =>
              updateField("personalInfo", "website", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">
        Professional Summary
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Summary
        </label>
        <textarea
          rows={6}
          value={resumeData.summary}
          onChange={(e) => updateField("summary", null, e.target.value)}
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Work Experience</h3>
        <button
          onClick={() => addArrayItem("experience")}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {resumeData.experience.map((exp, index) => (
        <div key={index} className="bg-gray-50 p-6 rounded-lg relative">
          <button
            onClick={() => removeArrayItem("experience", index)}
            className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title
              </label>
              <input
                type="text"
                value={exp.title}
                onChange={(e) =>
                  updateField("experience", "title", e.target.value, index)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) =>
                  updateField("experience", "company", e.target.value, index)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) =>
                  updateField("experience", "location", e.target.value, index)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) =>
                    updateField(
                      "experience",
                      "startDate",
                      e.target.value,
                      index
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) =>
                    updateField("experience", "endDate", e.target.value, index)
                  }
                  disabled={exp.current}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
              <div className="pt-8">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) =>
                      updateField(
                        "experience",
                        "current",
                        e.target.checked,
                        index
                      )
                    }
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Current</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={exp.description}
              onChange={(e) =>
                updateField("experience", "description", e.target.value, index)
              }
              placeholder="Describe your key responsibilities and achievements..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Skills</h3>
        <button
          onClick={() => addArrayItem("skills")}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Skill</span>
        </button>
      </div>

      <div className="space-y-3">
        {resumeData.skills.map((skill, index) => (
          <div key={index} className="flex items-center space-x-3">
            <input
              type="text"
              value={skill}
              onChange={(e) =>
                updateField("skills", null, e.target.value, index)
              }
              placeholder="Enter a skill..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => removeArrayItem("skills", index)}
              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (activeSection) {
      case "personalInfo":
        return renderPersonalInfo();
      case "summary":
        return renderSummary();
      case "experience":
        return renderExperience();
      case "skills":
        return renderSkills();
      default:
        return <div>Section coming soon...</div>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Resume Builder
        </h1>
        <p className="text-xl text-gray-600">
          Create a professional, ATS-optimized resume that gets results
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Sections
            </h3>
            <nav className="space-y-2">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{section.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
                <Save className="h-4 w-4" />
                <span>Save Draft</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </button>
>>>>>>> a205ab74a15fbee82adccf6f40bb245a98b484f3
            </div>
          </div>
        </section>
        {/* Education */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Education</h2>
          {resumeData.education.map((edu, idx) => (
            <div key={idx} className="border rounded-3xl p-8 space-y-4 relative bg-white shadow-sm">
              <input className="input-xl" placeholder="Degree" value={edu.degree} onChange={e => updateArrayField('education', idx, 'degree', e.target.value)} />
              <input className="input-xl" placeholder="College Name" value={edu.school} onChange={e => updateArrayField('education', idx, 'school', e.target.value)} />
            </div>
          ))}
        </section>
        {/* Skills */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Skills</h2>
          <div className="bg-white rounded-3xl shadow-sm p-8 flex flex-col gap-6">
            <div className="relative">
              <input
                ref={skillInputRef}
                className="input-xl"
                placeholder="Type a skill..."
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={handleSkillInputKeyDown}
                autoComplete="off"
              />
              {skillInput && filteredSkillOptions.length > 0 && (
                <ul className="absolute z-10 left-0 right-0 bg-white border border-gray-200 rounded-2xl mt-2 shadow-lg max-h-56 overflow-y-auto">
                  {filteredSkillOptions.map((option, i) => (
                    <li
                      key={option}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                      onMouseDown={() => addSkill(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              {resumeData.skills.filter(Boolean).map((skill, idx) => (
                <span key={skill} className="skill-chip flex items-center gap-1 px-5 py-2 rounded-full font-semibold text-white text-base bg-gradient-to-r from-blue-500 to-purple-500 shadow">
                  {skill}
                  <button type="button" className="ml-1" onClick={() => removeSkill(idx)}>
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </section>
        {/* Projects */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Projects</h2>
          <div className="bg-white rounded-3xl shadow-sm p-8 flex flex-col gap-8">
            {resumeData.projects.map((proj, idx) => (
              <div key={idx} className={`flex flex-col gap-3 relative ${idx !== editableProjectIdx ? 'bg-gray-100 opacity-70 pointer-events-none' : ''} p-6 rounded-2xl`}> 
                {idx !== editableProjectIdx && (
                  <button type="button" className="btn bg-yellow-400 hover:bg-yellow-500 text-black absolute top-2 right-20 pointer-events-auto" onClick={() => setEditableProjectIdx(idx)}>Edit</button>
                )}
                <button type="button" className="absolute top-2 right-2 text-red-500 pointer-events-auto" onClick={() => removeArrayItem('projects', idx)} disabled={resumeData.projects.length === 1 || idx !== editableProjectIdx}>Remove</button>
                <input className="input-xl" placeholder="Project Name" value={proj.name} onChange={e => updateArrayField('projects', idx, 'name', e.target.value)} disabled={idx !== editableProjectIdx} />
                <textarea className="input-xl w-full" rows={3} placeholder="Description" value={proj.description} onChange={e => updateArrayField('projects', idx, 'description', e.target.value)} disabled={idx !== editableProjectIdx} />
                <input className="input-xl" placeholder="Technologies" value={proj.technologies} onChange={e => updateArrayField('projects', idx, 'technologies', e.target.value)} disabled={idx !== editableProjectIdx} />
                <input className="input-xl" placeholder="Link" value={proj.link} onChange={e => updateArrayField('projects', idx, 'link', e.target.value)} disabled={idx !== editableProjectIdx} />
              </div>
            ))}
            <button type="button" className="btn" onClick={() => addArrayItem('projects', { name: '', description: '', technologies: '', link: '' })} disabled={resumeData.projects.length > 0 && resumeData.projects[resumeData.projects.length-1].name === '' && resumeData.projects[resumeData.projects.length-1].description === '' && resumeData.projects[resumeData.projects.length-1].technologies === '' && resumeData.projects[resumeData.projects.length-1].link === ''}>Add Project</button>
          </div>
        </section>
        {/* Achievements */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Achievements</h2>
          <div className="bg-white rounded-3xl shadow-sm p-8 flex flex-col gap-6">
            {resumeData.achievements.map((ach, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input className="input-xxl flex-1" placeholder="Achievement" value={ach} onChange={e => updateArraySimple('achievements', idx, e.target.value)} />
                <button type="button" className="text-red-500" onClick={() => removeArrayItem('achievements', idx)} disabled={resumeData.achievements.length === 1}>Remove</button>
              </div>
            ))}
            <button type="button" className="btn" onClick={() => addArrayItem('achievements', '')}>Add Achievement</button>
          </div>
        </section>
        {/* Submit */}
        <div className="text-center pt-6">
          <button type="submit" className="btn-gradient rounded-full px-8 py-3 text-lg font-semibold">Build a Resume</button>
          {submitStatus === 'success' && <div className="text-green-600 mt-4">Resume saved successfully!</div>}
          {submitStatus === 'error' && <div className="text-red-600 mt-4">Failed to save resume. Please try again.</div>}
        </div>
      </form>
      {/* Tailwind input/btn classes for quick styling */}
      <style>{`
        .input-xl { @apply px-6 py-5 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-lg; }
        .input-xxl { @apply px-6 py-6 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-lg; }
        .btn { @apply rounded-lg px-4 py-2 mt-2 transition; }
        .btn-gradient { @apply rounded-full mt-2 transition text-white; background: linear-gradient(90deg,#6366f1,#8b5cf6); }
        .skill-chip { background: linear-gradient(90deg,#3b82f6,#a21caf); }
      `}</style>
    </div>
  );
};

export default ResumeBuilder;
