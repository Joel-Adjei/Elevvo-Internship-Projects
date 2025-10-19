import { useEffect } from 'react'

const usePageTitle = ({title}) => {
    useEffect(() => {
        document.title = `${title} - Job Tracker App`;
        window.scrollTo(0, 0);
    }, []);

    return null;
}

export default usePageTitle