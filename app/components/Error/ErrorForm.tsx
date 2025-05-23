import React from "react";

type ErrorProps = {
  errors: Record<string, string>;
};

const ErrorForm = ({ errors }: ErrorProps) => {
  const erroreName = Object.keys(errors);
  return (
    <>
      {errors && (
        <p id={`${erroreName}-error`} className="mt-1 text-sm text-red-600">
          {errors.general}
        </p>
      )}
    </>
  );
};

export default ErrorForm;
