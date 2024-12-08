import React, { useEffect } from 'react';
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";

export const DynamicProviders = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        console.log("DynamicContextProvider initialized");
    }, []);

    return (
        <DynamicContextProvider
            settings={{
                environmentId: "7caf9447-7cbd-48b1-adb2-bf7910ca4bc9",
                events: {
                    onUserProfileUpdate: (user) => {
                        console.log('onUserProfileUpdate was called', user);
                    }
                },
                eventsCallbacks: {
                    onWalletAdded: (user) => {
                        console.log('onWalletAdded was called', user);
                    },
                    onUserProfileUpdate: (user) => {
                        console.log('onUserProfileUpdate callback was called', user);
                    }
                },
            }}
        >
            {children}
        </DynamicContextProvider>
    );
};

export default DynamicProviders;
