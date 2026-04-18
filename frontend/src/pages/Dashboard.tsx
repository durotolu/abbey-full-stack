import { useContext, useEffect, useState } from "react";
import { api } from "../api/client";
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

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
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-900">Dashboard</h2>

        <button
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          onClick={() => {
            setToken(null);
            navigate("/login", { replace: true });
          }}
        >
          Logout
        </button>
      </div>

      <div className="space-y-3">
        {users.map((user) => (
          <div
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            key={user.id}
          >
            <div>
              <p className="font-medium text-slate-900">{user.name}</p>
              <p className="text-sm text-slate-600">{user.email}</p>
            </div>

            {following.includes(user.id) ? (
              <button
                className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                onClick={() => unfollow(user.id)}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                onClick={() => follow(user.id)}
              >
                Follow
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
