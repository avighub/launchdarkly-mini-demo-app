// Get LaunchDarkly client key from environment or prompt user
function getLaunchDarklyKey() {
    // Try to get from environment variables (injected by Vite at build time)
    if (import.meta.env && import.meta.env.VITE_LAUNCH_DARKLY_CLIENT_KEY) {
        return import.meta.env.VITE_LAUNCH_DARKLY_CLIENT_KEY;
    }

    // Fallback to prompting user
    return prompt('LaunchDarkly Client-side ID not found in .env file.\nPlease enter your LaunchDarkly Client-side ID:');
}

// Export for use in other modules
window.getLaunchDarklyKey = getLaunchDarklyKey;