import styles from "./login.module.scss";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface FormFields {
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const router = useRouter();

  const onSubmit = async (data: FormFields) => {
    const resp = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.json());
    router.push("/");
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
