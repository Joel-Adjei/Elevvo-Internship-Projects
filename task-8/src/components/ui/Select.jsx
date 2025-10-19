import React from 'react'

const Select = ({ className , onChange, name, value, options = [], placeholder = "Select an option", disabled = false }) => {
  return (
    <div>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full px-4 py-2.5 pr-10 bg-green-50/50 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className }`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Select