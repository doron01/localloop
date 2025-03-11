// Theme constants for the Localoop app
// Contains colors, typography, and spacing values

export const COLORS = {
  // Primary colors
  primary: '#6666FF',
  primaryTransparent: 'rgba(102, 102, 255, 0.96)',
  primaryLight: 'rgba(102, 102, 255, 0.1)',
  secondary: '#F5F5F5', // Light gray for backgrounds
  
  // Text colors
  textPrimary: '#0D162F',
  textSecondary: '#797B8B',
  textLight: '#999999',
  
  // UI Colors
  background: '#FAFAFA',
  card: '#FFFFFF',
  border: '#ECEBED',
  selected: 'rgba(123, 97, 255, 0.1)', // Light purple for selected items
  
  // Status colors
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  
  // Button colors
  buttonPrimary: '#6666FF',
  buttonSecondary: '#F5F5F5',
  buttonText: '#FFFFFF',
  buttonDisabled: '#CCCCCC',
  
  // Progress bar colors
  progressInactive: 'rgba(102, 102, 255, 0.2)',
  progressActive: '#6666FF',
};

export const TYPOGRAPHY = {
  // Font families
  fontFamily: 'BR Firma',
  
  // Font sizes
  sizeXSmall: 12,
  sizeSmall: 14,
  sizeMedium: 16,
  sizeLarge: 20,
  sizeXLarge: 28,
  sizeXXLarge: 32,
  
  // Line heights
  lineHeightSmall: 1.57,
  lineHeightMedium: 1.26,
  lineHeightLarge: 1.29,
  
  // Font weights (for cross-platform)
  weightRegular: '400',
  weightMedium: '500',
  weightBold: '700',
  weightSemiBold: '600',
};

export const SPACING = {
  // Spacing/padding/margin
  xsmall: 4,
  small: 8,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 32,
  
  // Standard screen padding
  screenPadding: 16,
  
  // Border radius
  borderRadiusSmall: 12,
  borderRadiusMedium: 24,
  borderRadiusLarge: 40,
  borderRadiusXLarge: 24,
};

export const LAYOUT = {
  // Screen dimensions
  screenWidth: '100%',
  screenHeight: '100%',
  
  // Common layout values
  fullWidth: '100%',
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}; 