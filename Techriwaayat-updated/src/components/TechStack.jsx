import { 
  FaJava, FaJs, FaReact, FaNode, FaVuejs, FaLeaf, FaCss3, FaPhp, FaWordpress,
  FaLaravel, FaDatabase, FaLeaf as FaMongo, FaDatabase as FaPostgres, 
  FaGithub, FaDocker, FaAws, FaMicrosoft, FaFire, FaStripe,
  FaFigma, FaCode, FaVial, FaServer, FaLinux, FaGitAlt, FaLock,
  FaHeading, FaShoppingCart, FaRocket, FaBolt, FaWrench, FaCog
} from 'react-icons/fa'
import { SiTypescript, SiNextdotjs, SiGraphql, SiMysql, SiZapier, SiMake, SiOpenai, SiNginx, SiPostman, SiSass, SiRedis } from 'react-icons/si'
import { VscAzure } from 'react-icons/vsc'
import './TechStack.css'

const TechStack = () => {
  const technologies = [
    { id: 1, name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { id: 2, name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
    { id: 3, name: 'React', icon: FaReact, color: '#61DAFB' },
    { id: 4, name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
    { id: 5, name: 'Vue.js', icon: FaVuejs, color: '#4FC08D' },
    { id: 6, name: 'Node.js', icon: FaNode, color: '#68A063' },
    { id: 7, name: 'Tailwind CSS', icon: FaBolt, color: '#06B6D4' },
    { id: 8, name: 'PHP', icon: FaPhp, color: '#777BB4' },
    { id: 9, name: 'WordPress', icon: FaWordpress, color: '#21759B' },
    { id: 10, name: 'Laravel', icon: FaLaravel, color: '#FF2D20' },
    { id: 11, name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
    { id: 12, name: 'MongoDB', icon: FaLeaf, color: '#13AA52' },
    { id: 13, name: 'MySQL', icon: SiMysql, color: '#00758F' },
    { id: 14, name: 'PostgreSQL', icon: FaDatabase, color: '#336791' },
    { id: 15, name: 'Redis', icon: SiRedis, color: '#DC382D' },
    { id: 16, name: 'Zapier', icon: SiZapier, color: '#FF4A00' },
    { id: 17, name: 'Make.com', icon: SiMake, color: '#FFC43D' },
    { id: 18, name: 'ChatGPT / AI', icon: SiOpenai, color: '#74AA9C' },
    { id: 19, name: 'GitHub', icon: FaGithub, color: '#000000' },
    { id: 20, name: 'Docker', icon: FaDocker, color: '#2496ED' },
    { id: 21, name: 'AWS', icon: FaAws, color: '#FF9900' },
    { id: 22, name: 'Azure', icon: VscAzure, color: '#0078D4' },
    { id: 23, name: 'Firebase', icon: FaFire, color: '#FFCA28' },
    { id: 24, name: 'Stripe', icon: FaStripe, color: '#635BFF' },
    { id: 25, name: 'Figma', icon: FaFigma, color: '#F24E1E' },
    { id: 26, name: 'Webpack/Vite', icon: FaBolt, color: '#646CFF' },
    { id: 27, name: 'Jest/Cypress', icon: FaVial, color: '#15AE60' },
    { id: 28, name: 'Nginx', icon: SiNginx, color: '#009639' },
    { id: 29, name: 'Linux', icon: FaLinux, color: '#FCC624' },
    { id: 30, name: 'CI/CD', icon: FaGitAlt, color: '#FF6B6B' },
    { id: 31, name: 'REST API', icon: FaCode, color: '#61DAFB' },
    { id: 32, name: 'OAuth/JWT', icon: FaLock, color: '#FF6B9D' },
    { id: 33, name: 'Microservices', icon: FaCog, color: '#A855F7' },
    { id: 34, name: 'Angular', icon: FaRocket, color: '#DD0031' },
    { id: 35, name: 'Postman', icon: SiPostman, color: '#FF6C37' },
    { id: 36, name: 'SASS/LESS', icon: SiSass, color: '#CC6699' }
  ]

  return (
    <section id="techstack" className="techstack-section" data-aos="fade-up">
      <div className="techstack-container">
        <div className="techstack-header">
          <span className="techstack-label">TECH STACK</span>
          <h2 className="techstack-title">Technologies We <span className="highlight">Master</span></h2>
          <p className="techstack-subtitle">
            Building scalable solutions with cutting-edge tools across web, mobile, AI,<br />
            and cloud infrastructure.
          </p>
        </div>

        <div className="techstack-grid">
          {technologies.map((tech) => {
            const IconComponent = tech.icon
            return (
              <div key={tech.id} className="tech-card" style={{'--tech-color': tech.color}}>
                <div className="tech-icon-wrapper">
                  <IconComponent className="tech-icon" />
                </div>
                <p className="tech-name">{tech.name}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TechStack
