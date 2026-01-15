import { Heart, Twitter, Linkedin, Github, Mail } from 'lucide-react';

/**
 * Footer component with team credits and social links
 */
const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-ios-white border-t border-ios-gray-200 mt-auto">
            <div className="ios-container py-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <h3 className="text-title-2 font-bold text-ios-black mb-2">Perq</h3>
                        <p className="text-body text-ios-gray-600 mb-4">
                            The intelligent rewards platform that maximizes your credit card points value.
                            Earn more, save more, and never lose points again.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-ios-gray-600">
                            <span>Made with</span>
                            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                            <span>by <span className="font-semibold text-ios-black">Team Perq</span></span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-subhead font-semibold text-ios-black mb-3">Product</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="text-body text-ios-gray-600 hover:text-ios-black transition-colors">
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="/cards" className="text-body text-ios-gray-600 hover:text-ios-black transition-colors">
                                    My Cards
                                </a>
                            </li>
                            <li>
                                <a href="/plus" className="text-body text-ios-gray-600 hover:text-ios-black transition-colors">
                                    Perq Plus
                                </a>
                            </li>
                            <li>
                                <a href="/marketplace" className="text-body text-ios-gray-600 hover:text-ios-black transition-colors">
                                    Marketplace
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="text-subhead font-semibold text-ios-black mb-3">Connect</h4>
                        <div className="flex gap-3">
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-ios-gray-100 hover:bg-ios-black hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-ios-gray-100 hover:bg-ios-black hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-ios-gray-100 hover:bg-ios-black hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="mailto:hello@perq.io"
                                className="w-10 h-10 bg-ios-gray-100 hover:bg-ios-black hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-ios-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-footnote text-ios-gray-500">
                            © {currentYear} Perq. All rights reserved. Built with passion by Team Perq.
                        </p>
                        <div className="flex gap-6 text-footnote text-ios-gray-500">
                            <a href="/privacy" className="hover:text-ios-black transition-colors">
                                Privacy Policy
                            </a>
                            <a href="/terms" className="hover:text-ios-black transition-colors">
                                Terms of Service
                            </a>
                            <a href="/contact" className="hover:text-ios-black transition-colors">
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
