import React, { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Mail, Phone, MapPin, Linkedin, Globe, User, X } from "lucide-react";
import { SKILL_LIST } from "../skillList.js";
import jsPDF from "jspdf";

const ResumeBuilder = () => {
  const { user } = useAuth();
  const [resumeData, setResumeData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    education: [{ degree: "", school: "" }],
    skills: [],
    projects: [{ name: "", description: "", technologies: "", link: "" }],
    achievements: [""],
  });
  const [editableProjectIdx, setEditableProjectIdx] = useState(
    resumeData.projects.length - 1
  );
  React.useEffect(() => {
    setEditableProjectIdx(resumeData.projects.length - 1);
  }, [resumeData.projects.length]);
  // Skills autocomplete/tag logic
  const [skillInput, setSkillInput] = useState("");
  const skillInputRef = useRef(null);
  const filteredSkillOptions = SKILL_LIST.filter(
    (s) =>
      s.toLowerCase().includes(skillInput.toLowerCase()) &&
      !resumeData.skills.includes(s)
  ).slice(0, 8);
  const handleSkillInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = skillInput.trim();
      if (
        filteredSkillOptions.length > 0 &&
        trimmed.toLowerCase() === filteredSkillOptions[0].toLowerCase()
      ) {
        addSkill(filteredSkillOptions[0]);
      } else if (trimmed && !resumeData.skills.includes(trimmed)) {
        addSkill(trimmed);
      }
    }
  };
  const addSkill = (skill) => {
    setResumeData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
    setSkillInput("");
    skillInputRef.current?.focus();
  };
  const removeSkill = (idx) => {
    setResumeData((prev) => {
      const arr = [...prev.skills];
      arr.splice(idx, 1);
      return { ...prev, skills: arr };
    });
  };
  const updateField = (field, value) =>
    setResumeData((prev) => ({ ...prev, [field]: value }));
  const updateArrayField = (section, idx, field, value) => {
    setResumeData((prev) => {
      const arr = [...prev[section]];
      arr[idx][field] = value;
      return { ...prev, [section]: arr };
    });
  };
  const updateArraySimple = (section, idx, value) => {
    setResumeData((prev) => {
      const arr = [...prev[section]];
      arr[idx] = value;
      return { ...prev, [section]: arr };
    });
  };
  const addArrayItem = (section, template) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], template],
    }));
  };
  const removeArrayItem = (section, idx) => {
    setResumeData((prev) => {
      const arr = [...prev[section]];
      arr.splice(idx, 1);
      return { ...prev, [section]: arr };
    });
  };
  // PDF generation
  const [submitStatus, setSubmitStatus] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    const dataToSave = {
      ...resumeData,
      skills: resumeData.skills.filter(Boolean),
    };
    // PDF: two-column, big font, extra spacing, no emojis
    const doc = new jsPDF();
    const leftX = 20,
      rightX = 115,
      colWidth = 75,
      lineHeight = 12;
    let y = 28;
    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text("RESUME", 105, y, { align: "center" });
    y += 18;
    doc.setFontSize(36);
    doc.text(resumeData.fullName || "Your Name", 105, y, { align: "center" });
    y += 12;
    doc.setFontSize(18);
    doc.setFont("helvetica", "normal");
    doc.setDrawColor(180);
    doc.line(20, y, 190, y);
    y += 10;
    // Left Column
    let leftY = y;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("CONTACT", leftX, leftY);
    leftY += lineHeight + 2;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(15);
    if (resumeData.phone) {
      doc.text(`${resumeData.phone}`, leftX, leftY);
      leftY += lineHeight + 2;
    }
    if (resumeData.email) {
      doc.text(`${resumeData.email}`, leftX, leftY);
      leftY += lineHeight + 2;
    }
    if (resumeData.location) {
      doc.text(`${resumeData.location}`, leftX, leftY);
      leftY += lineHeight + 2;
    }
    if (resumeData.linkedin) {
      doc.text(`${resumeData.linkedin}`, leftX, leftY);
      leftY += lineHeight + 2;
    }
    if (resumeData.website) {
      doc.text(`${resumeData.website}`, leftX, leftY);
      leftY += lineHeight + 2;
    }
    leftY += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("EDUCATION", leftX, leftY);
    leftY += lineHeight + 2;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(15);
    resumeData.education.forEach((edu) => {
      if (edu.degree || edu.school) {
        doc.text(
          `• ${edu.degree || ""}${edu.degree && edu.school ? ", " : ""}${
            edu.school || ""
          }`,
          leftX,
          leftY
        );
        leftY += lineHeight + 2;
      }
    });
    leftY += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("SKILLS", leftX, leftY);
    leftY += lineHeight + 2;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(15);
    const skills = resumeData.skills.filter(Boolean);
    let currentLeftX = leftX;
    let currentLeftY = leftY;
    for (let i = 0; i < skills.length; i++) {
      doc.text(`• ${skills[i]}`, currentLeftX, currentLeftY);
      currentLeftY += lineHeight + 1;
      if (currentLeftY > 270) {
        currentLeftY = y;
        currentLeftX += 50;
      }
    }
    leftY = currentLeftY + 10;
    // Right Column
    let rightY = y;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("PROJECTS", rightX, rightY);
    rightY += lineHeight + 2;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(15);
    resumeData.projects.forEach((proj) => {
      if (proj.name) {
        doc.setFont("helvetica", "bold");
        doc.text(proj.name, rightX, rightY);
        rightY += lineHeight + 1;
        doc.setFont("helvetica", "normal");
      }
      if (proj.description) {
        const lines = doc.splitTextToSize(proj.description, colWidth);
        lines.forEach((line) => {
          doc.text(line, rightX, rightY);
          rightY += lineHeight + 1;
        });
      }
      if (proj.technologies) {
        doc.text(`Tech: ${proj.technologies}`, rightX, rightY);
        rightY += lineHeight + 1;
      }
      if (proj.link) {
        doc.text(proj.link, rightX, rightY);
        rightY += lineHeight + 1;
      }
      rightY += 10;
    });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("ACHIEVEMENTS", rightX, rightY);
    rightY += lineHeight + 2;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(15);
    resumeData.achievements.filter(Boolean).forEach((ach) => {
      doc.text(`• ${ach}`, rightX, rightY);
      rightY += lineHeight + 1;
    });
    // Download PDF
    doc.save(`${resumeData.fullName || "resume"}.pdf`);
    // Save JSON as before
    try {
      const response = await fetch("/api/save-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });
      if (response.ok) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      setSubmitStatus("error");
    }
  };
  // --- UI ---
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-950 dark:text-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Resume Builder Questionnaire
        </h1>
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Personal Info */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <User className="text-blue-500 w-7 h-7" />
                <input
                  type="text"
                  className="input-xl"
                  placeholder="Full Name"
                  value={resumeData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-blue-500 w-7 h-7" />
                <input
                  type="email"
                  className="input-xl"
                  placeholder="Email"
                  value={resumeData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-blue-500 w-7 h-7" />
                <input
                  type="tel"
                  className="input-xl"
                  placeholder="Phone"
                  value={resumeData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-blue-500 w-7 h-7" />
                <input
                  type="text"
                  className="input-xl"
                  placeholder="Location"
                  value={resumeData.location}
                  onChange={(e) => updateField("location", e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="text-blue-500 w-7 h-7" />
                <input
                  type="url"
                  className="input-xl"
                  placeholder="LinkedIn"
                  value={resumeData.linkedin}
                  onChange={(e) => updateField("linkedin", e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3">
                <Globe className="text-blue-500 w-7 h-7" />
                <input
                  type="url"
                  className="input-xl"
                  placeholder="Website"
                  value={resumeData.website}
                  onChange={(e) => updateField("website", e.target.value)}
                />
              </div>
            </div>
          </section>
          {/* Education */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Education</h2>
            {resumeData.education.map((edu, idx) => (
              <div
                key={idx}
                className="border rounded-3xl p-8 space-y-4 relative bg-white shadow-sm dark:bg-gray-900"
              >
                <input
                  className="input-xl"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) =>
                    updateArrayField("education", idx, "degree", e.target.value)
                  }
                />
                <input
                  className="input-xl"
                  placeholder="College Name"
                  value={edu.school}
                  onChange={(e) =>
                    updateArrayField("education", idx, "school", e.target.value)
                  }
                />
              </div>
            ))}
          </section>
          {/* Skills */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Skills</h2>
            <div className="bg-white rounded-3xl shadow-sm p-8 flex flex-col gap-6 dark:bg-gray-900">
              <div className="relative">
                <input
                  ref={skillInputRef}
                  className="input-xl"
                  placeholder="Type a skill..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillInputKeyDown}
                  autoComplete="off"
                />
                {skillInput && filteredSkillOptions.length > 0 && (
                  <ul className="absolute z-10 left-0 right-0 bg-white border border-gray-200 rounded-2xl mt-2 shadow-lg max-h-56 overflow-y-auto dark:bg-gray-900 dark:border-gray-700">
                    {filteredSkillOptions.map((option, i) => (
                      <li
                        key={option}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-800"
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
                  <span
                    key={skill}
                    className="skill-chip flex items-center gap-1 px-5 py-2 rounded-full font-semibold text-white text-base bg-gradient-to-r from-blue-500 to-purple-500 shadow"
                  >
                    {skill}
                    <button
                      type="button"
                      className="ml-1"
                      onClick={() => removeSkill(idx)}
                    >
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
            <div className="bg-white rounded-3xl shadow-sm p-8 flex flex-col gap-8 dark:bg-gray-900">
              {resumeData.projects.map((proj, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col gap-3 relative ${
                    idx !== editableProjectIdx
                      ? "bg-gray-100 dark:bg-gray-800 opacity-70 pointer-events-none"
                      : ""
                  } p-6 rounded-2xl`}
                >
                  {idx !== editableProjectIdx && (
                    <button
                      type="button"
                      className="btn bg-yellow-400 hover:bg-yellow-500 text-black absolute top-2 right-20 pointer-events-auto"
                      onClick={() => setEditableProjectIdx(idx)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-red-500 pointer-events-auto"
                    onClick={() => removeArrayItem("projects", idx)}
                    disabled={
                      resumeData.projects.length === 1 ||
                      idx !== editableProjectIdx
                    }
                  >
                    Remove
                  </button>
                  <input
                    className="input-xl"
                    placeholder="Project Name"
                    value={proj.name}
                    onChange={(e) =>
                      updateArrayField("projects", idx, "name", e.target.value)
                    }
                    disabled={idx !== editableProjectIdx}
                  />
                  <textarea
                    className="input-xl w-full"
                    rows={3}
                    placeholder="Description"
                    value={proj.description}
                    onChange={(e) =>
                      updateArrayField(
                        "projects",
                        idx,
                        "description",
                        e.target.value
                      )
                    }
                    disabled={idx !== editableProjectIdx}
                  />
                  <input
                    className="input-xl"
                    placeholder="Technologies"
                    value={proj.technologies}
                    onChange={(e) =>
                      updateArrayField(
                        "projects",
                        idx,
                        "technologies",
                        e.target.value
                      )
                    }
                    disabled={idx !== editableProjectIdx}
                  />
                  <input
                    className="input-xl"
                    placeholder="Link"
                    value={proj.link}
                    onChange={(e) =>
                      updateArrayField("projects", idx, "link", e.target.value)
                    }
                    disabled={idx !== editableProjectIdx}
                  />
                </div>
              ))}
              <button
                type="button"
                className="btn"
                onClick={() =>
                  addArrayItem("projects", {
                    name: "",
                    description: "",
                    technologies: "",
                    link: "",
                  })
                }
                disabled={
                  resumeData.projects.length > 0 &&
                  resumeData.projects[resumeData.projects.length - 1].name ===
                    "" &&
                  resumeData.projects[resumeData.projects.length - 1]
                    .description === "" &&
                  resumeData.projects[resumeData.projects.length - 1]
                    .technologies === "" &&
                  resumeData.projects[resumeData.projects.length - 1].link ===
                    ""
                }
              >
                Add Project
              </button>
            </div>
          </section>
          {/* Achievements */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Achievements</h2>
            <div className="bg-white rounded-3xl shadow-sm p-8 flex flex-col gap-6 dark:bg-gray-900">
              {resumeData.achievements.map((ach, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    className="input-xxl flex-1"
                    placeholder="Achievement"
                    value={ach}
                    onChange={(e) =>
                      updateArraySimple("achievements", idx, e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => removeArrayItem("achievements", idx)}
                    disabled={resumeData.achievements.length === 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn"
                onClick={() => addArrayItem("achievements", "")}
              >
                Add Achievement
              </button>
            </div>
          </section>
          {/* Submit */}
          <div className="text-center pt-6">
            <button
              type="submit"
              className="btn-gradient rounded-full px-8 py-3 text-lg font-semibold"
            >
              Build a Resume
            </button>
            {submitStatus === "success" && (
              <div className="text-green-600 mt-4">
                Resume saved successfully!
              </div>
            )}
            {submitStatus === "error" && (
              <div className="text-red-600 mt-4">
                Failed to save resume. Please try again.
              </div>
            )}
          </div>
        </form>
        <style>{`
          .input-xl { @apply px-6 py-5 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100; }
          .input-xxl { @apply px-6 py-6 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100; }
          .btn { @apply rounded-lg px-4 py-2 mt-2 transition; }
          .btn-gradient { @apply rounded-full mt-2 transition text-white; background: linear-gradient(90deg,#6366f1,#8b5cf6); }
          .skill-chip { background: linear-gradient(90deg,#3b82f6,#a21caf); }
        `}</style>
      </div>
    </div>
  );
};

export default ResumeBuilder;
