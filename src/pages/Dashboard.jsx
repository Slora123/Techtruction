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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-16 w-16 rounded-full ring-4 ring-white/20"
            />
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
              <p className="text-blue-100">
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
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {stat.value}
                        {stat.suffix || ""}
                      </p>
                      <p className="text-blue-100 text-sm">{stat.label}</p>
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
          <div className="w-full bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3 shadow">
                <Target className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Extracted Skills from Your Resume
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              These are the skills our AI detected in your uploaded resume. Use
              them to match jobs, improve your profile, and track your growth!
            </p>
            <div className="flex flex-wrap gap-3">
              {resumeData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-900 px-5 py-2 rounded-full text-base font-semibold shadow border border-blue-200 hover:from-blue-200 hover:to-purple-200 transition-colors duration-200 cursor-pointer"
                >
                  <Award className="h-4 w-4 text-blue-500" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Link
                key={index}
                to={action.path}
                className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group"
              >
                {action.completed && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                )}

                <div
                  className={`p-3 rounded-xl inline-block mb-4 bg-gradient-to-r ${action.color}`}
                >
                  <IconComponent className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-gray-600 mb-4">{action.description}</p>

                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
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
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Career Progress
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    user?.resumeUploaded ? "bg-green-100" : "bg-gray-100"
                  }`}
                >
                  {user?.resumeUploaded ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Clock className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <span className="font-medium text-gray-700">
                  Resume Uploaded
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user?.resumeUploaded
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {user?.resumeUploaded ? "Complete" : "Pending"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    user?.skillsAnalyzed ? "bg-green-100" : "bg-gray-100"
                  }`}
                >
                  {user?.skillsAnalyzed ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Clock className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <span className="font-medium text-gray-700">
                  Skills Analyzed
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user?.skillsAnalyzed
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {user?.skillsAnalyzed ? "Complete" : "Pending"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    user?.jobsMatched > 0 ? "bg-green-100" : "bg-gray-100"
                  }`}
                >
                  {user?.jobsMatched > 0 ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Clock className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <span className="font-medium text-gray-700">Jobs Matched</span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user?.jobsMatched > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {user?.jobsMatched > 0
                  ? `${user.jobsMatched} Found`
                  : "Pending"}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Upload className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Account Created</p>
                <p className="text-sm text-gray-500">
                  {new Date(user.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {user?.resumeUploaded && (
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Resume Uploaded</p>
                  <p className="text-sm text-gray-500">Ready for analysis</p>
                </div>
              </div>
            )}

            {!user?.resumeUploaded && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Upload your resume to see activity
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
