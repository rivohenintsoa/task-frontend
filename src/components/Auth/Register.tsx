import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow rounded"
    >
      <h2 className="text-2xl mb-4 text-primary">Inscription</h2>

      <input
        name="name"
        placeholder="Nom"
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        name="password"
        type="password"
        placeholder="Mot de passe"
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        name="password_confirmation"
        type="password"
        placeholder="Confirmer mot de passe"
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
      />

      <button className="w-full bg-primary text-white p-2 rounded">
        S'inscrire
      </button>
    </form>
  );
}