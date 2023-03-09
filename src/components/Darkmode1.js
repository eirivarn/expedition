import React, {useEffect, useState} from "react";
import Toggle from "react-toggle";
import { useMediaQuery } from "react-responsive";
import "../styles/overall.css";

/* https://dev.to/nw/adding-dark-mode-to-your-react-app-with-hooks-media-queries-and-css-variables-50h0 */

const DARK_CLASS = "dark";

export const DarkToggle = () => {
    const systemPrefersDark = useMediaQuery(
        {
            query: "(prefers-color-scheme: dark)"
        },
        undefined,
        prefersDark => {
            setIsDark(prefersDark);
        }
    );

    const [isDark, setIsDark] = useState(systemPrefersDark);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add(DARK_CLASS)
        } else {
            document.documentElement.classList.remove(DARK_CLASS)
        }
    }, [isDark]);

    return (
        <Toggle 
            className="DarkToggle"
            checked={isDark}
            onChange={event => setIsDark(event.target.checked)}
            icons={{checked: "🌙", unchecked: "🔆"}}
            aria-label="Dark mode"
        />
    );
};