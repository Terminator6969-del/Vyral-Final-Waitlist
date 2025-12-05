'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronDown, Play, Zap, BarChart3, Sparkles, Users, Gift, Plus, Minus } from 'lucide-react';
import { Component } from '@/components/image-auto-slider';
import Script from 'next/script';

export default function WaitlistPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const faqItems = [
        { question: 'How many pieces of content can I create per week?', answer: 'Vyral allows you to generate 50+ pieces of viral content per week, including posts, carousels, slideshows, and AI videos. The exact number depends on your credit usage and selected content types.' },
        { question: 'How does competitor analysis work?', answer: 'Simply paste a competitor video URL in Lite mode to get analysis, or use Pro mode for advanced insights including script generation, caption writing, and posting strategy recommendations.' },
        { question: 'Can I schedule posts across multiple platforms?', answer: 'Yes! Upload Video mode lets you select multiple platforms (Instagram, TikTok, YouTube, Twitter, LinkedIn) and schedule content distribution. You can also generate platform-specific micro-clips.' },
        { question: 'What happens to my credits if unused?', answer: "Unused credits rollover to the next month. There's no expiration, so you can build up your credit balance over time and use them when you need them." },
        { question: 'When will Vyral launch?', answer: 'We\'re launching soon! Join the waitlist to get early access and exclusive launch pricing.' },
        { question: 'Will there be a free trial?', answer: 'Yes! Waitlist members will get priority access to our free trial with bonus credits.' },
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
    };

    // Inject ConvertKit popup script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://f.convertkit.com/ckjs/ck.5.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 overflow-hidden">
            {/* Grid Background */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(0deg, #06b6d4 1px, transparent 1px)',
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-cyan-500/10 bg-slate-950/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <img src="/images/logo.png" alt="Vyral" className="h-16" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 flex-1 ml-12">
                        <button onClick={() => scrollToSection('features')} className="text-sm text-slate-400 hover:text-slate-300 transition-colors">
                            Features
                        </button>
                        <button onClick={() => scrollToSection('affiliates')} className="text-sm text-slate-400 hover:text-slate-300 transition-colors">
                            Affiliates
                        </button>
                        <button onClick={() => scrollToSection('faq')} className="text-sm text-slate-400 hover:text-slate-300 transition-colors">
                            FAQs
                        </button>
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        <Button
                            onClick={() => scrollToSection('waitlist')}
                            className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white"
                        >
                            Join Waitlist
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
                        <ChevronDown className={`w-6 h-6 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-cyan-500/10 bg-slate-900/80 backdrop-blur-md p-4 space-y-3">
                        <button onClick={() => scrollToSection('features')} className="block w-full text-left text-sm text-slate-300 hover:text-cyan-400 py-2 px-4">
                            Features
                        </button>
                        <button onClick={() => scrollToSection('affiliates')} className="block w-full text-left text-sm text-slate-300 hover:text-cyan-400 py-2 px-4">
                            Affiliates
                        </button>
                        <button onClick={() => scrollToSection('faq')} className="block w-full text-left text-sm text-slate-300 hover:text-cyan-400 py-2 px-4">
                            FAQs
                        </button>
                        <Button
                            onClick={() => scrollToSection('waitlist')}
                            className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white"
                        >
                            Join Waitlist
                        </Button>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <div className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                        <span className="text-xs font-medium text-cyan-400">🚀 Launching Soon - Join the Waitlist</span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                        Create <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">Viral Content</span> in Minutes, Not Hours
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Create viral content and post to all socials in minutes
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                        <Button
                            onClick={() => scrollToSection('waitlist')}
                            className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white px-8 h-12 text-base"
                        >
                            Join the Waitlist
                        </Button>
                        <Button
                            onClick={() => scrollToSection('features')}
                            variant="outline"
                            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 px-8 h-12 text-base"
                        >
                            Learn More
                        </Button>
                    </div>

                    {/* Image Auto Slider */}
                    <div className="mt-16 max-w-4xl mx-auto">
                        <Component />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Everything You Need to Go Viral</h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            From competitor analysis to multi-platform publishing—all powered by AI
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: BarChart3, title: 'Spy on Competitors', description: 'Reverse-engineer viral videos in seconds. See exactly what hooks, scripts, and strategies are working right now.' },
                            { icon: Sparkles, title: 'AI Script Writer', description: 'Never stare at a blank page again. Get platform-optimized scripts that actually convert.' },
                            { icon: Play, title: 'Instant Video Creation', description: 'Transform ideas into scroll-stopping videos with AI voiceover and captions. Turn tweets, posts, and concepts into ready-to-publish content in minutes.' },
                            { icon: Users, title: 'One-Click Multi-Platform', description: 'Publish to Instagram, TikTok, YouTube, Twitter, and LinkedIn in one click. No more copy-pasting or jumping between apps.' },
                            { icon: Zap, title: 'Perfect Timing', description: "AI analyzes your audience and schedules posts when they're most likely to engage. Maximize visibility without guessing." },
                            { icon: Gift, title: 'Smart Captioning', description: 'Automatically generate clean or high-energy captions styled for each platform. Boost retention and accessibility with perfectly timed, auto-formatted subtitles—no manual editing required.' },
                        ].map((feature, idx) => (
                            <div key={idx} className="p-6 border border-cyan-500/20 bg-slate-900/40 backdrop-blur-sm rounded-xl hover:border-cyan-500/40 transition-all duration-300 hover:bg-slate-900/60 group">
                                <feature.icon className="w-8 h-8 text-cyan-400 mb-4 group-hover:text-cyan-300 transition-colors" />
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Waitlist Section */}
            <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/10">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Join the Waitlist</h2>
                        <p className="text-slate-400 text-lg">
                            Be the first to know when we launch and get exclusive early access pricing
                        </p>
                    </div>

                    {/* ConvertKit Embed */}
                    <Script
                        async
                        data-uid="f908b7ecd4"
                        src="https://livelimitless-coaching.kit.com/f908b7ecd4/index.js"
                    />
                </div>
            </section>

            {/* Affiliates Section */}
            <section id="affiliates" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Become a Vyral Affiliate</h2>
                        <p className="text-slate-400 text-lg">Earn recurring commissions by sharing Vyral with your audience</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="p-8 border border-cyan-500/20 bg-slate-900/40 backdrop-blur-sm rounded-xl">
                            <Zap className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Earn 20% Lifetime Commission</h3>
                            <p className="text-slate-300">
                                Get paid every month for as long as your referral stays subscribed—no limits, no expiry, true recurring revenue.
                            </p>
                        </div>
                        <div className="p-8 border border-cyan-500/20 bg-slate-900/40 backdrop-blur-sm rounded-xl">
                            <Gift className="w-8 h-8 text-cyan-400 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">VIP Partner Perks</h3>
                            <p className="text-slate-300">
                                Unlock exclusive discounts on Vyral plans, early feature access, and priority support reserved only for approved affiliates.
                            </p>
                        </div>
                    </div>

                    <div className="text-center">
                        <Button
                            onClick={() => scrollToSection('waitlist')}
                            className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white px-8 h-12 text-base"
                        >
                            Join Waitlist for Affiliate Access
                        </Button>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/10">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
                        <p className="text-slate-400 text-lg">Find answers to common questions about Vyral</p>
                    </div>

                    <div className="space-y-3">
                        {faqItems.map((item, idx) => (
                            <div key={idx} className="border border-cyan-500/20 bg-slate-900/40 backdrop-blur-sm rounded-lg overflow-hidden">
                                <button onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)} className="w-full p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                                    <h3 className="text-left font-semibold text-slate-50">{item.question}</h3>
                                    {expandedFaq === idx ? <Minus className="w-5 h-5 text-cyan-400 flex-shrink-0 ml-4" /> : <Plus className="w-5 h-5 text-cyan-400 flex-shrink-0 ml-4" />}
                                </button>
                                {expandedFaq === idx && (
                                    <div className="px-6 pb-6 border-t border-cyan-500/10 text-slate-300">{item.answer}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/10">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-bold">Ready to scale your brand?</h2>
                    <p className="text-slate-400 text-lg">
                        Join the waitlist and be among the first to create viral content with Vyral.
                    </p>
                    <Button
                        onClick={() => scrollToSection('waitlist')}
                        className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white px-8 h-12 text-base"
                    >
                        Join the Waitlist
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-cyan-500/10 bg-slate-900/40 backdrop-blur-sm py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
                    <p>&copy; 2025 Vyral. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-slate-300 transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="hover:text-slate-300 transition-colors">
                            Terms
                        </a>
                        <a href="#" className="hover:text-slate-300 transition-colors">
                            Contact
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
