import React from 'react';

type IconProps = {
  className?: string;
};

export const LogoIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.08V7.92c0-.41.47-.65.8-.4l4.52 3.08c.33.22.33.77 0 .99l-4.52 3.08c-.33.25-.8.01-.8-.4z" />
    </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
    </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
);

export const LocationPinIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 21l-4.95-6.05a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

export const BedIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
);

export const BathIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11l7-7 7 7M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z" />
    </svg>
);

export const AreaIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
    </svg>
);

export const AffordablePropertyTaxesIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14.5l-1-1m2 0l-1 1m-4-2.5h8" />
    </svg>
);
export const GuaranteedQualityHomesIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);
export const FastAndEasyProcessIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
export const PropertyInsuranceIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
);

export const ChatIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
    </svg>
);

export const SendIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
    </svg>
);

export const SpinnerIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
    </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
    </svg>
);

export const SupportIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
    </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
    </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
    </svg>
);

export const ChevronUpIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
    </svg>
);

export const MapIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13v-6m0 6l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m0 10v-6m0 6l-6-3" />
    </svg>
);

export const ListIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
);

export const MapPinIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg className={className} viewBox="0 0 384 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67a24 24 0 01-35.464 0zM192 256a64 64 0 100-128 64 64 0 000 128z"/>
  </svg>
);

export const FilterClearIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

export const QuoteIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 10.5C6.5 12.43 8.07 14 10 14V17C5.03 17 1 12.97 1 8V4H7V10.5H6.5ZM17.5 10.5C17.5 12.43 19.07 14 21 14V17C16.03 17 12 12.97 12 8V4H18V10.5H17.5Z" />
    </svg>
);

// Partner Logos
export const PartnerLogo1: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 128 32" fill="currentColor"><path d="M8.86 2.05c-3.1 0-5.83 2.5-5.83 6.08 0 3.58 2.72 6.08 5.83 6.08 2.05 0 3.75-1.1 4.6-2.8h.07v2.4h3.5V2.45h-3.5v2.4h-.07c-.85-1.7-2.55-2.8-4.6-2.8zm.28 9.38c-1.5 0-2.6-1.2-2.6-2.9 0-1.73 1.1-2.9 2.6-2.9s2.6 1.17 2.6 2.9c0 1.7-1.1 2.9-2.6 2.9zM22.5 14.15c-3.1 0-5.1-2.1-5.1-5.1s2-5.1 5.1-5.1c1.3 0 2.45.4 3.25 1.2l-2.1 1.7c-.4-.4-.9-.6-1.2-.6-1.1 0-1.7.9-1.7 2.8h5.2c0 2.9-1.9 5.1-5.15 5.1zm.1-7.1c-1 0-1.6.7-1.7 1.8h3.4c-.1-1.1-.7-1.8-1.7-1.8zM35.6 14.15c-2.5 0-4.4-1.9-4.4-4.5s1.9-4.5 4.4-4.5c2.5 0 4.4 1.9 4.4 4.5s-1.9 4.5-4.4 4.5zm0-7.2c-1.2 0-2.1 1.1-2.1 2.7s.9 2.7 2.1 2.7 2.1-1.1 2.1-2.7-.9-2.7-2.1-2.7zM48.6 4.35l-2.4 7.2h-3.5l-2.4-7.2h3.8l.8 2.6c.2.6.4 1.3.6 1.9h.07c.2-.6.4-1.3.6-1.9l.8-2.6h3.4zM54.5 2.45h3.5v11.7h-3.5zM64.6 14.15c-2.4 0-4-1.6-4-3.5 0-2.1 1.7-3.4 3.9-3.4.9 0 1.5.2 2.1.5V6.1c0-.9-.6-1.4-1.7-1.4-.8 0-1.6.4-2.3.9l-1.3-2c.9-.7 2.3-1.2 3.8-1.2 2.4 0 3.9 1.3 3.9 4.1v6.2h-3.5v-.9h-.07c-.6.7-1.5 1-2.4 1zm.4-1.9c.8 0 1.5-.5 1.5-1.4v-1c-.5-.2-1.1-.4-1.7-.4-1.1 0-1.6.5-1.6 1.2s.6 1.6 1.8 1.6zM77.4 14.15c-1.6 0-2.8-.8-3.4-2h-.07v5.5h-3.5V2.45h3.5v4.5h.07c.6-1.2 1.8-2 3.4-2 2.6 0 4.5 2.1 4.5 5.1s-1.9 4.1-4.5 4.1zm-.2-7.1c-1.3 0-2.3 1.1-2.3 2.9s1 2.9 2.3 2.9 2.3-1.1 2.3-2.9-1-2.9-2.3-2.9zM88.1 4.05c-1.6 0-2.8.9-3.4 2.1h-.07V4.35h-3.5v9.8h3.5v-5.2c0-1.5 1-2.6 2.4-2.6.7 0 1.2.2 1.6.6v7.2h3.5v-5.7c0-2.8-1.5-4.2-3.6-4.2zM100.2 14.15c-2.5 0-4.4-1.9-4.4-4.5s1.9-4.5 4.4-4.5c2.5 0 4.4 1.9 4.4 4.5s-1.9 4.5-4.4 4.5zm0-7.2c-1.2 0-2.1 1.1-2.1 2.7s.9 2.7 2.1 2.7 2.1-1.1 2.1-2.7-.9-2.7-2.1-2.7zM111.9 2.45h3.5v8.5h.07c.6-1.3 1.9-2.2 3.5-2.2.4 0 .7 0 1.1.1v3.4c-.4-.1-.8-.1-1.2-.1-1.6 0-2.7.9-3.2 2.1h-.07v2.9h-3.7zM127.8 8.65c0 2.5-1.5 4-3.8 4-1.5 0-2.5-.7-3.1-1.6h-.07v5.2h-3.5V.25h3.5v4.9h.07c.6-1.1 1.6-1.8 3-1.8 2.4 0 3.9 1.7 3.9 5.3zm-3.6.1c0-1.4-.8-2.3-2-2.3s-2 .9-2 2.3.8 2.3 2 2.3 2-.9 2-2.3z"/></svg>
);
export const PartnerLogo2: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 128 32" fill="currentColor"><path d="M14.6 26.5c-6.1 0-11-4.9-11-11s4.9-11 11-11 11 4.9 11 11-4.9 11-11 11zm0-19c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM36.1 26.5c-6.1 0-11-4.9-11-11s4.9-11 11-11 11 4.9 11 11-4.9 11-11 11zm0-19c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM61.6 26.5h-8V4.5h8v22zM79.1 26.5h-8V4.5h8v22zM98.6 26.5c-6.1 0-11-4.9-11-11s4.9-11 11-11 11 4.9 11 11-4.9 11-11 11zm0-19c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM120.1 26.5c-6.1 0-11-4.9-11-11s4.9-11 11-11 11 4.9 11 11-4.9 11-11 11zm0-19c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z"/></svg>
);
export const PartnerLogo3: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 128 32" fill="currentColor"><path d="M2.5 4.5h16v3h-16zM2.5 14.5h16v3h-16zM2.5 24.5h16v3h-16zM30.5 4.5h4v23h-4zM42.5 4.5h4v23h-4zM54.5 4.5h4v23h-4zM66.5 4.5h16v3h-16zM66.5 14.5h16v3h-16zM66.5 24.5h16v3h-16zM90.5 4.5h3v23h-3zM99.5 4.5h3v23h-3zM108.5 4.5h3v23h-3zM117.5 4.5h3v23h-3z"/></svg>
);
export const PartnerLogo4: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 128 32" fill="currentColor"><path d="M16 31.5c-8.6 0-15.5-7-15.5-15.5S7.4.5 16 .5s15.5 7 15.5 15.5S24.6 31.5 16 31.5zm0-28C9.1 3.5 3.5 9.1 3.5 16S9.1 28.5 16 28.5 28.5 22.9 28.5 16 22.9 3.5 16 3.5zM56 31.5c-8.6 0-15.5-7-15.5-15.5S47.4.5 56 .5s15.5 7 15.5 15.5S64.6 31.5 56 31.5zm0-28C49.1 3.5 43.5 9.1 43.5 16S49.1 28.5 56 28.5 68.5 22.9 68.5 16 64.9 3.5 56 3.5zM96 31.5c-8.6 0-15.5-7-15.5-15.5S87.4.5 96 .5s15.5 7 15.5 15.5S104.6 31.5 96 31.5zm0-28C89.1 3.5 83.5 9.1 83.5 16S89.1 28.5 96 28.5 108.5 22.9 108.5 16 104.9 3.5 96 3.5zM120 31.5h-4V.5h4v31z"/></svg>
);
export const PartnerLogo5: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 128 32" fill="currentColor"><path d="M2 30V2h10l14 14-14 14H2zm5-5h5l9-9-9-9H7v18zM38 30V2h10l14 14-14 14H38zm5-5h5l9-9-9-9h-5v18zM74 30V2h10l14 14-14 14H74zm5-5h5l9-9-9-9h-5v18zM110 30V2h10l6 7-6 7 6 7-6 7h-10z"/></svg>
);
export const PartnerLogo6: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 128 32" fill="currentColor"><path d="M16 32c-8.8 0-16-7.2-16-16S7.2 0 16 0s16 7.2 16 16-7.2 16-16 16zM48 32c-8.8 0-16-7.2-16-16S39.2 0 48 0s16 7.2 16 16-7.2 16-16 16zM80 32c-8.8 0-16-7.2-16-16S71.2 0 80 0s16 7.2 16 16-7.2 16-16 16zM112 32c-8.8 0-16-7.2-16-16S103.2 0 112 0s16 7.2 16 16-7.2 16-16 16z"/></svg>
);

export const CitySkylineIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,120 L0,100 L50,100 L50,60 L100,60 L100,120 L150,120 L150,80 L200,80 L200,120 L250,120 L250,50 L300,50 L300,120 L350,120 L350,90 L400,90 L400,120 L450,120 L450,30 L500,30 L500,120 L550,120 L550,70 L600,70 L600,120 L650,120 L650,40 L700,40 L700,120 L750,120 L750,85 L800,85 L800,120 L850,120 L850,55 L900,55 L900,120 L950,120 L950,75 L1000,75 L1000,120 L1050,120 L1050,65 L1100,65 L1100,120 L1150,120 L1150,95 L1200,95 L1200,120 L0,120 Z" />
    </svg>
);

export const FacebookIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.35C0 23.41.59 24 1.325 24H12.82v-9.29h-3.128V11.16h3.128V8.62c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.55h-3.12V24h5.693c.734 0 1.325-.59 1.325-1.325V1.325C24 .59 23.409 0 22.675 0z" />
    </svg>
);

export const TwitterIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085c.645 1.956 2.52 3.379 4.734 3.419a9.865 9.865 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.447c-3.119 0-3.482.01-4.694.063-2.61.12-3.832 1.34-3.952 3.952-.053 1.21-.062 1.572-.062 4.687s.01 3.477.062 4.694c.12 2.61 1.34 3.832 3.952 3.952 1.21.053 1.572.062 4.694.062s3.482-.01 4.694-.062c2.61-.12 3.832-1.34 3.952-3.952.053-1.21.062-1.572.062-4.694s-.01-3.477-.062-4.694c-.12-2.61-1.34-3.832-3.952-3.952C15.482 3.62 15.119 3.61 12 3.61zM12 6.883c-2.826 0-5.117 2.291-5.117 5.117s2.291 5.117 5.117 5.117 5.117-2.291 5.117-5.117S14.826 6.883 12 6.883zm0 8.792c-2.029 0-3.675-1.646-3.675-3.675s1.646-3.675 3.675-3.675 3.675 1.646 3.675 3.675-1.646 3.675-3.675 3.675zm5.22-8.219c-.584 0-1.057.473-1.057 1.057s.473 1.057 1.057 1.057 1.057-.473 1.057-1.057-.473-1.057-1.057-1.057z" />
    </svg>
);

export const LinkedInIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

export const HamburgerIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
    </svg>
);