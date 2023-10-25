const STORAGE_KEY = "LH_STORAGE_KEY";

// Check if token is expired
export function isTokenExpired(exp: number) {
    if (!exp) return true;

    console.log(exp * 1000);
    console.log(Date.now())
    console.log("is Expired:" , Date.now() >= exp * 1000);

    if (Date.now() >= exp * 1000) {
        return false;
    }
    return true;
}

// 1. Read access token from storage
export function readAccessToken() { 
    // Make sure on client-side environment
    if (typeof window === "undefined") return null;

    const ls = localStorage || window.localStorage

    if (!ls) {
        throw new Error("Local storage is not available");
    }

    const data = ls.getItem(STORAGE_KEY);

    if (!data) return null;

    return JSON.parse(data) as {
        accessToken: string;
        refreshToken: string;
        exp: number;
    }

}

// 2. Setting the access token in storage
export function setAccessToken(
    accessToken: string,
    refreshToken: string,
) {
    // Obtain expiration date
    const {exp} = parseJwt(accessToken);

    // Set variables in local storage 
    const ls = localStorage || window.localStorage;

    if (!ls) {
        throw new Error("Local storage not available");
    }

    ls.setItem(STORAGE_KEY, JSON.stringify({ accessToken, refreshToken, exp}));

    // 3. Parse the JWT token, extract exp date field
function parseJwt(token: string) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")

    );

    return JSON.parse(jsonPayload);
    }
}