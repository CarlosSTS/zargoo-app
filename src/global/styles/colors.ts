const colors = {
  primary: '#FF6D00',
  background: '#FFFFFF',
  text: '#0D002B',
  textBlueLight: '#1A214B',
  text80: '#2B58AC',
  text10: '#8A8A8A',
  text20: '#505050',
  white: '#FFFFFF',
  black: '#000000',
  disabled: '#F0F0F0',
  disabledDark: '#F6F8FA',
  disabledLight: '#E5EAEF',
  divider: '#E3E3E3',
  disabledCardLocation: '#EEF2FA',
  danger: '#FF3D00',
  success: '#01B671',
  successDark: '#01B6714D',
  successLight: '#00FF9E',
  successLight2: '#00FFAB',
  approvedCategoryCard: 'rgb(9, 55, 64)',
  greenLight: '#70F7C4',
  link: '#00A9F7',
  red: '#B90B0B',
  negative: '#DC2626',
  blue: '#D1DBFF',
  transparent: 'transparent',
  yellow: '#FFCC01',
  yellowLight: '#FFECA0',
  pink: '#FE0094',
  red90: '#D92D2D',
  overlay: 'rgba(0, 0, 0, 0.5)',
  successRgba: 'rgba(1, 182, 113, 0.8)', // colors.success com 80% de opacidade
  redRgba: 'rgba(255, 0, 0, 0.8)', // FF0000 com 80% de opacidade
  modal: 'rgba(0, 55, 255, 0.18)',
  analysisDocumentation: '#7239EA',
  maps: {
    strokeColor: 'rgba(0, 122, 255, 0.7)',
    fillColor: 'rgba(0, 122, 255, 0.2)',
  },
  gradient: {
    colors: ['#2E0565', '#FE0094', '#FF6D00'] as const,
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 1,
      y: 0,
    },
  },
  gradienteUserTypeButtonDriver: {
    colors: ['#0D002B', 'rgba(13, 0, 43, 0.85)'] as const,
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 1,
      y: 0,
    },
  },
  gradienteUserTypeButtonClient: {
    colors: ['#FF6D00', 'rgba(255, 109, 0, 0.85)'] as const,
    start: {
      x: 1,
      y: 0,
    },
    end: {
      x: 0,
      y: 0,
    },
  },
};
export default colors;
