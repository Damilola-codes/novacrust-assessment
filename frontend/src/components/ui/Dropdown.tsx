'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface DropdownOption {
  id: string;
  label: string;
  sublabel?: string;
  icon?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: DropdownOption | null;
  onChange: (option: DropdownOption) => void;
  placeholder?: string;
  searchable?: boolean;
  label?: string;
}

// Helper to render icon
const renderIcon = (icon: string | undefined, size: number = 24) => {
  if (!icon) return null;
  if (icon.startsWith('/')) {
    return (
      <Image
        src={icon}
        alt=""
        width={size}
        height={size}
        className="rounded-full object-cover"
      />
    );
  }
  return <span className="text-lg">{icon}</span>;
};

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  searchable = false,
  label,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const filteredOptions = searchQuery
    ? options.filter(
        (option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          option.sublabel?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const handleSelect = (option: DropdownOption) => {
    onChange(option);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-[#013941] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full px-4 py-3.5 rounded-full border text-left
            flex items-center justify-between
            transition-all duration-200
            ${isOpen ? 'border-[#0D2B2A] ring-2 ring-[#0D2B2A]/10' : 'border-gray-200 hover:border-gray-300'}
            bg-white
          `}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className={`flex items-center gap-2 ${!value ? 'text-gray-400' : 'text-gray-900'}`}>
            {value ? (
              <>
                {value.icon && (
                  <span className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                    {renderIcon(value.icon, 24)}
                  </span>
                )}
                <span>{value.label}</span>
              </>
            ) : (
              placeholder
            )}
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            role="listbox"
          >
            {/* Search Input */}
            {searchable && (
              <div className="p-3 border-b border-gray-100">
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0D2B2A] focus:ring-1 focus:ring-[#0D2B2A]/20"
                  />
                </div>
              </div>
            )}

            {/* Options List */}
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`
                      w-full px-4 py-3 text-left flex items-center gap-3
                      hover:bg-gray-50 transition-colors
                      ${value?.id === option.id ? 'bg-gray-50' : ''}
                    `}
                    role="option"
                    aria-selected={value?.id === option.id}
                  >
                    {option.icon && (
                      <span className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                        {renderIcon(option.icon, 24)}
                      </span>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {option.label}
                      </p>
                      {option.sublabel && (
                        <p className="text-xs text-gray-500 truncate">
                          {option.sublabel}
                        </p>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
