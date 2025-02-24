import React from "react";
import { InputElement } from "../../../../../../../Components/Common/Index";
import { PiCertificateThin } from "react-icons/pi";
import { FileUploadBox } from "../../../../../../../Components/Common/FileUploadBox/FileUploadBox";
export const Experiance = ({ errors, watch, register, setValue }) => {
  return (
    <>
      <InputElement
        placeholder="University Degree"
        errors={errors}
        Icon={PiCertificateThin}
        register={register}
        name="degree"
      />
      <FileUploadBox
        label="CV"
        accept=".pdf,.jpg,.jpeg,.png"
        register={register}
        name="cv"
        error={errors.cv}
        watch={watch}
        setValue={setValue}
      />
      <FileUploadBox
        label="Certificate"
        accept=".pdf,.jpg,.jpeg,.png"
        register={register}
        name="certificate"
        error={errors.certificate}
        watch={watch}
        setValue={setValue}
      />
    </>
  );
};
