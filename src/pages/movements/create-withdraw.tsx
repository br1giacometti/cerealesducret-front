import { useCallback } from "react";
import { useRouter } from "next/router";
import { withAuth } from "@kushitech/auth-module";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@chakra-ui/react";

import { useTranslation } from "Shared/i18n";
import { PageLayout } from "Shared/layouts";

import { User } from "Auth/types";
import createWithdrawSchema, {
  CreateWithdrawSchema,
} from "Movements/schemas/CreateWithdrawSchema";
import CreateWithdraw from "Movements/features/CreateWithdraw";
import CreateWithdrawProvider from "Movements/contexts/CreateWithdrawContext/CreateWithdrawProvider";

const WithdrawCreatePage = () => {
  const router = useRouter();
  const { t } = useTranslation("movements");

  const methods = useForm<CreateWithdrawSchema>({
    resolver: zodResolver(createWithdrawSchema),
    defaultValues: {
      movementType: "WITHDRAW",
      date: "12/11/1981",
      isVirtualPaid: false,
      cashBoxMovementsDetail: [],
    },
  });

  const cashBoxMovementsDetailArrayMethods = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "cashBoxMovementsDetail", // unique name for your Field Array
  });

  const navigateToMovements = useCallback(
    () => router.push("/movements"),
    [router]
  );

  return (
    <CreateWithdrawProvider
      {...methods}
      cashBoxMovementsDetail={cashBoxMovementsDetailArrayMethods}
    >
      <PageLayout>
        {{
          header: <Heading>{t("createWithdraw.title")}</Heading>,
          content: <CreateWithdraw navigateToMovements={navigateToMovements} />,
        }}
      </PageLayout>
    </CreateWithdrawProvider>
  );
};

export const getServerSideProps = withAuth<User>(async (ctx, user) => {
  if (user.role === "USER") {
    // eslint-disable-next-line no-console
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

export default WithdrawCreatePage;
