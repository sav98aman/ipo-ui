"use client";

// Option 1: Glowing Hexagon with Pulse - Bio-Live Edition
export function LogoOption1({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            {/* Outer glow pulse */}
            <div className="absolute inset-[-4px] rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 opacity-40 blur-md animate-pulse" />

            <svg viewBox="0 0 100 100" className="relative z-10 w-full h-full">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#064e3b" />
                        <stop offset="100%" stopColor="#065f46" />
                    </linearGradient>
                    <linearGradient id="textGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                </defs>

                {/* Hexagon background */}
                <path
                    d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
                    fill="url(#grad1)"
                    stroke="#10b981"
                    strokeWidth="2"
                    className="drop-shadow-lg"
                />

                {/* Chart bars */}
                <rect x="20" y="60" width="10" height="20" fill="#34d399" opacity="0.9" rx="2">
                    <animate attributeName="height" values="15;25;15" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="y" values="65;55;65" dur="1.5s" repeatCount="indefinite" />
                </rect>
                <rect x="35" y="50" width="10" height="30" fill="#34d399" opacity="0.9" rx="2">
                    <animate attributeName="height" values="25;35;25" dur="1.5s" repeatCount="indefinite" begin="0.2s" />
                    <animate attributeName="y" values="55;45;55" dur="1.5s" repeatCount="indefinite" begin="0.2s" />
                </rect>
                <rect x="50" y="40" width="10" height="40" fill="#34d399" opacity="0.9" rx="2">
                    <animate attributeName="height" values="35;45;35" dur="1.5s" repeatCount="indefinite" begin="0.4s" />
                    <animate attributeName="y" values="45;35;45" dur="1.5s" repeatCount="indefinite" begin="0.4s" />
                </rect>
                <rect x="65" y="30" width="10" height="50" fill="#34d399" opacity="0.9" rx="2">
                    <animate attributeName="height" values="45;55;45" dur="1.5s" repeatCount="indefinite" begin="0.6s" />
                    <animate attributeName="y" values="35;25;35" dur="1.5s" repeatCount="indefinite" begin="0.6s" />
                </rect>


                {/* Text Overlay - LIVE on TOP */}
                <text x="50" y="45" textAnchor="middle" fill="#facc15" fontSize="10" fontWeight="bold" letterSpacing="1">LIVE</text>
                <text x="50" y="62" textAnchor="middle" fill="white" fontSize="16" fontWeight="900" style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.5)" }}>GMP</text>
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
            <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-ping" />
            <div className="absolute inset-1 rounded-full border border-emerald-500/20 animate-ping" style={{ animationDelay: '0.5s' }} />

            <svg viewBox="0 0 100 100" className="relative z-10 w-full h-full">
                <defs>
                    <linearGradient id="circGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#059669" />
                        <stop offset="50%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                </defs>

                {/* Main circle */}
                <circle cx="50" cy="50" r="45" fill="#0f172a" stroke="url(#circGrad)" strokeWidth="3" />

                {/* GMP Text */}
                <text x="50" y="45" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Arial">
                    GMP
                </text>

                {/* LIVE Badge */}
                <rect x="30" y="55" width="40" height="15" rx="4" fill="#ef4444" />
                <text x="50" y="66" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">LIVE</text>

                {/* Pulse Dot */}
                <circle cx="50" cy="20" r="4" fill="#ef4444">
                    <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
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

                {/* Text at bottom */}
                <text x="50" y="93" textAnchor="middle" fill="#64748b" fontSize="7" fontWeight="bold" fontFamily="monospace">IPO BAZAR</text>
            </svg>
        </div >
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
            <svg viewBox="0 0 100 100" className="w-full h-full" role="img" aria-label="IPO Bazar Logo">
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
                <text x="50" y="46" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">IPO</text>
                <text x="50" y="58" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">BAZAR</text>

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
                <text x="50" y="92" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">IPO BAZAR</text>
            </svg>
        </div>
    );
}

// Option 11: Minimalist Letter B - Abstract B for Bazar
export function LogoOption11({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="grad11" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="#0f172a" />
                <path
                    d="M35 25 L35 75 L60 75 C75 75 75 55 60 55 L45 55 L60 55 C75 55 75 35 60 35 L35 35 Z"
                    fill="none"
                    stroke="url(#grad11)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <circle cx="75" cy="30" r="5" fill="#22c55e">
                    <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                </circle>
            </svg>
        </div>
    );
}

// Option 12: Indian Market Inspired - Rupee symbol abstract
export function LogoOption12({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="grad12" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                </defs>
                <rect x="5" y="5" width="90" height="90" rx="20" fill="#0f172a" />
                <text x="50" y="65" textAnchor="middle" fill="url(#grad12)" fontSize="50" fontWeight="bold" fontFamily="sans-serif">₹</text>
                <path d="M70 20 L80 10 L85 15" stroke="#22c55e" strokeWidth="3" fill="none" />
                <path d="M80 80 L90 90" stroke="#ef4444" strokeWidth="3" fill="none" />
            </svg>
        </div>
    );
}

// Option 13: Futurist Tech - Geometric nodes
export function LogoOption13({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <radialGradient id="grad13" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                    </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="#0f172a" />
                <circle cx="50" cy="50" r="30" fill="url(#grad13)" />

                <circle cx="50" cy="30" r="6" fill="white">
                    <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="30" cy="65" r="6" fill="white">
                    <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" begin="0.6s" />
                </circle>
                <circle cx="70" cy="65" r="6" fill="white">
                    <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" begin="1.2s" />
                </circle>

                <line x1="50" y1="30" x2="30" y2="65" stroke="white" strokeWidth="2" opacity="0.5" />
                <line x1="30" y1="65" x2="70" y2="65" stroke="white" strokeWidth="2" opacity="0.5" />
                <line x1="70" y1="65" x2="50" y2="30" stroke="white" strokeWidth="2" opacity="0.5" />
            </svg>
        </div>
    );
}

// Option 14: Quantum Loop - Intertwined infinity loops with premium gradient
export function LogoOption14({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="grad14" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <filter id="glow14">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Background Glow */}
                <circle cx="50" cy="50" r="40" fill="url(#grad14)" opacity="0.1" filter="url(#glow14)">
                    <animate attributeName="opacity" values="0.1;0.2;0.1" dur="3s" repeatCount="indefinite" />
                </circle>

                {/* Infinity Path 1 */}
                <path
                    d="M30 50 C30 20, 70 20, 70 50 S 30 80, 30 50"
                    fill="none"
                    stroke="url(#grad14)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    filter="url(#glow14)"
                >
                    <animate attributeName="stroke-dasharray" values="0,150;150,0" dur="3s" repeatCount="indefinite" />
                </path>

                {/* Central Core */}
                <circle cx="50" cy="50" r="6" fill="white">
                    <animate attributeName="r" values="5;7;5" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
                </circle>

                {/* Orbiting Particle */}
                <circle cx="50" cy="50" r="3" fill="#bef264">
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 50 50"
                        to="360 50 50"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                    <animate attributeName="cy" values="50;20;50" dur="2s" repeatCount="indefinite" />
                </circle>
            </svg>
        </div>
    );
}

// Option 15: Glassy Stack - Layers of data/blocks
export function LogoOption15({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="glassGrad15" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="accentGrad15" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#2dd4bf" />
                    </linearGradient>
                </defs>

                {/* Bottom Layer */}
                <path d="M20 60 L50 75 L80 60 L50 45 Z" fill="url(#glassGrad15)">
                    <animate attributeName="fill-opacity" values="0.4;0.6;0.4" dur="3s" repeatCount="indefinite" />
                </path>

                {/* Middle Layer */}
                <path d="M20 50 L50 65 L80 50 L50 35 Z" fill="url(#accentGrad15)" opacity="0.8">
                    <animate attributeName="transform" type="translate" values="0,0; 0,-5; 0,0" dur="3s" repeatCount="indefinite" />
                </path>
                <path d="M20 50 L50 65 L80 50 L50 35 Z" fill="none" stroke="white" strokeWidth="0.5" opacity="0.5">
                    <animate attributeName="transform" type="translate" values="0,0; 0,-5; 0,0" dur="3s" repeatCount="indefinite" />
                </path>

                {/* Top Layer */}
                <path d="M20 40 L50 55 L80 40 L50 25 Z" fill="url(#glassGrad15)">
                    <animate attributeName="transform" type="translate" values="0,0; 0,-10; 0,0" dur="3s" repeatCount="indefinite" />
                </path>

                {/* Arrow rising from top */}
                <path d="M50 25 L50 10 M50 10 L40 20 M50 10 L60 20" stroke="#bef264" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0">
                    <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1s" />
                    <animate attributeName="transform" type="translate" values="0,10; 0,-5; 0,10" dur="2s" repeatCount="indefinite" begin="1s" />
                </path>
            </svg>
        </div>
    );
}

// Option 16: Golden Ratio Abstract - Minimalist and Professional
export function LogoOption16({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="goldGrad16" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="50%" stopColor="#d97706" />
                        <stop offset="100%" stopColor="#b45309" />
                    </linearGradient>
                </defs>

                {/* Outer Circle */}
                <circle cx="50" cy="50" r="45" fill="none" stroke="#334155" strokeWidth="1" />

                {/* Golden Spiral / Growth Curve */}
                <path
                    d="M50 50 L50 20 A30 30 0 0 1 80 50 A30 30 0 0 1 50 80 A30 30 0 0 1 20 50"
                    fill="none"
                    stroke="url(#goldGrad16)"
                    strokeWidth="6"
                    strokeLinecap="round"
                >
                    <animate attributeName="stroke-dasharray" values="0,200; 200,0" dur="3s" repeatCount="indefinite" />
                </path>

                {/* Center Dot */}
                <circle cx="50" cy="50" r="8" fill="#f59e0b">
                    <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
                </circle>
            </svg>
        </div>
    );
}

// Option 17: The distinct "Listing Bell" - Directly represents Market Debut/IPO
export function LogoOption17({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="bellGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="50%" stopColor="#d97706" />
                        <stop offset="100%" stopColor="#b45309" />
                    </linearGradient>
                </defs>

                {/* Bell Body */}
                <path
                    d="M50 20 Q70 20 75 50 L85 65 L15 65 L25 50 Q30 20 50 20 Z"
                    fill="url(#bellGrad)"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 50 10; 10 50 10; -10 50 10; 0 50 10"
                        dur="1.5s"
                        repeatCount="indefinite"
                        additive="sum"
                    />
                </path>

                {/* Bell Clapper */}
                <circle cx="50" cy="65" r="5" fill="#78350f">
                    <animate
                        attributeName="cy"
                        values="65;68;65"
                        dur="1.5s"
                        repeatCount="indefinite"
                    />
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; 5,0; -5,0; 0,0"
                        dur="1.5s"
                        repeatCount="indefinite"
                    />
                </circle>

                {/* Sound Waves / Growth Signals */}
                <path d="M85 40 Q95 50 85 60" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" opacity="0">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0.2s" />
                    <animate attributeName="transform" type="translate" values="-5,0; 5,0" dur="1s" repeatCount="indefinite" begin="0.2s" />
                </path>
                <path d="M15 40 Q5 50 15 60" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" opacity="0">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0.2s" />
                    <animate attributeName="transform" type="translate" values="5,0; -5,0" dur="1s" repeatCount="indefinite" begin="0.2s" />
                </path>
            </svg>
        </div>
    );
}

// Option 18: The "Live GMP" Radar
export function LogoOption18({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Radar Grid */}
                <circle cx="50" cy="50" r="45" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50" y1="5" x2="50" y2="95" stroke="#334155" strokeWidth="1" />
                <line x1="5" y1="50" x2="95" y2="50" stroke="#334155" strokeWidth="1" />

                {/* Sweep Animation */}
                <path d="M50 50 L50 5 A45 45 0 0 1 95 50 Z" fill="url(#radarGrad)">
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 50 50"
                        to="360 50 50"
                        dur="3s"
                        repeatCount="indefinite"
                    />
                </path>

                {/* Text: LIVE - Top */}
                <rect x="35" y="35" width="30" height="12" rx="3" fill="#ef4444" />
                <text x="50" y="44" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">LIVE</text>

                {/* Text: GMP - Bottom */}
                <text x="50" y="65" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">GMP</text>

                {/* Blinking Live Dot */}
                <circle cx="80" cy="20" r="4" fill="#ef4444">
                    <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
                </circle>
            </svg>
        </div>
    );
}

// Option 19: The "Golden Allotment" - Stylized Share Certificate/Paperwork
export function LogoOption19({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Paper Doc */}
                <rect x="25" y="15" width="50" height="70" rx="4" fill="white" />
                <path d="M60 15 L60 30 L75 30" fill="#cbd5e1" /> {/* Folded corner */}

                {/* Lines of text */}
                <line x1="35" y1="30" x2="55" y2="30" stroke="#94a3b8" strokeWidth="2" />
                <line x1="35" y1="40" x2="65" y2="40" stroke="#94a3b8" strokeWidth="2" />
                <line x1="35" y1="50" x2="65" y2="50" stroke="#94a3b8" strokeWidth="2" />

                {/* Official Stamp / Seal */}
                <circle cx="50" cy="70" r="12" fill="#f59e0b" opacity="0.9" />
                <path d="M42 70 L48 76 L58 64" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* Rising Trend Pop-out */}
                <path d="M65 65 L80 50 L90 55 L85 50 L80 45" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round">
                    <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s" repeatCount="indefinite" />
                </path>
            </svg>
        </div>
    );
}

// Option 20: The "Market Scale" - Represents Valuation (Bazaaar)
export function LogoOption20({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="scaleBase" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#475569" />
                        <stop offset="100%" stopColor="#1e293b" />
                    </linearGradient>
                </defs>

                {/* Base */}
                <path d="M30 85 L70 85 L65 50 L35 50 Z" fill="url(#scaleBase)" />
                <rect x="48" y="20" width="4" height="65" fill="#94a3b8" />
                <circle cx="50" cy="20" r="4" fill="#64748b" />

                {/* Beam */}
                <line x1="20" y1="30" x2="80" y2="20" stroke="#cbd5e1" strokeWidth="2">
                    <animate attributeName="y1" values="30;20;30" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="y2" values="20;30;20" dur="3s" repeatCount="indefinite" />
                </line>

                {/* Pan Left (Heavier/Gold) */}
                <line x1="20" y1="30" x2="20" y2="45" stroke="#94a3b8" strokeWidth="1">
                    <animate attributeName="y1" values="30;20;30" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="y2" values="45;35;45" dur="3s" repeatCount="indefinite" />
                </line>
                <path d="M10 45 Q20 55 30 45" fill="#f59e0b" opacity="0.8"> {/* Gold Pan */}
                    <animate attributeName="d" values="M10 45 Q20 55 30 45; M10 35 Q20 45 30 35; M10 45 Q20 55 30 45" dur="3s" repeatCount="indefinite" />
                </path>

                {/* Pan Right (Lighter/Money) */}
                <line x1="80" y1="20" x2="80" y2="35" stroke="#94a3b8" strokeWidth="1">
                    <animate attributeName="y1" values="20;30;20" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="y2" values="35;45;35" dur="3s" repeatCount="indefinite" />
                </line>
                <path d="M70 35 Q80 45 90 35" fill="#3b82f6" opacity="0.8">
                    <animate attributeName="d" values="M70 35 Q80 45 90 35; M70 45 Q80 55 90 45; M70 35 Q80 45 90 35" dur="3s" repeatCount="indefinite" />
                </path>
            </svg>
        </div>
    );
}

// Option 21: LiveGMP - Stock Pulse (Primary Recommended)
export function LogoOption21({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="liveGmpGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="liveGmpGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                </defs>

                {/* Background Circle */}
                <circle cx="50" cy="50" r="45" fill="url(#liveGmpGrad1)" opacity="0.1" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="url(#liveGmpGrad1)" strokeWidth="2">
                    <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Stock Chart Line with Pulse */}
                <path
                    d="M15 70 L25 65 L35 55 L45 45 L55 50 L65 30 L75 35 L85 25"
                    fill="none"
                    stroke="url(#liveGmpGrad2)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <animate attributeName="stroke-dasharray" values="0,200;200,0;200,0" dur="3s" repeatCount="indefinite" />
                </path>

                {/* Rising Arrow */}
                <path d="M70 35 L85 20 L85 35 M85 20 L70 20" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" />
                </path>

                {/* Live Pulse Dot */}
                <circle cx="85" cy="25" r="3" fill="#ef4444">
                    <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
                </circle>

                {/* GMP Text */}
                <text x="50" y="85" textAnchor="middle" fill="url(#liveGmpGrad1)" fontSize="14" fontWeight="900" letterSpacing="1">GMP</text>
            </svg>
        </div>
    );
}

// Option 22: LiveGMP - Growth Ticker
export function LogoOption22({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="tickerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0ea5e9" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Ticker Board Background */}
                <rect x="5" y="5" width="90" height="90" rx="8" fill="#0f172a" stroke="url(#tickerGrad)" strokeWidth="2" />

                {/* Animated Bars representing IPO activity */}
                <rect x="15" y="60" width="8" height="20" fill="#10b981" rx="2">
                    <animate attributeName="height" values="20;35;20" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="y" values="60;45;60" dur="1.5s" repeatCount="indefinite" />
                </rect>
                <rect x="28" y="50" width="8" height="30" fill="#34d399" rx="2">
                    <animate attributeName="height" values="30;45;30" dur="1.5s" begin="0.2s" repeatCount="indefinite" />
                    <animate attributeName="y" values="50;35;50" dur="1.5s" begin="0.2s" repeatCount="indefinite" />
                </rect>
                <rect x="41" y="40" width="8" height="40" fill="#22c55e" rx="2">
                    <animate attributeName="height" values="40;55;40" dur="1.5s" begin="0.4s" repeatCount="indefinite" />
                    <animate attributeName="y" values="40;25;40" dur="1.5s" begin="0.4s" repeatCount="indefinite" />
                </rect>

                {/* LIVE indicator */}
                <rect x="55" y="15" width="35" height="12" rx="6" fill="#ef4444" filter="url(#glow)" />
                <text x="72.5" y="23" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">LIVE</text>

                {/* GMP Text */}
                <text x="72" y="60" textAnchor="middle" fill="url(#tickerGrad)" fontSize="20" fontWeight="900">GMP</text>
                <text x="72" y="75" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="600">TRACKER</text>
            </svg>
        </div>
    );
}

// Option 23: LiveGMP - Candlestick Pro
export function LogoOption23({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="candleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#064e3b" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Background */}
                <circle cx="50" cy="50" r="48" fill="url(#bgGrad)" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#10b981" strokeWidth="1.5" opacity="0.3" />

                {/* Candlestick Chart */}
                {/* Candle 1 - Green */}
                <line x1="20" y1="55" x2="20" y2="35" stroke="#22c55e" strokeWidth="2" />
                <rect x="17" y="45" width="6" height="15" fill="url(#candleGrad)" rx="1">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
                </rect>

                {/* Candle 2 - Green */}
                <line x1="35" y1="60" x2="35" y2="30" stroke="#22c55e" strokeWidth="2" />
                <rect x="32" y="40" width="6" height="20" fill="url(#candleGrad)" rx="1">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="0.3s" repeatCount="indefinite" />
                </rect>

                {/* Candle 3 - Red (correction) */}
                <line x1="50" y1="50" x2="50" y2="38" stroke="#ef4444" strokeWidth="2" />
                <rect x="47" y="38" width="6" height="8" fill="#ef4444" opacity="0.8" rx="1" />

                {/* Candle 4 - Green (recovery) */}
                <line x1="65" y1="55" x2="65" y2="25" stroke="#22c55e" strokeWidth="2" />
                <rect x="62" y="35" width="6" height="20" fill="url(#candleGrad)" rx="1">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="0.6s" repeatCount="indefinite" />
                </rect>

                {/* Candle 5 - Green (strong) */}
                <line x1="80" y1="50" x2="80" y2="20" stroke="#22c55e" strokeWidth="2" />
                <rect x="77" y="28" width="6" height="22" fill="url(#candleGrad)" rx="1">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="0.9s" repeatCount="indefinite" />
                </rect>

                {/* Upward Trend Arrow */}
                <path d="M15 70 L85 20" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />

                {/* Text */}
                <text x="50" y="90" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="900">LIVE GMP</text>
            </svg>
        </div>
    );
}

// Option 24: LiveGMP - Minimal Badge (Clean & Modern)
export function LogoOption24({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="liveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                </defs>

                {/* Main Shield/Badge */}
                <path
                    d="M50 10 L80 25 L80 55 Q80 70 50 90 Q20 70 20 55 L20 25 Z"
                    fill="url(#badgeGrad)"
                    stroke="#0284c7"
                    strokeWidth="2"
                />

                {/* Inner Shield Highlight */}
                <path
                    d="M50 18 L73 30 L73 55 Q73 67 50 82 Q27 67 27 55 L27 30 Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    opacity="0.3"
                />

                {/* Upward Arrow in Center */}
                <path d="M50 65 L50 40 M50 40 L42 48 M50 40 L58 48"
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
                </path>

                {/* LIVE Badge at top */}
                <ellipse cx="50" cy="18" rx="18" ry="8" fill="url(#liveGrad)">
                    <animate attributeName="opacity" values="1;0.8;1" dur="1.5s" repeatCount="indefinite" />
                </ellipse>
                <text x="50" y="21" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">LIVE</text>

                {/* GMP Text at bottom */}
                <text x="50" y="78" textAnchor="middle" fill="white" fontSize="16" fontWeight="900">GMP</text>
            </svg>
        </div>
    );
}

// Option 25: Money Tree - Growth & Returns
export function LogoOption25({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="treeGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#065f46" />
                        <stop offset="50%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                    <radialGradient id="coinGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#f59e0b" />
                    </radialGradient>
                </defs>

                {/* Tree Trunk */}
                <path d="M45 90 L45 55 Q45 50 50 50 Q55 50 55 55 L55 90" fill="#78350f" stroke="#451a03" strokeWidth="1" />

                {/* Tree Leaves - 3 Layers */}
                <ellipse cx="50" cy="50" rx="25" ry="20" fill="url(#treeGrad)" opacity="0.7">
                    <animate attributeName="ry" values="20;22;20" dur="3s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx="50" cy="40" rx="20" ry="16" fill="url(#treeGrad)" opacity="0.8">
                    <animate attributeName="ry" values="16;18;16" dur="3s" begin="0.5s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx="50" cy="30" rx="15" ry="12" fill="url(#treeGrad)">
                    <animate attributeName="ry" values="12;14;12" dur="3s" begin="1s" repeatCount="indefinite" />
                </ellipse>

                {/* Money coins growing on tree */}
                <circle cx="35" cy="45" r="5" fill="url(#coinGrad)" stroke="#d97706" strokeWidth="1">
                    <animate attributeName="opacity" values="0;1;1" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="35" y="47" textAnchor="middle" fill="#78350f" fontSize="6" fontWeight="bold">₹</text>

                <circle cx="65" cy="45" r="5" fill="url(#coinGrad)" stroke="#d97706" strokeWidth="1">
                    <animate attributeName="opacity" values="0;1;1" dur="2s" begin="0.5s" repeatCount="indefinite" />
                </circle>
                <text x="65" y="47" textAnchor="middle" fill="#78350f" fontSize="6" fontWeight="bold">₹</text>

                <circle cx="50" cy="25" r="5" fill="url(#coinGrad)" stroke="#d97706" strokeWidth="1">
                    <animate attributeName="opacity" values="0;1;1" dur="2s" begin="1s" repeatCount="indefinite" />
                </circle>
                <text x="50" y="27" textAnchor="middle" fill="#78350f" fontSize="6" fontWeight="bold">₹</text>

                {/* Bottom Badge */}
                <rect x="30" y="85" width="40" height="10" rx="5" fill="#10b981" />
                <text x="50" y="92" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">LIVE GMP</text>
            </svg>
        </div>
    );
}

// Option 26: Target Bullseye - Precision Investing
export function LogoOption26({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="targetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                    <filter id="targetGlow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Outer Rings */}
                <circle cx="50" cy="50" r="45" fill="none" stroke="#64748b" strokeWidth="2" opacity="0.3" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#94a3b8" strokeWidth="2" opacity="0.5" />
                <circle cx="50" cy="50" r="25" fill="none" stroke="#cbd5e1" strokeWidth="2" opacity="0.7" />

                {/* Target Center */}
                <circle cx="50" cy="50" r="15" fill="url(#targetGrad)">
                    <animate attributeName="r" values="15;17;15" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Crosshair */}
                <line x1="50" y1="15" x2="50" y2="35" stroke="white" strokeWidth="2" opacity="0.8" />
                <line x1="50" y1="65" x2="50" y2="85" stroke="white" strokeWidth="2" opacity="0.8" />
                <line x1="15" y1="50" x2="35" y2="50" stroke="white" strokeWidth="2" opacity="0.8" />
                <line x1="65" y1="50" x2="85" y2="50" stroke="white" strokeWidth="2" opacity="0.8" />

                {/* Center Dot */}
                <circle cx="50" cy="50" r="4" fill="white" filter="url(#targetGlow)">
                    <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
                </circle>

                {/* Arrow hitting target */}
                <path d="M75 25 L55 45" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round">
                    <animate attributeName="opacity" values="0;1;1" dur="2s" repeatCount="indefinite" />
                </path>
                <path d="M75 25 L70 27 L73 32" fill="#fbbf24">
                    <animate attributeName="opacity" values="0;1;1" dur="2s" repeatCount="indefinite" />
                </path>

                {/* Text */}
                <text x="50" y="96" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="900">GMP</text>
            </svg>
        </div>
    );
}

// Option 27: 3D Data Cube - Modern Tech
export function LogoOption27({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="cubeTop" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                    <linearGradient id="cubeLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>
                    <linearGradient id="cubeRight" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="#4338ca" />
                    </linearGradient>
                </defs>

                {/* 3D Cube */}
                {/* Top Face */}
                <path d="M50 20 L75 35 L50 50 L25 35 Z" fill="url(#cubeTop)" stroke="#7c3aed" strokeWidth="1">
                    <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite" />
                </path>

                {/* Left Face */}
                <path d="M25 35 L25 65 L50 80 L50 50 Z" fill="url(#cubeLeft)" stroke="#6d28d9" strokeWidth="1" />

                {/* Right Face */}
                <path d="M50 50 L50 80 L75 65 L75 35 Z" fill="url(#cubeRight)" stroke="#5b21b6" strokeWidth="1" />

                {/* Data Bars on Left Face */}
                <rect x="28" y="55" width="3" height="8" fill="white" opacity="0.6" rx="1">
                    <animate attributeName="height" values="8;12;8" dur="2s" repeatCount="indefinite" />
                </rect>
                <rect x="34" y="52" width="3" height="11" fill="white" opacity="0.7" rx="1">
                    <animate attributeName="height" values="11;15;11" dur="2s" begin="0.3s" repeatCount="indefinite" />
                </rect>
                <rect x="40" y="49" width="3" height="14" fill="white" opacity="0.8" rx="1">
                    <animate attributeName="height" values="14;18;14" dur="2s" begin="0.6s" repeatCount="indefinite" />
                </rect>

                {/* Glowing Lines on Right Face */}
                <line x1="60" y1="45" x2="70" y2="50" stroke="#c4b5fd" strokeWidth="1.5" opacity="0.8">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="60" y1="55" x2="70" y2="60" stroke="#c4b5fd" strokeWidth="1.5" opacity="0.6">
                    <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" begin="0.5s" repeatCount="indefinite" />
                </line>

                {/* Text on Top */}
                <text x="50" y="38" textAnchor="middle" fill="white" fontSize="8" fontWeight="900" opacity="0.9">GMP</text>

                {/* LIVE Badge */}
                <rect x="35" y="85" width="30" height="10" rx="5" fill="#ef4444" />
                <text x="50" y="92" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">LIVE</text>
            </svg>
        </div>
    );
}

// Option 28: Market Heartbeat - Pulse of the Market
export function LogoOption28({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="50%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                    <linearGradient id="heartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                </defs>

                {/* Background Circle */}
                <circle cx="50" cy="50" r="45" fill="#0f172a" opacity="0.8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="url(#pulseGrad)" strokeWidth="2">
                    <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Heartbeat Line */}
                <path
                    d="M10 50 L25 50 L30 40 L35 60 L40 45 L45 50 L90 50"
                    fill="none"
                    stroke="url(#pulseGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                >
                    <animate
                        attributeName="stroke-dasharray"
                        values="0,200;200,0;200,0"
                        dur="3s"
                        repeatCount="indefinite"
                    />
                </path>

                {/* Heart Icon */}
                <path
                    d="M50 35 C50 30 45 25 40 25 C35 25 32 28 32 33 C32 40 50 50 50 50 C50 50 68 40 68 33 C68 28 65 25 60 25 C55 25 50 30 50 35 Z"
                    fill="url(#heartGrad)"
                    opacity="0.9"
                >
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
                    <animateTransform
                        attributeName="transform"
                        type="scale"
                        values="1;1.1;1"
                        dur="1.5s"
                        additive="sum"
                        repeatCount="indefinite"
                    />
                </path>

                {/* Pulsing Dots */}
                <circle cx="20" cy="50" r="2" fill="#22c55e">
                    <animate attributeName="r" values="2;4;2" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="80" cy="50" r="2" fill="#22c55e">
                    <animate attributeName="r" values="2;4;2" dur="1.5s" begin="0.75s" repeatCount="indefinite" />
                </circle>

                {/* Text */}
                <text x="50" y="75" textAnchor="middle" fill="url(#pulseGrad)" fontSize="12" fontWeight="900">LIVE</text>
                <text x="50" y="87" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="600">GMP PULSE</text>
            </svg>
        </div>
    );
}

// Option 29: Diamond Premium - High Value
export function LogoOption29({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="diamondGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                    <linearGradient id="diamondGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#93c5fd" />
                        <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                    <radialGradient id="sparkle" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="white" />
                        <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Diamond Shape */}
                {/* Top Facet */}
                <path d="M50 15 L70 35 L50 45 L30 35 Z" fill="url(#diamondGrad2)" stroke="#1e40af" strokeWidth="1" />

                {/* Left Facet */}
                <path d="M30 35 L50 45 L50 85 L20 50 Z" fill="url(#diamondGrad1)" stroke="#1e40af" strokeWidth="1" />

                {/* Right Facet */}
                <path d="M70 35 L80 50 L50 85 L50 45 Z" fill="#1e3a8a" stroke="#1e40af" strokeWidth="1" />

                {/* Top Highlight */}
                <path d="M50 15 L60 30 L50 35 L40 30 Z" fill="white" opacity="0.4" />

                {/* Sparkles */}
                <circle cx="40" cy="25" r="2" fill="white">
                    <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="60" cy="28" r="1.5" fill="white">
                    <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="50" cy="20" r="1" fill="white">
                    <animate attributeName="opacity" values="0;1;0" dur="2s" begin="1s" repeatCount="indefinite" />
                </circle>

                {/* Shine Effect */}
                <path d="M35 25 L45 35" stroke="white" strokeWidth="2" opacity="0.6" strokeLinecap="round">
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
                </path>

                {/* Premium Badge */}
                <rect x="30" y="88" width="40" height="10" rx="5" fill="#fbbf24" />
                <text x="50" y="95" textAnchor="middle" fill="#78350f" fontSize="6" fontWeight="bold">PREMIUM GMP</text>

                {/* GMP Text */}
                <text x="50" y="63" textAnchor="middle" fill="white" fontSize="14" fontWeight="900">GMP</text>
            </svg>
        </div>
    );
}

// Option 30: Rocket Launch - Growth Trajectory
export function LogoOption30({ className = "h-10 w-10" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="rocketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="50%" stopColor="#db2777" />
                        <stop offset="100%" stopColor="#be185d" />
                    </linearGradient>
                    <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                    <linearGradient id="trailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Launch Trail */}
                <path d="M20 80 Q35 50 50 30" stroke="url(#trailGrad)" strokeWidth="3" fill="none" strokeDasharray="5 5" opacity="0.6">
                    <animate attributeName="stroke-dashoffset" values="0;-20;0" dur="2s" repeatCount="indefinite" />
                </path>

                {/* Stars in background */}
                <circle cx="25" cy="25" r="1.5" fill="#fbbf24">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="75" cy="35" r="1" fill="#60a5fa">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="85" cy="20" r="1.5" fill="white">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="1s" repeatCount="indefinite" />
                </circle>

                {/* Rocket Body */}
                <path d="M50 10 L60 30 L60 50 L50 55 L40 50 L40 30 Z" fill="url(#rocketGrad)" stroke="#9f1239" strokeWidth="1" />

                {/* Rocket Window */}
                <circle cx="50" cy="25" r="5" fill="#3b82f6" stroke="white" strokeWidth="1" />
                <text x="50" y="28" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">₹</text>

                {/* Rocket Fins */}
                <path d="M40 45 L35 55 L40 50 Z" fill="#9f1239" />
                <path d="M60 45 L65 55 L60 50 Z" fill="#9f1239" />

                {/* Rocket Flame */}
                <path d="M45 55 L50 70 L55 55 L52 60 L50 75 L48 60 Z" fill="url(#flameGrad)">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="0.3s" repeatCount="indefinite" />
                    <animateTransform
                        attributeName="transform"
                        type="scale"
                        values="1 1;1 1.2;1 1"
                        dur="0.3s"
                        additive="sum"
                        repeatCount="indefinite"
                    />
                </path>

                {/* Smoke particles */}
                <circle cx="48" cy="75" r="3" fill="#94a3b8" opacity="0.5">
                    <animate attributeName="cy" values="75;85;95" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0;0" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="52" cy="78" r="2.5" fill="#94a3b8" opacity="0.4">
                    <animate attributeName="cy" values="78;88;98" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0;0" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
                </circle>

                {/* Text */}
                <text x="50" y="93" textAnchor="middle" fill="#ec4899" fontSize="10" fontWeight="900">GMP</text>
            </svg>
        </div>
    );
}

// Default export - Option 21: LiveGMP Stock Pulse
export const IPOLogo = LogoOption21;
export const IPOLogoFull = ({ className = "h-10" }: { className?: string }) => (
    <div className={`flex items-center gap-2 ${className}`}>
        <LogoOption21 className="h-full" />
        <div className="flex flex-col justify-center">
            <span className="text-lg font-bold leading-none bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Live</span>
            <span className="text-[10px] text-muted-foreground leading-none">GMP Tracker</span>
        </div>
    </div>
);
