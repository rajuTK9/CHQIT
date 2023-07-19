import { useAppSelector } from "../app/hooks";
import { useQuery } from "@tanstack/react-query";

export default function useFetchData(url: string, queryKey: string) {
  const auth = useAppSelector((state) => state.auth);

  const fetchTasks = async () => {
    if (auth.token) {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return res.json();
    } else return [];
  };

  const { data, status } = useQuery({
    queryKey: [queryKey, auth],
    queryFn: fetchTasks,
  });

  return { data, status };
}
