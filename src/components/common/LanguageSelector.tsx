import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { Icons } from "@/assets/icons"
import useIntl from "@/hooks/useIntl"

interface Language {
    code: string
    label: string
    value: string
    flag?: string
}

const languages: Language[] = [
    { code: "eng", label: "English", value: 'en' },
    { code: "vi", label: "Việt Nam", value: 'vi' },
]

const LANGUAGE_MAPPING: Record<string, Language> = {
    en: { code: "eng", label: "English", value: 'en' },
    vi: { code: "vi", label: "Việt Nam", value: 'vi' },
}

export default function LanguageSelector() {
    const [isOpen, setIsOpen] = React.useState(false)
    const dropdownRef = React.useRef<HTMLDivElement>(null)
    const { locale, switchLocale } = useIntl()

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSelect = (lang: Language) => {
        setIsOpen(false)
        switchLocale(lang.value)
    }

    return (
        <div ref={dropdownRef} className="relative lg:block hidden">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer w-[52px] flex items-center gap-0.5 text-white text-sm font-medium hover:text-primary-300 transition-colors"
            >
                <span className="text-sm font-medium w-[31px] uppercase">{LANGUAGE_MAPPING[locale].code}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Icons.arrowDropDown className="size-2" />
                </motion.div>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15, ease: [0.4, 0.0, 0.2, 1] }}
                        className="absolute right-0 top-full mt-2 w-40 bg-background border border-secondary-900 rounded-lg shadow-lg overflow-hidden z-50"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleSelect(lang)}
                                className={cn(
                                    "cursor-pointer w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors",
                                    "hover:bg-secondary-800",
                                    locale === lang.value ? "bg-accent text-primary" : "text-foreground"
                                )}
                            >
                                <span className="flex items-center gap-2">
                                    <span>{lang.label}</span>
                                </span>
                                {locale === lang.value && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Icons.arrowDropDown className="rotate-90 text-primary size-2" />

                                    </motion.div>
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}