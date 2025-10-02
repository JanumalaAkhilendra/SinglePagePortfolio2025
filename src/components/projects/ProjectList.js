// import { motion } from "framer-motion";
// import ProjectLayout from "./ProjectLayout";
// import { FaReact, FaPython, FaMobile, FaBrain } from "react-icons/fa";

// const container = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.3,
//     },
//   },
// };

// const ProjectCategory = ({ title, icon, children }) => {
//   return (
//     <motion.div variants={container} className="mb-12">
//       <motion.div 
//         className="flex items-center mb-6 border-b border-cyan-500/30 pb-2"
//         initial={{ x: -20, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         <div className="mr-3 text-2xl text-cyan-400">{icon}</div>
//         <h2 className="text-2xl font-bold text-white">
//           {title}
//         </h2>
//       </motion.div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {children}
//       </div>
//     </motion.div>
//   );
// };

// const ProjectList = ({ projects }) => {
//   return (
//     <div className="container mx-auto px-4 py-12">
//       <ProjectCategory title="React Projects" icon={<FaReact />}>
//         {projects.filter(p => p.category === 'react').map(project => (
//           <ProjectLayout key={project.id} {...project} />
//         ))}
//       </ProjectCategory>

//       {/* Repeat for other categories */}
//     </div>
//   );
// };