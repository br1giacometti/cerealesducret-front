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

import useEffectAuth from "Product/hooks/useEffectAuth";

import { useTranslation } from "Base/i18n";
import useCreateProductService from "Product/data/ProductRepository/hooks/useCreateProductService";
import ErrorMessageTop from "Product/components/ErrorMessageTop";
import createProductSchema, {
  CreateProductSchema,
} from "Product/schemas/createProductSchema";
import FormPageLayout from "Base/layout/FormPageLayout";
import FormContainerLayout from "Base/layout/FormContainerLayout";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import { FormInputText } from "Base/components";
import FormInputNumber from "Base/components/FormInputNumber";

interface CreateProductProps {
  navigateToProduct: () => void;
}

const CreateProduct = ({ navigateToProduct }: CreateProductProps) => {
  const { t } = useTranslation("product");
  const toast = useToast();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  });
  const [body, setBody] = useState<CreateProductSchema | null>(null);

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
      navigateToProduct();
    },
    [navigateToProduct, toast]
    // [navigateToSignIn, toast]
  );

  const { loading } = useCreateProductService(body, onSignUp);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleCreateProduct = (data: CreateProductSchema) => {
    setBody(data);
  };

  return (
    <FormPageLayout onSubmit={handleSubmit(handleCreateProduct)}>
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
              errors.buyPrice
                ? (t(`errors.${errors.buyPrice.message}`, {
                    ns: "common",
                  }) as string)
                : undefined
            }
            id="buyPrice"
            label={t("create.label.buyPrice")}
            leftIcon="$"
            name="buyPrice"
            thousandSeparator="."
            type="number"
          />

          <FormInputNumber
            isRequired
            control={control as any}
            errorMessage={
              errors.sellPrice
                ? (t(`errors.${errors.sellPrice.message}`, {
                    ns: "common",
                  }) as string)
                : undefined
            }
            id="sellPrice"
            label={t("create.label.sellPrice")}
            leftIcon="$"
            name="sellPrice"
            thousandSeparator="."
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

export default CreateProduct;
