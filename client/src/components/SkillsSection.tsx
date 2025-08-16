import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
    FaReact,
    FaJsSquare,
    FaHtml5,
    FaNodeJs,
    FaPython,
    FaDatabase,
    FaGitAlt,
    FaLinux
} from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";

const skills = {
    frontend: [
        { name: "React", icon: <FaReact color="#61DBFB" />, level: 90 },
        { name: "JavaScript", icon: <FaJsSquare color="#F0DB4F" />, level: 85 },
        { name: "HTML/CSS", icon: <FaHtml5 color="#E44D26" />, level: 95 },
    ],
    backend: [
        { name: "Node.js", icon: <FaNodeJs color="#3C873A" />, level: 88 },
        { name: "Python", icon: <FaPython color="#FFD43B" />, level: 82 },
        { name: "Databases", icon: <FaDatabase color="#4DB33D" />, level: 80 },
    ],
    tools: [
        { name: "Git", icon: <FaGitAlt color="#F1502F" />, level: 92 },
        { name: "VS Code", icon: <VscVscode color="#007ACC" />, level: 95 },
        { name: "Linux", icon: <FaLinux color="#FCC624" />, level: 78 },
    ]
};

const SkillsSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) setVisible(true);
            },
            { threshold: 0.4 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <div
            ref={sectionRef}
            className="flex flex-wrap justify-center gap-8 px-6 py-12"
        >
            {Object.entries(skills).map(([category, skillList], index) => (
                <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    className="bg-gradient-to-b from-neutral-900 to-neutral-800 border border-neutral-700 shadow-lg shadow-black/50 rounded-xl p-6 w-[300px] backdrop-blur-sm"
                >
                    <h2 className="text-center text-xl font-semibold text-white mb-6 capitalize tracking-wide">
                        {category}
                    </h2>
                    {skillList.map((skill, i) => (
                        <div key={skill.name} className="mb-5">
                            <div className="flex justify-between items-center mb-2">
                <span className="flex items-center gap-2 text-neutral-200">
                  {skill.icon}
                    {skill.name}
                </span>
                                <span className="text-neutral-400 font-medium">
                  {visible ? (
                      <CountUp start={0} end={skill.level} duration={1.5} suffix="%" />
                  ) : (
                      "0%"
                  )}
                </span>
                            </div>
                            <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: visible ? `${skill.level}%` : 0 }}
                                    transition={{ duration: 1.2, delay: i * 0.1 }}
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                />
                            </div>
                        </div>
                    ))}
                </motion.div>
            ))}
        </div>
    );
};

export default SkillsSection;
