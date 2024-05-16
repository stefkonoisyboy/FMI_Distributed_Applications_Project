import { useCallback, useEffect, useState } from "react";
import * as serviceWorkerRegistration from "../serviceWorkerRegistration";

export const useServiceWorker = () => {
  const [registration, setRegistration] = useState();
  const [waitingWorker, setWaitingWorker] = useState();
  const [showReload, setShowReload] = useState(false);

  const onSWUpdate = useCallback((registration) => {
    setShowReload(true);
    setRegistration(registration);
    setWaitingWorker(registration.waiting);
  }, []);

  const reloadPage = useCallback(async () => {
    await registration?.unregister();
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
    setShowReload(false);
    window.location.reload();
  }, [registration, waitingWorker]);

  useEffect(() => {
    serviceWorkerRegistration.register({
      onUpdate: onSWUpdate,
    });
  }, []);

  return { showReload, waitingWorker, reloadPage };
};
