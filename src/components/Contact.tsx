import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import AIInputSearch from './AIInputSearch';

type ContactMethod = {
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
};

const contactMethods: ContactMethod[] = [
  {
    icon: <Mail className="w-5 h-5 text-secondary" />,
    title: 'Email',
    value: 'niwat.yahuadong@gmail.com',
    href: 'mailto:niwat.yahuadong@gmail.com',
  },
  {
    icon: <Phone className="w-5 h-5 text-secondary" />,
    title: 'Phone',
    value: '+66 81 141 6859',
    href: 'tel:+66123456789',
  },
  {
    icon: <MapPin className="w-5 h-5 text-secondary" />,
    title: 'Location',
    value: 'Sukhumvit, Bangkok, Thailand',
    href: 'https://www.google.com/maps/place/Sukhumvit,+Bangkok',
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-primary rounded-t-2xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get In <span className="text-secondary">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 gap-12 items-center">
          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group h-full"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="p-2 rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                  {method.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">{method.title}</h3>
                  <p className="text-muted-foreground text-sm">{method.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* AI Input Search */}
          <div className="mt-8">
            <AIInputSearch />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
