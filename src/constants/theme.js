// Theme constants for the Localoop app
// Contains colors, typography, and spacing values

export const COLORS = {
  // Primary colors
  primary: '#6565FA',
  primaryPressed: '#4646DC',
  primaryDisabled: '#B2B2FD',
  
  // Text colors
  textPrimary: '#0D162F',
  textSecondary: '#8C8F9C',
  cardText: '#666B7A',
  
  // UI Colors
  background: '#FFFFFF',
  card: '#FFFFFF',
  border: '#E5E7EB',
  
  // Progress bar colors
  progressActive: '#6565FA',
  progressInactive: '#E5E7EB',
  
  // Button Shadow
  buttonShadow: {
    shadowColor: '#6666FF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 32,
    elevation: 16, // Android equivalent
  },
  
  // Card Shadow
  cardShadow: {
    shadowColor: 'rgba(30, 44, 86, 0.04)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2, // Android equivalent
  },
  
  // Selected Card Shadow
  selectedCardShadow: {
    shadowColor: 'rgba(102, 102, 255, 0.1)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 4, // Android equivalent
  },
  
  // Button states
  buttonDefault: '#6565FA',
  buttonPressed: '#4646DC',
  buttonDisabled: '#B2B2FD',
  buttonText: '#FFFFFF',
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
  
  // Font weights
  weightRegular: '400',
  weightMedium: '500',
  weightSemiBold: '600',
  weightBold: '700',
  weightExtraBold: '800',
};

export const SPACING = {
  // Spacing/padding/margin
  xsmall: 4,
  small: 8,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 32,
  
  // Card specific spacing
  cardPaddingVertical: 20,
  cardPaddingHorizontal: 24,
  cardMarginBottom: 8,
  
  // Border radius
  borderRadiusSmall: 12,
  borderRadiusMedium: 24,
  borderRadiusLarge: 40,
  borderRadiusXLarge: 100, // For pill-shaped buttons and cards
  
  // Border widths
  borderWidthRegular: 1,
  borderWidthSelected: 1.5,
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
  
  // Card specific layout
  selectionIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
}; 