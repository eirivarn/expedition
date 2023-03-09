import React, { useState, useEffect } from 'react';

/* https://www.makeuseof.com/how-to-add-dark-mode-to-a-react-application/ */

function Darkmode() {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <div>
            <button onClick={toggleTheme}> Toggle Theme</button>
        </div>
    )
}