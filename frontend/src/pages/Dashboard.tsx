import { useEffect, useState } from "react";
import { api } from "../api/client";
import { getToken, logout } from "../utils/auth";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [following, setFollowing] = useState<string[]>([]);

  const loadUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  const loadFollowing = async () => {
    const userId = JSON.parse(atob(getToken()!.split(".")[1])).userId;

    const res = await api.get(`/follow/${userId}/following`);
    setFollowing(res.data.following.map((u: { id: string }) => u.id));
  };

  useEffect(() => {
    const load = async () => {
      await loadUsers();
      await loadFollowing();
    };

    load();
  }, []);

  const follow = async (id: string) => {
    await api.post(`/follow/${id}`);
    loadFollowing();
  };

  const unfollow = async (id: string) => {
    await api.delete(`/follow/${id}`);
    loadFollowing();
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <div>
        {users.map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>

            {following.includes(user.id) ? (
              <button onClick={() => unfollow(user.id)}>Unfollow</button>
            ) : (
              <button onClick={() => follow(user.id)}>Follow</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
