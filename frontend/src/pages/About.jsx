import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  const teamMembers = [
    {
      name: "Kshitij Maurya",
    },
  ];

  const githubRepo = "https://github.com/kmaurya9/Mern-SocialAPP";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-20 pb-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Mern-Social
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            A full-stack social media platform for movie enthusiasts
          </p>
          <Link
            to="/home"
            className="inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
          >
            ← Go to Feed
          </Link>
        </div>

        {/* Team Members Section */}
        <div className="bg-slate-800 bg-opacity-50 rounded-lg p-8 mb-8 border border-slate-700">
          <h2 className="text-2xl font-bold mb-6 text-blue-400">Team Members</h2>
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="border-l-4 border-purple-500 pl-4">
                <p className="text-lg font-semibold text-white">{member.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Repository Section */}
        <a
          href={githubRepo}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-slate-800 bg-opacity-50 rounded-lg p-8 border border-slate-700 hover:border-blue-500 hover:bg-opacity-70 transition block"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-blue-400 flex items-center gap-2">
              <FaGithub className="text-3xl" />
              GitHub Repository
            </h2>
            <FaExternalLinkAlt className="text-blue-400 text-xl" />
          </div>
          <p className="text-slate-300 mb-2">Frontend & Backend (Monorepo)</p>
          <p className="text-sm text-blue-400 font-semibold hover:underline">
            {githubRepo}
          </p>
        </a>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-slate-700">
          <p className="text-slate-400 text-sm">
            Deployed on Render | Database on MongoDB Atlas
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
