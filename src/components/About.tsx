import { motion } from 'framer-motion';
const experiences = [
  {
    role: 'Sr. UX/UI Designer (Team Lead)',
    company: 'WiPay Co., Ltd',
    period: 'Nov 2024 - Present',
    description: 'Leading UX/UI design initiatives, developing AI tools for team efficiency, and managing design systems. Conducting user research, creating prototypes, and collaborating with cross-functional teams to deliver user-centered solutions.'
  },
  {
    role: 'Sr. UX/UI Designer (Team Lead)',
    company: 'Bitkub Blockchain Technology Co., Ltd',
    period: 'Oct 2023 - Nov 2024',
    description: 'Led product-design team for Crypto Wallet, NFT, and Dapp projects. Established UX processes, mentored junior designers, and aligned design with business goals. Created and managed Design Tokens across all products.'
  },
  {
    role: 'Sr. UX/UI Designer (Team Lead)',
    company: 'WiPay Co., Ltd',
    period: 'Jan 2022 - Oct 2023',
    description: 'Led design processes from research to implementation, working closely with cross-functional teams. Built and maintained design systems, conducted user testing, and mentored team members while ensuring design quality and consistency.'
  },
  {
    role: 'UX/UI Designer',
    company: 'Kiatnakin Phatra Securities',
    period: 'Apr 2021 - Jan 2022',
    description: 'Led UX team in designing financial solutions, from research to high-fidelity mockups. Analyzed user and business needs to develop effective product solutions.'
  },

  {
    role: 'Art Director',
    company: 'IDC Premier',
    period: 'Jun 2018 - Dec 2020',
    description: 'Led creative direction and design projects, managed design team, and executed marketing campaigns across various mediums including social media and web UI.'
  },

  {
    role: 'Graphic Designer',
    company: 'Book and Box & Aksorn+',
    period: 'May 2009 - May 2018',
    description: 'Created printed-media products for both online and offline formats, specializing in visual communication and layout design.'
  },

];

export function About() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About <span className="text-secondary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            I am a team-lead product designer passionate about user experience (UX) with over 13 years of self-taught experience in both online and offline design. I am dedicated to contributing to the creation of user-friendly products and driving future business growth.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Experience Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 text-center">My Experience</h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div 
                  key={index}
                  className="relative pl-8 pb-8 border-l-2 border-secondary/20 last:border-transparent last:pb-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -left-2.5 top-0 w-4 h-4 rounded-full bg-secondary"></div>
                  <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-secondary to-transparent"></div>
                  
                  <div className="relative
                    before:absolute before:content-[''] before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-4 before:h-px before:bg-secondary/50
                    after:absolute after:content-[''] after:left-4 after:top-1/2 after:-translate-y-1/2 after:w-2 after:h-2 after:rounded-full after:bg-secondary
                  ">
                    <span className="inline-block ml-8 text-sm text-secondary font-medium">{exp.period}</span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mt-2">{exp.role}</h4>
                  <p className="text-muted-foreground mb-2">{exp.company}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
