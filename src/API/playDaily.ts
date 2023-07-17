export const setPlayDailyCookie = () => {
    const date = new Date();
    date.setDate(date.getDate()+1);
    date.setUTCHours(0,0,0,0);
    document.cookie = `playDaily=true; expires=${date.toUTCString()}; path=/`;
}

export const getPlayDailyCookie = () => {
    const cookie = document.cookie;
    console.log(cookie);
    if(cookie.includes("playDaily=true")) return false;
    else return true;
}