// import { getStatusConfig } from './categoryStatus';
import isValidCoordinate from './coordinates/isValidCoordinate';
import isWithinRadius from './coordinates/isWithinRadius';
import getUserScope from './getUserScope';
import isObjectCompletelyFilled from './isObjectCompletelyFilled';
import {
  requestCameraPermission,
  requestMediaLibraryPermission,
} from './permissions/camera';
import locationPermission from './permissions/locations';

import {
  birthDateMask,
  cpfMask,
  normalizeMask,
  phoneMask,
  maskNumber,
} from './mask';
export {
  locationPermission,
  requestCameraPermission,
  requestMediaLibraryPermission,
  isValidCoordinate,
  isWithinRadius,
  isObjectCompletelyFilled,
  getUserScope,
  // getStatusConfig,
  birthDateMask,
  cpfMask,
  phoneMask,
  normalizeMask,
  maskNumber,
};
