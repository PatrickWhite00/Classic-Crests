import React, { useState, useEffect } from 'react';
import { Eye, Sun, Moon, Type, X } from 'lucide-react';

interface AccessibilityMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({ isOpen, onClose }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Apply high contrast mode
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Apply large text
    if (largeText) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }

    // Apply reduced motion
    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }

    // Save preferences to localStorage
    localStorage.setItem('accessibility', JSON.stringify({
      highContrast,
      largeText,
      reducedMotion
    }));
  }, [highContrast, largeText, reducedMotion]);

  useEffect(() => {
    // Load saved preferences
    const savedPreferences = localStorage.getItem('accessibility');
    if (savedPreferences) {
      const { highContrast: savedHighContrast, largeText: savedLargeText, reducedMotion: savedReducedMotion } = JSON.parse(savedPreferences);
      setHighContrast(savedHighContrast);
      setLargeText(savedLargeText);
      setReducedMotion(savedReducedMotion);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="accessibility-title">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        <div className="flex items-center justify-between bg-gray-100 px-6 py-4">
          <h2 id="accessibility-title" className="text-xl font-bold text-gray-800">Accessibility Options</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close accessibility menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sun className="w-6 h-6 text-[#C5A572]" />
                <div>
                  <h3 className="font-medium">High Contrast</h3>
                  <p className="text-sm text-gray-600">Increase color contrast for better readability</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={highContrast}
                  onChange={() => setHighContrast(!highContrast)}
                  aria-label="Toggle high contrast mode"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#C5A572]/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C5A572]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Type className="w-6 h-6 text-[#C5A572]" />
                <div>
                  <h3 className="font-medium">Larger Text</h3>
                  <p className="text-sm text-gray-600">Increase text size for easier reading</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={largeText}
                  onChange={() => setLargeText(!largeText)}
                  aria-label="Toggle larger text"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#C5A572]/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C5A572]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-[#C5A572]" />
                <div>
                  <h3 className="font-medium">Reduced Motion</h3>
                  <p className="text-sm text-gray-600">Minimize animations and transitions</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={reducedMotion}
                  onChange={() => setReducedMotion(!reducedMotion)}
                  aria-label="Toggle reduced motion"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#C5A572]/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C5A572]"></div>
              </label>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              These settings will be saved in your browser and applied to all pages on this site.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityMenu;