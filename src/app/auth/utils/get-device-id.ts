import { LocalStorageKeys } from "aviatickets-submodule/libs/enums/local-storage-keys.enum";
import { v4 } from "uuid";

export const getDeviceId = () => {
  let device = localStorage.getItem(LocalStorageKeys.DeviceId);

  if (!device) {
    device = v4();
    localStorage.setItem(LocalStorageKeys.DeviceId, device);
  }

  return device;
};
