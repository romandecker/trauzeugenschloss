import styles from "./index.module.scss";
import { useForm } from "react-hook-form";

interface FormFields {
  password: string;
}

export default function HomePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit = async (data: FormFields) => {
    const resp = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.json());
    console.log(resp);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="password">Passwort:</label>
        <input type="password" {...register("password")} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
