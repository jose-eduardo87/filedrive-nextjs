import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "next-i18next";
import { Input } from "@/components/Input";
import { Button, Modal } from "@/components/ui";
import { useUserInfo } from "@/store/userinfo-context";
import { useHttp, useInput } from "@/hooks/index";
import { Important } from "@/components/Icons";

import styles from "./ModalDeleteAccount.module.css";

interface ModalDeleteAccountInterface {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalDeleteAccount: FC<ModalDeleteAccountInterface> = ({
  setIsModalOpen,
}) => {
  const { t } = useTranslation("modaldeleteaccount");
  const { language } = useUserInfo();
  const confirmValue = language === "en" ? "confirm" : "confirmar";
  const confirmValidator = (confirmInput: string) =>
    confirmInput === confirmValue;
  const { error, isLoading, sendRequest, showError } = useHttp();
  const { isValid, onChange, value } = useInput(confirmValidator, "");
  const onConfirmDeleteAccountHandler = async () => {
    if (value !== "confirm") {
      return;
    }
    const response = await sendRequest({
      url: "/api/users/delete-account",
      method: "DELETE",
    });
    console.log(response);

    setIsModalOpen(false);
  };
  const onCancelDeleteAccountHandler = () => setIsModalOpen(false);

  return (
    <Modal>
      <div className={styles.root}>
        <span style={{ display: "flex", alignItems: "center" }}>
          <Important />
          <h3>{t("title")}</h3>
        </span>
        <div className={styles.main}>
          <p>
            {t("main-message")}
            <br />
            <strong>{t("message-strong")}</strong>
          </p>
          <Input
            type="text"
            placeholder={confirmValue}
            value={value}
            onChange={onChange}
          />
        </div>
        <div className={styles.buttonsGroup}>
          <Button
            style={{ backgroundColor: "#C2C5CC", border: "none" }}
            onClick={onCancelDeleteAccountHandler}
          >
            {t("btn-cancel")}
          </Button>
          <Button
            isDisabled={!isValid}
            style={{
              backgroundColor: "#FF7F50",
              border: "none",
              color: "#FFFFFF",
            }}
            onClick={onConfirmDeleteAccountHandler}
          >
            {t("btn-confirm")}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteAccount;
