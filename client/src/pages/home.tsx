/* 
  PORTFOLIO CUSTOMIZATION GUIDE
  =============================
  
  To customize your portfolio, update these sections:
  
  1. PROJECTS SECTION (lines ~15-45):
     - Replace project titles, descriptions, and images
     - Add your GitHub repository URLs
     - Update technology tags
     - Add more projects by copying the structure
  
  2. SKILLS SECTION (lines ~45-65):
     - Update skill names and proficiency levels (0-100)
     - Organize into categories (frontend, backend, tools)
  
  3. HERO SECTION (lines ~230-235):
     - Change your name and title
     - Update your tagline/description
  
  4. ABOUT SECTION (lines ~254-280):
     - Write your personal story and experience
     - Update the statistics/achievements
  
  5. CONTACT INFO (search for social media links):
     - Update your social media profiles
     - Add/remove contact methods
*/

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Menu, Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import emailjs from '@emailjs/browser';

// CUSTOMIZE YOUR PROJECTS HERE
// Replace with your actual projects - add image/video URLs and GitHub repo links
const projects = [
  {
    id: 0,
    title: "Your Project Name Here",
    description: "Brief description of what this project does",
    image: "https://your-project-image-url.com/image.jpg", // Replace with your project image/GIF
    technologies: ["Tech1", "Tech2", "Tech3"], // Replace with technologies you used
    githubUrl: "https://github.com/yourusername/your-repo" // Replace with your GitHub repo
  },
  {
    id: 1,
    title: "Another Project",
    description: "Description of your second project",
    image: "https://your-project-image-url.com/image2.jpg",
    technologies: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/yourusername/another-repo"
  },
  {
    id: 2,
    title: "Third Project",
    description: "Description of your third project",
    image: "https://your-project-image-url.com/image3.jpg",
    technologies: ["Python", "Flask", "PostgreSQL"],
    githubUrl: "https://github.com/yourusername/third-repo"
  }
  // Add more projects by copying the structure above
];

// CUSTOMIZE YOUR SKILLS HERE
// Update with your actual skills and proficiency levels (0-100)
const skills = {
  frontend: [
    { name: "React", level: 90 }, // Change skill name and level
    { name: "JavaScript", level: 85 },
    { name: "HTML/CSS", level: 95 }
  ],
  backend: [
    { name: "Node.js", level: 88 },
    { name: "Python", level: 82 },
    { name: "Databases", level: 80 }
  ],
  tools: [
    { name: "Git", level: 92 },
    { name: "VS Code", level: 95 },
    { name: "Linux", level: 78 }
  ]
};

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // EMAILJS CONFIGURATION
  // Replace these with your actual EmailJS credentials from https://emailjs.com
  const EMAILJS_SERVICE_ID = "your_service_id";
  const EMAILJS_TEMPLATE_ID = "your_template_id";
  const EMAILJS_PUBLIC_KEY = "your_public_key";

  const totalItems = projects.length;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const previousProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  const getItemPosition = (itemIndex: number) => {
    const diff = (itemIndex - currentIndex + totalItems) % totalItems;
    
    if (diff === 0) {
      // Center item
      return {
        transform: "translateX(0) scale(1.1)",
        opacity: 1,
        zIndex: 10,
      };
    } else if (diff === 1 || diff === totalItems - 1) {
      // Side items
      const isLeft = diff === totalItems - 1;
      return {
        transform: `translateX(${isLeft ? "-16rem" : "16rem"}) scale(0.75)`,
        opacity: 0.6,
        zIndex: 5,
      };
    } else {
      // Hidden items
      const isLeft = diff > totalItems / 2;
      return {
        transform: `translateX(${isLeft ? "-24rem" : "24rem"}) scale(0.5)`,
        opacity: 0,
        zIndex: 0,
      };
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextProject();
    } else if (isRightSwipe) {
      previousProject();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: "your-email@example.com", // Replace with your email
        },
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        previousProject();
      } else if (e.key === "ArrowRight") {
        nextProject();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="bg-black text-white smooth-scroll">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">Portfolio</div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection("home")} className="hover:text-zinc-400 transition-colors">Home</button>
              <button onClick={() => scrollToSection("about")} className="hover:text-zinc-400 transition-colors">About</button>
              <button onClick={() => scrollToSection("portfolio")} className="hover:text-zinc-400 transition-colors">Portfolio</button>
              <button onClick={() => scrollToSection("skills")} className="hover:text-zinc-400 transition-colors">Skills</button>
              <button onClick={() => scrollToSection("contact")} className="hover:text-zinc-400 transition-colors">Contact</button>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 gradient-overlay"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="w-96 h-96 border border-white/20 rounded-full absolute top-1/4 left-1/4 animate-pulse"></div>
          <div className="w-64 h-64 border border-white/10 rounded-full absolute bottom-1/4 right-1/4 animate-pulse" style={{animationDelay: "1s"}}></div>
        </div>
        
        <div className="text-center z-10 max-w-4xl mx-auto px-6">
          {/* CUSTOMIZE YOUR HERO SECTION HERE */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Your Name</span>
            <span className="block text-zinc-400">Developer</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Write your catchy tagline here. What do you do? What makes you special?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => scrollToSection("portfolio")} className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-zinc-200 transition-colors">
              View My Work
            </Button>
            <Button onClick={() => scrollToSection("contact")} variant="outline" className="border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors">
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">About Me</h2>
            
            {/* CUSTOMIZE YOUR ABOUT SECTION HERE */}
            <p className="text-zinc-400 text-lg mb-6 max-w-3xl mx-auto">
              Write your personal story here. Talk about your passion for coding, your journey, 
              what drives you as a developer, and what makes you unique.
            </p>
            <p className="text-zinc-400 text-lg mb-12 max-w-3xl mx-auto">
              Add another paragraph about your specializations, your approach to problem-solving, 
              or what you love most about development.
            </p>
            
            {/* CUSTOMIZE YOUR STATS HERE */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">10+</div>
                <div className="text-zinc-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">2+</div>
                <div className="text-zinc-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">5+</div>
                <div className="text-zinc-400">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-zinc-400">Dedication</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Carousel Section */}
      <section id="portfolio" className="py-20 bg-black overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Featured Projects</h2>
          
          <div className="relative">
            <div 
              ref={carouselRef}
              className="relative h-96 flex items-center justify-center"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {projects.map((project, index) => {
                const position = getItemPosition(index);
                return (
                  <div
                    key={project.id}
                    className="carousel-item absolute inset-0 flex items-center justify-center"
                    style={position}
                  >
                    <Card 
                      className="bg-zinc-900 border-zinc-800 p-6 w-80 h-64 shadow-2xl cursor-pointer hover:bg-zinc-800 transition-colors group"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
                      />
                      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-zinc-200 flex items-center gap-2">
                        {project.title}
                        <Github className="h-4 w-4 opacity-60 group-hover:opacity-100" />
                      </h3>
                      <p className="text-zinc-400 text-sm mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.map((tech) => (
                          <span 
                            key={tech} 
                            className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>

            <Button
              onClick={previousProject}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-zinc-800 hover:bg-white hover:text-black w-12 h-12 rounded-full z-20"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              onClick={nextProject}
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-zinc-800 hover:bg-white hover:text-black w-12 h-12 rounded-full z-20"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-zinc-600 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Technical Skills</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-black border-zinc-800 p-6">
              <h3 className="text-xl font-semibold mb-6 text-center text-white">Frontend</h3>
              {skills.frontend.map((skill) => (
                <div key={skill.name} className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-white">{skill.name}</span>
                    <span className="text-white">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-zinc-700 rounded-full h-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </Card>

            <Card className="bg-black border-zinc-800 p-6">
              <h3 className="text-xl font-semibold mb-6 text-center text-white">Backend</h3>
              {skills.backend.map((skill) => (
                <div key={skill.name} className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-white">{skill.name}</span>
                    <span className="text-white">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-zinc-700 rounded-full h-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </Card>

            <Card className="bg-black border-zinc-800 p-6">
              <h3 className="text-xl font-semibold mb-6 text-center text-white">Tools & Others</h3>
              {skills.tools.map((skill) => (
                <div key={skill.name} className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-white">{skill.name}</span>
                    <span className="text-white">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-zinc-700 rounded-full h-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Get In Touch</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's Work Together</h3>
              <p className="text-zinc-400 text-lg mb-8">
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              
              {/* CUSTOMIZE YOUR CONTACT INFO HERE */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-zinc-400">your-email@example.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-zinc-400">+1 (555) 123-4567</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Location</div>
                    <div className="text-zinc-400">Your City, Country</div>
                  </div>
                </div>
              </div>

              {/* CUSTOMIZE YOUR SOCIAL MEDIA LINKS HERE */}
              <div className="flex space-x-4 mt-8">
                <Button variant="ghost" size="icon" className="bg-zinc-800 hover:bg-white hover:text-black rounded-lg"
                  onClick={() => window.open('https://github.com/yourusername', '_blank')}>
                  <Github className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="bg-zinc-800 hover:bg-white hover:text-black rounded-lg"
                  onClick={() => window.open('https://linkedin.com/in/yourusername', '_blank')}>
                  <Linkedin className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="bg-zinc-800 hover:bg-white hover:text-black rounded-lg"
                  onClick={() => window.open('https://twitter.com/yourusername', '_blank')}>
                  <Twitter className="h-6 w-6" />
                </Button>
              </div>
            </div>

            <Card className="bg-zinc-900 border-zinc-800 p-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <Label htmlFor="name" className="block text-sm font-semibold mb-2">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-black border-zinc-700 text-white focus:border-white"
                    placeholder="Your Name"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="email" className="block text-sm font-semibold mb-2">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-black border-zinc-700 text-white focus:border-white"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="subject" className="block text-sm font-semibold mb-2">Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    className="bg-black border-zinc-700 text-white focus:border-white"
                    placeholder="Project Discussion"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <Label htmlFor="message" className="block text-sm font-semibold mb-2">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={5}
                    className="bg-black border-zinc-700 text-white focus:border-white resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-zinc-200 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-zinc-400">
            © 2024 Portfolio. All rights reserved. | Built with passion and precision.
          </p>
        </div>
      </footer>
    </div>
  );
}
