import styles from "./PasswordForm.module.scss";
import classNames from "classnames";
import { useState } from "react";
import { useForm } from "react-hook-form";

export interface PasswordFormProps {
  onSuccess?: () => void;
  checkEndpoint: string;
  submitLabel?: string;
}

export interface PasswordFormFields {
  password: string;
}

export function PasswordForm({ checkEndpoint, onSuccess, submitLabel = "OK" }: PasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormFields>();
  const [isShaking, setIsShaking] = useState(false);

  const onSubmit = async (data: PasswordFormFields) => {
    try {
      const resp = await fetch(checkEndpoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.status < 200 || resp.status >= 300) {
        throw new Error("Invalid response");
      }
      onSuccess?.();
    } catch (e) {
      setIsShaking(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsShaking(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classNames(styles.PasswordForm, { [styles.shaking]: isShaking })}
    >
      <label htmlFor="password">Passwort:</label>
      <input type="password" {...register("password")} />
      <button type="submit">OK</button>
    </form>
  );
}
