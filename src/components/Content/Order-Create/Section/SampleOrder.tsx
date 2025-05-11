import React from "react";
import SectionLayout from "@/components/Layouts/SectionLayout";
import Select from "@/components/Select/Select";

import { FormOrderFields } from "@/types/Order";

import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  Controller,
  Control,
} from "react-hook-form";

type FormState = {
  register: UseFormRegister<FormOrderFields>;
  setValue: UseFormSetValue<FormOrderFields>;
  watch: UseFormWatch<FormOrderFields>;
  errors: FieldErrors<FormOrderFields>;
  control: Control<FormOrderFields>;
};

type SampleFormProps = {
  form: FormState;
};

function SampleOrder({ form }: SampleFormProps) {
  const { register, setValue, errors, watch, control } = form;
  return (
    <SectionLayout>
      <h2 className="text-2xl font-bold text-anarya-title mb-6">Sample</h2>
      <div className="flex gap-11 mb-4">
        <Controller
          name="sample"
          control={control}
          render={({ field }) => (
            <Select
              label="Prioritas"
              required
              options={[]}
              placeholder="Choose Priority"
              value={field.value}
              onChange={(val) => {
                field.onChange(val);
                setValue("sample", val);
              }}
              error={""}
              isLoading={false}
              maxDisplayOptions={3}
              name={field.name}
              ref={field.ref}
            />
          )}
        />
      </div>
    </SectionLayout>
  );
}

export default SampleOrder;
