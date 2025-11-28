// Theme styles for glass UI components
// Extracted from reference implementation

export type Theme = 'light' | 'aurora' | 'glass';

export interface ThemeStyle {
  // Background
  bgFrom: string;
  bgVia: string;
  bgTo: string;
  // Orbs
  orb1: string;
  orb2: string;
  orb3: string;
  orb4: string;
  orb5?: string;
  // Glass
  glassSubtleBg: string;
  glassMediumBg: string;
  glassStrongBg: string;
  glassSubtleBorder: string;
  glassMediumBorder: string;
  glassStrongBorder: string;
  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textAccent: string;
  textInverse: string;
  // Header
  headerBg: string;
  headerBorder: string;
  // Glow
  glowViolet: string;
  glowBlue: string;
  glowCyan: string;
  glowNeutral: string;
  // Progress
  progressBg: string;
  progressGlow: string;
  // Status
  statusGreen: string;
  statusYellow: string;
  statusRed: string;
  statusBlue: string;
  // Metrics
  metricEmeraldBg: string;
  metricEmeraldText: string;
  metricEmeraldBorder: string;
  metricEmeraldGlow?: string;
  metricAmberBg: string;
  metricAmberText: string;
  metricAmberBorder: string;
  metricAmberGlow?: string;
  metricBlueBg: string;
  metricBlueText: string;
  metricBlueBorder: string;
  metricBlueGlow?: string;
  metricRedBg: string;
  metricRedText: string;
  metricRedBorder: string;
  metricRedGlow?: string;
  // Alerts
  alertDangerBg: string;
  alertDangerBorder: string;
  alertDangerText: string;
  alertWarningBg: string;
  alertWarningBorder: string;
  alertWarningText: string;
  alertInfoBg: string;
  alertInfoBorder: string;
  alertInfoText: string;
  alertSuccessBg: string;
  alertSuccessBorder: string;
  alertSuccessText: string;
  // Cards
  cardBg: string;
  cardBorder: string;
  cardHoverBg: string;
  cardHoverBorder?: string;
  cardHoverGlow?: string;
  expandedBg: string;
  expandedBorder: string;
  // Buttons
  btnPrimaryBg: string;
  btnPrimaryText: string;
  btnPrimaryHoverBg: string;
  btnPrimaryGlow: string;
  btnSecondaryBg: string;
  btnSecondaryText: string;
  btnSecondaryBorder: string;
  btnSecondaryHoverBg: string;
  btnSecondaryGlow: string;
  btnGhostBg: string;
  btnGhostText: string;
  btnGhostHoverBg: string;
  btnDangerBg: string;
  btnDangerText: string;
  btnDangerGlow: string;
  btnSuccessBg: string;
  btnSuccessText: string;
  btnSuccessGlow: string;
  // Badges
  badgeDefaultBg: string;
  badgeDefaultText: string;
  badgeDefaultBorder: string;
  badgeSuccessBg: string;
  badgeSuccessText: string;
  badgeSuccessBorder: string;
  badgeWarningBg: string;
  badgeWarningText: string;
  badgeWarningBorder: string;
  badgeDangerBg: string;
  badgeDangerText: string;
  badgeDangerBorder: string;
  badgePrimaryBg: string;
  badgePrimaryText: string;
  badgePrimaryBorder: string;
  badgeVioletBg: string;
  badgeVioletText: string;
  badgeVioletBorder: string;
  // Search/Toggle
  searchBg: string;
  searchBorder: string;
  searchText: string;
  toggleText: string;
  // Inputs
  inputBg: string;
  inputBorder: string;
  inputText: string;
  inputPlaceholder: string;
  inputFocusBorder: string;
  inputFocusGlow: string;
  // Icon button
  iconBtnFrom: string;
  iconBtnTo: string;
  iconBtnShadow: string;
  iconBtnText: string;
  // Avatar
  avatarBorder: string;
  avatarGlow: string;
  onlineBorder: string;
  // Language bar
  langBarShadow: string;
  // Grid
  gridColor: string;
  gridOpacity: number;
  // Toggle/Switch
  toggleBg: string;
  toggleActiveBg: string;
  toggleKnob: string;
  toggleGlow: string;
  // Checkbox
  checkboxBg: string;
  checkboxBorder: string;
  checkboxCheckedBg: string;
  checkboxGlow: string;
  // Tabs
  tabBg: string;
  tabActiveBg: string;
  tabActiveText: string;
  tabBorder: string;
  tabIndicator: string;
  // Tooltips
  tooltipBg: string;
  tooltipText: string;
  tooltipBorder: string;
  // Modals
  modalBg: string;
  modalBorder: string;
  modalOverlay: string;
  modalGlow: string;
  // Dropdowns
  dropdownBg: string;
  dropdownBorder: string;
  dropdownItemHover: string;
  dropdownGlow: string;
  // Skeleton
  skeletonBg: string;
  skeletonShine: string;
  // List
  listItemHover: string;
  listItemActive: string;
  listDivider: string;
  // Table
  tableBg: string;
  tableHeaderBg: string;
  tableRowHover: string;
  tableBorder: string;
  // Notification
  notificationBg: string;
  notificationGlow: string;
  // Slider
  sliderTrack: string;
  sliderFill: string;
  sliderThumb: string;
  sliderThumbBorder: string;
  sliderThumbGlow: string;
  // Footer
  footerText: string;
  // Year Card
  yearCardBg: string;
  yearCardBorder: string;
  // AI Card
  aiCardBg: string;
  aiCardBorder: string;
  // Search Button
  searchBtnBg: string;
  searchBtnText: string;
}

export const themeStyles: Record<Theme, ThemeStyle> = {
  light: {
    // Background
    bgFrom: '#f1f5f9',
    bgVia: '#eff6ff',
    bgTo: '#f5f3ff',
    // Orbs
    orb1: 'rgba(96,165,250,0.20)',
    orb2: 'rgba(167,139,250,0.15)',
    orb3: 'rgba(34,211,238,0.15)',
    orb4: 'rgba(129,140,248,0.10)',
    // Glass
    glassSubtleBg: 'rgba(255,255,255,0.60)',
    glassMediumBg: 'rgba(255,255,255,0.70)',
    glassStrongBg: 'rgba(255,255,255,0.80)',
    glassSubtleBorder: 'rgba(255,255,255,0.50)',
    glassMediumBorder: 'rgba(255,255,255,0.60)',
    glassStrongBorder: 'rgba(255,255,255,0.70)',
    // Text
    textPrimary: '#1e293b',
    textSecondary: '#64748b',
    textMuted: '#94a3b8',
    textAccent: '#7c3aed',
    textInverse: '#ffffff',
    // Header
    headerBg: 'rgba(255,255,255,0.60)',
    headerBorder: 'rgba(255,255,255,0.80)',
    // Glow
    glowViolet: '0 8px 32px rgba(124,58,237,0.15), 0 0 0 1px rgba(124,58,237,0.1)',
    glowBlue: '0 8px 32px rgba(59,130,246,0.15), 0 0 0 1px rgba(59,130,246,0.1)',
    glowCyan: '0 8px 32px rgba(6,182,212,0.15), 0 0 0 1px rgba(6,182,212,0.1)',
    glowNeutral: '0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)',
    // Progress
    progressBg: 'rgba(226,232,240,0.60)',
    progressGlow: '0 0 8px rgba(124,58,237,0.3)',
    // Status
    statusGreen: '#10b981',
    statusYellow: '#f59e0b',
    statusRed: '#ef4444',
    statusBlue: '#3b82f6',
    // Metrics
    metricEmeraldBg: 'rgba(16,185,129,0.10)',
    metricEmeraldText: '#059669',
    metricEmeraldBorder: '#a7f3d0',
    metricAmberBg: 'rgba(245,158,11,0.10)',
    metricAmberText: '#d97706',
    metricAmberBorder: '#fde68a',
    metricBlueBg: 'rgba(59,130,246,0.10)',
    metricBlueText: '#2563eb',
    metricBlueBorder: '#bfdbfe',
    metricRedBg: 'rgba(239,68,68,0.10)',
    metricRedText: '#dc2626',
    metricRedBorder: '#fecaca',
    // Alerts
    alertDangerBg: 'rgba(239,68,68,0.05)',
    alertDangerBorder: 'rgba(254,202,202,0.6)',
    alertDangerText: '#b91c1c',
    alertWarningBg: 'rgba(245,158,11,0.05)',
    alertWarningBorder: 'rgba(253,230,138,0.6)',
    alertWarningText: '#b45309',
    alertInfoBg: 'rgba(59,130,246,0.05)',
    alertInfoBorder: 'rgba(191,219,254,0.6)',
    alertInfoText: '#1d4ed8',
    alertSuccessBg: 'rgba(16,185,129,0.05)',
    alertSuccessBorder: 'rgba(167,243,208,0.6)',
    alertSuccessText: '#047857',
    // Cards
    cardBg: 'rgba(255,255,255,0.60)',
    cardBorder: 'rgba(226,232,240,0.60)',
    cardHoverBg: 'rgba(255,255,255,0.80)',
    expandedBg: 'rgba(255,255,255,0.70)',
    expandedBorder: 'rgba(139,92,246,0.5)',
    // Buttons
    btnPrimaryBg: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
    btnPrimaryText: '#ffffff',
    btnPrimaryHoverBg: 'linear-gradient(135deg, #6d28d9, #7c3aed)',
    btnPrimaryGlow: '0 0 20px rgba(124,58,237,0.4), 0 0 40px rgba(124,58,237,0.2)',
    btnSecondaryBg: 'rgba(255,255,255,0.80)',
    btnSecondaryText: '#334155',
    btnSecondaryBorder: '#e2e8f0',
    btnSecondaryHoverBg: 'rgba(241,245,249,1)',
    btnSecondaryGlow: '0 4px 20px rgba(0,0,0,0.08)',
    btnGhostBg: 'transparent',
    btnGhostText: '#64748b',
    btnGhostHoverBg: 'rgba(241,245,249,0.80)',
    btnDangerBg: 'linear-gradient(135deg, #ef4444, #f87171)',
    btnDangerText: '#ffffff',
    btnDangerGlow: '0 0 20px rgba(239,68,68,0.4)',
    btnSuccessBg: 'linear-gradient(135deg, #10b981, #34d399)',
    btnSuccessText: '#ffffff',
    btnSuccessGlow: '0 0 20px rgba(16,185,129,0.4)',
    // Badges
    badgeDefaultBg: 'rgba(100,116,139,0.1)',
    badgeDefaultText: '#475569',
    badgeDefaultBorder: '#e2e8f0',
    badgeSuccessBg: 'rgba(16,185,129,0.1)',
    badgeSuccessText: '#047857',
    badgeSuccessBorder: '#a7f3d0',
    badgeWarningBg: 'rgba(245,158,11,0.1)',
    badgeWarningText: '#b45309',
    badgeWarningBorder: '#fde68a',
    badgeDangerBg: 'rgba(239,68,68,0.1)',
    badgeDangerText: '#b91c1c',
    badgeDangerBorder: '#fecaca',
    badgePrimaryBg: 'rgba(59,130,246,0.1)',
    badgePrimaryText: '#1d4ed8',
    badgePrimaryBorder: '#bfdbfe',
    badgeVioletBg: 'rgba(139,92,246,0.1)',
    badgeVioletText: '#6d28d9',
    badgeVioletBorder: '#ddd6fe',
    // Search/Toggle
    searchBg: 'rgba(255,255,255,0.80)',
    searchBorder: 'rgba(226,232,240,0.8)',
    searchText: '#64748b',
    toggleText: '#64748b',
    // Inputs
    inputBg: 'rgba(255,255,255,0.90)',
    inputBorder: '#e2e8f0',
    inputText: '#1e293b',
    inputPlaceholder: '#94a3b8',
    inputFocusBorder: '#7c3aed',
    inputFocusGlow: '0 0 0 3px rgba(124,58,237,0.15)',
    // Icon button
    iconBtnFrom: '#1e293b',
    iconBtnTo: '#0f172a',
    iconBtnShadow: '0 4px 12px rgba(0,0,0,0.15)',
    iconBtnText: 'white',
    // Avatar
    avatarBorder: '#ffffff',
    avatarGlow: '0 8px 24px rgba(124,58,237,0.25)',
    onlineBorder: 'white',
    // Language bar
    langBarShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
    // Grid
    gridColor: 'rgba(0,0,0,0.1)',
    gridOpacity: 0.015,
    // Toggle/Switch
    toggleBg: '#e2e8f0',
    toggleActiveBg: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
    toggleKnob: '#ffffff',
    toggleGlow: '0 0 12px rgba(124,58,237,0.4)',
    // Checkbox
    checkboxBg: '#ffffff',
    checkboxBorder: '#cbd5e1',
    checkboxCheckedBg: '#7c3aed',
    checkboxGlow: '0 0 0 3px rgba(124,58,237,0.15)',
    // Tabs
    tabBg: 'transparent',
    tabActiveBg: 'rgba(124,58,237,0.10)',
    tabActiveText: '#7c3aed',
    tabBorder: '#e2e8f0',
    tabIndicator: '#7c3aed',
    // Tooltips
    tooltipBg: '#0f172a',
    tooltipText: '#ffffff',
    tooltipBorder: '#1e293b',
    // Modals
    modalBg: 'rgba(255,255,255,0.98)',
    modalBorder: 'rgba(226,232,240,0.80)',
    modalOverlay: 'rgba(15,23,42,0.50)',
    modalGlow: '0 25px 50px rgba(0,0,0,0.15)',
    // Dropdowns
    dropdownBg: 'rgba(255,255,255,0.98)',
    dropdownBorder: '#e2e8f0',
    dropdownItemHover: 'rgba(241,245,249,0.90)',
    dropdownGlow: '0 10px 40px rgba(0,0,0,0.10)',
    // Skeleton
    skeletonBg: '#e2e8f0',
    skeletonShine: 'rgba(255,255,255,0.6)',
    // List
    listItemHover: 'rgba(241,245,249,0.80)',
    listItemActive: 'rgba(124,58,237,0.08)',
    listDivider: '#e2e8f0',
    // Table
    tableBg: 'rgba(255,255,255,0.80)',
    tableHeaderBg: 'rgba(248,250,252,0.90)',
    tableRowHover: 'rgba(241,245,249,0.80)',
    tableBorder: '#e2e8f0',
    // Notification
    notificationBg: 'rgba(255,255,255,0.98)',
    notificationGlow: '0 10px 40px rgba(0,0,0,0.12)',
    // Slider
    sliderTrack: '#e2e8f0',
    sliderFill: '#7c3aed',
    sliderThumb: '#ffffff',
    sliderThumbBorder: '#7c3aed',
    sliderThumbGlow: '0 0 8px rgba(124,58,237,0.4)',
    // Footer
    footerText: 'rgba(148,163,184,0.6)',
    // Year Card
    yearCardBg: 'rgba(248,250,252,0.80)',
    yearCardBorder: 'rgba(226,232,240,0.6)',
    // AI Card
    aiCardBg: 'linear-gradient(135deg, rgba(238,242,255,0.9), rgba(224,231,255,0.9))',
    aiCardBorder: 'rgba(199,210,254,0.6)',
    // Search Button
    searchBtnBg: '#1e293b',
    searchBtnText: 'white',
  },

  aurora: {
    // Background - dark slate
    bgFrom: '#020617',
    bgVia: '#0f172a',
    bgTo: '#020617',
    // Orbs - subtle
    orb1: 'rgba(37,99,235,0.10)',
    orb2: 'rgba(124,58,237,0.08)',
    orb3: 'rgba(8,145,178,0.08)',
    orb4: 'rgba(79,70,229,0.06)',
    // Glass - slate based
    glassSubtleBg: 'rgba(30,41,59,0.40)',
    glassMediumBg: 'rgba(30,41,59,0.50)',
    glassStrongBg: 'rgba(30,41,59,0.60)',
    glassSubtleBorder: 'rgba(51,65,85,0.30)',
    glassMediumBorder: 'rgba(51,65,85,0.40)',
    glassStrongBorder: 'rgba(51,65,85,0.50)',
    // Text
    textPrimary: '#e2e8f0',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    textAccent: '#a78bfa',
    textInverse: '#0f172a',
    // Header
    headerBg: 'rgba(15,23,42,0.60)',
    headerBorder: 'rgba(51,65,85,0.50)',
    // Glow
    glowViolet: '0 8px 32px rgba(124,58,237,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
    glowBlue: '0 8px 32px rgba(59,130,246,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
    glowCyan: '0 8px 32px rgba(6,182,212,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
    glowNeutral: '0 8px 32px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.05)',
    // Progress
    progressBg: 'rgba(51,65,85,0.50)',
    progressGlow: '0 0 12px rgba(124,58,237,0.4)',
    // Status
    statusGreen: '#34d399',
    statusYellow: '#fbbf24',
    statusRed: '#f87171',
    statusBlue: '#60a5fa',
    // Metrics
    metricEmeraldBg: 'rgba(16,185,129,0.10)',
    metricEmeraldText: '#34d399',
    metricEmeraldBorder: 'rgba(16,185,129,0.20)',
    metricAmberBg: 'rgba(245,158,11,0.10)',
    metricAmberText: '#fbbf24',
    metricAmberBorder: 'rgba(245,158,11,0.20)',
    metricBlueBg: 'rgba(59,130,246,0.10)',
    metricBlueText: '#60a5fa',
    metricBlueBorder: 'rgba(59,130,246,0.20)',
    metricRedBg: 'rgba(239,68,68,0.10)',
    metricRedText: '#f87171',
    metricRedBorder: 'rgba(239,68,68,0.20)',
    // Alerts
    alertDangerBg: 'rgba(239,68,68,0.10)',
    alertDangerBorder: 'rgba(239,68,68,0.20)',
    alertDangerText: '#f87171',
    alertWarningBg: 'rgba(245,158,11,0.10)',
    alertWarningBorder: 'rgba(245,158,11,0.20)',
    alertWarningText: '#fbbf24',
    alertInfoBg: 'rgba(96,165,250,0.10)',
    alertInfoBorder: 'rgba(96,165,250,0.20)',
    alertInfoText: '#60a5fa',
    alertSuccessBg: 'rgba(52,211,153,0.10)',
    alertSuccessBorder: 'rgba(52,211,153,0.20)',
    alertSuccessText: '#34d399',
    // Cards
    cardBg: 'rgba(30,41,59,0.40)',
    cardBorder: 'rgba(51,65,85,0.40)',
    cardHoverBg: 'rgba(30,41,59,0.60)',
    expandedBg: 'rgba(30,41,59,0.40)',
    expandedBorder: 'rgba(139,92,246,0.50)',
    // Buttons
    btnPrimaryBg: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
    btnPrimaryText: '#ffffff',
    btnPrimaryHoverBg: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    btnPrimaryGlow: '0 0 25px rgba(139,92,246,0.5), 0 0 50px rgba(139,92,246,0.25)',
    btnSecondaryBg: 'rgba(51,65,85,0.60)',
    btnSecondaryText: '#e2e8f0',
    btnSecondaryBorder: 'rgba(71,85,105,0.50)',
    btnSecondaryHoverBg: 'rgba(71,85,105,0.80)',
    btnSecondaryGlow: '0 4px 20px rgba(0,0,0,0.30)',
    btnGhostBg: 'transparent',
    btnGhostText: '#94a3b8',
    btnGhostHoverBg: 'rgba(51,65,85,0.50)',
    btnDangerBg: 'linear-gradient(135deg, #ef4444, #f87171)',
    btnDangerText: '#ffffff',
    btnDangerGlow: '0 0 25px rgba(248,113,113,0.5)',
    btnSuccessBg: 'linear-gradient(135deg, #10b981, #34d399)',
    btnSuccessText: '#ffffff',
    btnSuccessGlow: '0 0 25px rgba(52,211,153,0.5)',
    // Badges
    badgeDefaultBg: 'rgba(71,85,105,0.30)',
    badgeDefaultText: '#cbd5e1',
    badgeDefaultBorder: 'rgba(71,85,105,0.50)',
    badgeSuccessBg: 'rgba(16,185,129,0.20)',
    badgeSuccessText: '#34d399',
    badgeSuccessBorder: 'rgba(16,185,129,0.30)',
    badgeWarningBg: 'rgba(245,158,11,0.20)',
    badgeWarningText: '#fbbf24',
    badgeWarningBorder: 'rgba(245,158,11,0.30)',
    badgeDangerBg: 'rgba(239,68,68,0.20)',
    badgeDangerText: '#f87171',
    badgeDangerBorder: 'rgba(239,68,68,0.30)',
    badgePrimaryBg: 'rgba(59,130,246,0.20)',
    badgePrimaryText: '#60a5fa',
    badgePrimaryBorder: 'rgba(59,130,246,0.30)',
    badgeVioletBg: 'rgba(139,92,246,0.20)',
    badgeVioletText: '#a78bfa',
    badgeVioletBorder: 'rgba(139,92,246,0.30)',
    // Search/Toggle
    searchBg: 'rgba(30,41,59,0.60)',
    searchBorder: 'rgba(51,65,85,0.50)',
    searchText: '#94a3b8',
    toggleText: '#fbbf24',
    // Inputs
    inputBg: 'rgba(30,41,59,0.80)',
    inputBorder: 'rgba(51,65,85,0.60)',
    inputText: '#e2e8f0',
    inputPlaceholder: '#64748b',
    inputFocusBorder: '#a78bfa',
    inputFocusGlow: '0 0 0 3px rgba(167,139,250,0.20)',
    // Icon button
    iconBtnFrom: '#334155',
    iconBtnTo: '#1e293b',
    iconBtnShadow: '0 4px 12px rgba(0,0,0,0.30)',
    iconBtnText: '#e2e8f0',
    // Avatar
    avatarBorder: '#0f172a',
    avatarGlow: '0 8px 24px rgba(124,58,237,0.25)',
    onlineBorder: '#0f172a',
    // Language bar
    langBarShadow: '0 0 8px rgba(124,58,237,0.15)',
    // Grid
    gridColor: 'rgba(255,255,255,0.05)',
    gridOpacity: 0.02,
    // Toggle/Switch
    toggleBg: 'rgba(51,65,85,0.80)',
    toggleActiveBg: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
    toggleKnob: '#f1f5f9',
    toggleGlow: '0 0 15px rgba(139,92,246,0.5)',
    // Checkbox
    checkboxBg: 'rgba(30,41,59,0.80)',
    checkboxBorder: 'rgba(71,85,105,0.80)',
    checkboxCheckedBg: '#8b5cf6',
    checkboxGlow: '0 0 0 3px rgba(139,92,246,0.20)',
    // Tabs
    tabBg: 'transparent',
    tabActiveBg: 'rgba(139,92,246,0.15)',
    tabActiveText: '#a78bfa',
    tabBorder: 'rgba(51,65,85,0.50)',
    tabIndicator: '#a78bfa',
    // Tooltips
    tooltipBg: '#1e293b',
    tooltipText: '#f1f5f9',
    tooltipBorder: '#334155',
    // Modals
    modalBg: 'rgba(15,23,42,0.98)',
    modalBorder: 'rgba(51,65,85,0.60)',
    modalOverlay: 'rgba(0,0,0,0.70)',
    modalGlow: '0 25px 50px rgba(0,0,0,0.50)',
    // Dropdowns
    dropdownBg: 'rgba(30,41,59,0.98)',
    dropdownBorder: 'rgba(51,65,85,0.60)',
    dropdownItemHover: 'rgba(51,65,85,0.70)',
    dropdownGlow: '0 10px 40px rgba(0,0,0,0.40)',
    // Skeleton
    skeletonBg: 'rgba(51,65,85,0.60)',
    skeletonShine: 'rgba(255,255,255,0.08)',
    // List
    listItemHover: 'rgba(51,65,85,0.60)',
    listItemActive: 'rgba(139,92,246,0.15)',
    listDivider: 'rgba(51,65,85,0.50)',
    // Table
    tableBg: 'rgba(30,41,59,0.60)',
    tableHeaderBg: 'rgba(15,23,42,0.80)',
    tableRowHover: 'rgba(51,65,85,0.50)',
    tableBorder: 'rgba(51,65,85,0.50)',
    // Notification
    notificationBg: 'rgba(30,41,59,0.98)',
    notificationGlow: '0 10px 40px rgba(0,0,0,0.40)',
    // Slider
    sliderTrack: 'rgba(51,65,85,0.80)',
    sliderFill: '#8b5cf6',
    sliderThumb: '#f1f5f9',
    sliderThumbBorder: '#8b5cf6',
    sliderThumbGlow: '0 0 12px rgba(139,92,246,0.5)',
    // Footer
    footerText: '#64748b',
    // Year Card
    yearCardBg: 'rgba(30,41,59,0.60)',
    yearCardBorder: 'rgba(51,65,85,0.50)',
    // AI Card
    aiCardBg: 'linear-gradient(135deg, rgba(30,41,59,0.80), rgba(15,23,42,0.90))',
    aiCardBorder: 'rgba(139,92,246,0.30)',
    // Search Button
    searchBtnBg: '#e2e8f0',
    searchBtnText: '#0f172a',
  },

  glass: {
    // Background - purple glassmorphism
    bgFrom: '#0f172a',
    bgVia: '#581c87',
    bgTo: '#0f172a',
    // Orbs - vibrant animated
    orb1: 'rgba(168,85,247,0.30)',
    orb2: 'rgba(59,130,246,0.20)',
    orb3: 'rgba(236,72,153,0.20)',
    orb4: 'rgba(6,182,212,0.20)',
    orb5: 'rgba(139,92,246,0.10)',
    // Glass - white based for glassmorphism
    glassSubtleBg: 'rgba(255,255,255,0.10)',
    glassMediumBg: 'rgba(255,255,255,0.15)',
    glassStrongBg: 'rgba(255,255,255,0.25)',
    glassSubtleBorder: 'rgba(255,255,255,0.10)',
    glassMediumBorder: 'rgba(255,255,255,0.20)',
    glassStrongBorder: 'rgba(255,255,255,0.30)',
    // Text
    textPrimary: 'rgba(255,255,255,0.90)',
    textSecondary: 'rgba(255,255,255,0.60)',
    textMuted: 'rgba(255,255,255,0.40)',
    textAccent: '#c4b5fd',
    textInverse: '#0f172a',
    // Header
    headerBg: 'rgba(255,255,255,0.05)',
    headerBorder: 'rgba(255,255,255,0.10)',
    // Glow - intense
    glowViolet: '0 8px 32px rgba(147,51,234,0.30)',
    glowBlue: '0 8px 32px rgba(59,130,246,0.30)',
    glowCyan: '0 8px 32px rgba(6,182,212,0.25)',
    glowNeutral: '0 8px 32px rgba(0,0,0,0.12)',
    // Progress
    progressBg: 'rgba(255,255,255,0.10)',
    progressGlow: '0 0 16px rgba(147,51,234,0.4)',
    // Status
    statusGreen: '#34d399',
    statusYellow: '#fbbf24',
    statusRed: '#fb7185',
    statusBlue: '#60a5fa',
    // Metrics - with text glow
    metricEmeraldBg: 'transparent',
    metricEmeraldText: '#34d399',
    metricEmeraldBorder: 'transparent',
    metricEmeraldGlow: '0 0 12px rgba(52,211,153,0.4)',
    metricAmberBg: 'transparent',
    metricAmberText: '#fbbf24',
    metricAmberBorder: 'transparent',
    metricAmberGlow: '0 0 12px rgba(251,191,36,0.4)',
    metricBlueBg: 'transparent',
    metricBlueText: '#60a5fa',
    metricBlueBorder: 'transparent',
    metricBlueGlow: '0 0 12px rgba(96,165,250,0.4)',
    metricRedBg: 'transparent',
    metricRedText: '#fb7185',
    metricRedBorder: 'transparent',
    metricRedGlow: '0 0 12px rgba(251,113,133,0.4)',
    // Alerts
    alertDangerBg: 'rgba(251,113,133,0.10)',
    alertDangerBorder: 'rgba(251,113,133,0.20)',
    alertDangerText: '#fda4af',
    alertWarningBg: 'rgba(251,191,36,0.10)',
    alertWarningBorder: 'rgba(251,191,36,0.20)',
    alertWarningText: '#fcd34d',
    alertInfoBg: 'rgba(96,165,250,0.10)',
    alertInfoBorder: 'rgba(96,165,250,0.20)',
    alertInfoText: '#93c5fd',
    alertSuccessBg: 'rgba(52,211,153,0.10)',
    alertSuccessBorder: 'rgba(52,211,153,0.20)',
    alertSuccessText: '#6ee7b7',
    // Cards
    cardBg: 'rgba(255,255,255,0.05)',
    cardBorder: 'rgba(255,255,255,0.10)',
    cardHoverBg: 'rgba(255,255,255,0.07)',
    expandedBg: 'rgba(255,255,255,0.05)',
    expandedBorder: 'rgba(167,139,250,0.50)',
    // Buttons
    btnPrimaryBg: 'linear-gradient(135deg, #a855f7, #8b5cf6)',
    btnPrimaryText: '#ffffff',
    btnPrimaryHoverBg: 'linear-gradient(135deg, #c084fc, #a855f7)',
    btnPrimaryGlow: '0 0 30px rgba(168,85,247,0.6), 0 0 60px rgba(168,85,247,0.3)',
    btnSecondaryBg: 'rgba(255,255,255,0.10)',
    btnSecondaryText: 'rgba(255,255,255,0.80)',
    btnSecondaryBorder: 'rgba(255,255,255,0.20)',
    btnSecondaryHoverBg: 'rgba(255,255,255,0.18)',
    btnSecondaryGlow: '0 4px 20px rgba(168,85,247,0.20)',
    btnGhostBg: 'transparent',
    btnGhostText: 'rgba(255,255,255,0.70)',
    btnGhostHoverBg: 'rgba(255,255,255,0.10)',
    btnDangerBg: 'linear-gradient(135deg, #f43f5e, #fb7185)',
    btnDangerText: '#ffffff',
    btnDangerGlow: '0 0 30px rgba(244,63,94,0.5)',
    btnSuccessBg: 'linear-gradient(135deg, #10b981, #34d399)',
    btnSuccessText: '#0f172a',
    btnSuccessGlow: '0 0 30px rgba(52,211,153,0.5)',
    // Badges
    badgeDefaultBg: 'rgba(255,255,255,0.20)',
    badgeDefaultText: 'rgba(255,255,255,0.90)',
    badgeDefaultBorder: 'transparent',
    badgeSuccessBg: 'rgba(52,211,153,0.20)',
    badgeSuccessText: '#6ee7b7',
    badgeSuccessBorder: 'transparent',
    badgeWarningBg: 'rgba(251,191,36,0.20)',
    badgeWarningText: '#fcd34d',
    badgeWarningBorder: 'transparent',
    badgeDangerBg: 'rgba(251,113,133,0.20)',
    badgeDangerText: '#fda4af',
    badgeDangerBorder: 'transparent',
    badgePrimaryBg: 'rgba(96,165,250,0.20)',
    badgePrimaryText: '#93c5fd',
    badgePrimaryBorder: 'transparent',
    badgeVioletBg: 'rgba(167,139,250,0.20)',
    badgeVioletText: '#c4b5fd',
    badgeVioletBorder: 'transparent',
    // Search/Toggle
    searchBg: 'rgba(255,255,255,0.10)',
    searchBorder: 'rgba(255,255,255,0.10)',
    searchText: 'rgba(255,255,255,0.70)',
    toggleText: 'rgba(255,255,255,0.60)',
    // Inputs
    inputBg: 'rgba(255,255,255,0.08)',
    inputBorder: 'rgba(255,255,255,0.15)',
    inputText: 'rgba(255,255,255,0.90)',
    inputPlaceholder: 'rgba(255,255,255,0.40)',
    inputFocusBorder: '#c4b5fd',
    inputFocusGlow: '0 0 0 3px rgba(196,181,253,0.25), 0 0 20px rgba(168,85,247,0.20)',
    // Icon button - purple gradient
    iconBtnFrom: '#8b5cf6',
    iconBtnTo: '#9333ea',
    iconBtnShadow: '0 0 12px rgba(147,51,234,0.50)',
    iconBtnText: 'white',
    // Avatar
    avatarBorder: 'rgba(168,85,247,0.50)',
    avatarGlow: '0 0 24px rgba(147,51,234,0.50)',
    onlineBorder: '#0f172a',
    // Language bar
    langBarShadow: '0 0 12px rgba(147,51,234,0.30)',
    // Grid
    gridColor: 'rgba(255,255,255,0.05)',
    gridOpacity: 0.03,
    // Toggle/Switch
    toggleBg: 'rgba(255,255,255,0.15)',
    toggleActiveBg: 'linear-gradient(135deg, #a855f7, #8b5cf6)',
    toggleKnob: '#ffffff',
    toggleGlow: '0 0 20px rgba(168,85,247,0.6)',
    // Checkbox
    checkboxBg: 'rgba(255,255,255,0.08)',
    checkboxBorder: 'rgba(255,255,255,0.25)',
    checkboxCheckedBg: '#a855f7',
    checkboxGlow: '0 0 0 3px rgba(168,85,247,0.25)',
    // Tabs
    tabBg: 'transparent',
    tabActiveBg: 'rgba(168,85,247,0.20)',
    tabActiveText: '#c4b5fd',
    tabBorder: 'rgba(255,255,255,0.10)',
    tabIndicator: '#c4b5fd',
    // Tooltips
    tooltipBg: 'rgba(15,23,42,0.95)',
    tooltipText: 'rgba(255,255,255,0.95)',
    tooltipBorder: 'rgba(255,255,255,0.15)',
    // Modals
    modalBg: 'rgba(15,23,42,0.85)',
    modalBorder: 'rgba(255,255,255,0.15)',
    modalOverlay: 'rgba(0,0,0,0.60)',
    modalGlow: '0 25px 80px rgba(168,85,247,0.30)',
    // Dropdowns
    dropdownBg: 'rgba(15,23,42,0.90)',
    dropdownBorder: 'rgba(255,255,255,0.15)',
    dropdownItemHover: 'rgba(255,255,255,0.10)',
    dropdownGlow: '0 15px 50px rgba(168,85,247,0.25)',
    // Skeleton
    skeletonBg: 'rgba(255,255,255,0.08)',
    skeletonShine: 'rgba(255,255,255,0.15)',
    // List
    listItemHover: 'rgba(255,255,255,0.08)',
    listItemActive: 'rgba(168,85,247,0.20)',
    listDivider: 'rgba(255,255,255,0.10)',
    // Table
    tableBg: 'rgba(255,255,255,0.05)',
    tableHeaderBg: 'rgba(255,255,255,0.08)',
    tableRowHover: 'rgba(255,255,255,0.08)',
    tableBorder: 'rgba(255,255,255,0.10)',
    // Notification
    notificationBg: 'rgba(15,23,42,0.90)',
    notificationGlow: '0 15px 50px rgba(168,85,247,0.30)',
    // Slider
    sliderTrack: 'rgba(255,255,255,0.15)',
    sliderFill: '#a855f7',
    sliderThumb: '#ffffff',
    sliderThumbBorder: '#a855f7',
    sliderThumbGlow: '0 0 15px rgba(168,85,247,0.6)',
    // Footer
    footerText: 'rgba(255,255,255,0.30)',
    // Year Card
    yearCardBg: 'rgba(255,255,255,0.08)',
    yearCardBorder: 'rgba(255,255,255,0.12)',
    // AI Card
    aiCardBg: 'linear-gradient(135deg, rgba(168,85,247,0.20), rgba(139,92,246,0.15))',
    aiCardBorder: 'rgba(168,85,247,0.30)',
    // Search Button
    searchBtnBg: 'rgba(255,255,255,0.15)',
    searchBtnText: 'rgba(255,255,255,0.90)',
  },
};

export default themeStyles;
