import { FC, FormEvent, useRef } from "react";
import { useTranslation } from "next-i18next";
import { Input } from "@/components/Input";
import { PopupMessage, Button } from "@/components/ui/";
import { Error, Important } from "@/components/Icons";
import { useHttp, useInput } from "@/hooks/index";
import { useUserInfo } from "store/userinfo-context";
import { nameValidator } from "helpers/functions";

import styles from "./BasicSettings.module.css";

const BasicSettings: FC = () => {
  const inputFile = useRef<HTMLInputElement>(null);
  const { t } = useTranslation("basicsettings");
  const { error, showError, isLoading, sendRequest } = useHttp();
  const {
    error: errorPhotoRequest,
    showError: showPhotoError,
    isLoading: isLoadingPhoto,
    sendRequest: sendPhotoRequest,
  } = useHttp();
  const { userName, setProfileImage, setUserName } = useUserInfo();
  const {
    value: nameValue,
    onBlur: onNameBlur,
    reset: resetName,
    onChange: onNameChange,
    isValid: isNameValid,
    hasError: nameHasError,
  } = useInput(nameValidator, userName);

  const getSignature = async () => {
    const response = await sendPhotoRequest({ url: "/api/users/upload-photo" });

    return response;
  };

  const onClickUploadPhoto = () => {
    if (inputFile.current !== null) {
      inputFile.current.click();
    }
  };

  const onChangeInput = async () => {
    if (inputFile.current !== null && inputFile.current.files !== null) {
      const { signature, timestamp, publicId } = await getSignature();
      const formData = new FormData();
      formData.append("file", inputFile.current.files[0]);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("upload_preset", "ml_default");
      formData.append("folder", "profile_pics");
      formData.append("public_id", publicId);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);

      const uploadToCloudinary = await sendPhotoRequest({
        url: `https://api.cloudinary.com/v1_1/${process.env
          .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!}/image/upload`,
        method: "POST",
        body: formData,
      });

      if (uploadToCloudinary.secure_url) {
        // save url in db and then setProfileImage
        const saveProfileImageToDb = await sendPhotoRequest({
          url: "/api/users/update-account",
          method: "PATCH",
          body: { image: uploadToCloudinary.secure_url },
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (saveProfileImageToDb) {
          setProfileImage(uploadToCloudinary.secure_url);
        }
      }
    }
  };

  const errorMessage = t("error-message");
  const setVisibility = (hasError: boolean) =>
    hasError ? "visible" : "hidden";

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const response = await sendRequest({
      url: "/api/users/update-account",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: { name: nameValue },
    });

    if (response) {
      setUserName(nameValue);
      resetName();
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>{t("heading")}</h2>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        {isLoading ||
          (isLoadingPhoto && (
            <PopupMessage
              type="loading"
              message="Updating information..."
              SVG={<Important fill="#D11A2A" />}
            />
          ))}
        {(showError || showPhotoError) && (
          <PopupMessage
            type="error"
            message={error! || errorPhotoRequest!}
            SVG={<Error fill="#7C4343" />}
          />
        )}
        <div className={styles.formContainer}>
          <Input
            type="text"
            placeholder={userName}
            value={nameValue}
            onBlur={onNameBlur}
            onChange={onNameChange}
            required
          />
          <p
            className={styles.errorMessage}
            style={{
              visibility: setVisibility(nameHasError),
              color: "red",
            }}
          >
            {errorMessage}
          </p>

          <Button
            style={{
              width: "100%",
              backgroundColor: isNameValid ? "#FF7F50" : "#FFAf7A",
            }}
            isDisabled={!isNameValid}
          >
            {t("btn-form")}
          </Button>
        </div>
      </form>
      <input
        type="file"
        accept="image/*"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={onChangeInput}
      />
      <Button
        style={{ width: "80%", backgroundColor: "#23395D" }}
        onClick={onClickUploadPhoto}
      >
        {t("btn-change-image")}
      </Button>
    </div>
  );
};

export default BasicSettings;
