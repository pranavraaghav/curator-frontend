
const getUrlFromCurationId = ( id ) => {
    if (typeof window !== "undefined")
    {        
        return `${window.location.origin}/curation/${id}`
    }
}

export default getUrlFromCurationId;