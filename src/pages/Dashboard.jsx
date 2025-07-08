import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useJobs } from "../context/JobContext.jsx";
import {
  Upload,
  FileText,
  Briefcase,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Clock,
  Target,
  Award,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { resumeData, analysisResults } = useJobs();

  const quickActions = [
    {
      title: "Upload Resume",
      description: "Upload your resume for AI-powered analysis",
      icon: Upload,
      path: "/resume-upload",
      color: "from-blue-500 to-blue-600",
      completed: user?.resumeUploaded,
    },
    {
      title: "Analyze Resume",
      description: "Get personalized feedback and suggestions",
      icon: FileText,
      path: "/resume-analysis",
      color: "from-purple-500 to-purple-600",
      completed: user?.skillsAnalyzed,
    },
    {
      title: "Find Jobs",
      description: "Discover jobs that match your skills",
      icon: Briefcase,
      path: "/job-matching",
      color: "from-green-500 to-green-600",
      completed: user?.jobsMatched > 0,
    },
  ];

  const stats = [
    {
      label: "Skills Identified",
      value: resumeData?.skills?.length || 0,
      icon: Target,
      color: "text-blue-600",
    },
    {
      label: "Resume Score",
      value: analysisResults?.overallScore || 0,
      icon: Award,
      color: "text-purple-600",
      suffix: "%",
    },
    {
      label: "Job Matches",
      value: user?.jobsMatched || 0,
      icon: TrendingUp,
      color: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-950 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 text-white dark:text-gray-100">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-16 w-16 rounded-full ring-4 ring-white/20 dark:ring-gray-800"
              />
              <div>
                <h1 className="text-3xl font-bold dark:text-gray-100">
                  Welcome back, {user.name}!
                </h1>
                <p className="text-blue-100 dark:text-gray-300">
                  Ready to take your career to the next level?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/10 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/20 dark:bg-gray-900/40 rounded-lg">
                        <IconComponent className="h-6 w-6 text-white dark:text-gray-100" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold dark:text-gray-100">
                          {stat.value}
                          {stat.suffix || ""}
                        </p>
                        <p className="text-blue-100 text-sm dark:text-gray-300">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Extracted Skills Section from resumeData */}
        {resumeData && resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-8">
            <div className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-blue-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-800 dark:to-gray-700 rounded-full mr-3 shadow">
                  <Target className="h-7 w-7 text-white dark:text-gray-100" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Extracted Skills from Your Resume
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                These are the skills our AI detected in your uploaded resume.
                Use them to match jobs, improve your profile, and track your
                growth!
              </p>
              <div className="flex flex-wrap gap-3">
                {resumeData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 text-blue-900 dark:text-gray-100 px-5 py-2 rounded-full text-base font-semibold shadow border border-blue-200 dark:border-gray-700 hover:from-blue-200 hover:to-purple-200 dark:hover:from-gray-700 dark:hover:to-gray-800 transition-colors duration-200 cursor-pointer"
                  >
                    <Award className="h-4 w-4 text-blue-500 dark:text-blue-300" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link
                  key={index}
                  to={action.path}
                  className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                >
                  {action.completed && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-xl inline-block mb-4 bg-gradient-to-r ${action.color} dark:from-gray-800 dark:to-gray-700`}
                  >
                    <IconComponent className="h-6 w-6 text-white dark:text-gray-100" />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {action.description}
                  </p>

                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    <span className="mr-2">
                      {action.completed ? "View" : "Get Started"}
                    </span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Career Progress */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Career Progress
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      user?.resumeUploaded
                        ? "bg-green-100 dark:bg-green-900"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {user?.resumeUploaded ? (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <Clock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    )}
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    Resume Uploaded
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user?.resumeUploaded
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  {user?.resumeUploaded ? "Complete" : "Pending"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      user?.skillsAnalyzed
                        ? "bg-green-100 dark:bg-green-900"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {user?.skillsAnalyzed ? (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <Clock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    )}
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    Skills Analyzed
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user?.skillsAnalyzed
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  {user?.skillsAnalyzed ? "Complete" : "Pending"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      user?.jobsMatched > 0
                        ? "bg-green-100 dark:bg-green-900"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {user?.jobsMatched > 0 ? (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <Clock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    )}
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    Jobs Matched
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user?.jobsMatched > 0
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  {user?.jobsMatched > 0 ? "Complete" : "Pending"}
                </span>
              </div>
            </div>
          </div>

          {/* Skill Activity/Other Side Panel (if present) */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            {/* Example: Skill Activity or Recommendations */}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Skill Activity
            </h3>
            <div className="space-y-4">
              {/* Example activity item */}
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  React
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  Mastered
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  TypeScript
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  Learning
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  AWS
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                  In Progress
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Upload className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Account Created
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    7/5/2025
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <FileText className="h-4 w-4 text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Resume Uploaded
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Ready for analysis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
