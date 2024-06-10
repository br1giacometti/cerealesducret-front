import { useRouter } from "next/router";
import { useCallback } from "react";
import { withAuth } from "@kushitech/auth-module";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@chakra-ui/react";

import { PageLayout } from "Shared/layouts";
import { useTranslation } from "Shared/i18n";

import { User } from "Auth/types";
import createRenditionSchema, {
  CreateRenditionSchema,
} from "Movements/schemas/CreateRenditionSchema";
import CreateRendition from "Movements/features/CreateRendition";

const RenditionCreatePage = () => {
  const { t } = useTranslation("movements");
  const router = useRouter();
  const methods = useForm<CreateRenditionSchema>({
    resolver: zodResolver(createRenditionSchema),
    defaultValues: {
      movementType: "RENDITION",
      date: "12/11/1981",
      isVirtualPaid: false,
    },
  });

  const navigateToMovements = useCallback(
    () => router.push("/movements"),
    [router]
  );
  return (
    <FormProvider {...methods}>
      <PageLayout>
        {{
          header: <Heading>{t("createRendition.title")}</Heading>,
          content: (
            <CreateRendition navigateToMovements={navigateToMovements} />
          ),
        }}
      </PageLayout>
    </FormProvider>
  );
};

export const getServerSideProps = withAuth<User>(async (ctx, user) => {
  if (user.role === "USER") {
    console.log("You dont have permission on  :>> ", ctx.resolvedUrl);
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }
  return {
    props: {
      user,
    },
  };
});

export default RenditionCreatePage;
