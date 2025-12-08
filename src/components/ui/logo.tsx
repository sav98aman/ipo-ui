"use client";

// Option 1: Glowing Hexagon with Pulse
export function LogoOption1({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            {/* Outer glow pulse */}
            <div className="absolute inset-[-4px] rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-60 blur-md animate-pulse" />

            <svg viewBox="0 0 100 100" className="relative z-10 w-full h-full">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                </defs>

                {/* Hexagon background */}
                <path
                    d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
                    fill="url(#grad1)"
                    className="drop-shadow-lg"
                />

                {/* Chart bars */}
                <rect x="25" y="55" width="10" height="25" fill="white" opacity="0.9" rx="2">
                    <animate attributeName="height" values="15;25;15" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="y" values="65;55;65" dur="1.5s" repeatCount="indefinite" />
                </rect>
                <rect x="40" y="45" width="10" height="35" fill="white" opacity="0.9" rx="2">
                    <animate attributeName="height" values="25;35;25" dur="1.5s" repeatCount="indefinite" begin="0.2s" />
                    <animate attributeName="y" values="55;45;55" dur="1.5s" repeatCount="indefinite" begin="0.2s" />
                </rect>
                <rect x="55" y="35" width="10" height="45" fill="white" opacity="0.9" rx="2">
                    <animate attributeName="height" values="35;45;35" dur="1.5s" repeatCount="indefinite" begin="0.4s" />
                    <animate attributeName="y" values="45;35;45" dur="1.5s" repeatCount="indefinite" begin="0.4s" />
                </rect>
                <rect x="70" y="25" width="10" height="55" fill="white" opacity="0.9" rx="2">
                    <animate attributeName="height" values="45;55;45" dur="1.5s" repeatCount="indefinite" begin="0.6s" />
                    <animate attributeName="y" values="35;25;35" dur="1.5s" repeatCount="indefinite" begin="0.6s" />
                </rect>

                {/* Arrow up */}
                <path d="M85 20 L90 30 L87 30 L87 40 L83 40 L83 30 L80 30 Z" fill="#22c55e">
                    <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
                </path>
            </svg>
        </div>
    );
}

// Option 2: Rotating Ring with Center Icon
export function LogoOption2({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                </defs>

                {/* Rotating outer ring */}
                <circle
                    cx="50" cy="50" r="45"
                    fill="none"
                    stroke="url(#ringGrad)"
                    strokeWidth="6"
                    strokeDasharray="60 220"
                    strokeLinecap="round"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 50 50"
                        to="360 50 50"
                        dur="3s"
                        repeatCount="indefinite"
                    />
                </circle>

                {/* Inner circle */}
                <circle cx="50" cy="50" r="35" fill="#0f172a" />

                {/* IPO text */}
                <text x="50" y="48" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Arial">
                    IPO
                </text>

                {/* Upward arrow */}
                <path d="M42 60 L50 52 L58 60" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round">
                    <animate attributeName="stroke" values="#22c55e;#3b82f6;#22c55e" dur="2s" repeatCount="indefinite" />
                </path>
                <line x1="50" y1="52" x2="50" y2="68" stroke="#22c55e" strokeWidth="3" strokeLinecap="round">
                    <animate attributeName="stroke" values="#22c55e;#3b82f6;#22c55e" dur="2s" repeatCount="indefinite" />
                </line>
            </svg>
        </div>
    );
}

// Option 3: Modern Gradient Square with Animated Line Chart
export function LogoOption3({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className} group`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="bgGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1e3a8a" />
                        <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                    <linearGradient id="lineGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                </defs>

                {/* Background */}
                <rect x="8" y="8" width="84" height="84" rx="20" fill="url(#bgGrad3)" />

                {/* Grid lines */}
                <line x1="20" y1="30" x2="80" y2="30" stroke="white" strokeOpacity="0.1" />
                <line x1="20" y1="50" x2="80" y2="50" stroke="white" strokeOpacity="0.1" />
                <line x1="20" y1="70" x2="80" y2="70" stroke="white" strokeOpacity="0.1" />

                {/* Animated chart line */}
                <path
                    d="M20 70 L35 55 L50 60 L65 35 L80 20"
                    fill="none"
                    stroke="url(#lineGrad3)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="150"
                    strokeDashoffset="150"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="150"
                        to="0"
                        dur="2s"
                        fill="freeze"
                        repeatCount="indefinite"
                    />
                </path>

                {/* Dot at end */}
                <circle cx="80" cy="20" r="5" fill="#22c55e">
                    <animate attributeName="r" values="4;6;4" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* GMP text */}
                <text x="50" y="88" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" opacity="0.9">
                    GMP
                </text>
            </svg>
        </div>
    );
}

// Option 4: Diamond with Rocket
export function LogoOption4({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                </defs>

                {/* Diamond shape */}
                <path
                    d="M50 5 L95 50 L50 95 L5 50 Z"
                    fill="url(#diamondGrad)"
                    className="drop-shadow-lg"
                />

                {/* Inner diamond */}
                <path d="M50 15 L85 50 L50 85 L15 50 Z" fill="#0f172a" />

                {/* Rocket */}
                <g>
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,3;0,-3;0,3"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                    {/* Rocket body */}
                    <path d="M50 25 L56 45 L50 42 L44 45 Z" fill="white" />
                    {/* Rocket fins */}
                    <path d="M44 45 L40 55 L44 50 Z" fill="#3b82f6" />
                    <path d="M56 45 L60 55 L56 50 Z" fill="#3b82f6" />
                    {/* Rocket window */}
                    <circle cx="50" cy="35" r="3" fill="#3b82f6" />
                    {/* Flame */}
                    <path d="M46 50 L50 65 L54 50" fill="#f59e0b">
                        <animate attributeName="d"
                            values="M46 50 L50 60 L54 50;M46 50 L50 70 L54 50;M46 50 L50 60 L54 50"
                            dur="0.3s"
                            repeatCount="indefinite"
                        />
                    </path>
                </g>

                {/* Particles */}
                <circle cx="35" cy="70" r="2" fill="#f59e0b" opacity="0.8">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
                </circle>
                <circle cx="65" cy="75" r="1.5" fill="#ef4444" opacity="0.8">
                    <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" begin="0.3s" />
                </circle>
            </svg>
        </div>
    );
}

// Option 5: Sleek Circular with Pulse
export function LogoOption5({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            {/* Animated rings */}
            <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-ping" />
            <div className="absolute inset-1 rounded-full border border-purple-500/20 animate-ping" style={{ animationDelay: '0.5s' }} />

            <svg viewBox="0 0 100 100" className="relative z-10 w-full h-full">
                <defs>
                    <linearGradient id="circGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                </defs>

                {/* Main circle */}
                <circle cx="50" cy="50" r="45" fill="url(#circGrad)" />

                {/* Letter I */}
                <rect x="30" y="25" width="8" height="50" fill="white" rx="2" />
                <rect x="26" y="25" width="16" height="6" fill="white" rx="1" />
                <rect x="26" y="69" width="16" height="6" fill="white" rx="1" />

                {/* Arrow */}
                <path d="M55 75 L55 35 L48 45 M55 35 L62 45" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
                    <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="1.5s" repeatCount="indefinite" />
                </path>

                {/* Dot */}
                <circle cx="70" cy="30" r="6" fill="#22c55e">
                    <animate attributeName="r" values="5;7;5" dur="1s" repeatCount="indefinite" />
                </circle>
            </svg>
        </div>
    );
}

// Option 6: Bull Market Shield - Bull icon with rising trend
export function LogoOption6({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="shieldGrad6" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="goldGrad6" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                </defs>

                {/* Shield background */}
                <path
                    d="M50 5 L90 20 L90 55 C90 75 70 90 50 95 C30 90 10 75 10 55 L10 20 Z"
                    fill="url(#shieldGrad6)"
                    className="drop-shadow-lg"
                />

                {/* Inner shield */}
                <path
                    d="M50 12 L82 24 L82 53 C82 70 65 82 50 87 C35 82 18 70 18 53 L18 24 Z"
                    fill="#0f172a"
                />

                {/* Bull head - simplified */}
                <g>
                    {/* Bull horns */}
                    <path d="M25 40 Q30 25 40 35" fill="none" stroke="url(#goldGrad6)" strokeWidth="4" strokeLinecap="round">
                        <animate attributeName="stroke-width" values="4;5;4" dur="2s" repeatCount="indefinite" />
                    </path>
                    <path d="M75 40 Q70 25 60 35" fill="none" stroke="url(#goldGrad6)" strokeWidth="4" strokeLinecap="round">
                        <animate attributeName="stroke-width" values="4;5;4" dur="2s" repeatCount="indefinite" />
                    </path>
                    {/* Bull face */}
                    <ellipse cx="50" cy="50" rx="18" ry="15" fill="url(#goldGrad6)" />
                    {/* Eyes */}
                    <circle cx="42" cy="47" r="3" fill="#0f172a" />
                    <circle cx="58" cy="47" r="3" fill="#0f172a" />
                    {/* Nose */}
                    <ellipse cx="50" cy="57" rx="8" ry="5" fill="#0f172a" opacity="0.3" />
                </g>

                {/* Rising trend arrow */}
                <path d="M30 75 L50 60 L70 70 L85 50" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeDasharray="80" strokeDashoffset="80">
                    <animate attributeName="stroke-dashoffset" from="80" to="0" dur="2s" repeatCount="indefinite" />
                </path>
                <circle cx="85" cy="50" r="4" fill="#22c55e" opacity="0">
                    <animate attributeName="opacity" values="0;1;1" dur="2s" repeatCount="indefinite" />
                </circle>
            </svg>
        </div>
    );
}

// Option 7: Morphing Stock Symbol - $ morphing with waves
export function LogoOption7({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            {/* Ripple effect */}
            <div className="absolute inset-[-8px] rounded-full border-2 border-emerald-400/20 animate-ping" />

            <svg viewBox="0 0 100 100" className="relative z-10 w-full h-full">
                <defs>
                    <linearGradient id="moneyGrad7" x1="0%" y1="0%" x2="100%">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="50%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <filter id="glow7">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Background circle */}
                <circle cx="50" cy="50" r="45" fill="#0f172a" stroke="url(#moneyGrad7)" strokeWidth="3" />

                {/* Animated dollar sign */}
                <g filter="url(#glow7)">
                    {/* Dollar sign S curve */}
                    <path
                        d="M40 35 Q60 35 60 47 Q60 55 50 55 Q40 55 40 65 Q40 75 60 75"
                        fill="none"
                        stroke="url(#moneyGrad7)"
                        strokeWidth="6"
                        strokeLinecap="round"
                    >
                        <animate attributeName="stroke-dasharray" values="0,200;100,100;200,0;100,100;0,200" dur="4s" repeatCount="indefinite" />
                    </path>
                    {/* Vertical line */}
                    <line x1="50" y1="25" x2="50" y2="85" stroke="url(#moneyGrad7)" strokeWidth="4" strokeLinecap="round">
                        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                    </line>
                </g>

                {/* Floating coins/sparkles */}
                <circle cx="25" cy="30" r="3" fill="#fbbf24">
                    <animate attributeName="cy" values="30;25;30" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="75" cy="35" r="2" fill="#fbbf24">
                    <animate attributeName="cy" values="35;28;35" dur="2s" repeatCount="indefinite" begin="0.5s" />
                    <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" begin="0.5s" />
                </circle>
                <circle cx="80" cy="70" r="2.5" fill="#fbbf24">
                    <animate attributeName="cy" values="70;65;70" dur="1.8s" repeatCount="indefinite" begin="0.3s" />
                </circle>
            </svg>
        </div>
    );
}

// Option 8: Neon Circuit Board - Tech-inspired with data flow
export function LogoOption8({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="neonGrad8" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <filter id="neonGlow8">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Background square with rounded corners */}
                <rect x="5" y="5" width="90" height="90" rx="15" fill="#0f172a" stroke="url(#neonGrad8)" strokeWidth="2" />

                {/* Circuit lines */}
                <g stroke="url(#neonGrad8)" strokeWidth="2" fill="none" filter="url(#neonGlow8)">
                    {/* Horizontal lines */}
                    <path d="M15 30 L40 30 L45 35 L70 35">
                        <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s" repeatCount="indefinite" />
                    </path>
                    <path d="M30 70 L55 70 L60 65 L85 65">
                        <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                    </path>
                    {/* Vertical lines */}
                    <path d="M50 15 L50 40 L55 45 L55 55 L50 60 L50 85">
                        <animate attributeName="stroke-dasharray" values="0,150;150,0" dur="3s" repeatCount="indefinite" />
                    </path>
                </g>

                {/* Central node */}
                <circle cx="50" cy="50" r="15" fill="#1e293b" stroke="url(#neonGrad8)" strokeWidth="2" />

                {/* IPO text in center */}
                <text x="50" y="54" textAnchor="middle" fill="url(#neonGrad8)" fontSize="12" fontWeight="bold" fontFamily="monospace">
                    IPO
                </text>

                {/* Connection nodes */}
                <circle cx="70" cy="35" r="4" fill="#06b6d4">
                    <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="30" cy="70" r="4" fill="#8b5cf6">
                    <animate attributeName="r" values="4;5;4" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
                </circle>
                <circle cx="85" cy="65" r="4" fill="#3b82f6">
                    <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" begin="1s" />
                </circle>

                {/* Data flow dots */}
                <circle cx="20" cy="30" r="2" fill="#22c55e">
                    <animate attributeName="cx" values="20;65;20" dur="2s" repeatCount="indefinite" />
                </circle>
            </svg>
        </div>
    );
}

// Option 9: Orbiting Coins - Coins orbiting central stock icon
export function LogoOption9({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="coinGrad9" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                    <linearGradient id="centerGrad9" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                </defs>

                {/* Orbit paths */}
                <ellipse cx="50" cy="50" rx="40" ry="20" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4,4" />
                <ellipse cx="50" cy="50" rx="20" ry="40" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4,4" />

                {/* Central icon */}
                <circle cx="50" cy="50" r="22" fill="url(#centerGrad9)" />
                <text x="50" y="46" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">AI</text>
                <text x="50" y="58" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">IPO</text>

                {/* Orbiting coin 1 */}
                <g>
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 50 50"
                        to="360 50 50"
                        dur="4s"
                        repeatCount="indefinite"
                    />
                    <circle cx="90" cy="50" r="8" fill="url(#coinGrad9)" stroke="#fcd34d" strokeWidth="1" />
                    <text x="90" y="53" textAnchor="middle" fill="#92400e" fontSize="8" fontWeight="bold">$</text>
                </g>

                {/* Orbiting coin 2 */}
                <g>
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="120 50 50"
                        to="480 50 50"
                        dur="5s"
                        repeatCount="indefinite"
                    />
                    <circle cx="50" cy="10" r="7" fill="url(#coinGrad9)" stroke="#fcd34d" strokeWidth="1" />
                    <text x="50" y="13" textAnchor="middle" fill="#92400e" fontSize="7" fontWeight="bold">€</text>
                </g>

                {/* Orbiting coin 3 */}
                <g>
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="240 50 50"
                        to="600 50 50"
                        dur="6s"
                        repeatCount="indefinite"
                    />
                    <circle cx="10" cy="50" r="6" fill="url(#coinGrad9)" stroke="#fcd34d" strokeWidth="1" />
                    <text x="10" y="53" textAnchor="middle" fill="#92400e" fontSize="6" fontWeight="bold">¥</text>
                </g>

                {/* Sparkle effects */}
                <circle cx="75" cy="25" r="2" fill="white" opacity="0.8">
                    <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="25" cy="75" r="1.5" fill="white" opacity="0.6">
                    <animate attributeName="opacity" values="0;0.8;0" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
                </circle>
            </svg>
        </div>
    );
}

// Option 10: Stacked Bars with Wave - Minimalist bars with animated wave
export function LogoOption10({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="barGrad10" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                    <linearGradient id="waveGrad10" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                    <clipPath id="barsClip10">
                        <rect x="10" y="25" width="80" height="60" />
                    </clipPath>
                </defs>

                {/* Background */}
                <rect x="5" y="5" width="90" height="90" rx="18" fill="#0f172a" />

                {/* Growing bars */}
                <rect x="15" y="65" width="12" height="20" rx="3" fill="url(#barGrad10)">
                    <animate attributeName="height" values="10;20;10" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="y" values="75;65;75" dur="2s" repeatCount="indefinite" />
                </rect>
                <rect x="32" y="55" width="12" height="30" rx="3" fill="url(#barGrad10)">
                    <animate attributeName="height" values="20;30;20" dur="2s" repeatCount="indefinite" begin="0.2s" />
                    <animate attributeName="y" values="65;55;65" dur="2s" repeatCount="indefinite" begin="0.2s" />
                </rect>
                <rect x="49" y="45" width="12" height="40" rx="3" fill="url(#barGrad10)">
                    <animate attributeName="height" values="30;40;30" dur="2s" repeatCount="indefinite" begin="0.4s" />
                    <animate attributeName="y" values="55;45;55" dur="2s" repeatCount="indefinite" begin="0.4s" />
                </rect>
                <rect x="66" y="35" width="12" height="50" rx="3" fill="url(#barGrad10)">
                    <animate attributeName="height" values="40;50;40" dur="2s" repeatCount="indefinite" begin="0.6s" />
                    <animate attributeName="y" values="45;35;45" dur="2s" repeatCount="indefinite" begin="0.6s" />
                </rect>
                <rect x="83" y="25" width="12" height="60" rx="3" fill="url(#barGrad10)">
                    <animate attributeName="height" values="50;60;50" dur="2s" repeatCount="indefinite" begin="0.8s" />
                    <animate attributeName="y" values="35;25;35" dur="2s" repeatCount="indefinite" begin="0.8s" />
                </rect>

                {/* Animated wave line overlay */}
                <path
                    d="M10 60 Q25 45 40 55 T70 45 T100 50"
                    fill="none"
                    stroke="url(#waveGrad10)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.8"
                >
                    <animate
                        attributeName="d"
                        values="M10 60 Q25 45 40 55 T70 45 T100 50;M10 50 Q25 60 40 45 T70 55 T100 45;M10 60 Q25 45 40 55 T70 45 T100 50"
                        dur="3s"
                        repeatCount="indefinite"
                    />
                </path>

                {/* Top indicator dot */}
                <circle cx="83" cy="20" r="5" fill="#22c55e">
                    <animate attributeName="r" values="4;6;4" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="fill" values="#22c55e;#4ade80;#22c55e" dur="1s" repeatCount="indefinite" />
                </circle>

                {/* Mini trend text */}
                <text x="50" y="92" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">IPO WATCH</text>
            </svg>
        </div>
    );
}

// Default export - Option 9: Orbiting Coins with AI-IPO
export function IPOLogo({ className = "h-8 w-8" }: { className?: string }) {
    return <LogoOption9 className={className} />;
}

export function IPOLogoFull({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center gap-1.5 ${className}`}>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                GMP
            </span>
            <IPOLogo className="h-10 w-10" />
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                AI IPO
            </span>
        </div>
    );
}
