import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Stack, Switch, Typography } from "@mui/material";
import styled from "styled-components";
import { useSubscribe } from "react-pwa-push-notifications";
import { PUBLIC_PUSH_KEY } from "../Constants";
import {
  selectIsSubscribed,
  selectShowPushNotifications,
  setIsSubscribed,
} from "../store/slices/pushNotificationsSlice";
import { selectUser } from "../store/slices/authUserSlice";
import { subscribe, unsubscribe } from "../services/PushNotificationsService";
import { messageSuccess } from "../utils/notification";
import { urlBase64ToUint8Array } from "../utils/pushNotifications";

const checkedStyles = {
  ".MuiSwitch-thumb": {
    width: "30px",
    height: "30px",
    marginTop: "-5px",
    marginLeft: "-5px",
    backgroundColor: "white",
  },
  backgroundColor: "#1B72C0",
  border: "",
};

const StyledSwitch = styled(Switch)(({ checked, disabled }) => ({
  ".MuiSwitch-track": { backgroundColor: "transparent" },
  ".MuiSwitch-thumb": {
    backgroundColor: "#74777F",
  },
  backgroundColor: "#EFF1F8",
  border: "2px solid  #74777F",
  borderRadius: "24px",
  ...(!disabled && checked ? checkedStyles : {}),
}));

const Notifications = () => {
  // General hooks
  const dispatch = useDispatch();
  const { getSubscription } = useSubscribe({ publicKey: PUBLIC_PUSH_KEY });

  // Selectors
  const user = useSelector(selectUser);
  const showPushNotifications = useSelector(selectShowPushNotifications);
  const isSubscribed = useSelector(selectIsSubscribed);

  // Handlers
  const handleSubscribe = async () => {
    try {
      const subscription = await getSubscription();

      const notificationsSubscribeDto = {
        userId: user.id,
        endpoint: subscription.endpoint,
        p256dh: subscription.toJSON().keys.p256dh,
        auth: subscription.toJSON().keys.auth,
      };

      await subscribe(notificationsSubscribeDto);

      dispatch(setIsSubscribed(true));

      messageSuccess("Subscribed for push notifications");
    } catch (e) {
      if (e.errorCode === "ExistingSubscription") {
        const registration = await navigator.serviceWorker.ready;
        const convertedVapidKey = urlBase64ToUint8Array(PUBLIC_PUSH_KEY);

        const existingSubscription = await registration.pushManager.subscribe({
          applicationServerKey: convertedVapidKey,
          userVisibleOnly: true,
        });

        const notificationsSubscribeDto = {
          userId: user.id,
          endpoint: existingSubscription.endpoint,
          p256dh: existingSubscription.toJSON().keys.p256dh,
          auth: existingSubscription.toJSON().keys.auth,
        };

        await subscribe({
          notificationsSubscribeDto,
        }).unwrap();

        dispatch(setIsSubscribed(true));

        messageSuccess("Subscribed for push notifications");
      } else {
        console.error("Subscribe to push failed", e);
      }
    }
  };

  const handleUnsubscribe = async () => {
    await unsubscribe(user.id);

    const registration = await navigator.serviceWorker.ready;

    const existingSubscription =
      await registration.pushManager.getSubscription();

    const result = await existingSubscription.unsubscribe();

    if (result) {
      dispatch(setIsSubscribed(false));

      messageSuccess("Unsubscribed from notifications");
    }
  };

  const handleChange = async () => {
    if (isSubscribed) {
      await handleUnsubscribe();
    } else {
      await handleSubscribe();
    }
  };

  return (
    <Stack spacing={1}>
      <Typography sx={{ color: "#1B72C0" }}>Manage Notifications</Typography>
      {/* <Grid container alignItems="center">
        <Grid item xs>
          Private chats
        </Grid>
        <Grid item>
          <StyledSwitch
            color="inherit"
            checked={onlyPrivate}
            disabled={dontDisturb}
            onChange={handleChangeOnlyPrivate}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item xs>
          Group chats
        </Grid>
        <Grid item>
          <StyledSwitch
            color="inherit"
            checked={onlyGroup}
            disabled={dontDisturb}
            onChange={handleChangeOnlyGroup}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Grid>
      </Grid> */}
      {showPushNotifications && (
        <Grid container alignItems="center">
          <Grid item xs>
            Do not disturb
          </Grid>
          <Grid item>
            <StyledSwitch
              color="inherit"
              checked={!isSubscribed}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Grid>
        </Grid>
      )}
    </Stack>
  );
};

export default Notifications;
