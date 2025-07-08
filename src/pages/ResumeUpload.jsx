import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useJobs } from "../context/JobContext.jsx";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  FilePlus,
} from "lucide-react";

const ResumeUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const { user, updateUser, setUserSkills } = useAuth();
  const { setResumeData } = useJobs();
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(selectedFile.type)) {
      setError("Please upload a PDF or Word document");
      return;
    }

    if (selectedFile.size > maxSize) {
      setError("File size must be less than 5MB");
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      setResumeData({
        fileName: file.name,
        fileSize: file.size,
        uploadDate: new Date().toISOString(),
        file, // store the actual file object for later analysis
        file_id: data.file_id, // store the file ID from backend
        file_path: data.file_path, // store the file path from backend
        skills: data.skills || [],
      });

      updateUser({
        resumeUploaded: true,
        resumeFileName: file.name,
      });

      navigate("/resume-analysis");
    } catch (err) {
      setError("Failed to upload resume. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (user?.resumeUploaded && !file) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="p-4 bg-green-100 rounded-full inline-block mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Resume Already Uploaded
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your resume "{user.resumeFileName}" has been uploaded and is ready
            for analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <button
              onClick={() => navigate("/resume-analysis")}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              Analyze Resume
            </button>
            <button
              onClick={() => {
                setFile(null);
                updateUser({ resumeUploaded: false, resumeFileName: null });
                setResumeData(null);
              }}
              className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-blue-400 hover:text-blue-600 transition-all duration-200"
            >
              Upload New Resume
            </button>
          </div>
          <button
            onClick={() => navigate("/resume-builder")}
            className="mt-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center mx-auto"
          >
            <FilePlus className="h-5 w-5 mr-2" />
            Make Resume
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Upload Your Resume
        </h1>
        <p className="text-xl text-gray-600">
          Let our AI analyze your resume and provide personalized
          recommendations
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        {!file ? (
          <div
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ${
              dragActive
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <div className="space-y-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full inline-block">
                <Upload className="h-12 w-12 text-white" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Drop your resume here
                </h3>
                <p className="text-gray-600 mb-4">
                  or click to browse your files
                </p>
                <p className="text-sm text-gray-500">
                  Supports PDF, DOC, DOCX (max 5MB)
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-4 p-6 bg-gray-50 rounded-xl">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">{file.name}</h3>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            <div className="flex space-x-4 justify-center">
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    <span>Upload & Analyze</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setFile(null)}
                className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-blue-400 hover:text-blue-600 transition-all duration-200"
              >
                Choose Different File
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/resume-builder")}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 flex items-center"
          >
            <FilePlus className="h-5 w-5 mr-2" />
            Make Resume
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">
            What happens next?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-3 bg-blue-100 rounded-lg inline-block mb-3">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <h5 className="font-medium text-gray-900">1. Upload</h5>
              <p className="text-sm text-gray-600">
                Securely upload your resume
              </p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-purple-100 rounded-lg inline-block mb-3">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <h5 className="font-medium text-gray-900">2. Analyze</h5>
              <p className="text-sm text-gray-600">AI analyzes your content</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-green-100 rounded-lg inline-block mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h5 className="font-medium text-gray-900">3. Improve</h5>
              <p className="text-sm text-gray-600">
                Get personalized suggestions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;
