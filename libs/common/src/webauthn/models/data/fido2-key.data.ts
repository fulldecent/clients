import { Fido2KeyApi } from "../api/fido2-key.api";

export class Fido2KeyData {
  keyType: "public-key";
  keyAlgorithm: "ECDSA";
  keyCurve: "P-256";
  keyValue: string;
  rpId: string;
  userHandle: string;

  // Extras
  rpName: string;
  userName: string;
  origin: string;

  constructor(data?: Fido2KeyApi) {
    if (data == null) {
      return;
    }

    this.keyType = data.keyType;
    this.keyAlgorithm = data.keyAlgorithm;
    this.keyCurve = data.keyCurve;
    this.keyValue = data.keyValue;
    this.rpId = data.rpId;
    this.userHandle = data.userHandle;
    this.rpName = data.rpName;
    this.userName = data.userName;
    this.origin = data.origin;
  }
}
