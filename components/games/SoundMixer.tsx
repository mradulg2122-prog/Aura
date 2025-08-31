import React, { useState, useRef, useEffect } from 'react';
// Fix: Consolidated icon imports and added MusicIcon to the list.
import { OmIcon, SitarIcon, TempleBellIcon, RainIcon, MusicIcon } from '../common/Icons';

const sounds = [
    { id: 'om', name: 'Om Chant', Icon: OmIcon, url: 'https://cdn.pixabay.com/audio/2022/01/20/audio_b518a9a207.mp3' },
    { id: 'sitar', name: 'Sitar', Icon: SitarIcon, url: 'https://cdn.pixabay.com/audio/2022/05/18/audio_db327a7442.mp3' },
    { id: 'flute', name: 'Flute', Icon: MusicIcon, url: 'https://cdn.pixabay.com/audio/2022/05/22/audio_10793732a3.mp3' },
    { id: 'bells', name: 'Temple Bells', Icon: TempleBellIcon, url: 'https://cdn.pixabay.com/audio/2022/05/23/audio_e6a2082216.mp3' },
    { id: 'rain', name: 'Monsoon', Icon: RainIcon, url: 'https://cdn.pixabay.com/audio/2023/09/02/audio_73147042a0.mp3' },
];


const SoundMixer: React.FC = () => {
    const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
    const [activeSoundId, setActiveSoundId] = useState<string | null>(null);
    const [loadingErrors, setLoadingErrors] = useState<Record<string, boolean>>({});

    useEffect(() => {
        sounds.forEach(sound => {
            if (!audioRefs.current[sound.id]) {
                const audio = new Audio(sound.url);
                audio.loop = true;

                audio.onerror = () => {
                    console.error(`Failed to load audio for: ${sound.name}`);
                    setLoadingErrors(prev => ({ ...prev, [sound.id]: true }));
                };
                
                audioRefs.current[sound.id] = audio;
            }
        });

        // Cleanup function to pause all sounds when component unmounts
        return () => {
             Object.values(audioRefs.current).forEach(audio => {
                if (audio) {
                    audio.pause();
                }
            });
        };
    }, []);

    const toggleSound = (id: string) => {
        const currentlyPlaying = activeSoundId === id;
        
        // Pause all sounds before playing a new one or stopping the current one
        Object.values(audioRefs.current).forEach(audio => {
            if (audio) {
                audio.pause();
            }
        });

        if (currentlyPlaying) {
            // If the clicked sound was the active one, just stop it.
            setActiveSoundId(null);
        } else {
            // Otherwise, start the new sound.
            const audio = audioRefs.current[id];
            if (audio) {
                audio.play().catch(error => {
                    if (error.name !== 'AbortError') {
                      console.error("Audio play failed:", error);
                      setLoadingErrors(prev => ({ ...prev, [id]: true }));
                    }
                });
                setActiveSoundId(id);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl font-bold text-text-heading mb-2">Dhvani: Sound Therapy</h2>
            <p className="text-text-muted mb-8 text-center">🌿 Close your eyes and let calming sounds bring you peace.</p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
                {sounds.map(({ id, name, Icon }) => (
                    <div key={id} className="flex flex-col items-center w-24">
                        <button
                            onClick={() => toggleSound(id)}
                            disabled={loadingErrors[id]}
                            className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border-4 ${
                                loadingErrors[id] 
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300' 
                                : activeSoundId === id 
                                ? 'bg-accent text-white border-accent-light' 
                                : 'bg-white/60 text-text-body border-transparent hover:scale-105'
                            }`}
                            aria-label={loadingErrors[id] ? `${name} sound not available` : `Toggle ${name} sound`}
                        >
                            <Icon className="w-10 h-10" />
                        </button>
                        {loadingErrors[id] ? (
                             <p className="mt-3 text-xs text-red-600 text-center">⚠️ Sound not available, please try again.</p>
                        ) : (
                            <span className="mt-3 font-semibold text-text-muted">{name}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SoundMixer;