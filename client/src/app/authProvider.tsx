import React, { createContext, useContext, useEffect, useState } from "react";
import { Authenticator, useAuthenticator, View } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { getCurrentUser } from "aws-amplify/auth";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
            userPoolClientId:
                process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
        },
    },
});

const AuthContext = createContext<{
    user: any;
    isAuthenticated: boolean;
    isLoading: boolean;
}>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

const formFields = {
    signUp: {
        username: {
            order: 1,
            placeholder: "Choose a username",
            label: "Username",
            inputProps: { required: true },
        },
        email: {
            order: 2,
            placeholder: "Enter your email address",
            label: "Email",
            inputProps: { type: "email", required: true },
        },
        password: {
            order: 3,
            placeholder: "Enter your password",
            label: "Password",
            inputProps: { type: "password", required: true },
        },
        confirm_password: {
            order: 4,
            placeholder: "Confirm your password",
            label: "Confirm Password",
            inputProps: { type: "password", required: true },
        },
    },
    signIn: {
        username: {
            label: "Email or Username",
            placeholder: "Enter your email or username",
        },
        password: {
            label: "Password",
            placeholder: "Enter your password",
        },
    },
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState({
        user: null,
        isAuthenticated: false,
        isLoading: true,
    });

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const user = await getCurrentUser();
            setAuthState({
                user,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            setAuthState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
            });
        }
    };

    if (authState.isLoading) {
        return (
            <View>
                <h2>Loading...</h2>
            </View>
        );
    }

    return (
        <AuthContext.Provider value={authState}>
            <Authenticator formFields={formFields}>
                {({ signOut }) => (
                    <div className="h-full">
                        {children}
                    </div>
                )}
            </Authenticator>
        </AuthContext.Provider>
    );
};

export default AuthProvider;