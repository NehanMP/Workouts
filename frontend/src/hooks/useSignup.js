import { useState } from "react";
import { useAuthContext } from './useAuthContext';

export const useUserSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);  // It's better to start with false for isLoading
    const { dispatch } = useAuthContext();  // Ensure this is a function call

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/user/signup', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},  // Correct 'header' to 'headers'
            body: JSON.stringify({email, password})
        });
        const json = await response.json();
        
        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
            return;  // Stop execution if there's an error
        }

        // Save the user to local storage
        localStorage.setItem('user', JSON.stringify(json));

        // Update the auth context
        dispatch({type: 'LOGIN', payload: json});

        setIsLoading(false);
    };
    return { signup, isLoading, error };
}
