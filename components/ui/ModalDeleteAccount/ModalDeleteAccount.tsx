import { Dispatch, FC, SetStateAction } from "react";
import { Input } from "@/components/Input";
import { Button, Modal } from "@/components/ui";
import { useUserInfo } from "@/store/userinfo-context";
import { useInput } from "@/hooks/index";

import styles from "./ModalDeleteAccount.module.css";

interface ModalDeleteAccountInterface {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalDeleteAccount: FC<ModalDeleteAccountInterface> = ({
  setIsModalOpen,
}) => {
  const { language } = useUserInfo();
  const confirmValue = language === "en" ? "confirm" : "confirmar";
  const confirmValidator = (confirmInput: string) =>
    confirmInput === confirmValue;
  const { isValid, onChange, value } = useInput(confirmValidator, "");
  const onConfirmDeleteAccountHandler = () => {
    console.log(value);

    setIsModalOpen(false);
  };
  const onCancelDeleteAccountHandler = () => setIsModalOpen(false);

  return (
    <Modal>
      <div className={styles.root}>
        <h3>Warning!</h3>
        <div className={styles.main}>
          <p>
            In order to delete your account, you must type <i>confirm</i> on the
            field below.
            <br />
            <strong>
              All your files will be permanently deleted. Proceed with caution.
            </strong>
          </p>
          <Input
            type="text"
            CSSStyles={{ width: "90%" }}
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
            Cancel
          </Button>
          <Button
            isDisabled={!isValid}
            style={{
              backgroundColor: "#90682F",
              border: "none",
              color: "#FFFFFF",
            }}
            onClick={onConfirmDeleteAccountHandler}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDeleteAccount;
