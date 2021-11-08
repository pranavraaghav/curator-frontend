
const getCurrentURL = () => {

    if(typeof window !== "undefined")
    {
        const url = window.location.href;

        return url;
    }
    return null;
}

export default getCurrentURL