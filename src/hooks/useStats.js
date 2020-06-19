import { useState, useEffect } from 'react';

export default function useStats(url) {
    const [stats, setStats] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError();

            const data = await fetch(url)
                .then((res) => res.json())
                .catch((err) => setError(err));

            if (!data.error) {
                setStats(data);
            }

            setLoading(false);
        }

        fetchData();
    }, [url]);

    return { stats, loading, error };
}
