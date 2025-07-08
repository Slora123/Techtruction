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

const ResumeBuilder = () => {
  const { user } = useAuth();
  const [resumeData, setResumeData] = useState({
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
    ],
    achievements: [""],
  });

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
      }
      return newData;
    });
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
      }
      return newData;
    });
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
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {renderCurrentSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
