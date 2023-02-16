import { TRPCClientError } from "@trpc/client";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { RouterOutputs } from "../../utils/api";
import { client } from "../../utils/api";

const UserProfile: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] =
    useState<RouterOutputs["checklist"]["getById"]>();

  const [error, setError] = useState<string>();

  useEffect(() => {
    if (router.isReady) {
      void getChecklistData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  async function getChecklistData() {
    try {
      const profile = await client.checklist.getById.query({
        id: id as string,
      });
      setProfile(profile);
    } catch (e) {
      if (e instanceof TRPCClientError) {
        setError(e.message);
      } else throw e;
    }
  }
  return null;
};

export default UserProfile;
