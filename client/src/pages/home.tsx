import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Menu, Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const projects = [
  {
    id: 0,
    title: "E-commerce Platform",
    description: "Modern React-based online store with payment integration",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    technologies: ["React", "TypeScript", "Stripe", "Tailwind CSS"]
  },
  {
    id: 1,
    title: "Task Management App",
    description: "Collaborative productivity tool with real-time updates",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    technologies: ["Next.js", "PostgreSQL", "Socket.io", "Prisma"]
  },
  {
    id: 2,
    title: "Creative Portfolio",
    description: "Responsive portfolio showcasing design and development work",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    technologies: ["React", "Framer Motion", "Three.js", "GSAP"]
  },
  {
    id: 3,
    title: "Mobile Banking App",
    description: "Secure financial app with biometric authentication",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    technologies: ["React Native", "Node.js", "MongoDB", "Firebase"]
  },
  {
    id: 4,
    title: "Social Dashboard",
    description: "Analytics platform for social media management",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    technologies: ["Vue.js", "D3.js", "Express", "Redis"]
  }
];

const skills = {
  frontend: [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Tailwind CSS", level: 95 }
  ],
  backend: [
    { name: "Node.js", level: 88 },
    { name: "Python", level: 82 },
    { name: "PostgreSQL", level: 80 }
  ],
  tools: [
    { name: "Git", level: 92 },
    { name: "Docker", level: 75 },
    { name: "AWS", level: 78 }
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

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Creative</span>
            <span className="block text-zinc-400">Developer</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Crafting digital experiences that inspire and engage through innovative design and clean code.
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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">About Me</h2>
              <p className="text-zinc-400 text-lg mb-6">
                I'm a passionate full-stack developer with over 5 years of experience creating digital solutions that matter. 
                My journey began with a love for problem-solving and has evolved into a career dedicated to building 
                beautiful, functional applications that users love.
              </p>
              <p className="text-zinc-400 text-lg mb-8">
                I specialize in modern web technologies and have a keen eye for design, allowing me to bridge 
                the gap between technical implementation and user experience.
              </p>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">50+</div>
                  <div className="text-zinc-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">30+</div>
                  <div className="text-zinc-400">Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">5+</div>
                  <div className="text-zinc-400">Years</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 border-2 border-white/20 rounded-2xl transform rotate-3"></div>
                <div className="absolute inset-0 border-2 border-white/10 rounded-2xl transform -rotate-3"></div>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000" 
                  alt="Professional headshot" 
                  className="w-full rounded-2xl shadow-2xl relative z-10 object-cover h-96"
                />
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
                    <Card className="bg-zinc-900 border-zinc-800 p-6 w-80 h-64 shadow-2xl">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                      <p className="text-zinc-400 text-sm">{project.description}</p>
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
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-zinc-400">hello@portfolio.com</div>
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
                    <div className="text-zinc-400">San Francisco, CA</div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <Button variant="ghost" size="icon" className="bg-zinc-800 hover:bg-white hover:text-black rounded-lg">
                  <Github className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="bg-zinc-800 hover:bg-white hover:text-black rounded-lg">
                  <Linkedin className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="bg-zinc-800 hover:bg-white hover:text-black rounded-lg">
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
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
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
