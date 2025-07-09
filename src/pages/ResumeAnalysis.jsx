import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useJobs } from "../context/JobContext.jsx";
import { CheckCircle, Brain, Target, Star, AlertCircle } from "lucide-react";

const ResumeAnalysis = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [error, setError] = useState("");

  const { user, loading } = useAuth();
  const { resumeData } = useJobs();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user?.resumeUploaded) {
      navigate("/resume-upload");
    }
  }, [user?.resumeUploaded, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleAnalysis = async () => {
    setAnalyzing(true);
    setError("");
    try {
      // Use the existing uploaded file data that was already processed
      if (!resumeData || !resumeData.file_id) {
        throw new Error(
          "No resume data available. Please upload a resume first."
        );
      }

      // Simulate analysis time for better UX
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Use the skills that were already extracted during upload
      setAnalysisResults({
        user: user?.username || user?.email || "N/A",
        skills: resumeData.skills || [],
        fileName: resumeData.fileName,
      });
    } catch (err) {
      setError("Analysis failed: " + err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  if (analyzing) {
    return (
      <div className="min-h-screen w-full bg-white dark:bg-gray-950 dark:text-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-800 dark:to-gray-700 rounded-full inline-block mb-6">
              <Brain className="h-12 w-12 text-white animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Analyzing Your Resume
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Our AI is processing your resume and generating personalized
              insights...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (analysisResults) {
    return (
      <div className="min-h-screen w-full bg-white dark:bg-gray-950 dark:text-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full inline-block mb-6">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Analysis Complete
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              <b>User/File:</b> {analysisResults.user} /{" "}
              {analysisResults.fileName}
            </p>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg mt-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <Target className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                Extracted Skills
              </h3>
              {analysisResults.skills.length > 0 ? (
                <div className="flex flex-wrap gap-3 justify-center">
                  {analysisResults.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-md hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-full inline-block mb-4">
                    <AlertCircle className="h-12 w-12 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    No Skills Detected
                  </h4>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2 text-left max-w-md mx-auto">
                    <li>• The resume might not contain technical skills</li>
                    <li>• Skills might be written in a different format</li>
                    <li>• The PDF might be image-based (scanned)</li>
                    <li>• Try uploading a different resume format</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-950 dark:text-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Resume Analysis
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Click the button below to analyze your uploaded resume and extract
            your technical skills.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <div className="mb-6">
            <Brain className="h-16 w-16 text-blue-600 dark:text-blue-400" />
          </div>
          <button
            onClick={handleAnalysis}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          >
            Start Analysis
          </button>
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900 rounded-lg flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <span className="text-red-700 dark:text-red-300">{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysis;
