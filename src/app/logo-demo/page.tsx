"use client";

import {
    LogoOption1,
    LogoOption2,
    LogoOption3,
    LogoOption4,
    LogoOption5,
    LogoOption6,
    LogoOption7,
    LogoOption8,
    LogoOption9,
    LogoOption10,
} from "@/components/ui/logo";

const logoOptions = [
    { component: LogoOption1, name: "Option 1", description: "Glowing Hexagon with Pulse - Animated bar chart inside hexagon with outer glow" },
    { component: LogoOption2, name: "Option 2", description: "Rotating Ring - IPO text with rotating gradient ring and arrow" },
    { component: LogoOption3, name: "Option 3", description: "Gradient Square with Line Chart - Animated stock chart line drawing" },
    { component: LogoOption4, name: "Option 4", description: "Diamond Rocket - Rocket launching with animated flame" },
    { component: LogoOption5, name: "Option 5", description: "Circular Pulse - Letter I with arrow and pulsing rings" },
    { component: LogoOption6, name: "Option 6", description: "Bull Market Shield - Bull icon with rising trend line" },
    { component: LogoOption7, name: "Option 7", description: "Money Symbol - Animated $ with floating coins" },
    { component: LogoOption8, name: "Option 8", description: "Neon Circuit Board - Tech style with data flow animation" },
    { component: LogoOption9, name: "Option 9", description: "Orbiting Coins - Currency coins orbiting ₹ symbol" },
    { component: LogoOption10, name: "Option 10", description: "Stacked Bars with Wave - Growing bars with wave overlay" },
];

export default function LogoDemoPage() {
    return (
        <div className="min-h-screen bg-slate-950 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                    IPO Watch Logo Options
                </h1>
                <p className="text-slate-400 text-center mb-12">
                    Choose your favorite animated logo design
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {logoOptions.map(({ component: Logo, name, description }, index) => (
                        <div
                            key={index}
                            className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                        >
                            {/* Option number badge */}
                            <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                {index + 1}
                            </div>

                            {/* Logo display area */}
                            <div className="flex justify-center items-center h-40 mb-6 bg-slate-950/50 rounded-xl border border-slate-800">
                                <Logo className="h-24 w-24" />
                            </div>

                            {/* Logo info */}
                            <h3 className="text-xl font-semibold text-white mb-2">
                                {name}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {description}
                            </p>

                            {/* Small preview */}
                            <div className="mt-4 flex items-center gap-4 pt-4 border-t border-slate-800">
                                <span className="text-xs text-slate-500">Preview sizes:</span>
                                <Logo className="h-8 w-8" />
                                <Logo className="h-6 w-6" />
                                <Logo className="h-4 w-4" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Comparison section */}
                <div className="mt-16 p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                        Side-by-Side Comparison
                    </h2>
                    <div className="flex flex-wrap justify-center items-center gap-8">
                        {logoOptions.map(({ component: Logo, name }, index) => (
                            <div key={index} className="flex flex-col items-center gap-2">
                                <Logo className="h-16 w-16" />
                                <span className="text-xs text-slate-500">{index + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dark/Light background test */}
                <div className="mt-8 grid grid-cols-2 gap-8">
                    <div className="p-8 bg-slate-950 border border-slate-800 rounded-2xl">
                        <h3 className="text-lg font-semibold text-white mb-4 text-center">Dark Background</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {logoOptions.map(({ component: Logo }, index) => (
                                <Logo key={index} className="h-12 w-12" />
                            ))}
                        </div>
                    </div>
                    <div className="p-8 bg-slate-200 border border-slate-300 rounded-2xl">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center">Light Background</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {logoOptions.map(({ component: Logo }, index) => (
                                <Logo key={index} className="h-12 w-12" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
