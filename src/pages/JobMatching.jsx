import React, { useState, useEffect } from "react";
import { useJobs } from "../context/JobContext.jsx";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Building,
} from "lucide-react";

const JobCard = ({ job }) => (
  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        {job.companyLogo && (
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-12 h-12 rounded-lg object-cover"
          />
        )}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {job.position}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 flex items-center">
            <Building className="h-4 w-4 mr-1" />
            {job.company}
          </p>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
      <div className="flex items-center">
        <MapPin className="h-4 w-4 mr-2" />
        {job.location}
      </div>
      <div className="flex items-center">
        <Clock className="h-4 w-4 mr-2" />
        {job.agoTime || job.date}
      </div>
      <div className="flex items-center">
        <DollarSign className="h-4 w-4 mr-2" />
        {job.salary}
      </div>
    </div>
    <div className="mt-6 flex space-x-3">
      <a
        href={job.jobUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-center"
      >
        View/Apply
      </a>
    </div>
  </div>
);

const JobMatching = () => {
  const { jobs, fetchJobs, loading, error, userSkills, userCity } = useJobs();
  const [search, setSearch] = useState({
    keyword: "",
    location: "",
    dateSincePosted: "",
    remoteFilter: "",
    jobType: "",
    experienceLevel: "",
    limit: "25",
  });

  // Sync search.location with userCity
  useEffect(() => {
    if (userCity) {
      setSearch((prev) => ({ ...prev, location: userCity }));
    }
  }, [userCity]);

  // Auto-fetch jobs based on userSkills and userCity if available
  useEffect(() => {
    if (userSkills && userSkills.length > 0) {
      fetchJobs({
        ...search,
        keyword: userSkills.join(", "),
        location: userCity,
      });
    }
    // eslint-disable-next-line
  }, [userSkills, userCity]);

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(search);
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-950 dark:text-gray-100">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Find Your Next Job
        </h1>
        <form onSubmit={handleSearch} className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="keyword"
              value={search.keyword}
              onChange={handleChange}
              placeholder="Job title, keywords..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="location"
              value={search.location}
              onChange={handleChange}
              placeholder="Location"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              name="dateSincePosted"
              value={search.dateSincePosted}
              onChange={handleChange}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Any time</option>
              <option value="1">Past 24 hours</option>
              <option value="7">Past week</option>
              <option value="30">Past month</option>
            </select>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <select
              name="remoteFilter"
              value={search.remoteFilter}
              onChange={handleChange}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Remote/Onsite</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">Onsite</option>
            </select>
            <select
              name="jobType"
              value={search.jobType}
              onChange={handleChange}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Job Type</option>
              <option value="fulltime">Full-time</option>
              <option value="parttime">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
            <select
              name="experienceLevel"
              value={search.experienceLevel}
              onChange={handleChange}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Experience Level</option>
              <option value="entry">Entry</option>
              <option value="associate">Associate</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
              <option value="director">Director</option>
              <option value="executive">Executive</option>
            </select>
            <select
              name="limit"
              value={search.limit}
              onChange={handleChange}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="10">10 Results</option>
              <option value="25">25 Results</option>
              <option value="50">50 Results</option>
              <option value="100">100 Results</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 self-center min-w-[150px]"
          >
            Search
          </button>
        </form>
        {loading && (
          <div className="text-center text-blue-600 dark:text-blue-400">
            Loading jobs...
          </div>
        )}
        {error && (
          <div className="text-center text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.isArray(jobs) && jobs.length > 0
            ? jobs.map((job, idx) => (
                <JobCard key={job.jobUrl || idx} job={job} />
              ))
            : !loading && (
                <div className="text-center text-gray-500 dark:text-gray-400 col-span-2">
                  No jobs found. Try adjusting your search.
                </div>
              )}
        </div>
      </div>
    </div>
  );
};

export default JobMatching;
