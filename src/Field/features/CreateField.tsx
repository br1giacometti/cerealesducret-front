import { useCallback, useState } from "react";

import { useAuthMethods, useAuthStatus } from "@kushitech/auth-module";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Stack,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  Box,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import useEffectAuth from "Field/hooks/useEffectAuth";

import { useTranslation } from "Base/i18n";
import useCreateFieldService from "Field/data/FieldRepository/hooks/useCreateFieldService";
import ErrorMessageTop from "Field/components/ErrorMessageTop";

import FormPageLayout from "Base/layout/FormPageLayout";
import FormContainerLayout from "Base/layout/FormContainerLayout";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import { FormInputText } from "Base/components";
import FormInputNumber from "Base/components/FormInputNumber";
import createFieldSchema, {
  CreateFieldSchema,
} from "Field/schemas/createFieldSchema";

interface CreateFieldProps {
  navigateToField: () => void;
}

const CreateField = ({ navigateToField }: CreateFieldProps) => {
  const { t } = useTranslation("field");
  const toast = useToast();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFieldSchema>({
    resolver: zodResolver(createFieldSchema),
  });
  const [body, setBody] = useState<CreateFieldSchema | null>(null);

  const onSignUp = useCallback(
    (error?: string) => {
      if (error) {
        toast({
          status: "error",
          description: error,
        });
        return;
      }
      toast({
        status: "success",
        description: t("toast.create.success"),
      });
      navigateToField();
    },
    [navigateToField, toast]
    // [navigateToSignIn, toast]
  );

  const { loading } = useCreateFieldService(body, onSignUp);

  const handleCreateField = (data: CreateFieldSchema) => {
    setBody(data);
  };

  return (
    <FormPageLayout onSubmit={handleSubmit(handleCreateField)}>
      <FormContainerLayout>
        <FormSectionLayout>
          <FormInputText
            isRequired
            errorMessage={
              errors.description
                ? (t(`errors.${errors.description.message}`, {
                    ns: "common",
                  }) as string) // TODO: Deberia eleminar este casteo: `as string`
                : undefined
            }
            inputProps={register("description")}
            label={t("create.label.description")}
            name="description"
          />

          <FormInputNumber
            isRequired
            control={control as any}
            errorMessage={
              errors.hectares
                ? (t(`errors.${errors.hectares.message}`, {
                    ns: "common",
                  }) as string)
                : undefined
            }
            id="hectares"
            label={t("create.label.hectares")}
            name="hectares"
            type="number"
          />
        </FormSectionLayout>
      </FormContainerLayout>
      <Button
        colorScheme={"main"}
        isLoading={loading}
        loadingText="Submitting"
        maxW="container.sm"
        mt={8}
        type="submit"
        variant={"solid"}
      >
        {t("create.button.submit")}
      </Button>
    </FormPageLayout>
  );
};

export default CreateField;
