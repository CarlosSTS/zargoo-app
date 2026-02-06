import {
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';
import assets from '~/assets';
import { CategoryStatus } from '~/@types/categoryStatusTypes';

export interface StatusConfig {
  label: string;
  badgeStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  icon?: ImageSourcePropType;
  showIcon: boolean;
}

// Estilos serão injetados do componente
export const getStatusConfig = (
  styles: any,
): Record<CategoryStatus, StatusConfig> => ({
  [CategoryStatus.APPROVED]: {
    label: 'Aprovado',
    badgeStyle: styles.statusApproved,
    textStyle: styles.statusTextApproved,
    showIcon: false,
  },
  [CategoryStatus.PENDING]: {
    label: 'Pendente',
    badgeStyle: styles.statusPending,
    textStyle: styles.statusTextPending,
    icon: assets.icons.clock,
    showIcon: true,
  },
  [CategoryStatus.DENIED]: {
    label: 'Solicitação Negada',
    badgeStyle: styles.statusDenied,
    textStyle: styles.statusTextDenied,
    icon: assets.icons.x,
    showIcon: true,
  },
  [CategoryStatus.NO_ACCESS]: {
    label: 'Sem Acesso',
    badgeStyle: styles.statusNoAccess,
    textStyle: styles.statusTextNoAccess,
    iconStyle: styles.statusIconNoAccess,
    icon: assets.icons.lock,
    showIcon: true,
  },
});
