export interface Mooo {

}

export type KeyboardType = "url" | "numeric" | "default" | "email-address" | "phone-pad" | "number-pad" | "decimal-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "name-phone-pad" | "twitter" | "web-search" | undefined
export enum CameraType {
  FRONT = "FRONT",
  BACK = "BACK",
}
export enum TypePopup {
  FACE_ID = 'FACE_ID',
  TOUCH_ID = 'TOUCH_ID',
  SUCCESS = 'SUCCESS',
  PASSWORD = 'PASSWORD',
  PAYME = "PAYME"
}

export interface ImageEkycType {
  type?: string,
  img?: string
}

export interface EkycType {
  image_front?: {
    img?: string,
    type?: string
  },
  image_back?: {
    img?: string,
    type?: string
  },
  image_video?: {
    img?: string,
    type?: string
  }
}

export enum StepVideoResponse {
  STEP_FACE_STRAIGHT = "STEP_FACE_STRAIGHT",
  STEP_FACE_LEFT = "STEP_FACE_LEFT",
  STEP_FACE_RIGHT = "STEP_FACE_RIGHT",
  DONE = "DONE",
  START = "START"
}
export enum ResultVideoResponse {
  FACE_FAKE = "FACE_FAKE",
  NO_FACE = "NO_FACE",
  INVALID = "INVALID",
  ERROR = "ERROR",
  FACE_READY = "FACE_READY",
  FACE_STRAIGHT_FAILED = "FACE_STRAIGHT_FAILED",
  FACE_STRAIGHT = "FACE_STRAIGHT",
  FACE_RIGHT_FAILED = "FACE_RIGHT_FAILED",
  FACE_RIGHT = "FACE_RIGHT",
  FACE_LEFT_FAILED = "FACE_LEFT_FAILED",
  FACE_LEFT = "FACE_LEFT",
  FAILED = "FAILED",
  DONE = "DONE"
}


export enum TypeAccountBank {
  RECHARGE = "RECHARGE",
  WITHDRAW = "WITHDRAW"
}

export enum TypePayme {
  PAYME = 'PAYME'
}

export enum TypeInfoConfirm {
  INFOCONFIRM = 'INFOCONFIRM'
}

export const optionalConfigObject = {
  title: 'Authentication Required', // Android
  imageColor: '#e00606', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Touch sensor', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Sử dụng mật khẩu', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};