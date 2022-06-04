import { FC, useState } from "react";
import { useUserInfo } from "@/store/userinfo-context";
import { ModalDeleteAccount } from "@/components/ui/ModalDeleteAccount";

import styles from "./DeleteAccount.module.css";

const DeleteAccount: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language } = useUserInfo();

  const onOpenModalHandler = () => setIsModalOpen(true);

  return (
    <>
      {isModalOpen && <ModalDeleteAccount setIsModalOpen={setIsModalOpen} />}
      <p
        className={`${styles.link} ${styles.removeLink}`}
        onClick={onOpenModalHandler}
      >
        {language === "en" ? "Delete account" : "Deletar conta"}
      </p>
    </>
  );
};

export default DeleteAccount;
