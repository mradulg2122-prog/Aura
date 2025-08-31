import React, { useState, useMemo } from 'react';
import GlassCard from '../common/GlassCard';
import { counselors } from '../../data/counselors';
import { Counselor } from '../../types';
import CounselorCard from './CounselorCard';
import { SearchIcon } from '../common/Icons';

interface FindTherapistProps {
    onBookCounselor: (counselor: Counselor) => void;
}

const FindTherapist: React.FC<FindTherapistProps> = ({ onBookCounselor }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('All');
    const [languageFilter, setLanguageFilter] = useState('All');
    const [availabilityFilter, setAvailabilityFilter] = useState('All');

    const uniqueSpecialties = useMemo(() => ['All', ...new Set(counselors.map(c => c.specialty))], []);
    const uniqueLanguages = useMemo(() => ['All', ...new Set(counselors.flatMap(c => c.languages))], []);
    const uniqueAvailabilities = useMemo(() => ['All', ...new Set(counselors.flatMap(c => c.availability))], []);

    const filteredCounselors = useMemo(() => {
        return counselors.filter(counselor => {
            const matchesSearch = counselor.name.toLowerCase().includes(searchTerm.toLowerCase()) || counselor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSpecialty = specialtyFilter === 'All' || counselor.specialty === specialtyFilter;
            const matchesLanguage = languageFilter === 'All' || counselor.languages.includes(languageFilter);
            const matchesAvailability = availabilityFilter === 'All' || counselor.availability.includes(availabilityFilter);

            return matchesSearch && matchesSpecialty && matchesLanguage && matchesAvailability;
        });
    }, [searchTerm, specialtyFilter, languageFilter, availabilityFilter]);

    const FilterSelect: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[]; }> = ({ label, value, onChange, options }) => (
        <div className="flex-1 min-w-[150px]">
            <label htmlFor={label} className="block text-sm font-medium text-text-muted mb-1">{label}</label>
            <select
                id={label}
                value={value}
                onChange={onChange}
                className="w-full appearance-none bg-white/60 backdrop-blur-sm rounded-lg py-2 px-3 text-text-body focus:outline-none focus:ring-2 focus:ring-accent border border-white/20"
            >
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </div>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-text-heading mb-2">Find a Therapist</h1>
            <p className="text-text-muted mb-8">Search our directory of qualified professionals to find the right fit for you.</p>
            
            <GlassCard className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-4">
                        <label htmlFor="search" className="block text-sm font-medium text-text-muted mb-1">Search by name or specialty</label>
                        <div className="relative">
                            <input
                                type="text"
                                id="search"
                                placeholder="e.g., Priya Sharma or Anxiety"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white/80 rounded-lg text-text-heading placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent border border-white/20"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="w-5 h-5 text-text-muted" />
                            </div>
                        </div>
                    </div>
                     <FilterSelect label="Specialty" value={specialtyFilter} onChange={e => setSpecialtyFilter(e.target.value)} options={uniqueSpecialties} />
                     <FilterSelect label="Language" value={languageFilter} onChange={e => setLanguageFilter(e.target.value)} options={uniqueLanguages} />
                     <FilterSelect label="Availability" value={availabilityFilter} onChange={e => setAvailabilityFilter(e.target.value)} options={uniqueAvailabilities} />
                </div>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCounselors.length > 0 ? (
                    filteredCounselors.map(counselor => (
                        <CounselorCard key={counselor.id} counselor={counselor} onBook={onBookCounselor} />
                    ))
                ) : (
                    <div className="lg:col-span-3 text-center py-12">
                        <p className="text-text-body font-semibold">No counselors match your criteria.</p>
                        <p className="text-sm text-text-muted">Try adjusting your search filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindTherapist;