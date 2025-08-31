import React, { useState } from 'react';
import GlassCard from '../common/GlassCard';
import { Counselor } from '../../types';
import { PhoneIcon, ChevronDownIcon, ExternalLinkIcon } from '../common/Icons';
import { counselors } from '../../data/counselors';

const emergencyHelplines = [
    { name: 'National Suicide Prevention Lifeline', phone: '988', description: '24/7, free and confidential support for people in distress.' },
    { name: 'Crisis Text Line', phone: 'Text HOME to 741741', description: '24/7, free, confidential crisis support via text.' },
    { name: 'iCALL Psychosocial Helpline', phone: '022-25521111', description: 'Support from TISS for emotional and psychological issues.' },
];

const specializedHelplines = [
    {
        id: 'sexual-harassment',
        title: 'Sexual Harassment Helpline',
        description: 'Confidential support and guidance for individuals facing sexual harassment.',
        contacts: [
            { label: 'Women Helpline', number: '181' },
            { label: 'Police (Women Help Desk)', number: '1091' },
        ],
        learnMoreUrl: 'https://wcd.nic.in/schemes/one-stop-centre-scheme-1'
    },
    {
        id: 'lgbtq',
        title: 'LGBTQ+ Rights Support',
        description: 'Support and counseling services for the LGBTQ+ community, provided by verified NGOs.',
        contacts: [
            { label: 'The Humsafar Trust', number: '02226673800' },
        ],
        learnMoreUrl: 'https://humsafar.org/'
    },
    {
        id: 'child-abuse',
        title: 'Child Abuse Protection',
        description: 'A dedicated 24/7 emergency helpline for children in distress or anyone on their behalf.',
        contacts: [
            { label: 'National Childline', number: '1098' },
        ],
        learnMoreUrl: 'https://www.childlineindia.org/'
    },
    {
        id: 'women-protection',
        title: 'Women Protection Helpline',
        description: 'Comprehensive support including police assistance, legal aid, and counseling for women.',
        contacts: [
            { label: 'National Women Helpline', number: '181' },
            { label: 'Police (All India)', number: '112' },
        ],
        learnMoreUrl: 'https://wcd.nic.in/schemes/women-helpline-scheme'
    },
];

const Helpline: React.FC = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-heading mb-2">Helpline & Counselors</h1>
      <p className="text-text-muted mb-8">Find immediate and specialized support resources.</p>

      <GlassCard className="mb-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Emergency Helplines</h2>
        <p className="text-text-body mb-6">If you are in immediate distress or crisis, please reach out to one of these 24/7 services.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {emergencyHelplines.map(line => (
            <div key={line.name} className="bg-white/60 p-4 rounded-lg text-center">
              <h3 className="font-bold text-text-heading">{line.name}</h3>
              <p className="text-2xl font-bold text-accent my-2">{line.phone}</p>
              <p className="text-xs text-text-muted">{line.description}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="mb-8">
        <h2 className="text-2xl font-bold text-text-heading mb-4">Specialized Support Helplines</h2>
        <div className="space-y-4">
            {specializedHelplines.map((helpline) => (
                <div key={helpline.id} className="bg-white/40 rounded-lg overflow-hidden transition-all duration-300">
                    <button
                        onClick={() => toggleExpand(helpline.id)}
                        className="w-full flex justify-between items-center p-4 text-left"
                        aria-expanded={expandedId === helpline.id}
                        aria-controls={`helpline-content-${helpline.id}`}
                    >
                        <h3 className="font-semibold text-text-heading">{helpline.title}</h3>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform ${expandedId === helpline.id ? 'rotate-180' : ''}`} />
                    </button>
                    <div
                        id={`helpline-content-${helpline.id}`}
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedId === helpline.id ? 'max-h-96' : 'max-h-0'}`}
                    >
                        <div className="p-4 pt-0">
                            <p className="text-sm text-text-body mb-4">{helpline.description}</p>
                            <div className="space-y-2 mb-4">
                                {helpline.contacts.map(contact => (
                                    <div key={contact.number} className="flex justify-between items-center bg-white/50 p-2 rounded-md">
                                        <span className="text-sm font-medium text-text-body">{contact.label}: <span className="font-bold text-accent">{contact.number}</span></span>
                                        <a href={`tel:${contact.number}`} className="flex items-center gap-1 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-opacity-90">
                                            <PhoneIcon className="w-3 h-3" /> Call
                                        </a>
                                    </div>
                                ))}
                            </div>
                            <a href={helpline.learnMoreUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-accent font-semibold hover:underline">
                                Learn More <ExternalLinkIcon className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </GlassCard>

      <div>
        <h2 className="text-2xl font-bold text-text-heading mb-4">Our Counselors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {counselors.map(counselor => (
            <GlassCard key={counselor.id} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
              <img src={counselor.imageUrl} alt={counselor.name} className="w-32 h-32 rounded-full flex-shrink-0 object-cover" />
              <div>
                <h3 className="text-xl font-bold text-text-heading">{counselor.name}</h3>
                <p className="font-semibold text-accent mb-2">{counselor.specialty}</p>
                <p className="text-sm text-text-body">{counselor.bio}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Helpline;