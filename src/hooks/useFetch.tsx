import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<null | any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { loading, error, data };
};

export default useFetch;
