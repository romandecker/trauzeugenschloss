import { PasswordForm } from "../components/PasswordForm";
import styles from "./login.module.scss";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className={styles.formContainer}>
      <PasswordForm
        submitLabel="Log in"
        checkEndpoint="/api/login"
        onSuccess={() => router.push("/")}
      />
    </div>
  );
}
