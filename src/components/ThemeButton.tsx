import React from "react";

export const DisplayThemeType = {
    Light: "light",
    Dark: "dark",
} as const;

export type DisplayThemeType = typeof DisplayThemeType[keyof typeof DisplayThemeType];

type ThemeButtonProps = {
    displayTheme: DisplayThemeType,
}

export const ThemeButton: React.FC<ThemeButtonProps> = ({displayTheme}) => {
    
    
    return (
        <div
            className={`relative rounded-full w-6 h-6 border-white
                ${displayTheme === DisplayThemeType.Dark ? "overflow-visible" : "overflow-hidden"}
                transition-all ${displayTheme === DisplayThemeType.Dark ? "border-4" : "border-0"}
                ${displayTheme === DisplayThemeType.Dark ? "scale-50" : "scale-100"}
                ${displayTheme === DisplayThemeType.Dark ? "shadow-none" : "shadow-[inset_8px_-8px_0_0_rgb(0,0,0)]"}
                ${displayTheme === DisplayThemeType.Dark ? "bg-white" : "bg-none"}
                before:w-6 before:h-6 before:-top-2 before:left-2 before:rounded-full
                before:absolute before:transition-all
                ${displayTheme === DisplayThemeType.Dark ? "before:opacity-0" : "before:opacity-100"}
                after:w-2 after:h-2 after:rounded-full after:absolute after:transition-all
                after:top-1/2 after:left-1/2 after:-ml-1 after:-mt-1
                after:shadow-[0_-23px_0_theme(colors.white),0_23px_0_theme(colors.white),23px_0_0_theme(colors.white),-23px_0_0_theme(colors.white),15px_15px_0_theme(colors.white),-15px_15px_0_theme(colors.white),15px_-15px_0_theme(colors.white),-15px_-15px_0_theme(colors.white)]
                ${displayTheme === DisplayThemeType.Dark ? "after:scale-100" : "after:scale-0"}`}
        />
    )
}