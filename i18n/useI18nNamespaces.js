import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { loadNamespaces } from "./loadNamespaces";

export const useI18nNamespaces = (namespaces) => {
  const { i18n } = useTranslation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    setReady(false);

    loadNamespaces(namespaces).then(() => {
      if (mounted) setReady(true);
    });

    return () => {
      mounted = false;
    };
    // re-run if the namespace list itself changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(namespaces), i18n.language]);

  return ready;
};
