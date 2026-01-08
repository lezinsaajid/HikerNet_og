/**
 * HikerNet Color Palette
 * Theme: "Forest & Stone" - Semi-Dark, Premium, Interactive
 */

const tintColorLight = '#2f9e44'; // Vibrant Forest Green
const tintColorDark = '#40c057';  // Lighter Vivid Green for dark mode

export const Colors = {
    light: {
        text: '#1a1a1a',
        background: '#f8f9fa',
        tint: tintColorLight,
        icon: '#687076',
        tabIconDefault: '#687076',
        tabIconSelected: tintColorLight,
        card: '#ffffff',
        border: '#e9ecef',
        notification: '#fa5252',
        primary: '#2f9e44',
        secondary: '#f76707', // Earthy Orange
        surface: '#ffffff',
    },
    dark: {
        text: '#ECEDEE', // Soft White
        background: '#18181b', // Zinc 900 - Not pure black, "Semi-Dark"
        tint: tintColorDark,
        icon: '#9BA1A6',
        tabIconDefault: '#9BA1A6',
        tabIconSelected: tintColorDark,
        card: '#27272a', // Zinc 800 - Slightly lighter than background
        border: '#3f3f46',
        notification: '#ff6b6b',
        primary: '#40c057',
        secondary: '#fd7e14',
        surface: '#27272a',
    },
};
